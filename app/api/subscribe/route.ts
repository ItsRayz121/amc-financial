import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { saveSubscriber } from '@/lib/supabase/queries'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().nullable().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
  }

  try {
    await saveSubscriber({
      email: result.data.email,
      phone: result.data.phone ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: 'Thank you for subscribing!' })
}
