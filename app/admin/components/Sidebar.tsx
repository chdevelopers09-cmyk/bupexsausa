'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  CreditCard,
  Calendar,
  Image as ImageIcon,
  Mail,
  Settings,
  ShieldCheck,
  Layout,
  Globe,
  LogOut,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/mock-data';

interface SidebarProps {
  isSuperAdmin: boolean;
}

export default function Sidebar({ isSuperAdmin }: SidebarProps) {
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

  if (isSuperAdmin) {
    adminLinks.push({ label: 'User Management', href: '/admin/users', icon: UserPlus });
  }

  return (
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

      <nav className="flex-1 py-10 px-3 space-y-1 overflow-y-auto font-sans">
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
  );
}
