import { Users, MapPin, Calendar, Heart, Award, TrendingUp, DollarSign, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string;
  icon?: string;
}

interface StatsBarProps {
  variant?: 'primary' | 'white';
  stats?: Stat[];
}

const defaultPrimaryStats: Stat[] = [
  { label: 'Active Members', value: '347+', icon: 'users' },
  { label: 'US Chapters', value: '12', icon: 'globe' },
  { label: 'Years of Service', value: '40+', icon: 'award' },
  { label: 'Raised for PCSS', value: '$125K+', icon: 'dollar' },
];

const defaultWhiteStats: Stat[] = [
  { label: 'Member Growth YTD', value: '+28%', icon: 'trending' },
  { label: 'Events This Year', value: '18', icon: 'calendar' },
  { label: 'Donations This Year', value: '$12.4K', icon: 'heart' },
  { label: 'States Represented', value: '22', icon: 'map' },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  globe: Globe,
  award: Award,
  dollar: DollarSign,
  trending: TrendingUp,
  calendar: Calendar,
  heart: Heart,
  map: MapPin,
};

export default function StatsBarSection({ variant = 'primary', stats }: StatsBarProps) {
  const displayStats = stats || (variant === 'primary' ? defaultPrimaryStats : defaultWhiteStats);

  if (variant === 'white') {
    return (
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStats.map((stat, i) => {
              const Icon = stat.icon ? ICONS[stat.icon] : null;
              return (
                <div key={i} className="stat-card text-center group hover:shadow-purple transition-all duration-300">
                  {Icon && (
                    <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                  )}
                  <p className="text-3xl font-black text-dark mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-primary py-16">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, i) => {
            const Icon = stat.icon ? ICONS[stat.icon] : null;
            return (
              <div key={i} className="text-center text-white glass-dark px-6 py-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group">
                {Icon && (
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                )}
                <p className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{stat.value}</p>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
