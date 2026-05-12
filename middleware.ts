import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Enterprise Middleware Gatekeeper
 * Handles authentication, RBAC, and route protection with zero-crash tolerance.
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // 0. Safety Net: If user lands on home with a "code" (Supabase recovery/signup), 
    // redirect to callback manually to ensure session is established.
    const code = request.nextUrl.searchParams.get('code');
    if (code && pathname === '/') {
      const callbackUrl = request.nextUrl.clone();
      callbackUrl.pathname = '/auth/callback';
      // Keep existing search params (code, next, etc)
      return NextResponse.redirect(callbackUrl);
    }

    // 1. Update session and get supabase client
    const { response, supabase } = await updateSession(request);

    // 2. If Supabase failed to initialize, allow public access but warn
    if (!supabase) {
      console.warn('Middleware: Supabase configuration missing.');
      return response;
    }

    // 3. Get user session
    const { data: { user } } = await supabase.auth.getUser();

    // 4. Protection Logic: Admin Routes
    if (pathname.startsWith('/admin')) {
      // Allow access to login page
      if (pathname === '/admin/login') return response;

      // Protected Admin Routes
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }

      // Role check: Ensure user is admin
      const role = user.app_metadata?.role || user.user_metadata?.role;
      const isAdmin = ['admin', 'super_admin', 'web_manager', 'portal_manager'].includes(role);

      if (!isAdmin) {
        // Redirect unauthorized staff to a "Not Allowed" or back to home
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // 5. Protection Logic: Member Dashboard
    if (pathname.startsWith('/dashboard')) {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('next', pathname);
        return NextResponse.redirect(url);
      }
    }

    return response;
  } catch (error) {
    // Professional Error Recovery: Never let middleware take down the site
    console.error('CRITICAL MIDDLEWARE ERROR:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
