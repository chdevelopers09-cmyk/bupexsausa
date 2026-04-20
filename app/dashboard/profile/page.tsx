import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';

export const metadata = {
  title: 'My Profile | Dashboard',
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('members')
    .select('*, chapters(name)')
    .eq('id', session.user.id)
    .single();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-dark">Profile Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and preferences.</p>
      </div>

      <ProfileClient initialSession={session} initialProfile={profile} />
    </div>
  );
}
