'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

interface TestimonialSectionProps {
  heading?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "BUPEXSA USA has given me a community I never knew I needed. Staying connected with fellow PCSS graduates has opened doors both professionally and personally.",
    author: "Dr. Emmanuel Fon",
    role: "Class of 1992, cardiologist",
  },
  {
    quote: "Being part of BUPEXSA USA is more than just networking; it's about paying it forward. Seeing our contributions directly impact students back home is incredibly rewarding.",
    author: "Grace Mbah-Taylor",
    role: "Class of 1998, attorney",
  },
  {
    quote: "The Texas chapter events are always the highlight of my quarter. It's like being back on campus, but with the wisdom we've gained in the years since.",
    author: "Patrick Nkeng",
    role: "Class of 2001, financial analyst",
  }
];

export default function TestimonialSection({
  heading = 'Voices of Our Alumni',
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) {
  const [active, setActive] = useState(0);

  const next = () => setActive((active + 1) % testimonials.length);
  const prev = () => setActive((active - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-bg-blue/30 overflow-hidden">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">{heading}</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          <Quote className="absolute -top-10 -left-6 md:-left-12 h-24 w-24 text-accent/10 -z-10" />

          <div className="relative z-10 min-h-[300px] flex flex-col items-center text-center animate-fade-in" key={active}>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-dark italic leading-relaxed mb-10">
              "{testimonials[active].quote}"
            </p>

            <div className="flex flex-col items-center">
              {testimonials[active].image && (
                <img src={testimonials[active].image} alt={testimonials[active].author} className="h-16 w-16 rounded-full object-cover mb-4 border-2 border-accent" />
              )}
              <h4 className="text-xl font-bold text-dark">{testimonials[active].author}</h4>
              <p className="text-accent font-semibold text-sm uppercase tracking-widest">{testimonials[active].role}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="h-12 w-12 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                     "h-2 w-2 rounded-full transition-all duration-300",
                     active === i ? "bg-accent w-6" : "bg-accent/20"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="h-12 w-12 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
