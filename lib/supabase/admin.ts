import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    // In production we must fail loudly; during local development return a safe fallback
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing Supabase Admin Environment Variables')
    }

    console.warn('Supabase admin environment variables are missing — returning fallback client for development')
    return createSupabaseClient(
      supabaseUrl || 'http://localhost:54321',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'missing',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }

  return createSupabaseClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
