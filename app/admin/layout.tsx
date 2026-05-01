import { createClient } from '@/lib/supabase/server';
import ClientAdminLayout from './components/ClientAdminLayout';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const isSuperAdmin = !!(user?.email === 'chdevelopers09@gmail.com' || user?.email?.endsWith('@rubilian.com'));

  return (
    <ClientAdminLayout isSuperAdmin={isSuperAdmin}>
      {children}
    </ClientAdminLayout>
  );
}
