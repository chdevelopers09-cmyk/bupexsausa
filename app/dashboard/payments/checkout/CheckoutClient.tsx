'use client';

import { useState } from 'react';
import { CreditCard, Smartphone, Building, DollarSign, ChevronRight, CheckCircle2, ShieldCheck, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const PAYMENT_METHODS = [
  { id: 'stripe', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Secure payment via Stripe Elements' },
  { id: 'paypal', label: 'PayPal', icon: DollarSign, desc: 'Pay with PayPal balance or card' },
  { id: 'zelle', label: 'Zelle', icon: Building, desc: 'Bank transfer (Proof of payment required)' },
  { id: 'cashapp', label: 'CashApp', icon: Smartphone, desc: 'Mobile payment (Proof of payment required)' },
];

export default function CheckoutClient({ fee, memberId }: { fee: number, memberId: string }) {
  const [method, setMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleManualPayment = async () => {
    if (!proofFile) {
        alert('Please upload a screenshot of your payment proof.');
        return;
    }
    setLoading(true);
    try {
        const fileExt = proofFile.name.split('.').pop();
        const filePath = `${memberId}/proof-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
            .from('payment-proofs')
            .upload(filePath, proofFile);

        if (uploadError) throw uploadError;

        const { error: paymentError } = await supabase.from('payments').insert({
            member_id: memberId,
            type: 'MEMBERSHIP',
            amount: fee,
            method: method.toUpperCase(),
            status: 'PENDING_VERIFICATION',
            proof_storage_path: filePath,
        });

        if (paymentError) throw paymentError;

        setSuccess(true);
    } catch (err: any) {
        alert(err.message);
    } finally {
        setLoading(false);
    }
  };

  if (success) {
    return (
        <div className="max-w-xl mx-auto text-center py-12 animate-fade-in space-y-8">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-dark">Payment Submitted!</h1>
                <p className="text-gray-500 mt-3 leading-relaxed">
                    Thank you for your payment. Since you used a manual method ({method.toUpperCase()}), our team will verify the proof and activate your membership within 1-2 business days.
                </p>
            </div>
            <Link href="/dashboard" className="btn-primary inline-flex">
                Back to Dashboard
            </Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl grid lg:grid-cols-3 gap-12 animate-fade-in">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-xl font-black text-dark">Select Payment Method</h2>
            <p className="text-sm text-gray-400 mt-1">All payments are secure and encrypted.</p>
          </div>
          
          <div className="p-8 space-y-4">
            {PAYMENT_METHODS.map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                    method === m.id ? 'border-primary bg-purple-50 shadow-md' : 'border-gray-50 hover:border-gray-200'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${method === m.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-black text-dark uppercase tracking-wide text-xs">{m.label}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{m.desc}</p>
                  </div>
                  {method === m.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content based on method */}
        {(method === 'zelle' || method === 'cashapp') && (
            <div className="bg-amber-50 rounded-[2rem] border border-amber-200 p-8 space-y-6 animate-fade-in">
                <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                        <h3 className="font-black text-amber-900 leading-tight">Manual Payment Instructions</h3>
                        <p className="text-sm text-amber-800/80 mt-1">Please follow these steps to pay via {method.toUpperCase()}:</p>
                    </div>
                </div>
                
                <div className="bg-white/80 rounded-2xl p-6 border border-amber-200/50 space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-amber-100">
                        <span className="text-xs font-bold text-amber-900/50 uppercase">Recipient</span>
                        <span className="font-black text-dark tabular-nums">BUPEXSA USA</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-amber-100">
                        <span className="text-xs font-bold text-amber-900/50 uppercase">Handle/Details</span>
                        <span className="font-black text-primary font-mono select-all">
                            {method === 'zelle' ? 'zelle@bupexsausa.org' : '$bupexsausa'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-bold text-amber-900/50 uppercase">Amount</span>
                        <span className="font-black text-dark tabular-nums">${fee.toFixed(2)}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="label-field !text-amber-900">Upload Payment Proof (Screenshot)</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => setProofFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary-dark transition-all" 
                    />
                </div>

                <button 
                    onClick={handleManualPayment}
                    disabled={loading || !proofFile}
                    className="w-full btn-primary justify-center py-4 rounded-xl text-base disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : 'Submit Proof of Payment'}
                </button>
            </div>
        )}

        {method === 'stripe' && (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-6 text-center shadow-xl">
                 <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-blue-600">
                    <CreditCard size={40} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-dark">Pay with Card</h3>
                    <p className="text-gray-500 mt-1 text-sm">Use your credit or debit card for instant activation.</p>
                 </div>
                 <button disabled className="btn-primary w-full justify-center py-4 rounded-xl opacity-60 cursor-not-allowed">
                    Proceed to Stripe Checkout
                 </button>
                 <p className="text-xs text-gray-400">Card processing is being initialized...</p>
            </div>
        )}

        {method === 'paypal' && (
             <div className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-6 text-center shadow-xl">
                <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-blue-800">
                   <DollarSign size={40} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-dark">Pay with PayPal</h3>
                   <p className="text-gray-500 mt-1 text-sm">Fast, easy, and secure with your PayPal account.</p>
                </div>
                <button disabled className="bg-[#0070ba] text-white w-full flex items-center justify-center py-4 rounded-xl font-black opacity-60 cursor-not-allowed">
                   PayPal Checkout
                </button>
           </div>
        )}
      </div>

      <aside className="space-y-6">
        <div className="bg-[#0F172A] text-white rounded-[2.5rem] p-8 shadow-2xl">
           <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" /> Order Summary
           </h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                 <span className="text-slate-400">Membership Type</span>
                 <span className="text-white uppercase tracking-widest text-[10px] font-black bg-white/10 px-2 py-0.5 rounded">Annual</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Regular Fee</span>
                 <span className="text-white font-bold tabular-nums">${fee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-800 my-2" />
              <div className="flex justify-between items-center pt-2">
                 <span className="text-white font-black">Total Due</span>
                 <span className="text-2xl font-black text-white tabular-nums">${fee.toFixed(2)}</span>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
           <h4 className="text-sm font-black text-dark uppercase tracking-widest">Why Pay Dues?</h4>
           <p className="text-xs text-gray-500 leading-relaxed">
              Your dues power our annual conventions, alumni scholarships, and direct infrastructure support for PCSS Buea campus.
           </p>
           <ul className="text-[11px] font-bold text-slate-700 space-y-2">
              <li className="flex items-center gap-2">✓ Support school projects</li>
              <li className="flex items-center gap-2">✓ Voting rights in elections</li>
              <li className="flex items-center gap-2">✓ Convention discounts</li>
           </ul>
        </div>
      </aside>
    </div>
  );
}
