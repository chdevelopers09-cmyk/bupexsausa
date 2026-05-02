import { createClient } from '@/lib/supabase/server';
import ClientAdminLayout from './components/ClientAdminLayout';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ 
  children,
  params,
  searchParams
}: { 
  children: React.ReactNode,
  params: any,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { debug } = await searchParams;
  const isDebug = debug === 'true';
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Check if user is an admin in the database
  const { data: profile } = await supabase
    .from('members')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  const isSuperAdmin = user.email === 'chdevelopers09@gmail.com' || 
                       user.email?.endsWith('@rubilian.com') || 
                       profile?.role === 'SUPERADMIN' ||
                       (user.app_metadata as any)?.role === 'superadmin';
  
  const isAdmin = isSuperAdmin || 
                  profile?.role === 'ADMIN' || 
                  (user.app_metadata as any)?.role === 'admin';

  if (!isAdmin && !isDebug) {
    redirect('/dashboard');
  }

  if (isDebug) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-20 font-mono">
        <h1 className="text-4xl font-black mb-10 text-primary">Admin Diagnostics</h1>
        <div className="space-y-6 bg-slate-800 p-10 rounded-3xl border border-slate-700 shadow-2xl">
          <p><span className="text-slate-500 uppercase tracking-widest text-xs">Email:</span> <span className="text-white font-bold">{user.email}</span></p>
          <p><span className="text-slate-500 uppercase tracking-widest text-xs">DB Role:</span> <span className="text-primary font-bold">{profile?.role || 'NONE'}</span></p>
          <p><span className="text-slate-500 uppercase tracking-widest text-xs">Metadata Role:</span> <span className="text-amber-400 font-bold">{(user.app_metadata as any)?.role || 'NONE'}</span></p>
          <p><span className="text-slate-500 uppercase tracking-widest text-xs">Calculated isAdmin:</span> <span className={isAdmin ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>{isAdmin ? 'TRUE' : 'FALSE'}</span></p>
        </div>
        <div className="mt-10 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-primary text-sm">
          Please send a screenshot of this screen to help me fix your access!
        </div>
      </div>
    );
  }

  return (
    <ClientAdminLayout isSuperAdmin={isSuperAdmin}>
      {children}
    </ClientAdminLayout>
  );
}
