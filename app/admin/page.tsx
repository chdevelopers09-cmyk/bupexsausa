import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ArrowRight,
  UserCheck,
  Zap,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function AdminDashboard() {
  const supabase = await createAdminClient();

  // Fetch real-time metrics
  const { count: totalMembers } = await supabase.from('members').select('*', { count: 'exact', head: true });
  const { count: activeMembers } = await supabase.from('members').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE');
  const { count: pendingApprovals } = await supabase.from('members').select('*', { count: 'exact', head: true }).eq('status', 'PENDING');
  
  const { data: revenueData } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'COMPLETED')
    .eq('type', 'MEMBERSHIP');

  const revenueYTD = revenueData?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

  const { data: recentMembers } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = {
    totalMembers: totalMembers || 0,
    activeMembers: activeMembers || 0,
    revenueYTD: revenueYTD,
    pendingApprovals: pendingApprovals || 0
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-slate-900">Platform Overview</h1>
         <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Real-time database sync</span>
            <button className="btn-primary text-xs py-2 px-4 shadow-none">Refresh Data</button>
         </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <MetricCard
           title="Total Members"
           value={stats.totalMembers}
           change="+new"
           isPositive={true}
           icon={Users}
           color="blue"
         />
         <MetricCard
           title="Active Subscriptions"
           value={stats.activeMembers}
           change="Live"
           isPositive={true}
           icon={Zap}
           color="purple"
         />
         <MetricCard
           title="Revenue (YTD)"
           value={`$${stats.revenueYTD.toLocaleString()}`}
           change="Verified"
           isPositive={true}
           icon={DollarSign}
           color="green"
         />
         <MetricCard
           title="Pending Approvals"
           value={stats.pendingApprovals}
           change="Requires Action"
           isPositive={null}
           icon={UserCheck}
           color="orange"
         />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Member Activity Table */}
         <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
               <h3 className="font-bold text-slate-900">Recent Registrations</h3>
               <Link href="/admin/members" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
                  Manage all members <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
            <div className="flex-1 overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Batch</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Location</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentMembers?.map((user, i) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4">
                              <span className="font-bold text-slate-900 text-sm">{user.full_name}</span>
                              <p className="text-[10px] text-slate-400 mt-0.5">{user.email}</p>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-600 font-medium">{user.graduation_year || 'N/A'}</td>
                           <td className="px-6 py-4 text-sm text-slate-600 font-medium">{user.us_state}</td>
                           <td className="px-6 py-4">
                              <span className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                user.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                              )}>
                                 {user.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                     {(!recentMembers || recentMembers.length === 0) && (
                       <tr>
                         <td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm">No recent registrations found</td>
                       </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Right Sidebar: Recent Payments & Alerts */}
         <div className="space-y-8 flex flex-col">
            <div className="bg-[#0F172A] rounded-3xl p-8 text-white relative overflow-hidden flex-shrink-0">
               <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/20 rounded-full blur-3xl"></div>
               <h3 className="text-xl font-bold mb-6">Financial Pulse</h3>
               <div className="space-y-6">
                  <div>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Dues Collected (YTD)</p>
                     <p className="text-3xl font-black leading-none">${stats.revenueYTD.toLocaleString()}</p>
                     <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold mt-2">
                        <TrendingUp className="h-3 w-3" />
                        <span>Live verified revenue</span>
                     </div>
                  </div>
                  <div className="h-px bg-slate-800"></div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-400">Target for 2026</span>
                     <span className="text-sm font-bold">$100,000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div className={cn("bg-primary h-full transition-all duration-1000")} style={{ width: `${Math.min((stats.revenueYTD / 100000) * 100, 100)}%` }} />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col flex-1">
               <h3 className="font-bold text-slate-900 mb-6 underline">Immediate Tasks</h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-primary">Approve {stats.pendingApprovals} members</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                  </div>
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-primary">Verify pending payments</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-primary",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
       <div className="flex items-center justify-between mb-6">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform hover:scale-110", colors[color])}>
             <Icon className="h-6 w-6" />
          </div>
          {isPositive !== null && (
             <div className={cn(
               "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
               isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
             )}>
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {change}
             </div>
          )}
          {isPositive === null && (
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{change}</span>
          )}
       </div>
       <p className="text-sm font-bold text-slate-500 mb-1">{title}</p>
       <p className="text-3xl font-black text-slate-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    </div>
  );
}
