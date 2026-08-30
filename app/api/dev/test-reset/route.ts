import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  // Protect this endpoint: only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
  }

  try {
    const bodyText = await req.text()
    console.log('[dev test-reset] raw body:', bodyText)
    let body: any = {}
    if (bodyText) {
      try {
        body = JSON.parse(bodyText)
      } catch (err) {
        console.warn('[dev test-reset] JSON.parse failed, attempting relaxed parse')
        // Normalize loose object literal like {email:emidev7@gmail.com} -> {"email":"emidev7@gmail.com"}
        let normalized = bodyText
          .replace(/([{,]\s*)([^"\s:}]+)\s*:/g, '$1"$2":')
          .replace(/:\s*([^,\}\]\s][^,\}]*)/g, ':"$1"')
        console.log('[dev test-reset] normalized body:', normalized)
        body = JSON.parse(normalized)
      }
    }
    const email = body?.email
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Use the admin client to trigger a password reset email via Supabase
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/reset-password`
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
