'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Info, CreditCard, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    // Close dropdown when path changes
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase
      .channel(`public:notifications:member_id=eq.${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `member_id=eq.${userId}`
      }, (payload) => {
        setNotifications(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('member_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    // Optimistic update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
    } catch (err) {
      console.error('Failed to mark read', err);
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('member_id', userId)
        .eq('is_read', false);
    } catch (err) {
      console.error('Failed to mark all read', err);
    }
  };

  const deleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await supabase
        .from('notifications')
        .delete()
        .eq('id', id);
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getIcon = (type: string) => {
    switch(type) {
      case 'PAYMENT': return <CreditCard className="h-4 w-4 text-green-600" />;
      case 'EVENT': return <CalendarIcon className="h-4 w-4 text-primary" />;
      case 'ALERT': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Info className="h-4 w-4 text-accent" />;
    }
  };

  const getBgClass = (type: string) => {
    switch(type) {
      case 'PAYMENT': return "bg-green-50";
      case 'EVENT': return "bg-purple-50";
      case 'ALERT': return "bg-orange-50";
      default: return "bg-blue-50";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-lg transition-colors group",
          isOpen ? "bg-primary/10 text-primary" : "hover:bg-gray-100 text-gray-400 group-hover:text-primary"
        )}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="notification-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right animate-in fade-in zoom-in duration-200">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <h3 className="font-bold text-dark flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black">{unreadCount} New</span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-bold text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="py-8 text-center text-gray-400 flex flex-col items-center justify-center">
                 <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
                 <p className="text-xs">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-12 px-6 text-center text-gray-400 flex flex-col items-center justify-center">
                 <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                   <Bell className="h-5 w-5 text-gray-300" />
                 </div>
                 <p className="font-bold text-sm">You're all caught up!</p>
                 <p className="text-xs mt-1">No new notifications at the moment.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-4 transition-colors relative group",
                      !notification.is_read ? "bg-primary/5 hover:bg-primary/10" : "bg-white hover:bg-gray-50"
                    )}
                    onClick={() => {
                        if (!notification.is_read) markAsRead(notification.id);
                    }}
                  >
                    <div className="flex gap-4">
                      <div className={cn(
                        "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center mt-0.5",
                        getBgClass(notification.type)
                      )}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <p className={cn(
                           "text-sm font-bold text-dark mb-0.5",
                           !notification.is_read && "text-primary"
                        )}>
                           {notification.title}
                        </p>
                        <p className={cn(
                           "text-xs leading-relaxed line-clamp-2",
                           !notification.is_read ? "text-dark/80" : "text-gray-500"
                        )}>
                           {notification.body}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-2">
                           {new Date(notification.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Actions Overlay */}
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                       {!notification.is_read && (
                          <button 
                            onClick={(e) => markAsRead(notification.id, e)}
                            className="p-1.5 rounded-lg bg-white border border-gray-100 hover:border-primary text-gray-400 hover:text-primary shadow-sm"
                            title="Mark as read"
                          >
                             <Check className="h-3 w-3" />
                          </button>
                       )}
                       <button 
                         onClick={(e) => deleteNotification(notification.id, e)}
                         className="p-1.5 rounded-lg bg-white border border-gray-100 hover:border-red-500 text-gray-400 hover:text-red-500 shadow-sm"
                         title="Dismiss"
                       >
                          <X className="h-3 w-3" />
                       </button>
                    </div>
                    
                    {/* Unread dot */}
                    {!notification.is_read && (
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary group-hover:opacity-0 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-50 bg-gray-50/50 text-center">
             <Link href="/dashboard/settings" onClick={() => setIsOpen(false)} className="text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                Notification Settings
             </Link>
          </div>
        </div>
      )}
    </div>
  );
}
