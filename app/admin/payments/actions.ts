'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function approvePayment(paymentId: string, memberId: string) {
  const supabase = await createAdminClient();

  // 1. Update Payment
  const { error: pError } = await supabase
    .from('payments')
    .update({ status: 'COMPLETED' })
    .eq('id', paymentId);

  if (pError) return { error: pError.message };

  // 2. Fetch current member to check expiry
  const { data: member } = await supabase
    .from('members')
    .select('expiry_date, status')
    .eq('id', memberId)
    .single();

  if (member) {
    // 3. Update Member Status and Expiry
    const newExpiry = new Date(member.expiry_date || new Date());
    newExpiry.setFullYear(newExpiry.getFullYear() + 1);

    const { error: mError } = await supabase
      .from('members')
      .update({ 
        status: 'ACTIVE',
        expiry_date: newExpiry.toISOString()
      })
      .eq('id', memberId);
      
    if (mError) return { error: mError.message };
  }

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
