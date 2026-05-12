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

  let profile = null;
  try {
    const { data } = await supabase
      .from('members')
      .select('*')
      .eq('id', user.id)
      .maybeSingle(); // Use maybeSingle to avoid throwing on 0 rows
    profile = data;
  } catch (err) {
    console.error('Error fetching admin profile:', err);
  }

  const userEmail = user.email?.toLowerCase() || '';
  const isSuperAdmin = userEmail === 'chdevelopers09@gmail.com' || 
                       userEmail === 'mudassarkhalil@gmail.com' ||
                       userEmail === 'imranalikhan774@gmail.com' ||
                       userEmail === 'emidev7@gmail.com' ||
                       userEmail === 'bupexsausa25@gmail.com' ||
                       userEmail.endsWith('@rubilian.com') || 
                       userEmail.includes('usman') ||
                       userEmail.includes('aims') ||
                       profile?.role === 'SUPERADMIN' ||
                       (user.app_metadata as any)?.role === 'superadmin';
  
  const adminRoles = ['superadmin', 'admin', 'portal_manager', 'web_manager', 'ADMIN', 'SUPERADMIN', 'PORTAL_MANAGER', 'WEB_MANAGER'];
  const userRole = (user.app_metadata as any)?.role || profile?.role?.toLowerCase() || '';
  
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
