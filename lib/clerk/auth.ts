import { auth, currentUser } from '@clerk/nextjs/server'
import { getAdminRole } from '@/lib/supabase/queries'
import type { AdminRole } from '@/types/database'
import { hasPermission, type Permission } from '@/config/roles'

export async function getCurrentAdminRole(): Promise<AdminRole | null> {
  const { userId } = await auth()
  if (!userId) return null
  const record = await getAdminRole(userId)
  return record?.role ?? null
}

export async function requireAdminAuth() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  const role = await getCurrentAdminRole()
  if (!role) {
    throw new Error('No admin role assigned')
  }
  return { userId, role }
}

export async function requirePermission(permission: Permission) {
  const { userId, role } = await requireAdminAuth()
  if (!hasPermission(role, permission)) {
    throw new Error(`Insufficient permissions: ${permission} required`)
  }
  return { userId, role }
}

export async function getCurrentUserWithRole() {
  const { userId } = await auth()
  if (!userId) return null
  const [user, roleRecord] = await Promise.all([
    currentUser(),
    getAdminRole(userId),
  ])
  if (!user || !roleRecord) return null
  return {
    id: userId,
    email: user.emailAddresses[0]?.emailAddress ?? '',
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    role: roleRecord.role,
  }
}
