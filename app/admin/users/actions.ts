'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createAdminUser(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // STRICT SECURITY: Only the specific super admin can create new admins
    const isSuperAdmin = currentUser?.email === 'chdevelopers09@gmail.com' || currentUser?.email?.endsWith('@rubilian.com');
    
    if (!isSuperAdmin) {
      return { error: 'Unauthorized. Only Super Admin can manage users.' };
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: 'Email and password are required.' };
    }

    const adminClient = await createAdminClient();

    // Create the user with admin role in app_metadata
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { full_name: 'Administrator' }
    });

    if (error) throw error;

    revalidatePath('/admin/users');
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error('User Creation Error:', error);
    return { error: error.message || 'Failed to create user.' };
  }
}
