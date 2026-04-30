'use client';

import { useState, useRef } from 'react';
import { Download, X } from 'lucide-react';

export default function MemberCardModal({ profile, onClose }: { profile: any, onClose: () => void }) {
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      // We dynamically import html2canvas so it's not in the main bundle if not needed,
      // and won't crash if it's not installed synchronously
      const html2canvas = (await import('html2canvas')).default;
      if (!cardRef.current) return;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          // html2canvas doesn't support modern color functions like oklch or oklab
          // We need to strip these from the cloned document's stylesheets to prevent crashes
          try {
            const sheets = clonedDoc.styleSheets;
            for (let i = 0; i < sheets.length; i++) {
              const sheet = sheets[i];
              try {
                const rules = sheet.cssRules;
                if (!rules) continue;
                for (let j = rules.length - 1; j >= 0; j--) {
                  const rule = rules[j];
                  if (rule && rule.cssText && (rule.cssText.includes('oklch') || rule.cssText.includes('oklab'))) {
                    sheet.deleteRule(j);
                  }
                }
              } catch (e) {
                // Ignore cross-origin stylesheet errors
              }
            }
          } catch (e) {
            console.error('Error cleaning styles for html2canvas:', e);
          }
        }
      });
      
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = `BUPEXSA_MemberCard_${profile.full_name.replace(/\s+/g, '_')}.png`;
      a.click();
    } catch (err) {
      console.error('Download failed', err);
      // Fallback: simple print
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const userInitials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : 'BX';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-transparent max-w-sm w-full relative">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* The Card Component */}
        <div 
          ref={cardRef} 
          className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl member-card-gradient"
          style={{
            background: 'linear-gradient(135deg, #1A0B2E 0%, #481C7A 100%)'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
             backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
             backgroundSize: '24px 24px'
          }}></div>
          
          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
            {/* Header */}
            <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md shrink-0">
                     <span className="font-black text-sm">BX</span>
                  </div>
                  <div>
                     <p className="text-[8px] uppercase tracking-[0.2em] opacity-80 font-bold">BUPEXSA USA</p>
                     <p className="text-sm font-black tracking-wider text-accent truncate">ALUMNI ASSOCIATION</p>
                  </div>
               </div>
               
               <div className="text-right">
                 <span className="inline-block px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-white/20 text-white backdrop-blur-md">
                   {profile.status}
                 </span>
               </div>
            </div>

            {/* Middle Section */}
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl bg-white/10 border-2 border-white/20 overflow-hidden shrink-0 flex items-center justify-center backdrop-blur-md">
                 {profile.avatar_path ? (
                    <img src={profile.avatar_path} alt="Avatar" className="w-full h-full object-cover" />
                 ) : (
                    <span className="font-black text-xl opacity-50">{userInitials}</span>
                 )}
              </div>
              <div className="min-w-0">
                 <p className="text-[10px] uppercase tracking-widest opacity-70 mb-0.5">Member Name</p>
                 <p className="font-black text-lg truncate leading-none">{profile.full_name}</p>
                 <p className="text-xs opacity-90 mt-1">Class of {profile.graduation_year || 'Unknown'}</p>
                 <p className="text-[10px] opacity-70 mt-0.5 truncate">{profile.chapters?.name || profile.us_state}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-2">
               <div>
                 <p className="text-[8px] uppercase tracking-widest opacity-60">Member ID</p>
                 <p className="font-mono text-xs tracking-widest">{profile.membership_id || 'PENDING'}</p>
               </div>
               
               <div className="text-right">
                 <p className="text-[8px] uppercase tracking-widest opacity-60">Valid Thru</p>
                 <p className="font-bold text-xs">{profile.expiry_date ? new Date(profile.expiry_date).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }) : 'N/A'}</p>
               </div>
            </div>
            
            {/* Hologram aesthetic */}
            <div className="absolute right-6 bottom-16 opacity-30 mix-blend-overlay pointer-events-none">
              <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/50 rotating-slow"></div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button 
          onClick={handleDownload}
          disabled={downloading}
          className="mt-6 w-full btn-primary justify-center py-4 text-sm gap-2"
        >
          {downloading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? 'Preparing Card...' : 'Save as Image'}
        </button>
        <p className="text-center text-white/50 text-xs mt-3">You can also print this page directly.</p>
      </div>
    </div>
  );
}
