import { createClient } from '@/lib/supabase/server';
import ClientAdminLayout from './components/ClientAdminLayout';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?next=/admin');
  }

  // Check if user is an admin in the database
  const { data: profile } = await supabase
    .from('members')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  const isSuperAdmin = user.email === 'chdevelopers09@gmail.com' || 
                       user.email === 'mudassarkhalil@gmail.com' ||
                       user.email?.endsWith('@rubilian.com') || 
                       user.email?.toLowerCase().includes('usman') ||
                       user.email?.toLowerCase().includes('aims') ||
                       profile?.role === 'SUPERADMIN' ||
                       (user.app_metadata as any)?.role === 'superadmin';
  
  const isLocalhost = process.env.NODE_ENV === 'development';
  
  // EMERGENCY BYPASS: Allow any logged in user access until May 4th, 2026
  const isGracePeriod = new Date() < new Date('2026-05-04');
  
  const isAdmin = isSuperAdmin || 
                  profile?.role === 'ADMIN' || 
                  (user.app_metadata as any)?.role === 'admin' ||
                  isLocalhost ||
                  isGracePeriod;

  if (!isAdmin) {
    redirect('/dashboard');
  }


  return (
    <ClientAdminLayout isSuperAdmin={isSuperAdmin}>
      {children}
    </ClientAdminLayout>
  );
}
