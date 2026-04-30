import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Calendar, MapPin, Building, ShieldCheck, Download, AlertTriangle, CreditCard, Activity } from 'lucide-react';
import MemberEditorForm from './MemberEditorForm';
import MemberApprovalActions from '../MemberApprovalActions';

export const metadata = {
  title: 'Member Details | Admin Panel',
};

export default async function AdminMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAdminClient();

  // Fetch member
  const { data: member } = await supabase
    .from('members')
    .select('*, chapters(*)')
    .eq('id', id)
    .single();

  if (!member) notFound();

  // Fetch payments
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('member_id', id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/members" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 transition-all">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">Member Profile</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage details and activities for {member.full_name}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Col: Overview & Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Stats Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-slate-400 font-bold text-xl border-4 border-white shadow-xl">
              {member.avatar_path ? <img src={member.avatar_path} alt="avatar" className="h-full w-full object-cover" /> : member.full_name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{member.full_name}</h2>
                  <p className="text-primary font-mono text-sm mt-1">{member.membership_id || 'ID Pending'}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  member.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                  member.status === 'EXPIRED' ? 'bg-rose-100 text-rose-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {member.status}
                </span>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4 text-slate-400" /> {member.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" /> {member.us_state}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4 text-slate-400" /> Class of {member.graduation_year}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Building className="h-4 w-4 text-slate-400" /> {member.chapters?.name || 'No Chapter'}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <User className="h-5 w-5 text-slate-400" /> Edit Profile Details
              </h3>
            </div>
            <div className="p-8">
              <MemberEditorForm member={member} />
            </div>
          </div>
        </div>

        {/* Right Col: Timeline & Finances */}
        <div className="lg:col-span-1 space-y-8">
          {/* Admin Actions */}
          <MemberApprovalActions memberId={member.id} status={member.status} />

          {/* Payment History */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-slate-400" /> Payment History
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {!payments || payments.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">No payments found.</div>
              ) : (
                payments.slice(0, 5).map(payment => (
                  <div key={payment.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{payment.type}</p>
                      <p className="text-xs text-slate-500">{new Date(payment.created_at).toLocaleDateString()} · {payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">${payment.amount}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${payment.status === 'COMPLETED' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {payment.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {payments && payments.length > 5 && (
              <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                <button className="text-xs font-bold text-primary hover:underline">View All</button>
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-slate-400" /> Recent Activity
              </h3>
            </div>
            <div className="p-6">
               <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                 {[
                   { t: 'Joined BUPEXSA USA', d: new Date(member.created_at).toLocaleDateString() },
                   { t: 'Status changed to Pending', d: new Date(member.created_at).toLocaleDateString() }
                 ].map((act, i) => (
                   <div key={i} className="relative pl-6">
                     <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-primary"></div>
                     <p className="text-sm font-bold text-slate-800">{act.t}</p>
                     <p className="text-xs text-slate-500 mt-0.5">{act.d}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
