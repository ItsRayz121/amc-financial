'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { cn } from '@/utils/cn'
import { NAV_ITEMS, SITE_CONFIG } from '@/config/site'
import { Button } from '@/components/ui/Button'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-350',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw]',
          'bg-base-surface border-l border-base-border',
          'flex flex-col',
          'transition-transform duration-350 ease-out-expo',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-6 border-b border-base-border">
          <span className="font-display text-xl font-bold text-text-primary">
            <span className="text-gold">AMC</span>
          </span>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-base-elevated"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-6 px-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl text-base font-sans font-medium text-text-secondary hover:text-text-primary hover:bg-base-elevated transition-all duration-250"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="p-6 border-t border-base-border">
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => {
              window.open(SITE_CONFIG.social.whatsapp, '_blank', 'noopener,noreferrer')
              onClose()
            }}
          >
            Join Community
          </Button>
          <p className="text-center text-xs text-text-muted mt-3 font-sans">
            Free • No registration required
          </p>
        </div>
      </div>
    </>
  )
}
