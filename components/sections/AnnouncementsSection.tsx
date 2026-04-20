import Link from 'next/link';
import { Megaphone, ArrowRight, Calendar } from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

interface AnnouncementsSectionProps {
  heading?: string;
  count?: number;
}

export default function AnnouncementsSection({
  heading = 'Latest Announcements',
  count = 3,
}: AnnouncementsSectionProps) {
  const announcements = MOCK_ANNOUNCEMENTS.slice(0, count);

  return (
    <section className="section-padding bg-bg-purple/30">
      <div className="container-wide">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white">
            <Megaphone className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-black text-dark">{heading}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-card border border-purple-50 flex flex-col hover:border-primary/20 transition-all group">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-4">
                <Calendar className="h-3.5 w-3.5" />
                {formatDateShort(item.publish_date)}
              </div>
              <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-500 mb-8 flex-1 leading-relaxed">
                {item.body}
              </p>
              <Link href="/contact" className="text-primary font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center lg:text-left pt-6 border-t border-purple-100">
          <p className="text-gray-500 text-sm">
            Want to receive these updates via email? <Link href="/register" className="text-primary font-bold hover:underline">Join as a member</Link> today.
          </p>
        </div>
      </div>
    </section>
  );
}
