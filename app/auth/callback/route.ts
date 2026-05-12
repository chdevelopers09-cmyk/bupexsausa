import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { SITE_CONFIG } = await import('@/lib/config');
      
      // Intelligent Redirection
      let redirectPath = next || '/dashboard';
      if (type === 'recovery' || (next === '/reset-password')) {
        redirectPath = '/reset-password';
      }
      
      return NextResponse.redirect(new URL(redirectPath, SITE_CONFIG.url));
    }
  }

  const { SITE_CONFIG } = await import('@/lib/config');
  return NextResponse.redirect(new URL('/login?error=auth-callback-failed', SITE_CONFIG.url));
}
