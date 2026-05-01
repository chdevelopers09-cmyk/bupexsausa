import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

export const metadata = {
  title: 'Register - BUPEXSA USA',
  description: 'Join BUPEXSA USA today.',
};

import { createAdminClient } from '@/lib/supabase/admin';

export default async function RegisterPage() {
  const supabase = await createAdminClient();
  const { data: settingsData } = await supabase.from('site_settings').select('*');
  
  const settings = settingsData?.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}) || {};

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-purple/30 flex items-center justify-center p-6"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <RegisterClient settings={settings} />
    </Suspense>
  );
}
