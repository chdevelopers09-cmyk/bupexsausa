'use client';

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
import { MOCK_STATS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-slate-900">Platform Overview</h1>
         <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Last updated: 2 mins ago</span>
            <button className="btn-primary text-xs py-2 px-4 shadow-none">Refresh Data</button>
         </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <MetricCard
           title="Total Members"
           value={MOCK_STATS.totalMembers}
           change="+12"
           isPositive={true}
           icon={Users}
           color="blue"
         />
         <MetricCard
           title="Active Subscriptions"
           value={MOCK_STATS.activeMembers}
           change="+8%"
           isPositive={true}
           icon={Zap}
           color="purple"
         />
         <MetricCard
           title="Revenue (YTD)"
           value={`$${MOCK_STATS.revenueYTD.toLocaleString()}`}
           change="-2.4%"
           isPositive={false}
           icon={DollarSign || CreditCard}
           color="green"
         />
         <MetricCard
           title="Pending Approvals"
           value={MOCK_STATS.pendingApprovals}
           change="High Priority"
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
                     {[
                        { name: 'John Doe', batch: '2004', state: 'Texas', status: 'PENDING' },
                        { name: 'Jane Smith', batch: '1998', state: 'Georgia', status: 'ACTIVE' },
                        { name: 'Patrick Nkeng', batch: '2010', state: 'California', status: 'PENDING' },
                        { name: 'Claudette Ngwa', batch: '2005', state: 'MD', status: 'ACTIVE' },
                        { name: 'Sampson Awah', batch: '2012', state: 'NY', status: 'PENDING' },
                     ].map((user, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4">
                              <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                              <p className="text-[10px] text-slate-400 mt-0.5">Joined 2 days ago</p>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-600 font-medium">{user.batch}</td>
                           <td className="px-6 py-4 text-sm text-slate-600 font-medium">{user.state}</td>
                           <td className="px-6 py-4">
                              <span className={user.status === 'ACTIVE' ? 'badge-active' : 'badge-pending'}>
                                 {user.status}
                              </span>
                           </td>
                        </tr>
                     ))}
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
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Dues Collected (MTD)</p>
                     <p className="text-3xl font-black leading-none">$4,250.00</p>
                     <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold mt-2">
                        <TrendingUp className="h-3 w-3" />
                        <span>+12.5% from last month</span>
                     </div>
                  </div>
                  <div className="h-px bg-slate-800"></div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-400">Target for 2026</span>
                     <span className="text-sm font-bold">$100,000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div className="bg-primary h-full w-[28%]" />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col flex-1">
               <h3 className="font-bold text-slate-900 mb-6 underline">Immediate Tasks</h3>
               <div className="space-y-6">
                  {[
                     { task: 'Approve 8 members', priority: 'high' },
                     { task: 'Verify 3 manual payments', priority: 'medium' },
                     { task: 'Update Annual Gala info', priority: 'low' },
                     { task: 'Send membership reminder', priority: 'medium' }
                  ].map((task, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                           <div className={cn(
                              "h-2 w-2 rounded-full",
                              task.priority === 'high' ? "bg-red-500" :
                              task.priority === 'medium' ? "bg-orange-500" : "bg-blue-500"
                           )} />
                           <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{task.task}</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                     </div>
                  ))}
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
       <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
  );
}
