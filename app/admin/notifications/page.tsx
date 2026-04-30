import { createClient } from '@/lib/supabase/server'
import NotificationsClient from './NotificationsClient'

export const metadata = {
  title: 'Bulk Notifications - BUPEXSA USA',
}

export default async function NotificationsPage() {
  const supabase = await createClient()
  
  // We'll fetch the most recent unique notifications (broadly)
  // In a real system, we might have a `broadcasts` table. 
  // For now, we'll list recent rows from the `notifications` table.
  const { data: recent } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return <NotificationsClient recentNotifications={recent || []} />
}
