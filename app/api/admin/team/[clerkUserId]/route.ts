import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getAdminRole, upsertAdminRole, deleteAdminRole, logActivity } from '@/lib/supabase/queries'
import { hasPermission } from '@/config/roles'
import type { AdminRole } from '@/types/database'

const patchSchema = z.object({
  role: z.enum(['super_admin', 'editor', 'viewer']),
})

export async function PATCH(req: NextRequest, { params }: { params: { clerkUserId: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canManageTeam')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const result = patchSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const target = await getAdminRole(params.clerkUserId)
  if (!target) return NextResponse.json({ error: 'Admin not found' }, { status: 404 })

  await upsertAdminRole({ ...target, role: result.data.role as AdminRole })

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Changed role',
    resource: 'admin_roles',
    resource_id: params.clerkUserId,
    details: { newRole: result.data.role, targetEmail: target.email },
  })

  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { clerkUserId: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canManageTeam')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (params.clerkUserId === userId) {
    return NextResponse.json({ error: 'Cannot remove your own access' }, { status: 400 })
  }

  const target = await getAdminRole(params.clerkUserId)
  await deleteAdminRole(params.clerkUserId)

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Removed',
    resource: 'admin_roles',
    resource_id: params.clerkUserId,
    details: { targetEmail: target?.email },
  })

  return NextResponse.json({ success: true })
}
