import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonationCtaSectionProps {
  variant?: 'fullwidth' | 'card';
  heading?: string;
  body?: string;
  buttonLabel?: string;
  colorScheme?: 'primary' | 'dark' | 'white';
}

export default function DonationCtaSection({
  variant = 'fullwidth',
  heading = 'Support Our Mission',
  body = 'Your generous contributions help us provide scholarships, fund infrastructure projects at PCSS Buea, and support our community initiatives.',
  buttonLabel = 'Make a Donation',
  colorScheme = 'primary',
}: DonationCtaSectionProps) {
  if (variant === 'card') {
    return (
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-1/2 section-primary p-12 flex flex-col justify-center">
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-white fill-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">{heading}</h2>
              <p className="text-white/80 leading-relaxed mb-8">{body}</p>
              <Link href="/donations" className="btn-white text-center w-fit">
                {buttonLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="md:w-1/2 bg-bg-purple p-12 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-dark mb-6 text-center md:text-left">Quick Donation</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['$25', '$50', '$100', '$250'].map((amount) => (
                  <Link
                    key={amount}
                    href={`/donations?amount=${amount.replace('$', '')}`}
                    className="bg-white border-2 border-transparent hover:border-primary px-6 py-4 rounded-xl text-center font-bold text-dark shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {amount}
                  </Link>
                ))}
              </div>
              <Link href="/donations" className="text-primary font-bold text-center md:text-left hover:underline flex items-center gap-2 group justify-center md:justify-start">
                Give another amount <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(
      "section-padding relative overflow-hidden",
      colorScheme === 'primary' ? "section-primary" :
      colorScheme === 'dark' ? "section-dark" : "bg-white border-y border-gray-100"
    )}>
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -ml-48 -mb-48"></div>
      </div>

      <div className="container-wide relative z-10 text-center">
        <Heart className={cn(
          "h-12 w-12 mx-auto mb-6",
          colorScheme === 'white' ? "text-primary" : "text-white/80"
        )} />
        <h2 className={cn(
          "text-3xl md:text-5xl font-black mb-6 tracking-tight",
          colorScheme === 'white' ? "text-dark" : "text-white"
        )}>
          {heading}
        </h2>
        <p className={cn(
          "text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed",
          colorScheme === 'white' ? "text-gray-500" : "text-white/80"
        )}>
          {body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/donations" className={cn(
            "btn-primary px-10 py-4 text-lg",
            colorScheme === 'primary' ? "bg-white text-primary hover:bg-bg-purple shadow-none" : ""
          )}>
            {buttonLabel}
          </Link>
          <Link href="/about" className={cn(
            "font-bold hover:underline py-4",
            colorScheme === 'white' ? "text-primary px-6" : "text-white px-6"
          )}>
            Learn how we use funds
          </Link>
        </div>
      </div>
    </section>
  );
}
