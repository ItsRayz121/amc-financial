import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { updateContent, getAdminRole, logActivity } from '@/lib/supabase/queries'
import { hasPermission } from '@/config/roles'

const patchSchema = z.object({ value: z.string().max(2000) })

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canEditContent')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const result = patchSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
  }

  const updated = await updateContent(params.id, result.data.value)

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Updated',
    resource: 'site_content',
    resource_id: params.id,
    details: { value: result.data.value.substring(0, 100) },
  })

  const { revalidatePublicPages } = await import('@/utils/revalidate')
  await revalidatePublicPages()

  return NextResponse.json(updated)
}
