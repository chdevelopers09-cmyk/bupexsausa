'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading?: string;
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "Who is eligible to join BUPEXSA USA?",
    answer: "Any former student of Presbyterian College Secondary School (PCSS) Buea who currently resides in the United States is eligible to join."
  },
  {
    question: "How much is the annual membership fee?",
    answer: "The current annual membership fee is $75. This helps fund our operations, events, and scholarship programs."
  },
  {
    question: "How do I find a local chapter?",
    answer: "You can visit our Chapters page to see a list of all active chapters in the US. If there isn't one in your state, you can join at the national level."
  },
  {
    question: "Can I donate without being a member?",
    answer: "Yes! We welcome donations from anyone who wishes to support our mission and PCSS Buea. You can donate via our Donations page."
  }
];

export default function FaqSection({
  heading = 'Frequently Asked Questions',
  faqs = defaultFaqs,
}: FaqSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-gray-50" id="faq">
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">{heading}</h2>
          <p className="text-gray-500">Everything you need to know about BUPEXSA USA membership and activities.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-purple-50 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-bold text-dark pr-8">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  activeIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
