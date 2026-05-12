import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import MembersClient from './MembersClient';

export const metadata = {
  title: 'Manage Members | Admin Panel',
};

export default async function AdminMembersPage() {
  const supabase = await createAdminClient();
  
  // Parallelize data fetching for maximum speed
  const [membersRes, authRes] = await Promise.all([
    supabase.from('members').select('*, chapters(name)').order('created_at', { ascending: false }),
    supabase.auth.admin.listUsers()
  ]);

  const { data: allMembers, error: membersError } = membersRes;
  const { data: authData, error: authError } = authRes;

  const adminRoles = ['admin', 'superadmin', 'web_manager', 'portal_manager', 'ADMIN', 'SUPERADMIN'];
  const superAdminEmails = [
    'chdevelopers09@gmail.com',
    'mudassarkhalil@gmail.com',
    'imranalikhan774@gmail.com',
    'emidev7@gmail.com',
    'bupexsausa25@gmail.com'
  ];

  const adminEmails = new Set(
    (authData?.users || [])
      .filter(u => {
        const role = u.app_metadata?.role;
        const email = u.email?.toLowerCase() || '';
        return adminRoles.includes(role) || 
               superAdminEmails.includes(email) ||
               email.endsWith('@rubilian.com');
      })
      .map(u => u.email?.toLowerCase())
  );
  
  const members = (allMembers || []).filter(m => {
    const email = m.email?.toLowerCase();
    const role = m.role;
    const isExplicitAdmin = adminEmails.has(email) || superAdminEmails.includes(email);
    const hasAdminRole = adminRoles.includes(role);

    return !hasAdminRole && !isExplicitAdmin && !email?.endsWith('@rubilian.com');
  });

  if (membersError || authError) {
    console.error('Error fetching data:', membersError || authError);
  }

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">Member Directory</h1>
          <p className="text-slate-500 mt-1">Manage registered alumni, approve applications, and update statuses.</p>
        </div>
        <Link href="/admin/members/new" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">
          + Add New Member
        </Link>
      </div>

      <MembersClient initialMembers={members || []} />
    </>
  );
}
