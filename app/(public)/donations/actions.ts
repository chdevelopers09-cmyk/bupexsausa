'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function trackDonation(data: {
  amount: number;
  email: string;
  name: string;
  method: string;
  message?: string;
  anonymous: boolean;
}) {
  const supabase = await createAdminClient();

  // 1. Create or find member (anonymous donations might not have a member record yet)
  // For simplicity, we just record the payment with the name/email in metadata if not logged in
  
  const { data: member } = await supabase
    .from('members')
    .select('id')
    .eq('email', data.email)
    .single();

  const { error } = await supabase
    .from('payments')
    .insert({
      member_id: member?.id || null, // Link if exists
      amount: data.amount,
      type: 'DONATION',
      method: data.method.toUpperCase(),
      status: (data.method === 'zelle' || data.method === 'cashapp') ? 'PENDING_VERIFICATION' : 'COMPLETED',
      admin_note: `${data.anonymous ? 'Anonymous Donation' : `Donation from ${data.name}`}${data.message ? ` - ${data.message}` : ''}`,
    });

  if (member?.id) {
    await supabase.from('notifications').insert({
      member_id: member.id,
      type: 'PAYMENT',
      title: 'Donation Received',
      body: `Thank you for your donation of $${data.amount}! ${data.method === 'zelle' || data.method === 'cashapp' ? 'We will verify your manual payment shortly.' : 'Your contribution has been recorded.'}`
    });
  }

  // Send transactional email to donor if configured
  try {
    const { sendEmail } = await import('@/lib/mailer');
    await sendEmail({
      to: data.email,
      subject: 'Thank you for your donation to BUPEXSA USA',
      text: `Dear ${data.name || 'Friend'},\n\nThank you for your generous donation of $${data.amount}. We appreciate your support.`
    });
  } catch (e) {
    console.warn('Donation email failed (non-fatal)', e);
  }

  if (error) {
    console.error('Failed to track donation:', error);
    return { error: 'Failed to record donation. Please contact support.' };
  }

  revalidatePath('/admin/payments');
  revalidatePath('/admin');
  
  return { success: true };
}
