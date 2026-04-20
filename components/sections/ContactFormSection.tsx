'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';

interface ContactFormSectionProps {
  heading?: string;
  subheading?: string;
}

export default function ContactFormSection({
  heading = 'Get in Touch',
  subheading = 'Have questions about BUPEXSA USA? Want to start a new chapter? Send us a message and we\'ll get back to you.',
}: ContactFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="bg-bg-purple/30 rounded-3xl p-12 text-center animate-scale-in">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 text-white">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">Message Sent!</h2>
            <p className="text-gray-500 text-lg mb-8">
              Thank you for reaching out. A BUPEXSA representative will contact you at the email address provided within 48 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">{heading}</h2>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              {subheading}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-bg-purple flex items-center justify-center text-primary flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Email Us</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-xl font-bold text-dark hover:text-primary transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-bg-purple flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Call Us</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-xl font-bold text-dark hover:text-primary transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-bg-purple flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Mailing Address</p>
                  <p className="text-xl font-bold text-dark leading-tight">
                    {SITE_CONFIG.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-field">Full Name</label>
                  <input type="text" className="input-field" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="label-field">Email Address</label>
                  <input type="email" className="input-field" placeholder="john@example.com" required />
                </div>
              </div>

              <div>
                <label className="label-field">Subject</label>
                <select className="input-field cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Membership Question</option>
                  <option>New Chapter Interest</option>
                  <option>Donation Inquiry</option>
                  <option>Website Support</option>
                </select>
              </div>

              <div>
                <label className="label-field">Your Message</label>
                <textarea
                  className="input-field min-h-[150px] resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full justify-center text-lg py-4">
                Send Message <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
