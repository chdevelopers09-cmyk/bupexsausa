import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EventsList from './EventsList';
import { Calendar } from 'lucide-react';

export default async function MyEventsPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch all RSVPs for this member with event details
  const { data: rsvps, error } = await supabase
    .from('rsvps')
    .select('*, events(*)')
    .eq('member_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching RSVPs:', error);
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-dark">My Events</h1>
        <p className="text-gray-500 mt-2">Manage your RSVPs and view upcoming and past events you've joined.</p>
      </div>

      <EventsList initialRsvps={rsvps || []} memberId={user.id} />
    </div>
  );
}
