import { LucideIcon, Star, Users, Heart, Globe, Award, Book, Database, Shield, Zap, Target, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardItem {
  icon?: string;
  title: string;
  body: string;
}

interface CardGridSectionProps {
  variant?: 'three-col' | 'two-col';
  bgVariant?: 'white' | 'sky' | 'purple';
  heading?: string;
  cards?: CardItem[];
}

const ICONS: Record<string, LucideIcon> = {
  star: Star,
  users: Users,
  heart: Heart,
  globe: Globe,
  award: Award,
  book: Book,
  database: Database,
  shield: Shield,
  zap: Zap,
  target: Target,
  bookOpen: BookOpen,
};

const defaultCards: CardItem[] = [
  { icon: 'users', title: 'Community', body: 'Connect with former classmates and build lasting professional relationships across the USA.' },
  { icon: 'award', title: 'Excellence', body: 'We celebrate the achievements of our alumni and support the next generation of leaders.' },
  { icon: 'heart', title: 'Giving Back', body: 'Join our collective efforts to support PCSS Buea through scholarships and infrastructure projects.' },
];

export default function CardGridSection({
  variant = 'three-col',
  bgVariant = 'white',
  heading = 'Why Join Us',
  cards = defaultCards,
}: CardGridSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    sky: 'bg-bg-blue',
    purple: 'bg-bg-purple',
  };

  return (
    <section className={cn("section-padding", bgClasses[bgVariant])}>
      <div className="container-wide">
        {heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">{heading}</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
        )}
        <div className={cn(
          "grid gap-8",
          variant === 'two-col' ? "md:grid-cols-2" : "md:grid-cols-3"
        )}>
          {cards.map((card, index) => {
            const Icon = card.icon ? ICONS[card.icon] : null;
            return (
              <div key={index} className="card p-10 group relative border-none shadow-card hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
                <div className="relative z-10">
                  {Icon && (
                    <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-900 transition-all duration-500 shadow-sm">
                      <Icon className="h-8 w-8 text-blue-900 group-hover:text-white transition-colors duration-500" />
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-dark mb-4 leading-tight group-hover:text-blue-900 transition-colors">{card.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
