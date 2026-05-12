'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendWelcomeEmail } from '@/lib/resend';

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
  const stateCode = member.us_state?.substring(0, 2).toUpperCase() || 'XX';
  const membershipId = `BUPEXSA-${new Date().getFullYear()}-${stateCode}-${paddedSerial}`;

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

  // 5. Create Notification
  await supabase.from('notifications').insert({
    member_id: memberId,
    type: 'SUCCESS',
    title: 'Membership Activated!',
    body: `Welcome to BUPEXSA USA! Your Membership ID is ${membershipId}. You now have full access to the portal.`
  });

  // Send Welcome/Approval Email
  try {
    await sendWelcomeEmail({
      email: member.email,
      fullName: member.full_name,
      memberId: membershipId,
      graduationYear: member.graduation_year,
      batch: member.batch,
    });
  } catch (err) {
    console.error('Failed to send approval email:', err);
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
  
  // 1. Delete from Auth (this will also cascade to members table if FK is set, 
  // but we delete explicitly to be safe and handle cases where it doesn't)
  const { error: authError } = await supabase.auth.admin.deleteUser(memberId);
  
  // 2. Delete from members table (in case cascade isn't configured)
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', memberId);

  if (error && !authError) return { error: error.message };
  if (authError) return { error: authError.message };

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

export async function updatePaymentDetails(paymentId: string, details: any, memberId: string) {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('payments')
    .update(details)
    .eq('id', paymentId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/members/${memberId}`);
  revalidatePath('/admin/payments');
  
  return { success: true };
}

export async function createPaymentRecord(details: any) {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('payments')
    .insert(details);

  if (error) return { error: error.message };

  revalidatePath(`/admin/members/${details.member_id}`);
  revalidatePath('/admin/payments');
  
  return { success: true };
}

export async function createAdminMember(formData: FormData) {
  const supabase = await createAdminClient();
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const full_name = formData.get('full_name') as string;
  const password = formData.get('password') as string || 'Bupexsa2025!';
  const us_state = formData.get('us_state') as string;
  const graduation_year = formData.get('graduation_year') as string;
  const batch = formData.get('batch') as string;
  const phone = formData.get('phone') as string;
  const profession = formData.get('profession') as string;
  const how_did_you_hear = formData.get('how_did_you_hear') as string;
  const status = formData.get('status') as string || 'ACTIVE';
  
  const payment_method = formData.get('payment_method') as string;
  const payment_amount = formData.get('payment_amount') as string;
  const payment_status = formData.get('payment_status') as string;

  const member_id = `BUP-${Math.floor(100000 + Math.random() * 900000)}`;

  const { data: userData, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      username,
      full_name,
      graduation_year: graduation_year || null,
      us_state: us_state || 'Unknown',
      phone,
      batch,
      profession,
      how_did_you_hear,
      member_id: member_id,
      membership_status: status,
    }
  });

  if (error) return { error: error.message };

  if (payment_method && payment_amount) {
    await supabase.from('payments').insert({
      member_id: userData.user.id,
      type: 'MEMBERSHIP',
      amount: Number(payment_amount),
      method: payment_method.toUpperCase(),
      status: payment_status || 'COMPLETED',
    });
  }

  if (status === 'ACTIVE') {
    await approveMember(userData.user.id);
  }

  revalidatePath('/admin/members');
  return { success: true, memberId: userData.user.id };
}

export async function uploadAvatar(memberId: string, formData: FormData) {
  const supabase = await createAdminClient();
  const file = formData.get('avatar') as File;
  if (!file) return { error: 'No file provided' };

  const fileExt = file.name.split('.').pop();
  const filePath = `avatars/${memberId}-${Date.now()}.${fileExt}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) return { error: uploadError.message };

  // Get public URL
  const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
  
  // Update member record
  const { error: updateError } = await supabase
    .from('members')
    .update({ avatar_path: publicUrlData.publicUrl })
    .eq('id', memberId);

  if (updateError) return { error: updateError.message };

  revalidatePath('/admin/members');
  revalidatePath(`/admin/members/${memberId}`);
  return { success: true, avatarUrl: publicUrlData.publicUrl };
}