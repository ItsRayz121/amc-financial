'use client'

import { createContext, useContext } from 'react'
import type { AdminRole } from '@/types/database'
import { hasPermission, type Permission } from '@/config/roles'

interface RoleContextValue {
  role: AdminRole | null
  can: (permission: Permission) => boolean
}

export const RoleContext = createContext<RoleContextValue>({
  role: null,
  can: () => false,
})

export function useRole() {
  return useContext(RoleContext)
}

export function createRoleContextValue(role: AdminRole | null): RoleContextValue {
  return {
    role,
    can: (permission: Permission) => (role ? hasPermission(role, permission) : false),
  }
}
