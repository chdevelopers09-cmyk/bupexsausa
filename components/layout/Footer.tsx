import Link from 'next/link';
import { Globe, Camera, X, Play, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';
import { createAdminClient } from '@/lib/supabase/admin';


const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Membership', href: '/membership' },
  { label: 'Chapters', href: '/chapters' },
  { label: 'Events', href: '/events' },
  { label: 'Donations', href: '/donations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Alma Mater', href: '/alma-mater' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact', href: '/contact' },
];

const memberLinks = [
  { label: 'Register', href: '/register' },
  { label: 'Member Login', href: '/login' },
  { label: 'Member Dashboard', href: '/dashboard' },
  { label: 'Pay Dues', href: '/dashboard/payments' },
  { label: 'RSVP Events', href: '/events' },
  { label: 'FAQ', href: '/membership#faq' },
];

export default async function Footer() {
  const supabase = await createAdminClient();
  const { data: settingsData } = await supabase.from('site_settings').select('key, value');
  const settings = (settingsData?.reduce((acc: any, s: any) => ({ ...acc, [s.key]: s.value }), {}) || {}) as any;
  const annualFee = settings.membership_fee || 100;

  return (
    <footer className="bg-white text-dark border-t border-gray-100">
      {/* Top section */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden">
                <img src="/bupexsausa.png" alt="BUPEXSA USA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-black text-dark text-lg leading-tight tracking-tight">{SITE_CONFIG.name}</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-tight">Alumni Association</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Connecting Presbyterian College Secondary School Buea graduates across the United States. Building community, fostering excellence, giving back.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, href: SITE_CONFIG.socialLinks.facebook, label: 'Facebook' },
                { icon: Camera, href: SITE_CONFIG.socialLinks.instagram, label: 'Instagram' },
                { icon: X, href: SITE_CONFIG.socialLinks.twitter, label: 'Twitter' },
                { icon: Play, href: SITE_CONFIG.socialLinks.youtube, label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-primary flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-gray-500 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-dark text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-primary text-sm transition-colors hover:pl-1 duration-200 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Member Links */}
          <div>
            <h3 className="font-bold text-dark text-sm uppercase tracking-wider mb-4">For Members</h3>
            <ul className="space-y-2">
              {memberLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-primary text-sm transition-colors hover:pl-1 duration-200 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-dark text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-start gap-3 text-gray-500 hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 mt-0.5 group-hover:text-primary flex-shrink-0" />
                <span className="text-sm">{SITE_CONFIG.email}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-start gap-3 text-gray-500 hover:text-primary transition-colors group"
              >
                <Phone className="h-4 w-4 mt-0.5 group-hover:text-primary flex-shrink-0" />
                <span className="text-sm">{SITE_CONFIG.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-500">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{SITE_CONFIG.address}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Ready to join the BUPEXSA family?</p>
              <Link
                href="/register"
                className="btn-primary text-sm px-4 py-2 w-full justify-center flex flex-col items-center leading-tight"
                id="footer-register"
              >
                <span className="font-black">Join BUPEXSA USA</span>
                <span className="text-[10px] opacity-80 font-bold">$50 One-time + ${annualFee}/year</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BUPEXSA USA. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <a
              href="https://bupexsausa.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              bupexsausa.org <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
