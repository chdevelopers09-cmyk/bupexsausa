import { createClient } from '@/lib/supabase/server';
import ClientAdminLayout from '../components/ClientAdminLayout';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/admin/login');
  }

  // Check if user is an admin in the database
  const { data: profile } = await supabase
    .from('members')
    .select('*')
    .eq('id', user.id)
    .single();

  const isSuperAdmin = user.email === 'chdevelopers09@gmail.com' || 
                       user.email === 'mudassarkhalil@gmail.com' ||
                       user.email === 'imranalikhan774@gmail.com' ||
                       user.email === 'emidev7@gmail.com' ||
                       user.email?.endsWith('@rubilian.com') || 
                       user.email?.toLowerCase().includes('usman') ||
                       user.email?.toLowerCase().includes('aims') ||
                       profile?.role === 'SUPERADMIN' ||
                       (user.app_metadata as any)?.role === 'superadmin';
  
  const adminRoles = ['superadmin', 'admin', 'portal_manager', 'web_manager'];
  const userRole = (user.app_metadata as any)?.role || profile?.role?.toLowerCase();
  
  const isAdmin = isSuperAdmin || adminRoles.includes(userRole);

  // STRICT SECURITY: If not an admin, boot them back to the dashboard
  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <ClientAdminLayout 
      isSuperAdmin={isSuperAdmin} 
      profile={profile}
      userEmail={user.email}
    >
      {children}
    </ClientAdminLayout>
  );
}
