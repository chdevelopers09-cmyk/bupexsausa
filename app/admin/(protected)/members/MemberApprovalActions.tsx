'use client';

import { useState } from 'react';
import { 
  approveMember, 
  rejectMember, 
  deleteMember, 
  regenerateMembershipId, 
  sendPasswordReset 
} from './actions';
import { ShieldCheck, AlertTriangle, Check, X, RefreshCw, Mail, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MemberApprovalActions({ memberId, status, email }: { memberId: string, status: string, email: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: () => Promise<any>, confirmMsg: string, successMsg: string) => {
    if (!confirm(confirmMsg)) return;
    setLoading(true);
    try {
      const res = await action();
      if (res.error) alert(res.error);
      else {
        alert(successMsg);
        if (confirmMsg.includes('delete')) router.push('/admin/members');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
              onClick={() => handleAction(() => approveMember(memberId), 'Approve member and generate ID?', 'Member approved!')}
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : <><Check size={18} /> Approve Member</>}
            </button>
            <button 
              onClick={() => handleAction(() => rejectMember(memberId), 'Reject this application?', 'Application rejected.')}
              disabled={loading}
              className="w-full py-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <X size={18} /> Reject Application
            </button>
          </>
        )}
        
        {status === 'ACTIVE' && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl mb-2">
            <p className="text-xs font-bold text-emerald-800 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Membership is Active
            </p>
          </div>
        )}

        <button 
          onClick={() => handleAction(() => regenerateMembershipId(memberId), 'Regenerate membership ID?', 'ID regenerated successfully!')}
          disabled={loading}
          className="w-full text-left px-4 py-3 bg-white border border-slate-200 hover:border-primary hover:bg-purple-50 rounded-xl text-sm font-medium text-slate-700 transition-colors flex items-center gap-3"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Regenerate Membership ID
        </button>
        
        <button 
          onClick={() => handleAction(() => sendPasswordReset(email), 'Send password reset email to ' + email + '?', 'Reset email sent!')}
          disabled={loading}
          className="w-full text-left px-4 py-3 bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 rounded-xl text-sm font-medium text-slate-700 transition-colors flex items-center gap-3"
        >
          <Mail className="h-4 w-4" /> Send Password Reset Email
        </button>
        
        <button 
          onClick={() => handleAction(() => deleteMember(memberId), 'PERMANENTLY delete this member account? This cannot be undone.', 'Member deleted.')}
          disabled={loading}
          className="w-full flex items-center justify-between px-4 py-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl text-sm font-bold text-rose-700 transition-colors mt-4"
        >
          <span className="flex items-center gap-2"><Trash2 className="h-4 w-4" /> Delete Account</span>
          <AlertTriangle className="h-4 w-4 opacity-50" />
        </button>
      </div>
    </div>
  );
}
