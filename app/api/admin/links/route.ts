import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getAdminRole, logActivity } from '@/lib/supabase/queries'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { hasPermission } from '@/config/roles'
import { checkRateLimit } from '@/lib/rateLimit'
import type { SiteLink } from '@/types/database'

const createSchema = z.object({
  label: z.string().min(1).max(100),
  url: z.string().min(1),
  description: z.string().max(300).optional(),
  category: z.enum(['community', 'course', 'affiliate', 'support']),
  sort_order: z.coerce.number().min(0).max(999).default(0),
  is_active: z.boolean().default(true),
  icon: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!checkRateLimit(userId, 30)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canEditLinks')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const result = createSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
  }

  const client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const key = result.data.label.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now()

  const { data, error } = await client
    .from('site_links')
    .insert({ ...result.data, key } as Record<string, unknown>)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Created',
    resource: 'site_links',
    resource_id: (data as SiteLink).id,
    details: { label: result.data.label, category: result.data.category },
  })

  const { revalidatePublicPages } = await import('@/utils/revalidate')
  await revalidatePublicPages()

  return NextResponse.json(data, { status: 201 })
}
