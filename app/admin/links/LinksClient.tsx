'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Edit2, ExternalLink, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { Tabs } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { isPlaceholderUrl } from '@/config/site'
import { cn } from '@/utils/cn'
import type { SiteLink, SiteLinkCategory, AdminRole } from '@/types/database'

const TABS = [
  { key: 'community', label: 'Community' },
  { key: 'course', label: 'Courses' },
  { key: 'affiliate', label: 'Affiliates' },
  { key: 'support', label: 'Support' },
]

const linkSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100),
  url: z.string().min(1, 'URL is required').refine(
    (val) => val.startsWith('PLACEHOLDER_') || val === '' || (() => {
      try { new URL(val); return true } catch { return false }
    })(),
    'Enter a valid URL or leave as PLACEHOLDER_XXX'
  ),
  description: z.string().max(300).optional(),
  sort_order: z.coerce.number().min(0).max(999),
  is_active: z.boolean(),
})

type LinkFormData = z.infer<typeof linkSchema>

interface LinksClientProps {
  links: SiteLink[]
  role: AdminRole
}

function LinkRow({
  link,
  canEdit,
  onEdit,
  onToggle,
}: {
  link: SiteLink
  canEdit: boolean
  onEdit: (link: SiteLink) => void
  onToggle: (id: string, active: boolean) => void
}) {
  const isPlaceholder = isPlaceholderUrl(link.url)

  return (
    <tr className="border-b border-base-border hover:bg-base-elevated/50 transition-colors">
      <td className="py-4 px-4">
        <div>
          <p className="text-sm font-medium font-sans text-text-primary">{link.label}</p>
          {link.description && (
            <p className="text-xs text-text-muted font-sans mt-0.5 line-clamp-1">{link.description}</p>
          )}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {isPlaceholder ? (
            <Badge variant="warning">Placeholder</Badge>
          ) : (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gold hover:text-gold-light font-sans truncate max-w-[200px]"
              aria-label={`Visit ${link.label}`}
            >
              {link.url.replace('https://', '').substring(0, 35)}…
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          )}
        </div>
      </td>
      <td className="py-4 px-4">
        {canEdit ? (
          <Toggle
            checked={link.is_active}
            onChange={(v) => onToggle(link.id, v)}
            label={`Toggle ${link.label} active status`}
          />
        ) : (
          link.is_active ? (
            <Check size={16} className="text-emerald" aria-label="Active" />
          ) : (
            <X size={16} className="text-danger" aria-label="Inactive" />
          )
        )}
      </td>
      <td className="py-4 px-4">
        <span className="text-xs text-text-muted font-sans font-mono">{link.sort_order}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-xs text-text-muted font-sans">
          {new Date(link.updated_at).toLocaleDateString()}
        </span>
      </td>
      <td className="py-4 px-4">
        {canEdit && (
          <button
            onClick={() => onEdit(link)}
            className="p-2 rounded-lg text-text-muted hover:text-gold hover:bg-gold-muted transition-all duration-250"
            aria-label={`Edit ${link.label}`}
          >
            <Edit2 size={15} />
          </button>
        )}
      </td>
    </tr>
  )
}

export function LinksClient({ links, role }: LinksClientProps) {
  const [activeTab, setActiveTab] = useState<SiteLinkCategory>('community')
  const [editingLink, setEditingLink] = useState<SiteLink | null>(null)
  const [localLinks, setLocalLinks] = useState(links)
  const [isPending, startTransition] = useTransition()

  const canEdit = role === 'super_admin' || role === 'editor'

  const filteredLinks = localLinks
    .filter((l) => l.category === activeTab)
    .sort((a, b) => a.sort_order - b.sort_order)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  })

  function openEdit(link: SiteLink) {
    setEditingLink(link)
    reset({
      label: link.label,
      url: link.url,
      description: link.description ?? '',
      sort_order: link.sort_order,
      is_active: link.is_active,
    })
  }

  async function handleToggle(id: string, active: boolean) {
    setLocalLinks((prev) => prev.map((l) => l.id === id ? { ...l, is_active: active } : l))

    const res = await fetch(`/api/admin/links/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: active }),
    })

    if (!res.ok) {
      setLocalLinks((prev) => prev.map((l) => l.id === id ? { ...l, is_active: !active } : l))
      toast.error('Failed to update link status')
    } else {
      toast.success(`Link ${active ? 'activated' : 'deactivated'}`)
    }
  }

  async function onSubmit(data: LinkFormData) {
    if (!editingLink) return

    startTransition(async () => {
      const res = await fetch(`/api/admin/links/${editingLink.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        toast.error('Failed to save changes')
        return
      }

      const updated = await res.json()
      setLocalLinks((prev) => prev.map((l) => l.id === editingLink.id ? updated : l))
      setEditingLink(null)
      toast.success('Link updated successfully')
    })
  }

  return (
    <>
      <Tabs
        tabs={TABS.map((t) => ({
          ...t,
          count: localLinks.filter((l) => l.category === t.key).length,
        }))}
        activeTab={activeTab}
        onTabChange={(k) => setActiveTab(k as SiteLinkCategory)}
        className="mb-6"
      />

      <div className="card-dark rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label={`${activeTab} links`}>
            <thead>
              <tr className="border-b border-base-border">
                {['Label', 'URL', 'Status', 'Sort', 'Updated', ''].map((h) => (
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
              {filteredLinks.map((link) => (
                <LinkRow
                  key={link.id}
                  link={link}
                  canEdit={canEdit}
                  onEdit={openEdit}
                  onToggle={handleToggle}
                />
              ))}
              {filteredLinks.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-text-muted font-sans">
                    No {activeTab} links found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        open={!!editingLink}
        onClose={() => setEditingLink(null)}
        title={`Edit: ${editingLink?.label}`}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Label" error={errors.label?.message} {...register('label')} />
          <Input
            label="URL"
            hint="Use PLACEHOLDER_XXX for unconfirmed links"
            error={errors.url?.message}
            {...register('url')}
          />
          <Textarea
            label="Description"
            showCount
            maxLength={300}
            error={errors.description?.message}
            {...register('description')}
          />
          <Input
            label="Sort Order"
            type="number"
            error={errors.sort_order?.message}
            {...register('sort_order')}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-sans text-text-secondary">Active</span>
            <Toggle
              checked={editingLink?.is_active ?? true}
              onChange={(v) => setValue('is_active', v)}
              label="Link active status"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <Button type="button" variant="ghost" onClick={() => setEditingLink(null)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gold" loading={isPending} className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
