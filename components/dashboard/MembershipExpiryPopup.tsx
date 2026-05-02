'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, CreditCard, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MembershipExpiryPopupProps {
  memberName?: string;
  expiryDate?: string; // ISO date string
  membershipFee?: number;
  onDismiss?: () => void;
}

export default function MembershipExpiryPopup({ memberName, expiryDate, membershipFee = 100, onDismiss }: MembershipExpiryPopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if membership is expired or expiring soon
    const checkExpiry = () => {
      if (!expiryDate) {
        // No expiry date = simulate expired for demo
        setShowPopup(true);
        setShowBanner(true);
        return;
      }

      const expiry = new Date(expiryDate);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry <= 0) {
        // Already expired
        setShowPopup(true);
        setShowBanner(true);
      } else if (daysUntilExpiry <= 30) {
        // Expiring within 30 days
        setShowBanner(true);
      }
    };

    // Delay so it appears after page load (2s for better visibility)
    const timer = setTimeout(checkExpiry, 2000);
    return () => clearTimeout(timer);
  }, [expiryDate]);

  const handleRenewClick = (e: React.MouseEvent) => {
    // Dispatch a custom event that the payments page can listen to
    window.dispatchEvent(new CustomEvent('renew-membership'));
    
    if (pathname === '/dashboard/payments') {
      // If already on page, we just need the event to trigger
      setShowPopup(false);
    } else {
      // If on other page, the Link component will handle navigation
      // and the ?action=renew param will handle it on mount
      setShowPopup(false);
    }
  };

  const handleDismissPopup = () => {
    setShowPopup(false);
    onDismiss?.();
  };

  const isExpired = !expiryDate || new Date(expiryDate) <= new Date();
  const formattedDate = expiryDate
    ? new Date(expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'N/A';

  return (
    <>
      {/* Top Notification Banner */}
      {showBanner && (
        <div className={`w-full px-4 py-3 flex items-center justify-between gap-4 animate-in slide-in-from-top duration-500 ${
          isExpired 
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
            : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-xs font-black uppercase tracking-wider">
              {isExpired
                ? `Your annual membership has expired. Please renew to continue accessing member benefits.`
                : `Your membership expires on ${formattedDate}. Renew now to avoid service interruption.`
              }
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/dashboard/payments?action=renew"
              onClick={handleRenewClick}
              className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-colors"
            >
              Renew Now
            </Link>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={handleDismissPopup}
          />

          {/* Popup Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Close Button */}
            <button
              onClick={handleDismissPopup}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-dark transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-8 text-center text-white">
              <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Clock className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-black tracking-tight">
                Membership Expired
              </h2>
              <p className="text-white/80 text-xs font-medium mt-1">
                Your annual fee requires renewal
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-bold leading-relaxed">
                  Hi <span className="text-dark">{memberName || 'Member'}</span>, your BUPEXSA USA annual membership fee has expired.
                  Please renew to continue enjoying all member benefits.
                </p>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-bold text-sm">Annual Fee Renewal</span>
                  <span className="text-dark font-black text-lg">${membershipFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-orange-100" />
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-2">
                  Due immediately to restore access
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  href="/dashboard/payments?action=renew"
                  onClick={handleRenewClick}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-purple-600 text-white font-black text-sm shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Renew Membership — ${membershipFee.toFixed(2)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleDismissPopup}
                  className="w-full py-3 rounded-2xl bg-gray-50 text-gray-400 font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  Remind Me Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
