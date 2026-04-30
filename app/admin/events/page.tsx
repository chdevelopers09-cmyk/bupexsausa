import { createAdminClient } from '@/lib/supabase/server';
import AdminEventsClient from './EventsClient';

export const metadata = {
  title: 'Manage Events | Admin Panel',
};

export default async function AdminEventsPage() {
  const supabase = await createAdminClient();

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('start_datetime', { ascending: false });

  if (error) console.error('Error:', error);

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">Events Management</h1>
        <p className="text-slate-500 mt-1">Create conventions, track RSVPs, and manage event publicity.</p>
      </div>

      <AdminEventsClient initialEvents={events || []} />
    </div>
  );
}
