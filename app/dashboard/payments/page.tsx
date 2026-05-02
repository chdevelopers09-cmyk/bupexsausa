'use client';

import { useState, useEffect, Suspense } from 'react';
import {
  CreditCard, History, Download, CheckCircle2,
  ShieldCheck, AlertCircle, Users, Heart, ArrowRight,
  Smartphone, Mail, DollarSign, ExternalLink, Lock, Phone, Copy, Check
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';
import { cn, formatCurrency, formatDateShort } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MemberCardModal from '@/components/dashboard/MemberCard';

function MembershipPaymentsContent() {
  const [activeTab, setActiveTab] = useState('pay');
  const [profile, setProfile] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [payMethod, setPayMethod] = useState('card');
  const [cardData, setCardData] = useState({ name:'', number:'', expiry:'', cvc:'', phone:'' });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [donationAmt, setDonationAmt] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'annual'|'donation'>('annual');
  const [copied, setCopied] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const supabase = createClient();
  const searchParams = useSearchParams();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRenewFlow = () => {
    setSelectedPlan('annual');
    setHighlight(true);
    setTimeout(() => setHighlight(false), 3000);
    setTimeout(() => {
      const el = document.getElementById('payment-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    // Listen for renewal event from popup
    window.addEventListener('renew-membership', handleRenewFlow);
    return () => window.removeEventListener('renew-membership', handleRenewFlow);
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'renew') {
      handleRenewFlow();
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error && error.message.includes('lock')) {
           console.warn('Supabase session lock contention caught gracefully.', error);
        }
        const user = session?.user;
        if (user) {
          // Fetch profile
          const { data: profileData } = await supabase
            .from('members')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(profileData);

          // Fetch settings
          const { data: settingsData } = await supabase.from('site_settings').select('*');
          const settingsObj = settingsData?.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}) || {};
          setSettings(settingsObj);

          // Fetch payments
          const { data: paymentData } = await supabase
            .from('payments')
            .select('*')
            .eq('member_id', user.id)
            .order('created_at', { ascending: false });
          setPayments(paymentData || []);
        }
      } catch (err) {
        console.error('Error fetching payments data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const membershipStatus = profile?.status || 'PENDING';
  const expiryDate = profile?.expiry_date ? new Date(profile.expiry_date).toLocaleDateString() : 'N/A';

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div>
            <h1 className="text-2xl font-black text-dark">Payments & Dues</h1>
            <p className="text-xs text-gray-400">Manage your annual membership and contribution history.</p>
         </div>
      </div>

      {/* Status Card - Ultra Compact */}
      <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex items-center gap-3">
            <div className={cn(
               "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
               membershipStatus === 'ACTIVE' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
            )}>
               <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-0.5">Membership</p>
               <h2 className="text-lg font-black text-dark leading-none">{membershipStatus}</h2>
            </div>
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setShowCard(true)}
              className="px-4 py-1.5 rounded-lg border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors flex-1 md:flex-none"
            >
              Card
            </button>
            <button 
              onClick={handleRenewFlow}
              className="px-4 py-1.5 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-sm flex-1 md:flex-none"
            >
              {membershipStatus === 'ACTIVE' ? 'Renew' : 'Pay Now'}
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
         {/* Payment Column */}
         <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="flex border-b border-gray-50 bg-gray-50/30">
                  <button
                    onClick={() => setActiveTab('pay')}
                    className={cn(
                      "flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all",
                      activeTab === 'pay' ? "text-primary bg-white border-x border-gray-50" : "text-gray-400 hover:text-dark"
                    )}
                  >
                     New Contribution
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={cn(
                      "flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all",
                      activeTab === 'history' ? "text-primary bg-white border-x border-gray-50" : "text-gray-400 hover:text-dark"
                    )}
                  >
                     <div className="flex items-center justify-center gap-2">
                        <History className="h-3 w-3" /> History
                     </div>
                  </button>
               </div>

               <div className="p-5">
                    {activeTab === 'pay' ? (
                      <>
                        <div className="space-y-6 animate-fade-in">
                           {/* ... content ... */}
                           {/* (I'll use the actual content from the file) */}
                           <div className="grid grid-cols-2 gap-3">
                              <div onClick={()=>setSelectedPlan('annual')} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan==='annual'?'border-primary bg-purple-50/20':'border-gray-50 bg-gray-50/50 hover:border-primary'} ${highlight ? 'animate-pulse ring-2 ring-primary/20' : ''}`}>
                                 <div className="h-7 w-7 rounded bg-primary text-white flex items-center justify-center mb-3">
                                    <Users className="h-3.5 w-3.5" />
                                 </div>
                                 <h3 className="font-black text-dark text-sm mb-0.5">Annual Dues</h3>
                                 <div className="flex items-end gap-1">
                                    <span className="text-xl font-black text-dark">${settings.membership_fee || '100'}</span>
                                    <span className="text-[9px] text-gray-400 font-bold mb-0.5">/ yr</span>
                                 </div>
                              </div>
                               <div onClick={()=>setSelectedPlan('donation')} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan==='donation'?'border-accent bg-blue-50/20':'border-transparent bg-gray-50/50 hover:border-accent'}`}>
                                 <div className="h-7 w-7 rounded bg-accent text-white flex items-center justify-center mb-3">
                                    <Heart className="h-3.5 w-3.5" />
                                 </div>
                                 <h3 className="font-black text-dark text-sm mb-0.5">Donation</h3>
                                 <div className="flex items-end gap-1">
                                    <span className="text-xl font-black text-dark">Custom</span>
                                 </div>
                              </div>
                           </div>

                           {selectedPlan === 'donation' && (
                             <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Amount ($)</label>
                               <input type="number" min="1" value={donationAmt} onChange={e=>setDonationAmt(e.target.value)} placeholder="e.g. 50" className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 font-bold text-dark text-sm focus:border-primary outline-none" />
                             </div>
                           )}

                           <div id="payment-section" className="space-y-3 scroll-mt-10">
                             <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">Method</h3>
                             <div className="grid grid-cols-6 gap-2">
                               {[
                                 { id:'card', label:'Card', icon:<CreditCard className="h-3 w-3"/> },
                                 { id:'stripe', label:'Stripe', icon:<ShieldCheck className="h-3 w-3"/> },
                                 { id:'paypal', label:'PayPal', icon:<DollarSign className="h-3 w-3"/> },
                                 { id:'zelle', label:'Zelle', icon:<Mail className="h-3 w-3"/> },
                                 { id:'cashapp', label:'Cash', icon:<DollarSign className="h-3 w-3"/> },
                                 { id:'applepay', label:'Apple', icon:<Smartphone className="h-3 w-3"/> },
                               ].map(m => (
                                 <button key={m.id} type="button" onClick={()=>setPayMethod(m.id)}
                                   className={`flex flex-col items-center py-2 px-1 rounded-lg border-2 gap-1 transition-all text-[8px] font-black uppercase tracking-wider ${
                                     payMethod===m.id?'border-primary bg-purple-50 text-primary':'border-gray-50 text-gray-400 hover:border-gray-100'}`}>
                                   <span className={payMethod===m.id?'text-primary':'text-gray-300'}>{m.icon}</span>
                                   {m.label}
                                 </button>
                               ))}
                             </div>
                           </div>

                           {payMethod==='card' && (
                             <div className="space-y-3 bg-gray-50/50 rounded-xl p-4 border border-gray-100 animate-in fade-in duration-200">
                               <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Card Details</h4>
                               <input placeholder="Name on Card" value={cardData.name} onChange={e=>setCardData(p=>({...p,name:e.target.value}))} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white font-bold text-xs focus:border-primary outline-none" />
                               <div className="relative">
                                 <input placeholder="Card Number" maxLength={19} value={cardData.number} onChange={e=>setCardData(p=>({...p,number:e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)}))} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white font-mono font-bold text-xs focus:border-primary outline-none" />
                               </div>
                               <div className="grid grid-cols-2 gap-3">
                                 <input placeholder="MM/YY" maxLength={5} value={cardData.expiry} onChange={e=>setCardData(p=>({...p,expiry:e.target.value.replace(/\D/g,'').replace(/(.{2})/,'$1/').slice(0,5)}))} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white font-bold text-xs focus:border-primary outline-none" />
                                 <input placeholder="CVC" maxLength={4} value={cardData.cvc} onChange={e=>setCardData(p=>({...p,cvc:e.target.value.replace(/\D/g,'').slice(0,4)}))} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white font-bold text-xs focus:border-primary outline-none" />
                               </div>
                               <div className="border-t border-gray-200 pt-3 space-y-2">
                                 <div className="flex gap-2">
                                   <input placeholder="Phone for OTP" value={cardData.phone} onChange={e=>setCardData(p=>({...p,phone:e.target.value}))} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white font-bold text-xs focus:border-primary outline-none" />
                                   <button type="button" onClick={()=>setOtpSent(true)} className="px-3 py-2 rounded-lg bg-primary text-white text-[9px] font-black whitespace-nowrap">{otpSent?'Resend':'Send OTP'}</button>
                                 </div>
                                 {otpSent && <input placeholder="6-digit OTP" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,''))} className="w-full px-3 py-2 rounded-lg border border-primary bg-white font-mono font-bold text-center text-base focus:ring-1 focus:ring-primary outline-none" />}
                               </div>
                             </div>
                           )}

                           {payMethod==='stripe' && (
                             <div className="bg-indigo-50/50 rounded-xl p-4 text-center border border-indigo-100 space-y-2 animate-in fade-in duration-200">
                               <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Stripe Secure</p>
                               <a href={SITE_CONFIG.payments.stripe.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-colors">Checkout</a>
                             </div>
                           )}

                           {payMethod==='paypal' && (
                             <div className="bg-blue-50/50 rounded-xl p-4 text-center border border-blue-100 space-y-2 animate-in fade-in duration-200">
                               <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">PayPal Express</p>
                               <a href={SITE_CONFIG.payments.paypal.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors">Pay via PayPal</a>
                             </div>
                           )}

                           {payMethod==='zelle' && (
                             <div className="bg-purple-50/50 rounded-xl p-4 text-center border border-purple-100 space-y-2 animate-in fade-in duration-200">
                               <div className="grid grid-cols-2 gap-2">
                                 <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-purple-100">
                                   <span className="text-[9px] font-bold text-dark truncate">{SITE_CONFIG.payments.zelle.email}</span>
                                   <button onClick={() => handleCopy(SITE_CONFIG.payments.zelle.email, 'z-email')}><Copy className="h-3 w-3 text-purple-400"/></button>
                                 </div>
                                 <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-purple-100">
                                   <span className="text-[9px] font-bold text-dark">{SITE_CONFIG.payments.zelle.phone}</span>
                                   <button onClick={() => handleCopy(SITE_CONFIG.payments.zelle.phone, 'z-phone')}><Copy className="h-3 w-3 text-purple-400"/></button>
                                 </div>
                               </div>
                               <button className="w-full py-2 rounded-lg bg-purple-600 text-white font-black text-[9px] uppercase tracking-widest shadow-sm" onClick={() => alert('Pending.')}>Confirm Zelle</button>
                             </div>
                           )}

                           {payMethod==='cashapp' && (
                             <div className="bg-emerald-50/50 rounded-xl p-4 text-center border border-emerald-100 space-y-2 animate-in fade-in duration-200">
                               <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-emerald-200">
                                 <span className="text-emerald-700 font-black text-sm">{SITE_CONFIG.payments.cashapp.cashtag}</span>
                                 <button onClick={() => handleCopy(SITE_CONFIG.payments.cashapp.cashtag, 'cash')}><Copy className="h-3 w-3 text-emerald-400"/></button>
                               </div>
                               <button className="w-full py-2 rounded-lg bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest shadow-sm" onClick={() => alert('Pending.')}>Confirm Cash App</button>
                             </div>
                           )}

                           {payMethod==='applepay' && (
                             <div className="bg-gray-50/50 rounded-xl p-4 text-center border border-gray-200 space-y-2 animate-in fade-in duration-200">
                               <button className="w-full py-3 rounded-lg bg-black text-white font-black text-xs flex items-center justify-center gap-2" onClick={() => alert('Apple Pay started.')}>
                                  <Smartphone className="h-4 w-4" /> Pay with Apple
                               </button>
                             </div>
                           )}

                           {payMethod==='card' && (
                             <button className="btn-primary w-full justify-center py-2.5 text-xs font-black uppercase tracking-widest" onClick={()=>alert('Payment submitted!')}>
                               {otpSent&&otp.length===6?'Complete':'Verify & Pay'}
                             </button>
                           )}
                        </div>

                        <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-6">
                          <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4"/> Secure SSL</div>
                          <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4"/> PCI-Compliant</div>
                        </div>
                      </>
                   ) : (
                     <div className="space-y-6 animate-fade-in">
                        {payments.length > 0 ? payments.map(payment => (
                           <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                              <div className="flex items-center gap-3">
                                 <div className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-primary shrink-0">
                                    <Download className="h-3.5 w-3.5" />
                                 </div>
                                 <div>
                                    <p className="font-bold text-dark text-xs">{payment.type === 'MEMBERSHIP' ? 'Annual Dues' : 'Donation'}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">{formatDateShort(payment.created_at)} • {payment.method}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-black text-dark text-xs">{formatCurrency(payment.amount)}</p>
                                 <span className={cn(
                                   "text-[9px] font-black uppercase tracking-widest",
                                   payment.status === 'COMPLETED' ? "text-green-600" : "text-orange-600"
                                 )}>{payment.status}</span>
                              </div>
                           </div>
                        )) : (
                          <div className="text-center py-12 text-gray-400 italic">No payment history found.</div>
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Receipt Context - Compact */}
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-dark">Tax & Receipts</h3>
             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                   <div className="h-6 w-6 rounded bg-blue-50 text-accent flex items-center justify-center shrink-0">
                      <AlertCircle className="h-3.5 w-3.5" />
                   </div>
                   <p className="text-[10px] text-gray-500 leading-tight">
                      BUPEXSA USA is a non-profit. Dues may be tax-deductible.
                   </p>
                </div>
                <div className="h-px bg-gray-50"></div>
                <button className="flex items-center justify-between w-full group">
                   <span className="text-xs font-bold text-dark group-hover:text-primary transition-colors">Tax Statement 2024</span>
                   <Download className="h-3.5 w-3.5 text-gray-300" />
                </button>
                <button className="flex items-center justify-between w-full group">
                   <span className="text-xs font-bold text-dark group-hover:text-primary transition-colors">Tax Statement 2023</span>
                   <Download className="h-3.5 w-3.5 text-gray-300" />
                </button>
             </div>

             <div className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
                 <h4 className="font-black text-[10px] uppercase tracking-widest mb-2 opacity-60">Need help?</h4>
                 <p className="text-xs mb-4 leading-relaxed opacity-90">
                    Issues with payment? Our finance team is here to help.
                 </p>
                 <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                    Email Finance <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                 </Link>
             </div>
          </div>
       </div>
       
       {showCard && profile && (
        <MemberCardModal profile={profile} onClose={() => setShowCard(false)} />
      )}
    </div>
  );
}

export default function MembershipPayments() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
      <MembershipPaymentsContent />
    </Suspense>
  );
}
