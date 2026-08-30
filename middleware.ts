import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Enterprise Middleware Gatekeeper
 * Handles authentication, RBAC, and route protection with zero-crash tolerance.
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // Canonical domain enforcement: redirect to SITE_CONFIG.url if host differs
    try {
      const { SITE_CONFIG } = await import('@/lib/config');
      const canonicalUrl = new URL(SITE_CONFIG.url);
      const canonical = canonicalUrl.hostname;
      const requestHost = request.nextUrl.hostname;

      // Skip canonical redirect for local development or when request is already localhost
      const isLocal = requestHost === 'localhost' || requestHost === '127.0.0.1' || requestHost === '::1';
      const isProd = process.env.NODE_ENV === 'production';

      if (requestHost && canonical && requestHost !== canonical) {
        if (!isProd || isLocal) {
          // In development, do not redirect to production canonical host
          // This prevents localhost from being redirected to the production domain during dev.
        } else {
          // Clean redirection using SITE_CONFIG.url base to prevent leaking internal port (e.g. :3000)
          const dest = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_CONFIG.url);
          return NextResponse.redirect(dest, 301);
        }
      }
    } catch (e) {
      // Non-fatal: if config import fails, continue without canonical redirect
      console.warn('Middleware: could not enforce canonical domain', e);
    }
    // 0. Safety Net: Force-intercept any auth codes on the home page
    const code = request.nextUrl.searchParams.get('code');
    const type = request.nextUrl.searchParams.get('type');
    
    if (code && (pathname === '/' || pathname === '')) {
      console.log('Middleware: Intercepted auth code, redirecting to callback...');
      const { SITE_CONFIG } = await import('@/lib/config');
      const callbackUrl = new URL('/auth/callback', SITE_CONFIG.url);
      callbackUrl.searchParams.set('code', code);
      if (type) callbackUrl.searchParams.set('type', type);
      // Ensure we preserve the "next" destination if it exists
      const next = request.nextUrl.searchParams.get('next');
      if (next) callbackUrl.searchParams.set('next', next);
      else if (type === 'recovery' || pathname.includes('reset')) {
        callbackUrl.searchParams.set('next', '/reset-password');
      }
      
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
      const role = (user.app_metadata?.role || user.user_metadata?.role || '').toLowerCase();
      const userEmail = user.email?.toLowerCase() || '';
      
      const hasAdminEmail = userEmail === 'chdevelopers09@gmail.com' || 
                       userEmail === 'mudassarkhalil@gmail.com' ||
                       userEmail === 'imranalikhan774@gmail.com' ||
                       userEmail === 'emidev7@gmail.com' ||
                       userEmail === 'bupexsausa25@gmail.com' ||
                       userEmail.endsWith('@rubilian.com') || 
                       userEmail.includes('usman') ||
                       userEmail.includes('aims');

      const isAdmin = hasAdminEmail || ['admin', 'superadmin', 'super_admin', 'web_manager', 'portal_manager'].includes(role);

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

      // Role check: Ensure user is NOT an admin
      const role = (user.app_metadata?.role || user.user_metadata?.role || '').toLowerCase();
      const userEmail = user.email?.toLowerCase() || '';
      
      const hasAdminEmail = userEmail === 'chdevelopers09@gmail.com' || 
                       userEmail === 'mudassarkhalil@gmail.com' ||
                       userEmail === 'imranalikhan774@gmail.com' ||
                       userEmail === 'emidev7@gmail.com' ||
                       userEmail === 'bupexsausa25@gmail.com' ||
                       userEmail.endsWith('@rubilian.com') || 
                       userEmail.includes('usman') ||
                       userEmail.includes('aims');

      const isAdmin = hasAdminEmail || ['admin', 'superadmin', 'super_admin', 'web_manager', 'portal_manager'].includes(role);

      if (isAdmin) {
        // Admins should not access member dashboard, redirect to admin portal
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
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
