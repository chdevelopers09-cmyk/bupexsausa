'use client';

import { useState } from 'react';
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
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/mock-data';

interface ClientAdminLayoutProps {
  children: React.ReactNode;
  isSuperAdmin: boolean;
}

export default function ClientAdminLayout({ children, isSuperAdmin }: ClientAdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const adminLinks = [
    { label: 'Admin Dashboard', href: '/admin', icon: BarChart3 },
    { label: 'Manage Members', href: '/admin/members', icon: Users },
    { label: 'Financials', href: '/admin/payments', icon: CreditCard },
    { label: 'Events & RSVPs', href: '/admin/events', icon: Calendar },
    { label: 'Visual Builder', href: '/admin/visual-builder', icon: Layout },
    { label: 'Regional Chapters', href: '/admin/chapters', icon: Globe },
    { label: 'Gallery Admin', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Bulk Notifications', href: '/admin/notifications', icon: Mail },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

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

          {/* Super Admin Section - Explicitly Highlighted */}
          {isSuperAdmin && (
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-1">
              <p className={cn("px-4 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]", !isSidebarOpen && "hidden")}>Super Admin</p>
              <Link
                href="/admin/users"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  pathname.startsWith('/admin/users')
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                    : "hover:bg-slate-800 hover:text-white"
                )}
              >
                <UserPlus className={cn("h-5 w-5 shrink-0 transition-colors", pathname.startsWith('/admin/users') ? "text-white" : "text-slate-500 group-hover:text-emerald-400")} />
                {isSidebarOpen && <span className="animate-fade-in text-emerald-400 font-bold">User Management</span>}
              </Link>
            </div>
          )}
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
                      <div key={href} className="flex items-center gap-2">
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

              <div className="flex items-center gap-3 pl-4">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 leading-none">{isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{isSuperAdmin ? 'Full Access' : 'Admin Access'}</p>
                 </div>
                 <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/25">
                    {isSuperAdmin ? 'SA' : 'AD'}
                 </div>
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
