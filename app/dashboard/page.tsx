import Link from 'next/link';
import {
  CreditCard,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  MapPin,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';

export default async function DashboardOverview() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('members')
    .select('*, chapters(name)')
    .eq('id', user.id)
    .single();

  // Fetch real notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('member_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  // Fetch RSVPs
  const { data: rsvps } = await supabase
    .from('rsvps')
    .select('*, events(*)')
    .eq('member_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const upcomingEvents = rsvps?.map(r => r.events).filter(Boolean) || [];

  // Fetch Recent Payments
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('member_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <DashboardWelcome profile={profile} />

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className={statCardClass}>
            <div className="flex items-center justify-between mb-4">
               <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</span>
            </div>
            <p className="text-2xl font-black text-dark">{profile?.status || 'PENDING'}</p>
            <p className="text-xs text-gray-500 mt-1">Since {profile?.join_date ? new Date(profile.join_date).getFullYear() : 'Registration'}</p>
         </div>

         <div className={statCardClass}>
            <div className="flex items-center justify-between mb-4">
               <div className="h-10 w-10 rounded-xl bg-purple-50 text-primary flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Member ID</span>
            </div>
            <p className="text-2xl font-black text-dark">{profile?.membership_id || 'PENDING'}</p>
            <p className="text-xs text-gray-500 mt-1">Chapter: {profile?.chapters?.name || 'Unassigned'}</p>
         </div>

         <div className={statCardClass}>
            <div className="flex items-center justify-between mb-4">
               <div className="h-10 w-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center">
                  <User className="h-5 w-5" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Class</span>
            </div>
            <p className="text-2xl font-black text-dark">{profile?.graduation_year || 'N/A'}</p>
            <p className="text-xs text-gray-500 mt-1">PCSS Buea Alumnus</p>
         </div>

         <div className={statCardClass}>
            <div className="flex items-center justify-between mb-4">
               <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">RSVPs</span>
            </div>
            <p className="text-2xl font-black text-dark">{rsvps?.length || 0} Events</p>
            <p className="text-xs text-gray-500 mt-1">Recently RSVPed</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
         {/* Upcoming Events & Activity */}
         <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-dark">Your Recent RSVPs</h2>
                  <Link href="/dashboard/events" className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group">
                     View full list <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>

               <div className="space-y-4">
                  {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                     <div key={event.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="h-16 w-16 rounded-xl bg-purple-50 flex flex-col items-center justify-center text-primary shrink-0">
                           <span className="text-xs font-black uppercase leading-none">{new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}</span>
                           <span className="text-2xl font-black">{new Date(event.start_datetime).getDate()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="font-bold text-dark truncate mb-1">{event.title}</h3>
                           <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                 <MapPin className="h-3 w-3" />
                                 {event.location_name}
                              </span>
                              <span className="flex items-center gap-1">
                                 <Clock className="h-3 w-3" />
                                 {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                           </div>
                        </div>
                        <div className="badge-active">CONFIRMED</div>
                     </div>
                  )) : (
                    <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                       <Calendar className="h-10 w-10 text-gray-200 mx-auto mb-4" />
                       <p className="text-gray-400 font-bold">No recent RSVPs found</p>
                       <Link href="/events" className="text-primary text-sm font-bold mt-2 inline-block hover:underline">Browse Events</Link>
                    </div>
                  )}
               </div>
            </div>

            {/* Recent Activity (Payments) */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-dark">Recent Activity</h2>
                  <Link href="/dashboard/payments" className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group">
                     Payment History <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>

               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-50">
                     {payments && payments.length > 0 ? payments.map(payment => (
                        <div key={payment.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className={cn(
                                 "h-10 w-10 rounded-xl flex items-center justify-center",
                                 payment.status === 'COMPLETED' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                              )}>
                                 <DollarSign className="h-5 w-5" />
                              </div>
                              <div>
                                 <p className="font-bold text-dark text-sm">{payment.type === 'MEMBERSHIP' ? 'Annual Dues' : 'Donation'}</p>
                                 <p className="text-xs text-gray-400">{new Date(payment.created_at).toLocaleDateString()}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-black text-dark">${payment.amount}</p>
                              <p className={cn(
                                 "text-[10px] font-black uppercase tracking-widest",
                                 payment.status === 'COMPLETED' ? "text-green-500" : "text-orange-500"
                              )}>{payment.status}</p>
                           </div>
                        </div>
                     )) : (
                        <div className="p-12 text-center text-gray-400 italic text-sm">
                           No recent transactions found.
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Right Column: Actions / Alerts */}
         <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark">Quick Actions</h2>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-4">
               <Link href="/dashboard/payments" className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <CreditCard className="h-5 w-5" />
                     </div>
                     <span className="text-sm font-bold text-dark">Pay Annual Dues</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
               </Link>

               <div className="h-px bg-gray-50"></div>

               <Link href="/donations" className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <DollarSign className="h-5 w-5" />
                     </div>
                     <span className="text-sm font-bold text-dark">Make a Donation</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
               </Link>

               <div className="h-px bg-gray-50"></div>

               <Link href="/dashboard/profile" className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <User className="h-5 w-5" />
                     </div>
                     <span className="text-sm font-bold text-dark">Update My Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
               </Link>
            </div>

            {/* Dynamic Alerts / Notifications */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-dark">Alumni Alerts</h2>
              {notifications && notifications.length > 0 ? notifications.map(notif => (
                <div key={notif.id} className={cn(
                  "p-6 rounded-3xl border flex gap-4 transition-all hover:shadow-lg",
                  notif.type === 'URGENT' ? "bg-rose-50 border-rose-100" : "bg-blue-50 border-blue-100"
                )}>
                  <AlertCircle className={cn(
                    "h-6 w-6 shrink-0 mt-1",
                    notif.type === 'URGENT' ? "text-rose-600" : "text-blue-600"
                  )} />
                  <div>
                    <h4 className={cn(
                      "font-black text-sm",
                      notif.type === 'URGENT' ? "text-rose-900" : "text-blue-900"
                    )}>{notif.title}</h4>
                    <p className={cn(
                      "text-xs mt-1 leading-relaxed line-clamp-3",
                      notif.type === 'URGENT' ? "text-rose-700/80" : "text-blue-700/80"
                    )}>
                      {notif.body}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-3 opacity-40">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl text-center">
                   <Bell className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                   <p className="text-xs text-slate-400 font-bold tracking-tight">No active alerts for you.</p>
                </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
}

const statCardClass = "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300";
