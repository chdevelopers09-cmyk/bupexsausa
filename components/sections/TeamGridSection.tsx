import Link from 'next/link';
import { MOCK_LEADERSHIP } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Mail, Briefcase } from 'lucide-react';

interface TeamGridSectionProps {
  variant?: 'three-col' | 'four-col';
  heading?: string;
  colorScheme?: 'white' | 'light';
}

export default function TeamGridSection({
  variant = 'four-col',
  heading = 'Our National Leadership',
  colorScheme = 'white',
}: TeamGridSectionProps) {
  return (
    <section className={cn(
      "section-padding",
      colorScheme === 'light' ? "bg-gray-50" : "bg-white"
    )}>
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">{heading}</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
            Meet the dedicated volunteers serving on the BUPEXSA USA national board.
          </p>
        </div>

        <div className={cn(
          "grid gap-8 lg:gap-10",
          variant === 'three-col' ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {MOCK_LEADERSHIP.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({ member }: { member: typeof MOCK_LEADERSHIP[0] }) {
  return (
    <div className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="h-56 w-56 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-gray-100">
          <img src={member.photo_path} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        </div>
        <div className="absolute bottom-2 right-2 h-12 w-12 bg-accent rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 bg-primary/5 px-4 py-1.5 rounded-full">
          Batch {member.slug === 'ebot-leonel' ? '1996' : member.slug === 'simon-ayompe' ? "'96" : member.slug === 'cordelia-ngonde' ? '1999' : member.slug === 'narcisse-wilfried' ? '1994' : member.slug === 'frida-meyali' ? '1997' : '1988'}
        </span>
      </div>
      
      <h3 className="text-2xl font-black text-dark group-hover:text-primary transition-colors tracking-tight leading-tight mb-2">{member.name}</h3>
      <p className="text-primary font-black text-[11px] uppercase tracking-widest mb-4">{member.title}</p>
      
      <div className="text-gray-400 text-sm leading-relaxed mb-8 px-2 line-clamp-3 font-medium">
        {member.bio}
      </div>
      
      <div className="mt-auto w-full space-y-4">
        <Link 
          href={`/about/leadership/${member.slug}`}
          className="inline-flex items-center gap-2 bg-gray-50 text-dark font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 w-full justify-center"
        >
          View Full Profile
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// Helper icons needed
import { CheckCircle2, ArrowRight } from 'lucide-react';

