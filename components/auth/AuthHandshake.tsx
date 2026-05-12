'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * AuthHandshake Component
 * A silent client-side safety net that detects auth codes in the URL 
 * and routes them to the callback if the middleware was bypassed.
 */
export default function AuthHandshake() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    
    // If we have a code on the home page, it means middleware failed to intercept.
    // We manually push to the callback to establish the session.
    if (code && (pathname === '/' || pathname === '')) {
      const type = url.searchParams.get('type');
      const next = url.searchParams.get('next');
      
      let target = `/auth/callback?code=${code}`;
      if (type) target += `&type=${type}`;
      if (next) target += `&next=${next}`;
      else if (type === 'recovery') target += `&next=/reset-password`;

      console.log('AuthHandshake: Client-side detection triggered, redirecting...');
      router.replace(target);
    }
  }, [pathname, router]);

  return null;
}
