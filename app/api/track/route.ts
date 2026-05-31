import { NextRequest, NextResponse } from 'next/server'
import { logActivity } from '@/lib/supabase/queries'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  const to = searchParams.get('to')

  if (!key || !to) {
    return NextResponse.json({ error: 'Missing key or to parameter' }, { status: 400 })
  }

  // Validate destination URL to prevent open redirect abuse
  let destination: URL
  try {
    destination = new URL(to)
  } catch {
    return NextResponse.json({ error: 'Invalid destination URL' }, { status: 400 })
  }

  // Only allow http/https redirects
  if (!['http:', 'https:'].includes(destination.protocol)) {
    return NextResponse.json({ error: 'Invalid protocol' }, { status: 400 })
  }

  // Log the click (fire-and-forget — don't block the redirect)
  logActivity({
    clerk_user_id: 'visitor',
    email: null,
    action: 'Click',
    resource: 'affiliate_link',
    resource_id: key,
    details: {
      destination: destination.hostname,
      referrer: req.headers.get('referer') ?? null,
      userAgent: req.headers.get('user-agent') ?? null,
    },
  }).catch(() => {
    // Silently ignore logging errors — never block the redirect
  })

  return NextResponse.redirect(destination.toString(), { status: 302 })
}
