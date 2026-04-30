'use client';

import { X, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { approvePayment, rejectPayment } from './actions';

export default function ProofModal({ payment, onClose }: { payment: any, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const proofUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/payment-proofs/${payment.proof_storage_path}`;

  const handleApprove = async () => {
    if (!confirm('Confirm verification of this manual payment?')) return;
    setLoading(true);
    const res = await approvePayment(payment.id, payment.member_id);
    setLoading(false);
    if (res.error) alert(res.error);
    else {
      alert('Payment verified and membership updated!');
      onClose();
    }
  };

  const handleReject = async () => {
    if (!confirm('Reject this payment proof? The user will see a FAILED status.')) return;
    setLoading(true);
    const res = await rejectPayment(payment.id);
    setLoading(false);
    if (res.error) alert(res.error);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in fade-in zoom-in duration-300">
        {/* Left: Image View */}
        <div className="lg:flex-1 bg-slate-100 relative min-h-[300px] flex items-center justify-center p-8">
           <img 
             src={proofUrl} 
             alt="Payment Proof" 
             className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-xl"
           />
           <a 
             href={proofUrl} 
             target="_blank" 
             className="absolute top-6 left-6 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg text-slate-500 hover:text-primary transition-all flex items-center gap-2 text-xs font-bold"
           >
              <ExternalLink size={14} /> View Full Image
           </a>
        </div>

        {/* Right: Details & Actions */}
        <div className="w-full lg:w-[400px] p-10 flex flex-col">
           <div className="flex justify-between items-start mb-10">
              <div>
                 <h2 className="text-2xl font-black text-slate-900">Verify Payment</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manual Verification Required</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                 <X size={24} className="text-slate-400" />
              </button>
           </div>

           <div className="space-y-6 flex-1">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Transaction Details</p>
                 <div className="space-y-4">
                    <div className="flex justify-between">
                       <span className="text-sm font-medium text-slate-500">Member</span>
                       <span className="text-sm font-bold text-slate-900">{payment.members?.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-sm font-medium text-slate-500">Amount</span>
                       <span className="text-sm font-black text-primary">${payment.amount}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-sm font-medium text-slate-500">Method</span>
                       <span className="text-sm font-bold text-slate-900">{payment.method}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-sm font-medium text-slate-500">Date Sent</span>
                       <span className="text-sm font-bold text-slate-900">{new Date(payment.created_at).toLocaleDateString()}</span>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800">
                 <AlertCircle size={18} className="shrink-0 mt-0.5" />
                 <p className="text-xs leading-relaxed">
                    Check for the <span className="font-bold">Transaction Reference Number</span> or <span className="font-bold">Sender Name</span> in the image above and match it with your bank/app records.
                 </p>
              </div>
           </div>

           <div className="mt-10 space-y-3">
              <button 
                onClick={handleApprove}
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : <><Check size={18} /> Approve & Activate</>}
              </button>
              <button 
                onClick={handleReject}
                disabled={loading}
                className="w-full py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl text-sm font-bold hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all disabled:opacity-50"
              >
                Reject Proof
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
