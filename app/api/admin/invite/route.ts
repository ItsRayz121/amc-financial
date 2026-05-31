import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getAdminRole, upsertAdminRole, logActivity } from '@/lib/supabase/queries'
import { hasPermission } from '@/config/roles'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminRecord = await getAdminRole(userId)
  if (!adminRecord || !hasPermission(adminRecord.role, 'canManageTeam')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const { email } = result.data

  // Send invitation via Clerk Backend API
  const clerkRes = await fetch('https://api.clerk.com/v1/invitations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email, redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard` }),
  })

  if (!clerkRes.ok) {
    const err = await clerkRes.json()
    return NextResponse.json(
      { error: err.errors?.[0]?.message ?? 'Failed to send invitation' },
      { status: 400 }
    )
  }

  // Pre-create admin_roles row — will be updated with clerk_user_id when they sign up
  // Store as pending email — clerk_user_id will be filled on first login via webhook or manual
  // For now we store with a placeholder clerk_user_id that includes the email
  await upsertAdminRole({
    clerk_user_id: `pending_${email}`,
    email,
    role: 'editor',
  })

  await logActivity({
    clerk_user_id: userId,
    email: adminRecord.email,
    action: 'Invited',
    resource: 'admin_roles',
    resource_id: email,
    details: { invitee: email },
  })

  return NextResponse.json({ success: true, email })
}
