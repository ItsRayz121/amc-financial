'use client'

import { useRole } from '@/hooks/useRole'
import type { Permission } from '@/config/roles'

interface RoleGateProps {
  permission: Permission
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGate({ permission, children, fallback = null }: RoleGateProps) {
  const { can } = useRole()
  if (!can(permission)) return <>{fallback}</>
  return <>{children}</>
}
