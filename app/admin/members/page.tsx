import { createAdminClient } from '@/lib/supabase/admin';
import MembersClient from './MembersClient';

export const metadata = {
  title: 'Manage Members | Admin Panel',
};

export default async function AdminMembersPage() {
  const supabase = await createAdminClient();
  
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
