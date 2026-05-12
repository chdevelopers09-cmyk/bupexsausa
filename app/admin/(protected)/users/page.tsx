import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import UsersClient from './UsersClient';

export const metadata = {
  title: 'User Management | Admin Panel',
};

export default async function UserManagementPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/admin/users');
  }

  // FETCH DATA IN PARALLEL
  const [profileRes, authRes] = await Promise.all([
    supabase.from('members').select('role').eq('id', user.id).single(),
    (await createAdminClient()).auth.admin.listUsers()
  ]);

  const profile = profileRes.data;
  const { data: authData, error } = authRes;
  
  // Security checks follow...
  const userEmail = user.email?.toLowerCase() || '';
  const isSuperAdmin = userEmail === 'chdevelopers09@gmail.com' || 
                       userEmail === 'mudassarkhalil@gmail.com' ||
                       userEmail === 'imranalikhan774@gmail.com' ||
                       userEmail === 'emidev7@gmail.com' ||
                       userEmail.endsWith('@rubilian.com') || 
                       profile?.role === 'SUPERADMIN' ||
                       profile?.role === 'admin' || // Allow all admins to access
                       (user.app_metadata as any)?.role === 'superadmin' ||
                       (user.app_metadata as any)?.role === 'admin';
  
  if (!isSuperAdmin) {
    redirect('/admin');
  }

  let displayAdminUsers: any[] = [];
  let fetchError = null;

  try {

    if (error) {
      console.error('Error fetching admin users:', error);
      fetchError = error.message;
    }

    const allUsers = authData?.users || [];
    const adminRoles = ['admin', 'superadmin', 'web_manager', 'portal_manager'];

    const adminUsers = allUsers.filter(u => {
      const role = u.app_metadata?.role;
      const email = (u.email || '').toLowerCase();
      
      // Strict Admin Filtering: Only show those with admin roles or specific super-admin emails
      return adminRoles.includes(role) || 
             email === 'chdevelopers09@gmail.com' ||
             email === 'mudassarkhalil@gmail.com' ||
             email === 'imranalikhan774@gmail.com' ||
             email === 'emidev7@gmail.com' ||
             email.endsWith('@rubilian.com') ||
             email.includes('usman') ||
             email.includes('aims');
    });
    
    // Format users for the client component
    displayAdminUsers = adminUsers.map(u => {
       const role = u.app_metadata?.role;
       const email = (u.email || '').toLowerCase();
       const isEmailSuperAdmin = email === 'chdevelopers09@gmail.com' || 
                                 email === 'mudassarkhalil@gmail.com' ||
                                 email === 'imranalikhan774@gmail.com' ||
                                 email === 'emidev7@gmail.com' ||
                                 email.endsWith('@rubilian.com') ||
                                 email.includes('usman') ||
                                 email.includes('aims');
       
       return {
         id: u.id,
         email: u.email,
         full_name: u.user_metadata?.full_name || 'System Admin',
         role: isEmailSuperAdmin ? 'superadmin' : (role || 'admin'),
         status: u.user_metadata?.status || 'ACTIVE',
         created_at: u.created_at,
         is_protected: isEmailSuperAdmin 
       };
    });
  } catch (err: any) {
    console.error('Critical failure in UserManagementPage:', err);
    fetchError = err.message || 'Unknown server error';
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Manage portal access, assign roles, and set permissions for admin staff.</p>
        </div>
        <Link href="/admin/users/new" className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
          + Add New Admin User
        </Link>
      </div>

      {fetchError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          Server Error: {fetchError}
        </div>
      )}

      <UsersClient initialUsers={displayAdminUsers} />
    </div>
  );
}
