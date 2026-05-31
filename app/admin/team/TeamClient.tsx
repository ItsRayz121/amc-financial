'use client'

import { useState, useTransition } from 'react'
import { UserPlus, Trash2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/config/roles'
import type { AdminRoleRecord, AdminRole } from '@/types/database'

const ROLE_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

const ROLE_BADGE_VARIANT: Record<AdminRole, 'gold' | 'emerald' | 'default'> = {
  super_admin: 'gold',
  editor: 'emerald',
  viewer: 'default',
}

interface TeamClientProps {
  admins: AdminRoleRecord[]
}

export function TeamClient({ admins: initialAdmins }: TeamClientProps) {
  const [admins, setAdmins] = useState(initialAdmins)
  const [inviteEmail, setInviteEmail] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleInvite() {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    startTransition(async () => {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error ?? 'Failed to send invitation')
        return
      }

      toast.success(`Invitation sent to ${inviteEmail}`)
      setInviteEmail('')
    })
  }

  async function handleRoleChange(clerkUserId: string, newRole: AdminRole) {
    const prev = admins.find((a) => a.clerk_user_id === clerkUserId)
    setAdmins((prev) =>
      prev.map((a) => a.clerk_user_id === clerkUserId ? { ...a, role: newRole } : a)
    )

    const res = await fetch(`/api/admin/team/${clerkUserId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })

    if (!res.ok) {
      if (prev) setAdmins((a) => a.map((u) => u.clerk_user_id === clerkUserId ? prev : u))
      toast.error('Failed to update role')
    } else {
      toast.success('Role updated')
    }
  }

  async function handleRevoke(clerkUserId: string, email: string | null) {
    if (!confirm(`Remove admin access for ${email ?? clerkUserId}?`)) return

    const res = await fetch(`/api/admin/team/${clerkUserId}`, { method: 'DELETE' })

    if (!res.ok) {
      toast.error('Failed to remove access')
    } else {
      setAdmins((prev) => prev.filter((a) => a.clerk_user_id !== clerkUserId))
      toast.success('Admin access revoked')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Invite card */}
      <div className="card-dark rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-gold-muted flex items-center justify-center">
            <UserPlus size={18} className="text-gold" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-text-primary">Invite Admin</h2>
            <p className="text-xs text-text-muted font-sans">
              Invited users receive an email and are granted Editor access by default.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="colleague@example.com"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
            className="flex-1"
            aria-label="Email address to invite"
          />
          <Button variant="gold" onClick={handleInvite} loading={isPending}>
            Send Invite
          </Button>
        </div>
      </div>

      {/* Team table */}
      <div className="card-dark rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-base-border">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Admin Team ({admins.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Admin team members">
            <thead>
              <tr className="border-b border-base-border">
                {['Email', 'Role', 'Description', 'Joined', ''].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs font-semibold font-sans text-text-muted uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b border-base-border hover:bg-base-elevated/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold-muted flex items-center justify-center text-gold font-display font-bold text-sm shrink-0">
                        {(admin.email ?? '?').charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-sans text-text-primary">{admin.email ?? admin.clerk_user_id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Select
                      options={ROLE_OPTIONS}
                      value={admin.role}
                      onChange={(e) => handleRoleChange(admin.clerk_user_id, e.target.value as AdminRole)}
                      aria-label={`Change role for ${admin.email}`}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-xs text-text-muted font-sans max-w-[200px]">
                      {ROLE_DESCRIPTIONS[admin.role]}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs text-text-muted font-sans">
                      {new Date(admin.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleRevoke(admin.clerk_user_id, admin.email)}
                      className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger-muted transition-all duration-250"
                      aria-label={`Revoke access for ${admin.email ?? admin.clerk_user_id}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-text-muted font-sans">
                    No admin team members yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
