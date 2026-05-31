import type { AdminRole } from '@/types/site'

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  editor: 'Editor',
  viewer: 'Viewer',
}

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin: 'Full access — manage team, links, content, and settings',
  editor: 'Edit links and content — no team or settings access',
  viewer: 'Read-only access — view everything, change nothing',
}

export const ROLE_PERMISSIONS = {
  super_admin: {
    canEditLinks: true,
    canEditContent: true,
    canManageTeam: true,
    canViewSettings: true,
    canForceRevalidate: true,
    canViewDashboard: true,
  },
  editor: {
    canEditLinks: true,
    canEditContent: true,
    canManageTeam: false,
    canViewSettings: false,
    canForceRevalidate: false,
    canViewDashboard: true,
  },
  viewer: {
    canEditLinks: false,
    canEditContent: false,
    canManageTeam: false,
    canViewSettings: false,
    canForceRevalidate: false,
    canViewDashboard: true,
  },
} as const

export type Permission = keyof (typeof ROLE_PERMISSIONS)['super_admin']

export const hasPermission = (role: AdminRole, permission: Permission): boolean =>
  ROLE_PERMISSIONS[role][permission]
