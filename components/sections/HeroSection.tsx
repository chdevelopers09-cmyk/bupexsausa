import Link from 'next/link';
import { ArrowRight, Users, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  variant?: 'centered-primary' | 'centered-white' | 'dark-overlay' | 'split-image-right' | 'minimal';
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
  cta1Label?: string;
  cta1Url?: string;
  cta2Label?: string;
  cta2Url?: string;
  showCta2?: boolean;
  sideImage?: string;
  badge?: string;
}

export default function HeroSection({
  variant = 'centered-primary',
  heading = 'Connect. Give. Grow.',
  subheading = 'Join the BUPEXSA USA alumni community and stay connected with PCSS Buea graduates across America.',
  backgroundImage,
  cta1Label = 'Join Now',
  cta1Url = '/register',
  cta2Label = 'Learn More',
  cta2Url = '/about',
  showCta2 = true,
  sideImage,
  badge,
}: HeroProps) {
  if (variant === 'minimal') {
    return (
      <section className="pt-24 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="container-wide relative z-10 text-center">
          {badge && (
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-primary">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">{heading}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">{subheading}</p>
          <Link href={cta1Url} className="btn-primary inline-flex" id="hero-minimal-cta">
            {cta1Label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  if (variant === 'centered-white') {
    return (
      <section className="pt-28 pb-16 bg-gradient-to-b from-bg-purple to-white relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="container-wide relative z-10 text-center">
          {badge && (
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-primary shadow-sm border border-purple-100">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-dark mb-5 leading-tight">{heading}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">{subheading}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href={cta1Url} className="btn-primary" id="hero-white-cta1">
              {cta1Label} <ArrowRight className="h-4 w-4" />
            </Link>
            {showCta2 && (
              <Link href={cta2Url} className="btn-secondary" id="hero-white-cta2">
                {cta2Label}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'dark-overlay') {
    return (
      <section
        className="relative pt-28 pb-20 min-h-[500px] flex items-center"
        style={{
          background: backgroundImage
            ? `url(${backgroundImage}) center/cover no-repeat`
            : 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #1E1B4B 100%)',
        }}
      >
        <div className="absolute inset-0 bg-dark/70" />
        <div className="container-wide relative z-10 text-center text-white">
          {badge && (
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider glass text-white/90">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">{heading}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">{subheading}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href={cta1Url} className="btn-primary" id="hero-dark-cta1">
              {cta1Label} <ArrowRight className="h-4 w-4" />
            </Link>
            {showCta2 && (
              <Link href={cta2Url} className="btn-white" id="hero-dark-cta2">
                {cta2Label}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split-image-right') {
    return (
      <section className="pt-20 pb-16 bg-white overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            <div className="animate-slide-up">
              {badge && (
                <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-primary">
                  {badge}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-dark mb-5 leading-tight">{heading}</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{subheading}</p>
              <Link href={cta1Url} className="btn-primary" id="hero-split-cta">
                {cta1Label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3 bg-gradient-to-br from-primary to-dark flex items-center justify-center">
                {sideImage ? (
                  <img src={sideImage} alt={heading} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-white p-8">
                    <Globe className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-xl font-bold opacity-90">BUPEXSA USA</p>
                    <p className="text-sm opacity-70 mt-1">Uniting Alumni Nationwide</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default: centered-primary
  return (
    <section className="relative pt-32 pb-24 overflow-hidden section-primary">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 hero-pattern-v2 opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-[100px] animate-float" />
      </div>

      <div className="container-wide relative z-10 text-center text-white">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] glass-dark text-white/90 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {badge}
          </div>
        )}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] animate-slide-up tracking-tight">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-fade-in delay-200">
          {subheading}
        </p>

        <div className="flex items-center justify-center gap-5 flex-wrap animate-slide-up delay-300">
          <Link href={cta1Url} className="btn-white text-lg px-10 py-5 rounded-2xl group shadow-2xl shadow-primary-dark/20" id="hero-primary-cta1">
            {cta1Label} <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          {showCta2 && (
            <Link href={cta2Url} className="btn-white bg-transparent border-white/20 text-lg px-10 py-5 rounded-2xl opacity-70 hover:opacity-100 hover:border-white transition-all" id="hero-primary-cta2">
              {cta2Label}
            </Link>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
          {[
            { icon: Users, label: '347+ Members' },
            { icon: Globe, label: '12 Chapters' },
            { label: 'Est. 1985', icon: null },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
