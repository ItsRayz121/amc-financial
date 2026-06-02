'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Link2,
  FileText,
  Users,
  Settings,
  ExternalLink,
  Mail,
} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { useRole } from '@/hooks/useRole'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/ui/Badge'
import { ROLE_LABELS } from '@/config/roles'

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: null },
  { href: '/admin/links', label: 'Links', icon: Link2, permission: null },
  { href: '/admin/content', label: 'Content', icon: FileText, permission: null },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail, permission: null },
  { href: '/admin/team', label: 'Team', icon: Users, permission: 'canManageTeam' as const },
  { href: '/admin/settings', label: 'Settings', icon: Settings, permission: 'canViewSettings' as const },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { role, can } = useRole()

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-base-surface border-r border-base-border">
      {/* Logo */}
      <div className="p-6 border-b border-base-border">
        <Link href="/admin/dashboard" className="font-display text-xl font-bold">
          <span className="text-gold">AMC</span>
          <span className="text-text-primary text-base ml-1">Admin</span>
        </Link>
        {role && (
          <div className="mt-2">
            <Badge variant="gold" className="text-[11px]">
              {ROLE_LABELS[role]}
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4" aria-label="Admin navigation">
        <ul className="flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon, permission }) => {
            if (permission && !can(permission)) return null
            const isActive = pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-sans',
                    'transition-all duration-250',
                    isActive
                      ? 'bg-gold-muted text-gold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-base-elevated'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-base-border space-y-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary font-sans transition-colors"
        >
          <ExternalLink size={13} aria-hidden="true" />
          View live site
        </Link>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </div>
    </aside>
  )
}
