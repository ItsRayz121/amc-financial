'use client'

import { RoleContext, createRoleContextValue } from '@/hooks/useRole'
import type { AdminRole } from '@/types/database'

interface AdminLayoutClientProps {
  role: AdminRole
  children: React.ReactNode
}

export function AdminLayoutClient({ role, children }: AdminLayoutClientProps) {
  const contextValue = createRoleContextValue(role)
  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  )
}
