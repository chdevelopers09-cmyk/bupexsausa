/**
 * Enterprise Configuration System
 * Centralized, type-safe, and resilient to environment variations.
 */

export const IS_SERVER = typeof window === 'undefined';

export const SITE_CONFIG = {
  name: 'BUPEXSA USA',
  tagline: 'Connecting PCSS Buea Alumni Across America',
  description: 'The official alumni association of Presbyterian Comprehensive Secondary School Buea in the United States.',
  
  // Safe URL detection
  get url() {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl) {
      return envUrl.startsWith('http') ? envUrl : `https://${envUrl}`;
    }
    // Fallback for Vercel preview deployments
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return 'https://www.bupexsausa.org';
  },

  // Backward Compatibility Fields (needed by Footer/Contact forms)
  email: 'bupexsausa25@gmail.com',
  phone: '+1 (404) 555-0123',
  address: 'P.O. Box 12345, Atlanta, GA 30301',
  socialLinks: {
    facebook: 'https://facebook.com/bupexsausa',
    twitter: 'https://twitter.com/bupexsausa',
    instagram: 'https://instagram.com/bupexsausa',
    youtube: 'https://youtube.com/@bupexsausa',
  },

  // Auth Constants
  auth: {
    loginPath: '/login',
    adminLoginPath: '/admin/login',
    callbackPath: '/auth/callback',
    defaultRedirect: '/dashboard',
    adminRedirect: '/admin',
  },

  // Contact (Structured)
  contact: {
    email: 'bupexsausa25@gmail.com',
    phone: '+1 (404) 555-0123',
    address: 'P.O. Box 12345, Atlanta, GA 30301',
  },

  // Financials
  fees: {
    membership: 150,
    annual: 100,
    registration: 50,
  }
};

export const getAbsoluteUrl = (path: string) => {
  const base = SITE_CONFIG.url.endsWith('/') ? SITE_CONFIG.url.slice(0, -1) : SITE_CONFIG.url;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
