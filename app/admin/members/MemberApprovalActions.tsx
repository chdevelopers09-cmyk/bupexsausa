'use client';

import { useState } from 'react';
import { approveMember, rejectMember } from './actions';
import { ShieldCheck, AlertTriangle, Check, X } from 'lucide-react';

export default function MemberApprovalActions({ memberId, status }: { memberId: string, status: string }) {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this member and generate their ID?')) return;
    setLoading(true);
    const res = await approveMember(memberId);
    setLoading(false);
    if (res.error) alert(res.error);
    else alert('Member approved! ID: ' + res.membershipId);
  };

  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this application?')) return;
    setLoading(true);
    const res = await rejectMember(memberId);
    setLoading(false);
    if (res.error) alert(res.error);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-slate-400" /> Member Management
        </h3>
      </div>
      <div className="p-6 space-y-3">
        {status === 'PENDING' && (
          <>
            <button 
              onClick={handleApprove}
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : <><Check size={18} /> Approve Member</>}
            </button>
            <button 
              onClick={handleReject}
              disabled={loading}
              className="w-full py-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <X size={18} /> Reject Application
            </button>
          </>
        )}
        
        {status === 'ACTIVE' && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <p className="text-xs font-bold text-emerald-800 text-center">Membership is Active</p>
          </div>
        )}

        <button className="w-full text-left px-4 py-3 bg-white border border-slate-200 hover:border-primary hover:bg-purple-50 rounded-xl text-sm font-medium text-slate-700 transition-colors">
          Regenerate Membership ID
        </button>
        <button className="w-full text-left px-4 py-3 bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 rounded-xl text-sm font-medium text-slate-700 transition-colors">
          Send Password Reset Email
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl text-sm font-bold text-rose-700 transition-colors">
          <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Delete Account</span>
        </button>
      </div>
    </div>
  );
}
