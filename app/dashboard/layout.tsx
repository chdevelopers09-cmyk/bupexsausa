'use client';
// Refreshed to resolve ChunkLoadError


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  CreditCard,
  Calendar,
  LogOut,
  Settings,
  ChevronRight,
  Menu,
  X,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/mock-data';
import { createClient } from '@/lib/supabase/client';
import NotificationBell from '@/components/dashboard/NotificationBell';
import MembershipExpiryPopup from '@/components/dashboard/MembershipExpiryPopup';

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Payments & Dues', href: '/dashboard/payments', icon: CreditCard },
  { label: 'My Events', href: '/dashboard/events', icon: Calendar },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const supabase = createClient();

  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error && error.message.includes('lock')) {
           console.warn('Supabase session lock contention caught gracefully.', error);
        }
        const user = session?.user;
        if (user) {
          setUserId(user.id);
          const { data } = await supabase
            .from('members')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(data);

          // Fetch settings
          const { data: settingsData } = await supabase.from('site_settings').select('*');
          const settingsObj = settingsData?.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}) || {};
          setSettings(settingsObj);
        }
      } catch (err) {
        console.error('Error fetching layout profile:', err);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const userInitials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : '??';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-50",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
           <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0">
              <span className="text-white font-black text-sm">BX</span>
            </div>
            {isSidebarOpen && (
              <span className="font-black text-dark text-lg animate-fade-in truncate">{SITE_CONFIG.name}</span>
            )}
           </Link>
        </div>

        <nav className="flex-1 py-10 px-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "sidebar-link relative group",
                  active && "sidebar-link-active"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", active ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
                {isSidebarOpen && (
                  <span className="animate-fade-in">{link.label}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="pt-6 mt-6 border-t border-gray-100">
            <Link
              href="/"
              className={cn(
                "sidebar-link relative group text-gray-500 hover:text-primary"
              )}
            >
              <Globe className="h-5 w-5 shrink-0" />
              {isSidebarOpen && (
                <span className="animate-fade-in">View Website</span>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                  View Website
                </div>
              )}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
           <button
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-dark transition-colors"
           >
             {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
           </button>

           <div className="flex items-center gap-6">
             {userId && <NotificationBell userId={userId} />}
             <div className="relative" ref={dropdownRef}>
               <div 
                 className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer group"
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               >
                  <div className="text-right hidden sm:block">
                     <p className="text-sm font-bold text-dark leading-none group-hover:text-primary transition-colors">
                       {loading ? 'Loading...' : (profile?.full_name || 'Member')}
                     </p>
                     <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">
                       {profile?.status ? `${profile.status} Member` : 'Member'}
                     </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white shadow-sm flex items-center justify-center text-primary font-bold overflow-hidden transition-transform group-hover:scale-105">
                       {loading ? '...' : (
                         profile?.avatar_path ? (
                           <img src={profile.avatar_path} alt="Avatar" className="w-full h-full object-cover" />
                         ) : userInitials
                       )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
               </div>

               {/* Dropdown Menu */}
               {isDropdownOpen && (
                 <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
                    <div className="p-4 border-b border-gray-50 sm:hidden">
                       <p className="text-sm font-bold text-dark truncate">{profile?.full_name}</p>
                       <p className="text-xs text-gray-500 mt-1 truncate">{profile?.email}</p>
                    </div>
                    <div className="p-2">
                       <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors">
                          <User className="h-4 w-4" /> My Profile
                       </Link>
                       <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors">
                          <Settings className="h-4 w-4" /> Account Settings
                       </Link>
                    </div>
                    <div className="p-2 border-t border-gray-50">
                       <button 
                         onClick={handleLogout}
                         className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                       >
                          <LogOut className="h-4 w-4" /> Sign Out
                       </button>
                    </div>
                 </div>
               )}
             </div>
           </div>
        </header>

        <main className="p-8 pb-16 animate-fade-in">
          <MembershipExpiryPopup
            memberName={profile?.full_name}
            expiryDate={profile?.membership_expiry_date}
            membershipFee={parseFloat(settings.membership_fee || '100')}
          />
          {children}
        </main>
      </div>
    </div>
  );
}
