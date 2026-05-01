'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function approveMember(memberId: string) {
  const supabase = await createAdminClient();

  // 1. Fetch member details
  const { data: member, error: fetchError } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .single();

  if (fetchError || !member) {
    return { error: 'Member not found' };
  }

  // 2. Generate Membership ID: BX-YYYY-XXXX
  const { count, error: countError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .not('membership_id', 'is', null);

  if (countError) {
    return { error: 'Failed to generate membership ID' };
  }

  const nextSerial = (count || 0) + 1;
  const paddedSerial = String(nextSerial).padStart(4, '0');
  const membershipId = `BX-${member.graduation_year || new Date().getFullYear()}-${paddedSerial}`;

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

  revalidatePath('/admin/members');
  revalidatePath(`/admin/members/${memberId}`);
  
  return { success: true, membershipId };
}

export async function rejectMember(memberId: string) {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('members')
    .update({ status: 'REJECTED' })
    .eq('id', memberId);

  if (error) return { error: error.message };

  revalidatePath('/admin/members');
  revalidatePath(`/admin/members/${memberId}`);
  
  return { success: true };
}

export async function deleteMember(memberId: string) {
  const supabase = await createAdminClient();
  
  // Also delete from Auth if possible, but for now we delete the member record
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', memberId);

  if (error) return { error: error.message };

  revalidatePath('/admin/members');
  return { success: true };
}

export async function regenerateMembershipId(memberId: string) {
  const supabase = await createAdminClient();
  
  const { data: member } = await supabase.from('members').select('graduation_year').eq('id', memberId).single();
  
  const { count } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .not('membership_id', 'is', null);

  const nextSerial = (count || 0) + 1;
  const paddedSerial = String(nextSerial).padStart(4, '0');
  const membershipId = `BX-${member?.graduation_year || new Date().getFullYear()}-${paddedSerial}`;

  const { error } = await supabase
    .from('members')
    .update({ membership_id: membershipId })
    .eq('id', memberId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/members/${memberId}`);
  return { success: true, membershipId };
}

export async function sendPasswordReset(email: string) {
  const supabase = await createClient(); // Use server client for standard auth
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function updateMemberDetails(memberId: string, details: any) {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('members')
    .update(details)
    .eq('id', memberId);

  if (error) return { error: error.message };

  revalidatePath('/admin/members');
  revalidatePath(`/admin/members/${memberId}`);
  
  return { success: true };
}

