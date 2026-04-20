'use client';

import { useState, useEffect } from 'react';
import {
  CreditCard,
  History,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Users,
  Heart,
  ArrowRight
} from 'lucide-react';
import { cn, formatCurrency, formatDateShort } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/mock-data';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import MemberCardModal from '@/components/dashboard/MemberCard';

export default function MembershipPayments() {
  const [activeTab, setActiveTab] = useState('pay');
  const [profile, setProfile] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const supabase = createClient();

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
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-dark">Payments & Dues</h1>
            <p className="text-gray-500 mt-2">Manage your annual membership and view your contribution history.</p>
         </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className={cn(
              "h-20 w-20 rounded-2xl flex items-center justify-center shrink-0",
              membershipStatus === 'ACTIVE' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
            )}>
               <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
               <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Current Membership Status</p>
               <h2 className="text-2xl font-black text-dark">{membershipStatus}</h2>
               <p className="text-sm text-gray-500 mt-1">
                 {membershipStatus === 'ACTIVE' 
                  ? <>Next renewal due on <span className="font-bold">{expiryDate}</span></>
                  : 'Your membership is pending approval or payment.'}
               </p>
            </div>
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowCard(true)}
              className="btn-secondary flex-1 md:flex-none justify-center py-2.5"
            >
              Download Member Card
            </button>
            <button className="btn-primary flex-1 md:flex-none justify-center py-2.5">
              {membershipStatus === 'ACTIVE' ? 'Renew Early' : 'Pay Now'}
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
         {/* Payment Column */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="flex border-b border-gray-50">
                  <button
                    onClick={() => setActiveTab('pay')}
                    className={cn(
                      "flex-1 py-4 text-sm font-bold transition-all",
                      activeTab === 'pay' ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-dark"
                    )}
                  >
                     New Contribution
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={cn(
                      "flex-1 py-4 text-sm font-bold transition-all",
                      activeTab === 'history' ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-dark"
                    )}
                  >
                     <div className="flex items-center justify-center gap-2">
                        <History className="h-4 w-4" /> Payment History
                     </div>
                  </button>
               </div>

               <div className="p-10">
                  {activeTab === 'pay' ? (
                     <div className="space-y-10 animate-fade-in">
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="p-8 rounded-2xl border-2 border-purple-50 bg-purple-50/10 group cursor-pointer hover:border-primary transition-all">
                              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center mb-6">
                                 <Users className="h-5 w-5" />
                              </div>
                              <h3 className="font-black text-dark text-lg mb-2">Annual Dues</h3>
                              <p className="text-sm text-gray-500 mb-6 leading-relaxed">Standard membership for the 2026 calendar year.</p>
                              <div className="flex items-end gap-1">
                                 <span className="text-3xl font-black text-dark">$75</span>
                                 <span className="text-sm text-gray-400 font-bold mb-1">/ year</span>
                              </div>
                           </div>
                           <div className="p-8 rounded-2xl border-2 border-transparent bg-gray-50 group cursor-pointer hover:border-accent transition-all">
                              <div className="h-10 w-10 rounded-xl bg-accent text-white flex items-center justify-center mb-6">
                                 <Heart className="h-5 w-5" />
                              </div>
                              <h3 className="font-black text-dark text-lg mb-2">Scholarship Donation</h3>
                              <p className="text-sm text-gray-500 mb-6 leading-relaxed">Direct contribution to the PCSS Buea Scholarship Fund.</p>
                              <div className="flex items-end gap-1">
                                 <span className="text-3xl font-black text-dark">Custom</span>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h3 className="font-bold text-dark flex items-center gap-2">
                              <CreditCard className="h-5 w-5 text-gray-400" /> Select Payment Method
                           </h3>
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {['STRIPE', 'PAYPAL', 'ZELLE', 'CASHAPP'].map(method => (
                                 <div key={method} className="p-4 rounded-xl border border-gray-100 bg-white flex flex-col items-center justify-center gap-2 hover:border-primary cursor-pointer transition-all shadow-sm">
                                    <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                       <CreditCard className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{method}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <button className="btn-primary w-full justify-center py-4 text-lg">
                           Proceed to Secure Payment
                        </button>

                        <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                           <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Secure SSL</div>
                           <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> PCI-Compliant</div>
                           <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Encrypted</div>
                        </div>
                     </div>
                  ) : (
                     <div className="space-y-6 animate-fade-in">
                        {payments.length > 0 ? payments.map(payment => (
                           <div key={payment.id} className="flex items-center justify-between p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary">
                                    <Download className="h-5 w-5" />
                                 </div>
                                 <div>
                                    <p className="font-bold text-dark">{payment.type === 'MEMBERSHIP' ? 'Annual Dues' : 'Donation'}</p>
                                    <p className="text-xs text-gray-400 font-medium">{formatDateShort(payment.created_at)} • {payment.method}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-black text-dark">{formatCurrency(payment.amount)}</p>
                                 <span className={cn(
                                   "text-[10px] font-black uppercase tracking-widest",
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

         {/* Receipt Context */}
         <div className="space-y-6">
            <h3 className="font-bold text-dark">Tax & Receipts</h3>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
               <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-accent flex items-center justify-center shrink-0">
                     <AlertCircle className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                     BUPEXSA USA is a registered non-profit. Your membership dues and donations may be tax-deductible.
                  </p>
               </div>
               <div className="h-px bg-gray-50"></div>
               <button className="flex items-center justify-between w-full group">
                  <span className="text-sm font-bold text-dark group-hover:text-primary transition-colors">Tax Statement 2024</span>
                  <Download className="h-4 w-4 text-gray-300" />
               </button>
               <button className="flex items-center justify-between w-full group">
                  <span className="text-sm font-bold text-dark group-hover:text-primary transition-colors">Tax Statement 2023</span>
                  <Download className="h-4 w-4 text-gray-300" />
               </button>
            </div>

            <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full blur-3xl -mr-16 -mt-16"></div>
                </div>
                <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-60">Need help?</h4>
                <p className="text-sm mb-6 leading-relaxed">
                   Having issues with your payment or need a custom invoice? Our finance team is here to help.
                </p>
                <Link href="/contact" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group">
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
