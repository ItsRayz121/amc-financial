'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import type { AdminActivity } from '@/types/database'

interface SettingsClientProps {
  activity: AdminActivity[]
}

export function SettingsClient({ activity }: SettingsClientProps) {
  const [revalidating, setRevalidating] = useState(false)

  async function handleRevalidate() {
    setRevalidating(true)
    const res = await fetch('/api/admin/revalidate', { method: 'POST' })
    setRevalidating(false)

    if (!res.ok) {
      toast.error('Revalidation failed')
    } else {
      toast.success('Cache cleared — public site will update within seconds')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cache card */}
      <div className="card-dark rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-2">
          Cache Management
        </h2>
        <p className="text-sm text-text-secondary font-sans mb-5">
          The public site is cached for performance. After making changes, click below to force an
          immediate update. Alternatively, the cache refreshes automatically every hour.
        </p>
        <Button
          variant="outline"
          onClick={handleRevalidate}
          loading={revalidating}
        >
          <RefreshCw size={16} aria-hidden="true" />
          Force Revalidation
        </Button>
      </div>

      {/* Audit log */}
      <div className="card-dark rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-5">
          Audit Log
        </h2>

        {activity.length === 0 ? (
          <p className="text-sm text-text-muted font-sans text-center py-8">
            No admin activity yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Admin activity audit log">
              <thead>
                <tr className="border-b border-base-border">
                  {['Admin', 'Action', 'Resource', 'Date'].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 px-3 text-xs font-semibold font-sans text-text-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activity.map((entry) => (
                  <tr key={entry.id} className="border-b border-base-border/50">
                    <td className="py-3 px-3 text-sm font-sans text-text-secondary">
                      {entry.email ?? entry.clerk_user_id.substring(0, 12)}…
                    </td>
                    <td className="py-3 px-3 text-sm font-sans text-gold">{entry.action}</td>
                    <td className="py-3 px-3 text-sm font-sans text-text-secondary">
                      {entry.resource}
                      {entry.resource_id && (
                        <span className="text-text-muted text-xs ml-1">({entry.resource_id})</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-xs font-sans text-text-muted">
                      {new Date(entry.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
