'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronRight,
  Bell,
  ShieldCheck,
  LogOut,
  BarChart3,
  Users,
  CreditCard,
  Calendar,
  Layout,
  Globe,
  ImageIcon,
  Mail,
  Settings,
  UserPlus,
  ChevronDown,
  User as UserIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/mock-data';
import { createClient } from '@/lib/supabase/client';

interface ClientAdminLayoutProps {
  children: React.ReactNode;
  isSuperAdmin: boolean;
  profile: any;
  userEmail: string | undefined;
}

export default function ClientAdminLayout({ children, isSuperAdmin, profile, userEmail }: ClientAdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const supabase = createClient();

  const adminLinks = [
    { label: 'Admin Dashboard', href: '/admin', icon: BarChart3 },
    { label: 'Manage Members', href: '/admin/members', icon: Users },
    { label: 'Financials', href: '/admin/payments', icon: CreditCard },
    { label: 'Events & RSVPs', href: '/admin/events', icon: Calendar },
    { label: 'Visual Builder', href: '/admin/visual-builder', icon: Layout },
    { label: 'Regional Chapters', href: '/admin/chapters', icon: Globe },
    { label: 'Gallery Admin', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Bulk Notifications', href: '/admin/notifications', icon: Mail },
    { label: 'Portal Users', href: '/admin/users', icon: UserPlus },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const userInitials = profile?.full_name
    ? profile.full_name.split(' ').map((n: any) => n[0]).join('').toUpperCase()
    : 'AD';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Admin Sidebar */}
      <aside
        className={cn(
          "bg-[#0F172A] text-slate-300 flex flex-col transition-all duration-300 z-50 sticky top-0 h-screen",
          isSidebarOpen ? "w-72" : "w-16"
        )}
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
           <Link href="/admin" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center shrink-0">
                 <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              {isSidebarOpen && (
                 <div className="animate-fade-in overflow-hidden">
                    <p className="text-white font-black text-sm leading-tight">ADMIN PANEL</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{SITE_CONFIG.name}</p>
                 </div>
              )}
           </Link>
        </div>

        <nav className="flex-1 py-10 px-3 space-y-1 overflow-y-auto">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  active
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0 transition-colors", active ? "text-white" : "text-slate-500 group-hover:text-primary")} />
                {isSidebarOpen && <span className="animate-fade-in">{link.label}</span>}
              </Link>
            );
          })}

        </nav>

        <div className="p-4 border-t border-slate-800">
           <Link
             href="/"
             className={cn(
               "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all",
               !isSidebarOpen && "justify-center"
             )}
           >
              <LogOut className="h-4 w-4" />
              {isSidebarOpen && <span>Exit to Website</span>}
           </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-6 flex-1">
               <button
                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                 className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                 title="Toggle Navigation"
               >
                 {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
               </button>

               {/* Breadcrumbs */}
               <nav className="flex items-center gap-2 text-sm font-medium">
                  <Link href="/admin" className="text-slate-400 hover:text-primary transition-colors">Admin</Link>
                  {pathname !== '/admin' && pathname.split('/').filter(Boolean).slice(1).map((segment, idx, arr) => {
                    const href = `/admin/${arr.slice(0, idx + 1).join('/')}`;
                    const isLast = idx === arr.length - 1;
                    return (
                      <div key={segment} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                        <Link 
                          href={href} 
                          className={cn(
                            "capitalize transition-colors",
                            isLast ? "text-slate-900 font-bold pointer-events-none" : "text-slate-400 hover:text-primary"
                          )}
                        >
                          {segment.replace(/-/g, ' ')}
                        </Link>
                      </div>
                    );
                  })}
               </nav>
            </div>

           <div className="flex items-center gap-5">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
              </div>

              <div className="h-8 w-px bg-slate-100 mx-2"></div>

              <button className="relative p-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-white"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center gap-3 pl-4 cursor-pointer group"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                   <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-primary transition-colors">
                        {profile?.full_name || (isSuperAdmin ? 'Super Admin' : 'Admin')}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                        {isSuperAdmin ? 'Full Access' : 'Admin Access'}
                      </p>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/25 overflow-hidden transition-transform group-hover:scale-105">
                      {profile?.avatar_path ? (
                        <img src={profile.avatar_path} alt="Avatar" className="w-full h-full object-cover" />
                      ) : userInitials}
                   </div>
                   <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
                     <div className="p-4 border-b border-slate-50">
                        <p className="text-sm font-bold text-slate-900 truncate">{profile?.full_name}</p>
                        <p className="text-xs text-slate-500 mt-1 truncate">{userEmail}</p>
                     </div>
                     <div className="p-2">
                        <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                           <UserIcon className="h-4 w-4" /> My Profile
                        </Link>
                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                           <Settings className="h-4 w-4" /> Account Settings
                        </Link>
                     </div>
                     <div className="p-2 border-t border-slate-50">
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

        <main className="p-10 pb-20 animate-fade-in flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
