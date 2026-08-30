import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('@supabase/ssr: Your project\'s URL and API key are required to create a Supabase client!')
    }
    console.warn('Supabase public env vars missing — returning a minimal stub browser client for development')
    // Return a minimal stub that does not perform network requests so pages
    // like forgot-password can render and handle dev flows without throwing
    // or generating failed network requests.
    const stub: any = {
      __isDevStub: true,
      auth: {
        async resetPasswordForEmail(email: string, options?: any) {
          console.warn('[supabase dev stub] resetPasswordForEmail called for', email)
          // Mimic a successful Supabase response so the UI behaves normally in dev.
          return { data: { email }, error: null }
        },
        async signInWithPassword() {
          console.warn('[supabase dev stub] signInWithPassword called')
          return { data: { user: null }, error: { message: 'Supabase not configured (dev stub)' } }
        },
        user: null,
      },
    }
    client = stub
    return client
  }

  client = createBrowserClient(url, anon)
  return client
}
