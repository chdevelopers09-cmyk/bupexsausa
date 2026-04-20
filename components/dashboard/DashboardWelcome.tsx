'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CreditCard } from 'lucide-react';
import MemberCardModal from './MemberCard';

export default function DashboardWelcome({ profile }: { profile: any }) {
  const [showCard, setShowCard] = useState(false);

  // Check if dues are overdue
  const isOverdue = profile.expiry_date && new Date(profile.expiry_date) < new Date();

  return (
    <>
      <div className="section-primary rounded-3xl p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">Welcome Back, {profile?.full_name?.split(' ')[0] || 'Member'}!</h1>
            
            {isOverdue ? (
               <div className="mt-4 bg-red-500/20 border border-red-400/30 text-white p-4 rounded-xl flex items-start gap-3 backdrop-blur-sm max-w-lg">
                  <AlertCircle className="h-5 w-5 text-red-300 shrink-0 mt-0.5" />
                  <div>
                     <p className="font-bold text-sm text-red-100">Membership Dues Overdue</p>
                     <p className="text-xs text-red-200/80 mt-1 leading-relaxed">
                        Your annual membership expired on {new Date(profile.expiry_date).toLocaleDateString()}. Please renew your membership to maintain active status and benefits.
                     </p>
                     <Link href="/dashboard/payments" className="inline-flex items-center gap-1.5 mt-3 text-xs font-black uppercase tracking-widest text-white hover:text-red-200 transition-colors">
                        <CreditCard className="h-3 w-3" /> Renew Now
                     </Link>
                  </div>
               </div>
            ) : (
               <p className="text-white/70 max-w-lg leading-relaxed">
                 Good to see you again. Your membership status is <span className="text-white font-bold">{profile?.status}</span> 
                 {profile?.expiry_date ? ` and is active until ${new Date(profile.expiry_date).toLocaleDateString()}.` : '.'}
               </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
               <button 
                 onClick={() => setShowCard(true)} 
                 className="btn-white text-xs py-2"
               >
                  Download Member Card
               </button>
               <Link href="/dashboard/events" className="btn-white text-xs py-2 opacity-70 hover:opacity-100">
                  My RSVPs
               </Link>
               <Link href="/dashboard/profile" className="btn-white text-xs py-2 opacity-70 hover:opacity-100">
                  Edit Profile
               </Link>
            </div>
          </div>
        </div>
      </div>

      {showCard && (
        <MemberCardModal profile={profile} onClose={() => setShowCard(false)} />
      )}
    </>
  );
}
