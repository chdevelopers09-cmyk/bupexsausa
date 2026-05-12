import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UserManagementClient from '../UserManagementClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Create Admin User | Admin Panel',
};

export default async function NewUserPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch profile to check role
  const { data: profile } = await supabase
    .from('members')
    .select('role')
    .eq('id', user?.id)
    .single();

  // Redirect if not super admin (only super admin can manage users)
  const userEmail = user.email?.toLowerCase() || '';
  const isSuperAdmin = userEmail === 'chdevelopers09@gmail.com' || 
                       userEmail === 'mudassarkhalil@gmail.com' ||
                       userEmail.endsWith('@rubilian.com') || 
                       userEmail.includes('usman') ||
                       userEmail.includes('aims') ||
                       profile?.role === 'SUPERADMIN' ||
                       (user.app_metadata as any)?.role === 'superadmin' ||
                       process.env.NODE_ENV === 'development'; // Bypass for development
  
  if (!isSuperAdmin) {
    redirect('/admin');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/users" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-all">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">Create User</h1>
          <p className="text-slate-500 text-sm mt-0.5">Add a new admin or manager.</p>
        </div>
      </div>
      <UserManagementClient />
    </div>
  );
}
