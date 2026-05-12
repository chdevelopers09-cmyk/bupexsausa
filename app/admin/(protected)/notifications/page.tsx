import { createClient } from '@/lib/supabase/server'
import NotificationsClient from './NotificationsClient'

export const metadata = {
  title: 'Bulk Notifications - BUPEXSA USA',
}

export default async function NotificationsPage() {
  const supabase = await createClient()
  
  // Fetch recent notifications and group them by title/time to show unique broadcasts
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  // Group by title + minute (approximate broadcast grouping)
  const uniqueBroadcasts: any[] = []
  const seen = new Set()

  notifications?.forEach(n => {
    const timeKey = new Date(n.created_at).toISOString().slice(0, 16) // Group by minute
    const key = `${n.title}-${timeKey}`
    if (!seen.has(key)) {
      seen.add(key)
      uniqueBroadcasts.push(n)
    }
  })

  return <NotificationsClient recentNotifications={uniqueBroadcasts} />
}
