import { createAdminClient } from '@/lib/supabase/admin';
import AdminPaymentsClient from './PaymentsClient';

export const metadata = {
  title: 'Financial Management | Admin Panel',
};

export default async function AdminPaymentsPage() {
  const supabase = await createAdminClient();

  const { data: payments, error } = await supabase
    .from('payments')
    .select('*, members(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) console.error('Error:', error);

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Financial Management</h1>
        <p className="text-slate-500 mt-1">Monitor transactions, verify manual payments, and track revenue.</p>
      </div>

      <AdminPaymentsClient initialPayments={payments || []} />
    </div>
  );
}
