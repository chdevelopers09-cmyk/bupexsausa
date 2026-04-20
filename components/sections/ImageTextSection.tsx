import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageTextSectionProps {
  variant?: 'image-left' | 'image-right';
  heading?: string;
  bodyTitle?: string;
  body: string;
  image: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function ImageTextSection({
  variant = 'image-left',
  heading,
  bodyTitle,
  body,
  image,
  ctaLabel,
  ctaUrl,
}: ImageTextSectionProps) {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-wide">
        {heading && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">{heading}</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
        )}
        <div className={cn(
          "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
          variant === 'image-left' ? "" : "lg:direction-rtl"
        )}>
          <div className={cn(
            "relative",
            variant === 'image-right' ? "lg:order-2" : "lg:order-1"
          )}>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl -z-10" />
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={image} alt={heading || bodyTitle || 'BUPEXSA Image'} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className={cn(
            "animate-slide-up",
            variant === 'image-right' ? "lg:order-1" : "lg:order-2"
          )}>
            {bodyTitle && (
              <h3 className="text-2xl md:text-3xl font-black text-dark mb-6 leading-tight">
                {bodyTitle}
              </h3>
            )}
            <div className="text-gray-500 text-lg leading-relaxed mb-8 prose prose-purple">
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
            {ctaLabel && ctaUrl && (
              <Link href={ctaUrl} className="btn-primary inline-flex items-center gap-2">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
