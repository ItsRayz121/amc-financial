import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
  }

  // TODO: Integrate with Brevo (formerly Sendinblue) email service
  // const BREVO_API_KEY = process.env.BREVO_API_KEY
  // Add subscriber to list and trigger welcome sequence

  console.log('New subscriber:', result.data.email)

  return NextResponse.json({ success: true, message: 'Thank you! Check your email for your free Starter Kit.' })
}
