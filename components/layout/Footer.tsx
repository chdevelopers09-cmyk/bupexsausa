import Link from 'next/link';
import { Globe, Camera, X, Play, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
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
    <footer className="text-white bg-[#1c2331]">
      {/* Social Bar (The section above footer body) */}
      <div className="bg-[#6351ce] flex items-center justify-between py-4 px-6 md:px-12">
        <div className="hidden lg:block text-sm">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex items-center gap-4">
          {[
            { icon: (props: any) => <Globe {...props} />, href: SITE_CONFIG.socialLinks.facebook, label: 'Facebook' },
            { icon: (props: any) => <X {...props} />, href: SITE_CONFIG.socialLinks.twitter, label: 'Twitter' },
            { icon: (props: any) => <Camera {...props} />, href: SITE_CONFIG.socialLinks.instagram, label: 'Instagram' },
            { icon: (props: any) => <Play {...props} />, href: SITE_CONFIG.socialLinks.youtube, label: 'YouTube' },
            {
              icon: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              ),
              href: SITE_CONFIG.socialLinks.whatsapp,
              label: 'WhatsApp',
            },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Company Name */}
          <div>
            <h6 className="uppercase font-bold mb-4 flex items-center gap-2 text-sm tracking-wider">
              BUPEXSA USA
            </h6>
            <div className="w-12 h-0.5 bg-[#6351ce] mb-4"></div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting Presbyterian Comprehensive Secondary School Buea graduates across the United States. Building community, fostering excellence, and giving back to our alma mater.
            </p>
          </div>

          {/* Column 2: Products / Quick Links */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-sm tracking-wider">Quick Links</h6>
            <div className="w-12 h-0.5 bg-[#6351ce] mb-4"></div>
            <ul className="space-y-3">
              {quickLinks.slice(0, 5).map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-sm tracking-wider">Useful Links</h6>
            <div className="w-12 h-0.5 bg-[#6351ce] mb-4"></div>
            <ul className="space-y-3">
              {memberLinks.slice(0, 5).map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h6 className="uppercase font-bold mb-4 text-sm tracking-wider">Contact</h6>
            <div className="w-12 h-0.5 bg-[#6351ce] mb-4"></div>
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-[#161c27] text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Copyright: 
        <a href="https://bupexsausa.org" className="text-white hover:text-[#6351ce] ml-1 transition-colors">
          BUPEXSAUSA.org
        </a>
      </div>
    </footer>
  );
}
