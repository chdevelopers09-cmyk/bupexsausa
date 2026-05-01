'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function updateSystemSettings(settings: Record<string, any>) {
  const supabase = await createAdminClient()

  try {
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }))

    const { error } = await supabase
      .from('site_settings')
      .upsert(updates, { onConflict: 'key' })

    if (error) throw error

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error: any) {
    console.error('Settings Update Error:', error)
    return { error: error.message }
  }
}
