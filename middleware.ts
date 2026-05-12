import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  const { response, supabase } = await updateSession(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const hostname = request.nextUrl.hostname;
  const isDev = process.env.NODE_ENV === 'development' || 
                hostname === 'localhost' || 
                hostname === '127.0.0.1' || 
                hostname.startsWith('192.168.') || 
                hostname.startsWith('10.') || 
                hostname.startsWith('172.');

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    console.log(`[PROXY] Path: ${request.nextUrl.pathname} | Host: ${hostname} | User: ${user?.email} | IsDev: ${isDev}`);
    
    // DEVELOPMENT BYPASS: Allow all local/dev access
    if (isDev) {
      return response;
    }

    if (!user) {
      const loginPath = request.nextUrl.pathname.startsWith('/admin') ? '/admin/login' : '/login';
      const url = new URL(loginPath, request.url)
      url.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
    
    const isAdmin = user.app_metadata?.role === 'admin' || 
                    user.app_metadata?.role === 'superadmin' ||
                    user.email === 'chdevelopers09@gmail.com' ||
                    user.email === 'mudassarkhalil@gmail.com' ||
                    user.email === 'imranalikhan774@gmail.com' ||
                    user.email === 'emidev7@gmail.com' ||
                    user.email?.endsWith('@rubilian.com') ||
                    user.email?.includes('usman') ||
                    user.email?.includes('aims');
    
    if (!isAdmin) {
       return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

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
