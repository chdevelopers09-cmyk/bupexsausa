import { createClient } from '@/lib/supabase/server';
import ClientAdminLayout from './components/ClientAdminLayout';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Check if user is an admin in the database
  const { data: profile } = await supabase
    .from('members')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  const isSuperAdmin = user.email === 'chdevelopers09@gmail.com' || 
                       user.email?.endsWith('@rubilian.com') || 
                       profile?.role === 'SUPERADMIN' ||
                       (user.app_metadata as any)?.role === 'superadmin';
  
  const isAdmin = isSuperAdmin || 
                  profile?.role === 'ADMIN' || 
                  (user.app_metadata as any)?.role === 'admin';

  if (!isAdmin) {
    console.log(`Non-admin access attempt to /admin by ${user.email}. Role: ${profile?.role}. Metadata Role: ${(user.app_metadata as any)?.role}`);
    redirect('/dashboard');
  }

  return (
    <ClientAdminLayout isSuperAdmin={isSuperAdmin}>
      {children}
    </ClientAdminLayout>
  );
}
