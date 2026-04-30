import { createAdminClient } from '@/lib/supabase/server';
import AdminSettingsClient from './SettingsClient';

export const metadata = {
  title: 'System Settings | Admin Panel',
};

export default async function AdminSettingsPage() {
  const supabase = await createAdminClient();

  const { data: settings, error } = await supabase
    .from('site_settings')
    .select('*');

  if (error) console.error('Error:', error);

  return (
    <div className="max-w-6xl">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Global System Settings</h1>
        <p className="text-slate-500 mt-1">Configure site-wide parameters, financial rules, and branding tokens.</p>
      </div>

      <AdminSettingsClient initialSettings={settings || []} />
    </div>
  );
}
