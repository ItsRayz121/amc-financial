import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getAdminRole, logActivity } from '@/lib/supabase/queries'
import { hasPermission } from '@/config/roles'
import { revalidatePublicPages } from '@/utils/revalidate'

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canForceRevalidate')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await revalidatePublicPages()

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Force revalidated',
    resource: 'cache',
    resource_id: null,
    details: null,
  })

  return NextResponse.json({ success: true, revalidated: true })
}
