'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Download, MoreVertical, ShieldCheck, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { approveMember, rejectMember } from './actions';

export default function MembersClient({ initialMembers }: { initialMembers: any[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const supabase = createClient();

  const filtered = members.filter(m => {
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (!m.full_name?.toLowerCase().includes(q) && !m.email?.toLowerCase().includes(q) && !m.membership_id?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    const map: Record<string, { icon: any, color: string, bg: string }> = {
      ACTIVE: { icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
      PENDING: { icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
      EXPIRED: { icon: AlertTriangle, color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
      REJECTED: { icon: XCircle, color: 'text-slate-500', bg: 'bg-slate-100 border-slate-200' },
      SUSPENDED: { icon: ShieldCheck, color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    };
    const s = map[status] || map.PENDING;
    const Icon = s.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${s.bg} ${s.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {status}
      </span>
    );
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (newStatus === 'ACTIVE') {
      const res = await approveMember(id);
      if (res.success) {
        setMembers(members.map(m => m.id === id ? { ...m, status: 'ACTIVE', membership_id: res.membershipId } : m));
      } else alert(res.error);
    } else if (newStatus === 'REJECTED') {
      const res = await rejectMember(id);
      if (res.success) {
        setMembers(members.map(m => m.id === id ? { ...m, status: 'REJECTED' } : m));
      } else alert(res.error);
    } else {
       // Fallback for other statuses
       const { error } = await supabase.from('members').update({ status: newStatus }).eq('id', id);
       if (!error) {
         setMembers(members.map(m => m.id === id ? { ...m, status: newStatus } : m));
       }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, email, or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="EXPIRED">Expired</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors text-slate-700">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Member Info</th>
              <th className="px-6 py-4 hidden md:table-cell">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 hidden lg:table-cell">Chapter / Graduation</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <Search className="h-8 w-8 text-slate-300" />
                    <p className="font-medium">No members found.</p>
                  </div>
                </td>
              </tr>
            ) : filtered.map(member => (
              <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-500 font-bold">
                      {member.avatar_path ? (
                        <img src={member.avatar_path} alt={member.full_name} className="w-full h-full object-cover" />
                      ) : (
                        member.full_name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{member.full_name}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{member.membership_id || 'No ID Assigned'}</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-slate-600">{member.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{member.phone || '-'}</p>
                </td>
                
                <td className="px-6 py-4">
                  {getStatusBadge(member.status)}
                </td>
                
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-slate-900 font-medium">{member.chapters?.name || member.us_state}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Class of {member.graduation_year}</p>
                </td>
                
                <td className="px-6 py-4 text-right relative">
                  <Link 
                    href={`/admin/members/${member.id}`}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg hover:border-primary hover:text-primary transition-colors mr-2"
                  >
                    View
                  </Link>

                  {/* Simple Dropdown wrapper for demo */}
                  <div className="inline-block relative">
                    <select 
                      onChange={(e) => handleStatusChange(member.id, e.target.value)}
                      value=""
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                      <option value="" disabled>Change Status...</option>
                      <option value="ACTIVE">Approve / Set Active</option>
                      <option value="PENDING">Set Pending</option>
                      <option value="EXPIRED">Set Expired</option>
                      <option value="REJECTED">Reject</option>
                      <option value="SUSPENDED">Suspend</option>
                    </select>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
