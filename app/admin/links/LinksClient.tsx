'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Edit2, ExternalLink, Check, X, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Tabs } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { Modal } from '@/components/ui/Modal'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
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

const CATEGORY_OPTIONS = [
  { value: 'community', label: 'Community' },
  { value: 'course', label: 'Course' },
  { value: 'affiliate', label: 'Affiliate' },
  { value: 'support', label: 'Support' },
]

const linkSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100),
  url: z.string().min(1, 'URL is required').refine(
    (val) =>
      val.startsWith('PLACEHOLDER_') ||
      (() => { try { new URL(val); return true } catch { return false } })(),
    'Enter a valid URL (https://...) or PLACEHOLDER_XXX'
  ),
  description: z.string().max(300).optional(),
  sort_order: z.coerce.number().min(0).max(999),
  is_active: z.boolean(),
  category: z.enum(['community', 'course', 'affiliate', 'support']),
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
  onDelete,
}: {
  link: SiteLink
  canEdit: boolean
  onEdit: (link: SiteLink) => void
  onToggle: (id: string, active: boolean) => void
  onDelete: (id: string, label: string) => void
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
        {isPlaceholder ? (
          <Badge variant="warning">Placeholder</Badge>
        ) : (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gold hover:text-gold-light font-sans truncate max-w-[200px]"
          >
            {link.url.replace('https://', '').substring(0, 35)}…
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        )}
      </td>
      <td className="py-4 px-4">
        {canEdit ? (
          <Toggle
            checked={link.is_active}
            onChange={(v) => onToggle(link.id, v)}
            label={`Toggle ${link.label}`}
          />
        ) : link.is_active ? (
          <Check size={16} className="text-emerald" />
        ) : (
          <X size={16} className="text-danger" />
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
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(link)}
              className="p-2 rounded-lg text-text-muted hover:text-gold hover:bg-gold-muted transition-all duration-250"
              aria-label={`Edit ${link.label}`}
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => onDelete(link.id, link.label)}
              className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger-muted transition-all duration-250"
              aria-label={`Delete ${link.label}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export function LinksClient({ links, role }: LinksClientProps) {
  const [activeTab, setActiveTab] = useState<SiteLinkCategory>('community')
  const [editingLink, setEditingLink] = useState<SiteLink | null>(null)
  const [addingNew, setAddingNew] = useState(false)
  const [localLinks, setLocalLinks] = useState(links)
  const [isPending, startTransition] = useTransition()
  const [editActiveState, setEditActiveState] = useState(true)
  const [addActiveState, setAddActiveState] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; label: string } | null>(null)

  const canEdit = role === 'super_admin' || role === 'editor'

  const filteredLinks = localLinks
    .filter((l) => l.category === activeTab)
    .sort((a, b) => a.sort_order - b.sort_order)

  // Edit form
  const editForm = useForm<LinkFormData>({ resolver: zodResolver(linkSchema) })
  // Add form
  const addForm = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: { is_active: true, sort_order: 0, category: activeTab },
  })

  function openEdit(link: SiteLink) {
    setEditActiveState(link.is_active)
    setEditingLink(link)
    editForm.reset({
      label: link.label,
      url: link.url,
      description: link.description ?? '',
      sort_order: link.sort_order,
      is_active: link.is_active,
      category: link.category,
    })
  }

  function openAdd() {
    setAddActiveState(true)
    addForm.reset({ is_active: true, sort_order: filteredLinks.length + 1, category: activeTab })
    setAddingNew(true)
  }

  async function handleToggle(id: string, active: boolean) {
    setLocalLinks((prev) => prev.map((l) => (l.id === id ? { ...l, is_active: active } : l)))
    const res = await fetch(`/api/admin/links/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: active }),
    })
    if (!res.ok) {
      setLocalLinks((prev) => prev.map((l) => (l.id === id ? { ...l, is_active: !active } : l)))
      toast.error('Failed to update status')
    } else {
      toast.success(`Link ${active ? 'activated' : 'deactivated'}`)
    }
  }

  async function handleDelete(id: string, label: string) {
    setConfirmDelete({ id, label })
  }

  async function confirmDeleteAction() {
    if (!confirmDelete) return
    const { id, label } = confirmDelete
    setConfirmDelete(null)
    const res = await fetch(`/api/admin/links/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      toast.error('Failed to delete link')
    } else {
      setLocalLinks((prev) => prev.filter((l) => l.id !== id))
      toast.success(`"${label}" deleted`)
    }
  }

  async function onEdit(data: LinkFormData) {
    if (!editingLink) return
    startTransition(async () => {
      const res = await fetch(`/api/admin/links/${editingLink.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, is_active: editActiveState }),
      })
      if (!res.ok) { toast.error('Failed to save'); return }
      const updated = await res.json()
      setLocalLinks((prev) => prev.map((l) => (l.id === editingLink.id ? updated : l)))
      setEditingLink(null)
      toast.success('Link updated')
    })
  }

  async function onAdd(data: LinkFormData) {
    startTransition(async () => {
      const res = await fetch('/api/admin/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, is_active: addActiveState }),
      })
      if (!res.ok) { toast.error('Failed to create link'); return }
      const created = await res.json()
      setLocalLinks((prev) => [...prev, created])
      setAddingNew(false)
      setActiveTab(data.category)
      toast.success(`"${data.label}" added`)
    })
  }

  const LinkForm = ({
    form,
    onSubmit,
    onCancel,
    submitLabel,
    showCategory,
    activeState,
    setActiveState,
  }: {
    form: ReturnType<typeof useForm<LinkFormData>>
    onSubmit: (d: LinkFormData) => void
    onCancel: () => void
    submitLabel: string
    showCategory?: boolean
    activeState: boolean
    setActiveState: (v: boolean) => void
  }) => (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {showCategory && (
        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          {...form.register('category')}
        />
      )}
      <Input label="Label" error={form.formState.errors.label?.message} {...form.register('label')} />
      <Input
        label="URL"
        hint="https://example.com  or  PLACEHOLDER_XXX for links coming later"
        error={form.formState.errors.url?.message}
        {...form.register('url')}
      />
      <Textarea
        label="Description"
        showCount
        maxLength={300}
        error={form.formState.errors.description?.message}
        {...form.register('description')}
      />
      <Input
        label="Sort Order"
        type="number"
        hint="Lower number = higher up in the list"
        error={form.formState.errors.sort_order?.message}
        {...form.register('sort_order')}
      />
      <div className="flex items-center justify-between p-3 rounded-xl bg-base-elevated border border-base-border">
        <div>
          <p className="text-sm font-sans font-medium text-text-primary">Active</p>
          <p className="text-xs text-text-muted font-sans mt-0.5">Show this link on the public site</p>
        </div>
        <Toggle
          checked={activeState}
          onChange={setActiveState}
          label="Active"
        />
      </div>
      <div className="flex gap-3 pt-1">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="gold" loading={isPending} className="flex-1">
          {submitLabel}
        </Button>
      </div>
    </form>
  )

  return (
    <>
      {/* Tabs + Add button */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Tabs
          tabs={TABS.map((t) => ({
            ...t,
            count: localLinks.filter((l) => l.category === t.key).length,
          }))}
          activeTab={activeTab}
          onTabChange={(k) => setActiveTab(k as SiteLinkCategory)}
        />
        {canEdit && (
          <Button variant="gold" size="sm" onClick={openAdd}>
            <Plus size={15} aria-hidden="true" />
            Add New
          </Button>
        )}
      </div>

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
                  onDelete={handleDelete}
                />
              ))}
              {filteredLinks.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-14 text-center font-sans">
                    <p className="text-sm text-text-muted">No {activeTab} links yet.</p>
                    {canEdit && (
                      <button
                        onClick={openAdd}
                        className="mt-3 text-xs text-gold hover:text-gold-light font-sans font-medium underline underline-offset-2 transition-colors"
                      >
                        + Add the first one
                      </button>
                    )}
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
        <LinkForm
          form={editForm}
          onSubmit={onEdit}
          onCancel={() => setEditingLink(null)}
          submitLabel="Save Changes"
          activeState={editActiveState}
          setActiveState={setEditActiveState}
        />
      </Modal>

      {/* Add New modal */}
      <Modal
        open={addingNew}
        onClose={() => setAddingNew(false)}
        title="Add New Link"
        description="New link will appear on the public site immediately after saving."
        size="md"
      >
        <LinkForm
          form={addForm}
          onSubmit={onAdd}
          onCancel={() => setAddingNew(false)}
          submitLabel="Add Link"
          showCategory
          activeState={addActiveState}
          setActiveState={setAddActiveState}
        />
      </Modal>

      {/* Delete confirmation modal */}
      <ConfirmModal
        open={!!confirmDelete}
        title="Delete Link"
        message={`Delete "${confirmDelete?.label}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDeleteAction}
        onCancel={() => setConfirmDelete(null)}
      />
    </>
  )
}
