import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/session'
export async function proxy(request: NextRequest) {
  const { response } = await updateSession(request)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/admin/gallery/upload|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
