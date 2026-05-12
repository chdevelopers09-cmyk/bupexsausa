'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { approveMember } from '../members/actions';

export async function approvePayment(paymentId: string, memberId: string) {
  const supabase = await createAdminClient();

  // 1. Update Payment
  const { error: pError } = await supabase
    .from('payments')
    .update({ status: 'COMPLETED' })
    .eq('id', paymentId);

  if (pError) return { error: pError.message };

  // 2. Fetch current member to check status
  const { data: member } = await supabase
    .from('members')
    .select('status, membership_id')
    .eq('id', memberId)
    .single();

  if (member) {
    if (member.status === 'PENDING' || !member.membership_id) {
      // Use existing approveMember logic to handle ID generation and emails
      await approveMember(memberId);
    } else {
      // Existing active member - just update expiry (renewal)
      const { data: memberData } = await supabase
        .from('members')
        .select('expiry_date')
        .eq('id', memberId)
        .single();
        
      const newExpiry = new Date(memberData?.expiry_date || new Date());
      newExpiry.setFullYear(newExpiry.getFullYear() + 1);

      await supabase
        .from('members')
        .update({ 
          status: 'ACTIVE',
          expiry_date: newExpiry.toISOString()
        })
        .eq('id', memberId);
    }
  }

  // 3. Create Notification for the member
  await supabase.from('notifications').insert({
    member_id: memberId,
    type: 'PAYMENT',
    title: 'Payment Approved',
    body: `Your payment has been verified. Thank you for your support of BUPEXSA USA.`
  });

  revalidatePath('/admin/payments');
  revalidatePath(`/admin/members/${memberId}`);
  
  return { success: true };
}

export async function rejectPayment(paymentId: string) {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('payments')
    .update({ status: 'FAILED' })
    .eq('id', paymentId);

  if (error) return { error: error.message };

  revalidatePath('/admin/payments');
  
  return { success: true };
}
