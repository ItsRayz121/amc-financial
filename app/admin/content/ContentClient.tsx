'use client'

import { useState, useTransition } from 'react'
import { Save, Hash } from 'lucide-react'
import { toast } from 'sonner'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { SiteContent, AdminRole } from '@/types/database'

const GROUP_TABS = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'stats', label: 'Stats' },
  { key: 'general', label: 'General' },
]

interface ContentClientProps {
  items: SiteContent[]
  role: AdminRole
}

function ContentField({
  item,
  canEdit,
  onSave,
}: {
  item: SiteContent
  canEdit: boolean
  onSave: (id: string, value: string) => void
}) {
  const [value, setValue] = useState(item.value)
  const [isPending, startTransition] = useTransition()
  const isDirty = value !== item.value

  function handleSave() {
    startTransition(async () => {
      await onSave(item.id, value)
    })
  }

  return (
    <div className="card-dark rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <label className="text-sm font-semibold font-sans text-text-primary" htmlFor={`field-${item.id}`}>
            {item.label}
          </label>
          <p className="text-xs text-text-muted font-sans font-mono mt-0.5">{item.key}</p>
        </div>
        {item.type === 'number' && (
          <Hash size={14} className="text-text-muted mt-1 shrink-0" aria-hidden="true" />
        )}
      </div>

      {item.type === 'textarea' ? (
        <Textarea
          id={`field-${item.id}`}
          value={value}
          onChange={(e) => canEdit && setValue(e.target.value)}
          disabled={!canEdit}
          showCount
          maxLength={1000}
          className="text-sm"
        />
      ) : item.type === 'number' ? (
        <Input
          id={`field-${item.id}`}
          type="number"
          value={value}
          onChange={(e) => canEdit && setValue(e.target.value)}
          disabled={!canEdit}
        />
      ) : (
        <Input
          id={`field-${item.id}`}
          value={value}
          onChange={(e) => canEdit && setValue(e.target.value)}
          disabled={!canEdit}
        />
      )}

      {canEdit && isDirty && (
        <div className="flex justify-end mt-3">
          <Button
            variant="gold"
            size="sm"
            onClick={handleSave}
            loading={isPending}
          >
            <Save size={14} aria-hidden="true" />
            Save
          </Button>
        </div>
      )}
    </div>
  )
}

export function ContentClient({ items, role }: ContentClientProps) {
  const [activeTab, setActiveTab] = useState('hero')
  const canEdit = role === 'super_admin' || role === 'editor'

  const groupItems = items.filter((i) => i.group_name === activeTab)

  async function handleSave(id: string, value: string) {
    const res = await fetch(`/api/admin/content/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    })

    if (!res.ok) {
      toast.error('Failed to save content')
    } else {
      toast.success('Content saved')
    }
  }

  return (
    <>
      <Tabs
        tabs={GROUP_TABS.map((t) => ({
          ...t,
          count: items.filter((i) => i.group_name === t.key).length,
        }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      <div className="flex flex-col gap-4">
        {groupItems.map((item) => (
          <ContentField
            key={item.id}
            item={item}
            canEdit={canEdit}
            onSave={handleSave}
          />
        ))}
        {groupItems.length === 0 && (
          <div className="text-center py-12 text-sm text-text-muted font-sans">
            No content items in this group.
          </div>
        )}
      </div>
    </>
  )
}
