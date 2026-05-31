'use client'

import { Modal } from './Modal'
import { Button } from './Button'

interface ConfirmModalProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'gold'
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <p className="text-sm text-text-secondary font-sans leading-relaxed mb-6">{message}</p>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onCancel} className="flex-1" disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={variant === 'danger' ? 'danger' : 'gold'}
          onClick={onConfirm}
          loading={loading}
          className="flex-1"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
