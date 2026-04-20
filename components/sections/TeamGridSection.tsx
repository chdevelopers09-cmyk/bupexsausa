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
            <div key={member.id} className="group flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-gray-200">
                  <img src={member.photo_path} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-primary font-semibold text-sm mb-3">{member.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 px-4">
                {member.bio}
              </p>
              <div className="flex items-center gap-3">
                <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all">
                  <Briefcase className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
