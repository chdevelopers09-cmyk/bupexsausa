'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Mocking Resend for now, but ready for integration
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBulkNotification(formData: FormData) {
  const supabase = await createAdminClient()
  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const type = formData.get('type') as string // 'GENERAL', 'ANNOUNCEMENT', 'URGENT'
  const target = formData.get('target') as string // 'ALL', 'ACTIVE', 'PENDING'

  if (!title || !body) return { error: 'Title and body are required' }

  // 1. Get target members
  let query = supabase.from('members').select('id, email, full_name')
  
  if (target === 'ACTIVE') query = query.eq('status', 'ACTIVE')
  if (target === 'PENDING') query = query.eq('status', 'PENDING')

  const { data: members, error: fetchError } = await query

  if (fetchError) return { error: fetchError.message }
  if (!members || members.length === 0) return { error: 'No members found for this target' }

  // 2. Create in-app notifications
  const notificationInserts = members.map(m => ({
    member_id: m.id,
    type,
    title,
    body,
  }))

  const { error: notifyError } = await supabase.from('notifications').insert(notificationInserts)
  if (notifyError) return { error: notifyError.message }

  // 3. Send emails (Optional/Deferred for performance in bulk)
  // In a real prod environment, we would use a queue or batching service
  console.log(`BUPEXSA: Sending bulk email to ${members.length} members: ${title}`)

  revalidatePath('/admin/notifications')
  return { success: true, count: members.length }
}
