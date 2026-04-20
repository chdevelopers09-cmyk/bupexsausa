'use client';

import Link from 'next/link';
import { UserPlus, ArrowLeft, Mail, Lock, User, Phone, GraduationCap, MapPin, Briefcase, Camera, ChevronDown, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';
import { US_STATES, GRADUATION_YEARS } from '@/lib/utils';

import { Suspense } from 'react';
import { signup, signInWithGoogle } from '../actions';
import { useSearchParams } from 'next/navigation';

export default function RegisterClient() {
  const gYears = GRADUATION_YEARS();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-bg-purple/30 py-12 px-6">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-50">
          <div className="bg-primary p-12 text-center text-white relative overflow-hidden">
             {/* Background patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl -mr-32 -mt-32"></div>
            </div>

            <div className="relative z-10">
              <div className="h-24 w-24 rounded-3xl bg-white p-3 flex items-center justify-center mx-auto mb-8 shadow-2xl transform transition-transform hover:-rotate-3">
                <img src="/bupexsausa.png" alt="BUPEXSA USA Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-black">Join BUPEXSA USA</h1>
              <p className="text-white/80 text-lg mt-3 max-w-sm mx-auto font-light">
                Complete the form below to begin your membership registration. Our team will review and approve your application within 48 hours.
              </p>
            </div>
          </div>

          <div className="p-12">
            {error && (
              <div className="mb-10 p-5 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-2xl animate-shake flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            <form action={signup} className="space-y-12">
              {/* Account Info Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Account Credentials</h2>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Full Legal Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                      <input 
                        name="full_name" 
                        type="text" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                        placeholder="Ebongue Ndumbe" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                      <input 
                        name="email" 
                        type="email" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                        placeholder="ebongue@example.com" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                      <input 
                        name="password" 
                        type="password" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                      <input 
                        name="confirm_password"
                        type="password" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Alumni Info Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">PCSS Buea Identity</h2>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Graduation Year</label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110 pointer-events-none" />
                      <select 
                        name="graduation_year" 
                        className="w-full pl-12 pr-10 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-bold text-dark appearance-none cursor-pointer" 
                        required
                      >
                        <option value="">Select Year</option>
                        {gYears.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Batch / Class (Optional)</label>
                    <input 
                      name="batch" 
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                      placeholder="e.g. 1998" 
                    />
                  </div>
                </div>
              </div>

             {/* Location & Contact Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Location & Reach</h2>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">US State / Location</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110 pointer-events-none" />
                      <select 
                        name="us_state" 
                        className="w-full pl-12 pr-10 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-bold text-dark appearance-none cursor-pointer" 
                        required
                      >
                        <option value="">Select State</option>
                        {US_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                      <input 
                        name="phone" 
                        type="tel" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                        placeholder="+1 (404) 000-0000" 
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">Profession (Optional)</label>
                   <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
                      <input 
                        name="profession" 
                        type="text" 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium text-dark placeholder:text-gray-300" 
                        placeholder="Software Engineer" 
                      />
                   </div>
                </div>
              </div>

              {/* Profile Bio Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Final Details</h2>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs font-black text-dark uppercase tracking-widest ml-1">How did you hear about BUPEXSA USA?</label>
                   <div className="relative">
                      <select 
                        name="how_did_you_hear" 
                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-bold text-dark appearance-none cursor-pointer"
                      >
                        <option value="">Choose an option</option>
                        <option value="Fellow Alumni">Fellow Alumni</option>
                        <option value="National Gala">National Gala</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Search Engine">Search Engine</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                   </div>
                </div>
              </div>

              <div className="pt-10 border-t border-gray-100">
                <div className="flex items-start gap-4 mb-10 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                  <input type="checkbox" id="terms" className="mt-1.5 h-6 w-6 rounded-lg border-gray-300 text-primary focus:ring-primary cursor-pointer shrink-0" required />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    I agree to the <Link href="/terms" className="text-primary font-black hover:underline underline-offset-4">Terms of Service</Link> and <Link href="/privacy" className="text-primary font-black hover:underline underline-offset-4">Privacy Policy</Link>. I confirm that I am a verified alumnus of PCSS Buea.
                  </label>
                </div>

                <div className="space-y-6">
                  <button type="submit" className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white text-xl font-black py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                    <UserPlus className="h-6 w-6 transition-transform group-hover:rotate-12" />
                    Complete My Application
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 space-y-6">
              <div className="relative flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Fast Registration</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <form action={signInWithGoogle}>
                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 rounded-2xl font-black text-dark hover:bg-gray-50 hover:border-primary/20 transition-all duration-300">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                  Sign up with Google
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-12 font-medium">
                Already a member? <Link href="/login" className="text-primary font-black hover:underline underline-offset-4 transition-colors">Log in to your account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
