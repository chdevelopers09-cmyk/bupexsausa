'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function approveMember(memberId: string) {
  const supabase = await createClient();

  // 1. Fetch member details
  const { data: member, error: fetchError } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .single();

  if (fetchError || !member) {
    return { error: 'Member not found' };
  }

  if (member.status === 'ACTIVE') {
    return { error: 'Member is already active' };
  }

  // 2. Generate Membership ID: BX-YYYY-XXXX
  // We'll count current active members for that year or just overall
  const { count, error: countError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .not('membership_id', 'is', null);

  if (countError) {
    return { error: 'Failed to generate membership ID' };
  }

  const nextSerial = (count || 0) + 1;
  const paddedSerial = String(nextSerial).padStart(4, '0');
  const membershipId = `BX-${member.graduation_year}-${paddedSerial}`;

  // 3. Calculate Expiry (1 year from today)
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  // 4. Update Member
  const { error: updateError } = await supabase
    .from('members')
    .update({
      status: 'ACTIVE',
      membership_id: membershipId,
      join_date: new Date().toISOString(),
      expiry_date: expiryDate.toISOString(),
    })
    .eq('id', memberId);

  if (updateError) {
    return { error: updateError.message };
  }

  // 5. In production: Send email via Resend
  // try {
  //   await sendApprovalEmail(member.email, member.full_name, membershipId);
  // } catch (e) {
  //   console.error('Email failed:', e);
  // }

  revalidatePath('/admin/members');
  revalidatePath(`/admin/members/${memberId}`);
  
  return { success: true, membershipId };
}

export async function rejectMember(memberId: string, reason?: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('members')
    .update({ status: 'REJECTED' })
    .eq('id', memberId);

  if (error) return { error: error.message };

  revalidatePath('/admin/members');
  revalidatePath(`/admin/members/${memberId}`);
  
  return { success: true };
}
