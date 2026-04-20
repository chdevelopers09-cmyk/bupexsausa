import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import MembersClient from './MembersClient';

export const metadata = {
  title: 'Manage Members | Admin Panel',
};

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Double check admin role here or rely on middleware.
  // Actually, wait: we need the service role key to see ALL members if RLS restricts it,
  // OR the admin should have an 'admin' role in JWT to bypass RLS per our DB rules.
  // "Admins have full access" ON members FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
  
  // So standard client works assuming we updated the role.
  const { data: members, error } = await supabase
    .from('members')
    .select('*, chapters(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching members:', error);
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Member Directory</h1>
        <p className="text-slate-500 mt-1">Manage registered alumni, approve applications, and update statuses.</p>
      </div>

      <MembersClient initialMembers={members || []} />
    </>
  );
}
