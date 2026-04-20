'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Bell, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/mock-data';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Membership', href: '/membership' },
  {
    label: 'Chapters',
    href: '/chapters',
    children: [
      { label: 'All Chapters', href: '/chapters' },
      { label: 'Texas', href: '/chapters/texas' },
      { label: 'Georgia', href: '/chapters/georgia' },
      { label: 'California', href: '/chapters/california' },
      { label: 'Maryland / DC', href: '/chapters/maryland-dc' },
      { label: 'New York', href: '/chapters/new-york' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    children: [
      { label: 'All Events', href: '/events' },
      { label: 'Annual Gala 2026', href: '/events/annual-gala-2026' },
    ],
  },
  { label: 'Donations', href: '/donations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Alma Mater', href: '/alma-mater' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
          : 'bg-white/90 backdrop-blur-sm'
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-2" id="nav-logo">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-white flex items-center justify-center shadow-md transition-all group-hover:scale-105 group-hover:shadow-xl overflow-hidden border border-gray-100 p-0.5">
              <img src="/bupexsausa.png" alt="BUPEXSA USA Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        'nav-link flex items-center gap-1 text-sm',
                        isActive(item.href) && 'nav-link-active'
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    {activeDropdown === item.href && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-down z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-primary transition-colors',
                              pathname === child.href && 'text-primary bg-purple-50 font-semibold'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'nav-link text-sm',
                      isActive(item.href) && pathname !== '/' + '' && 'nav-link-active'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="nav-link text-sm" id="nav-login">
              Log In
            </Link>
            <Link href="/register" className="btn-primary text-sm px-5 py-2.5" id="nav-register">
              Join Now
            </Link>
            <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Admin Panel">
              <Settings className="h-4 w-4 text-gray-500" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-dark" /> : <Menu className="h-5 w-5 text-dark" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
          <div className="container-wide py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-purple-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 pl-4 border-l-2 border-purple-100 mb-1">
                    {item.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-4 flex flex-col gap-2">
              <Link href="/login" className="btn-secondary w-full justify-center text-sm py-2.5" id="mobile-login">
                Log In
              </Link>
              <Link href="/register" className="btn-primary w-full justify-center text-sm py-2.5" id="mobile-register">
                Join BUPEXSA USA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
