'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createAdminUser(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // Fetch profile to check role
    const { data: profile } = await supabase
      .from('members')
      .select('role')
      .eq('id', currentUser?.id)
      .single();

    // STRICT SECURITY: Only specific super admins can manage other admins
    const isSuperAdmin = currentUser?.email === 'chdevelopers09@gmail.com' || 
                         currentUser?.email === 'mudassarkhalil@gmail.com' ||
                         currentUser?.email === 'imranalikhan774@gmail.com' ||
                         currentUser?.email === 'emidev7@gmail.com' ||
                         currentUser?.email?.endsWith('@rubilian.com') || 
                         currentUser?.email?.toLowerCase().includes('usman') ||
                         currentUser?.email?.toLowerCase().includes('aims') ||
                         profile?.role === 'SUPERADMIN' ||
                         (currentUser?.app_metadata as any)?.role === 'superadmin';
    
    if (!isSuperAdmin) {
      return { error: 'Unauthorized. Only Super Admin can manage users.' };
    }

    const full_name = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
    const role = formData.get('role') as string;

    if (!email || !password || !full_name) {
      return { error: 'Name, email, and password are required.' };
    }

    const adminClient = await createAdminClient();

    // 1. Create the Auth User
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role },
      user_metadata: { full_name, username, status: 'ACTIVE' }
    });

    if (authError) throw authError;

    revalidatePath('/admin/users');
    return { success: true, user: authData.user };
  } catch (error: any) {
    console.error('User Creation Error:', error);
    return { error: error.message || 'Failed to create user.' };
  }
}

export async function updateAdminUser(userId: string, updates: { full_name: string; username: string; role: string; status: string; password?: string }) {
  try {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // Fetch profile to check role
    const { data: profile } = await supabase
      .from('members')
      .select('role')
      .eq('id', currentUser?.id)
      .single();

    // STRICT SECURITY
    const isSuperAdmin = currentUser?.email === 'chdevelopers09@gmail.com' || 
                         currentUser?.email === 'mudassarkhalil@gmail.com' ||
                         currentUser?.email?.endsWith('@rubilian.com') || 
                         currentUser?.email?.toLowerCase().includes('usman') ||
                         currentUser?.email?.toLowerCase().includes('aims') ||
                         profile?.role === 'SUPERADMIN' ||
                         (currentUser?.app_metadata as any)?.role === 'superadmin';
    
    if (!isSuperAdmin) {
      return { error: 'Unauthorized. Only Super Admin can manage users.' };
    }

    const adminClient = await createAdminClient();

    const authUpdates: any = {
      app_metadata: { role: updates.role },
      user_metadata: { full_name: updates.full_name, username: updates.username, status: updates.status }
    };

    if (updates.password && updates.password.trim().length >= 8) {
      authUpdates.password = updates.password;
    }

    // Update in Auth metadata
    const { error: authError } = await adminClient.auth.admin.updateUserById(userId, authUpdates);

    if (authError) throw authError;

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('User Update Error:', error);
    return { error: error.message || 'Failed to update user.' };
  }
}

export async function deleteAdminUser(userId: string) {
  try {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // Fetch profile to check role
    const { data: profile } = await supabase
      .from('members')
      .select('role')
      .eq('id', currentUser?.id)
      .single();

    const isSuperAdmin = currentUser?.email === 'chdevelopers09@gmail.com' || 
                         currentUser?.email === 'mudassarkhalil@gmail.com' ||
                         currentUser?.email?.endsWith('@rubilian.com') || 
                         currentUser?.email?.toLowerCase().includes('usman') ||
                         currentUser?.email?.toLowerCase().includes('aims') ||
                         profile?.role === 'SUPERADMIN' ||
                         (currentUser?.app_metadata as any)?.role === 'superadmin';
    
    if (!isSuperAdmin) {
      return { error: 'Unauthorized.' };
    }
    
    // Prevent self-deletion
    if (currentUser?.id === userId) {
      return { error: 'You cannot delete your own super admin account.' };
    }

    const adminClient = await createAdminClient();

    // Prevent deleting any main super admin account
    const { data: targetUser } = await adminClient.auth.admin.getUserById(userId);
    const targetEmail = targetUser?.user?.email || '';
    const isTargetSuper = targetEmail === 'chdevelopers09@gmail.com' || 
                          targetEmail === 'mudassarkhalil@gmail.com' ||
                          targetEmail === 'imranalikhan774@gmail.com' ||
                          targetEmail === 'emidev7@gmail.com' ||
                          targetEmail.endsWith('@rubilian.com') ||
                          targetEmail.toLowerCase().includes('usman') ||
                          targetEmail.toLowerCase().includes('aims');

    if (isTargetSuper) {
      return { error: 'Cannot delete a System-Protected Super Admin account.' };
    }

    const { error } = await adminClient.auth.admin.deleteUser(userId);
    if (error) throw error;

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('User Deletion Error:', error);
    return { error: error.message || 'Failed to delete user.' };
  }
}
