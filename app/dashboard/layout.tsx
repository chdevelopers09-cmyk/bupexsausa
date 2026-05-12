import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from './DashboardLayoutClient';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Parallel fetch profile and settings on the server for ultra-fast initial load
  const [profileRes, settingsRes] = await Promise.all([
    supabase.from('members').select('*').eq('id', user.id).single(),
    supabase.from('site_settings').select('*')
  ]);

  const settingsObj = settingsRes.data?.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}) || {};

  return (
    <DashboardLayoutClient 
      initialProfile={profileRes.data} 
      initialSettings={settingsObj}
      userId={user.id}
    >
      {children}
    </DashboardLayoutClient>
  );
}
