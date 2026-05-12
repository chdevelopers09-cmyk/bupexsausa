import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    const { response } = await updateSession(request)
    return response
  } catch (e) {
    console.error('Middleware Error:', e)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/admin/gallery/upload|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
