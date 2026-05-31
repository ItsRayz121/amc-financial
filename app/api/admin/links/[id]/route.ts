import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { updateLink, getAdminRole, logActivity } from '@/lib/supabase/queries'
import { hasPermission } from '@/config/roles'

const patchSchema = z.object({
  label: z.string().min(1).max(100).optional(),
  url: z.string().optional(),
  description: z.string().max(300).optional(),
  sort_order: z.number().min(0).max(999).optional(),
  is_active: z.boolean().optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canEditLinks')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const result = patchSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
  }

  const updated = await updateLink(params.id, result.data)

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Updated',
    resource: 'site_links',
    resource_id: params.id,
    details: result.data,
  })

  // Trigger cache revalidation
  const { revalidatePublicPages } = await import('@/utils/revalidate')
  await revalidatePublicPages()

  return NextResponse.json(updated)
}
