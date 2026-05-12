import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { SITE_CONFIG } = await import('@/lib/mock-data');
      return NextResponse.redirect(new URL(next, SITE_CONFIG.url));
    }
  }

  const { SITE_CONFIG } = await import('@/lib/mock-data');
  return NextResponse.redirect(new URL('/login?error=auth-callback-failed', SITE_CONFIG.url));
}
