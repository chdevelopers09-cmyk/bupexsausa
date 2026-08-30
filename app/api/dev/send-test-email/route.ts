import { NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/auth/email'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') return NextResponse.json({ error: 'Not allowed' }, { status: 403 })

  const url = new URL(req.url)
  const email = url.searchParams.get('email') || 'test@example.com'

  const html = `<p>Test sign-in link for ${email}: <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?test=1">Click</a></p>`
  try {
    const res: any = await sendVerificationEmail({ to: email, html, subject: 'Test verification' })
    return NextResponse.json({ ok: true, preview: res.previewUrl || null })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
