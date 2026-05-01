import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UserManagementClient from './UserManagementClient';

export default async function UserManagementPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect if not super admin
  const isSuperAdmin = user?.email === 'chdevelopers09@gmail.com' || user?.email?.endsWith('@rubilian.com');
  
  if (!isSuperAdmin) {
    redirect('/admin');
  }

  return <UserManagementClient />;
}
