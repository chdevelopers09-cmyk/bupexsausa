'use client';

import Link from 'next/link';
import { 
  UserPlus, ArrowLeft, Mail, Lock, User, Phone, GraduationCap, 
  MapPin, Briefcase, ChevronDown, ArrowRight, Eye, EyeOff,
  CheckCircle2, CreditCard, ShieldCheck, Check, Sparkles,
  DollarSign, Calendar, Info, Smartphone, X, ExternalLink
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';
import { US_STATES, GRADUATION_YEARS } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signup, signInWithGoogle } from '../actions';

export default function RegisterClient({ settings = {} }: { settings?: any }) {
  const membershipFee = parseFloat(settings.membership_fee || '100');
  const registrationFee = 50; // Fixed registration fee
  const totalDue = membershipFee + registrationFee;

  const gYears = GRADUATION_YEARS();
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const [isPending, startTransition] = useTransition();
  
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    batch: '',
    graduation_year: '',
    us_state: '',
    phone: '',
    profession: '',
    how_did_you_hear: '',
    membership_plan: 'annual'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'stripe' | 'paypal' | 'cashapp' | 'zelle' | 'applepay'>('card');
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: ''
  });

  const validatePassword = (pwd: string) => {
    const errs: string[] = [];
    if (pwd.length < 8) errs.push('At least 8 characters');
    if (!/[A-Z]/.test(pwd)) errs.push('One uppercase letter');
    if (!/[a-z]/.test(pwd)) errs.push('One lowercase letter');
    if (!/[0-9]/.test(pwd)) errs.push('One number');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) errs.push('One special character (!@#$%^&*)');
    return errs;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    if (name === 'cvc') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwdErrs = validatePassword(formData.password);
    if (pwdErrs.length > 0) {
      setPasswordErrors(pwdErrs);
      setStep(1);
      return;
    }
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    startTransition(async () => {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      const result = await signup(submitData);
      
      if (result?.error) {
        setStep(1);
        router.push(`/register?error=${encodeURIComponent(result.error)}`);
      } else if (result?.success) {
        setRegistrationResult(result.member);
        setStep(3);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/20 py-4 px-4 font-sans text-dark">
      <div className="max-w-[650px] mx-auto animate-fade-in border border-gray-100 rounded-3xl bg-white overflow-hidden shadow-2xl shadow-purple-100/5">
        {/* Header Section - Ultra Compact */}
        <div className="bg-[#8B5CF6] py-6 px-8 text-center text-white relative">
          <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl p-1 border border-white/20 overflow-hidden">
             <img src="/bupexsausa.png" alt="BUPEXSA USA Logo" className="w-full h-full object-contain scale-110" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Join BUPEXSA USA</h1>
          <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mt-1">Member Registration</p>
        </div>

        {/* Progress Tracker Section - Ultra Compact */}
        <div className="bg-white py-3 px-8 border-b border-gray-50">
          <div className="flex items-center justify-between max-w-sm mx-auto">
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-[10px] transition-all ${step >= 1 ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= 1 ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>Personal</span>
            </div>
            <div className="h-[1px] flex-1 bg-gray-50 mx-3" />
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-[10px] transition-all ${step >= 2 ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= 2 ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>Payment</span>
            </div>
            <div className="h-[1px] flex-1 bg-gray-50 mx-3" />
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-[10px] transition-all ${step >= 3 ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>3</div>
              <span className={`text-[9px] font-black uppercase tracking-wider ${step >= 3 ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>Welcome</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-xl flex items-center gap-2 animate-shake">
              <Info className="h-3.5 w-3.5" />
              {error}
            </div>
          )}

          <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="space-y-5">
            
            {/* Step 1: Form Content */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
                {/* Account Credentials */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">ACCOUNT CREDENTIALS</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Full Legal Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-purple-300 z-10" />
                        <input name="full_name" type="text" value={formData.full_name} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="e.g. John Doe" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Username <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-300 z-10" />
                        <input name="username" type="text" value={formData.username} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="johndoe123" required />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-500 ml-1">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-300 z-10" />
                      <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="email@example.com" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-orange-300 z-10" />
                        <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} onFocus={() => setPasswordFocused(true)} onBlur={() => setTimeout(() => setPasswordFocused(false), 200)} className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="••••••••" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Confirm Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-orange-300 z-10" />
                        <input name="confirm_password" type={showConfirmPassword ? "text" : "password"} value={formData.confirm_password} onChange={handleInputChange} className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="••••••••" required />
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Indicator - shows on focus */}
                  {passwordFocused && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                      {passwordErrors.length > 0 ? (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 space-y-1.5">
                          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Password Requirements</p>
                          {passwordErrors.map((err, i) => (
                            <p key={i} className="text-[11px] text-orange-600 font-bold flex items-center gap-1.5">
                              <X className="h-3 w-3" /> {err}
                            </p>
                          ))}
                        </div>
                      ) : formData.password ? (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <p className="text-[11px] text-emerald-600 font-black">Strong password!</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* PCSS Identity */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">PCSS BUEA IDENTITY</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Batch / Class <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-300 z-10" />
                        <input name="batch" type="text" value={formData.batch} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="e.g. 1998" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Graduation Year <span className="text-gray-300 font-medium">(optional)</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-200 z-10" />
                        <select name="graduation_year" value={formData.graduation_year} onChange={handleInputChange} className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none appearance-none cursor-pointer font-bold text-[13px]">
                          <option value="">Select</option>
                          {gYears.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Reach */}
                <div className="space-y-3">
                  <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest ml-1">LOCATION & REACH</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">US State <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pink-300 z-10" />
                        <select name="us_state" value={formData.us_state} onChange={handleInputChange} className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none appearance-none cursor-pointer font-bold text-[13px]" required>
                          <option value="">Select</option>
                          {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-500 ml-1">Phone Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-300 z-10" />
                        <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none transition-all placeholder:text-gray-300 font-bold text-[13px]" placeholder="+1 (404) 000-0000" required />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="pt-3 space-y-3">
                  <button type="button" onClick={() => { if (passwordErrors.length > 0 && formData.password) { return; } setStep(2); }} className={`w-full py-3.5 rounded-2xl text-white font-black text-sm transition-all group shadow-md ${formData.password && passwordErrors.length > 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8B5CF6] hover:shadow-md shadow-purple-100'}`} disabled={formData.password.length > 0 && passwordErrors.length > 0}>
                    Continue to Membership Fee <ArrowRight className="inline-block ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button type="button" onClick={() => signInWithGoogle()} className="w-full py-2.5 rounded-2xl border border-gray-100 bg-white flex items-center justify-center gap-2 font-bold text-gray-600 hover:bg-gray-50 transition-all text-[11px]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Sign up with Google
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Membership & Payment */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                {/* Itemized Bill Section */}
                <div className="bg-purple-50/50 rounded-3xl p-5 border border-purple-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="h-16 w-16 text-[#8B5CF6]" />
                  </div>
                  <h2 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-4">Registration Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-bold text-sm">🎫 Membership Registration</span>
                      <span className="text-dark font-black text-sm">${registrationFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-bold text-sm">📅 Annual Member Fee</span>
                      <span className="text-dark font-black text-sm">${membershipFee.toFixed(2)}</span>
                    </div>
                    <div className="h-[1px] bg-purple-100 my-2" />
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest block mb-1">Total Due Today</span>
                        <span className="text-[#8B5CF6] font-black text-3xl tracking-tight leading-none">${totalDue.toFixed(2)}</span>
                      </div>
                      <div className="bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-1 shadow-lg shadow-purple-200">
                        Secure
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Payment Method</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Card', icon: <CreditCard className="h-4 w-4" /> },
                      { id: 'stripe', label: 'Stripe', icon: <ShieldCheck className="h-4 w-4" /> },
                      { id: 'paypal', label: 'PayPal', icon: <DollarSign className="h-4 w-4" /> },
                      { id: 'cashapp', label: 'Cash App', icon: <DollarSign className="h-4 w-4" /> },
                      { id: 'zelle', label: 'Zelle', icon: <Mail className="h-4 w-4" /> },
                      { id: 'applepay', label: 'Apple Pay', icon: <Smartphone className="h-4 w-4" /> },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border-2 transition-all gap-1.5 ${
                          paymentMethod === method.id 
                            ? 'border-[#8B5CF6] bg-purple-50/50 shadow-sm' 
                            : 'border-gray-50 bg-white hover:border-gray-100'
                        }`}
                      >
                        <div className={`${paymentMethod === method.id ? 'text-[#8B5CF6]' : 'text-gray-300'}`}>
                          {method.icon}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${paymentMethod === method.id ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
                          {method.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Details Content */}
                <div className="bg-white rounded-2xl p-1 border border-gray-50">
                  {paymentMethod === 'card' && (
                    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-500 ml-1">Cardholder Name</label>
                        <input name="cardName" type="text" value={paymentData.cardName} onChange={handlePaymentChange} className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-bold text-[13px]" placeholder="e.g. John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-500 ml-1">Card Number</label>
                        <div className="relative">
                          <input name="cardNumber" type="text" value={paymentData.cardNumber} onChange={handlePaymentChange} className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-mono text-[14px] font-black" placeholder="0000 0000 0000 0000" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                            <div className="h-4 w-6 bg-blue-600 rounded-sm" />
                            <div className="h-4 w-6 bg-red-500 rounded-sm" />
                            <div className="h-4 w-6 bg-orange-400 rounded-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-gray-500 ml-1">Expiry</label>
                          <input name="expiry" type="text" value={paymentData.expiry} onChange={handlePaymentChange} className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-black text-[13px]" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-gray-500 ml-1">CVC</label>
                          <div className="relative">
                            <input name="cvc" type="text" value={paymentData.cvc} onChange={handlePaymentChange} className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 text-dark focus:bg-white focus:border-[#8B5CF6] outline-none font-black text-[13px]" placeholder="123" />
                            <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === 'stripe') && (
                    <div className="p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                        <CreditCard className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-dark uppercase tracking-widest text-[10px] mb-1">Stripe Secure Checkout</h3>
                        <p className="text-gray-400 text-[11px] font-bold mb-3">You&apos;ll be redirected to Stripe&apos;s hosted checkout for secure payment.</p>
                        <a href={SITE_CONFIG.payments.stripe.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs hover:bg-indigo-700 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" /> Open Stripe Checkout
                        </a>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                        <DollarSign className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-dark uppercase tracking-widest text-[10px] mb-1">PayPal Express</h3>
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mb-3 select-all">
                          <span className="text-blue-700 font-black text-sm block">{SITE_CONFIG.payments.paypal.email}</span>
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">PayPal Email</span>
                        </div>
                        <a href={SITE_CONFIG.payments.paypal.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-xs hover:bg-blue-700 transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" /> Pay via PayPal
                        </a>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Smartphone className="h-8 w-8 text-dark" />
                      </div>
                      <div>
                        <h3 className="font-black text-dark uppercase tracking-widest text-[10px] mb-1">Apple Pay</h3>
                        <p className="text-gray-400 text-[11px] font-bold">Merchant: <span className="text-dark">{SITE_CONFIG.payments.applePay.displayName}</span></p>
                        <p className="text-gray-400 text-[11px] font-bold mt-1">Double-click side button or use Face ID / Touch ID to pay <span className="text-dark">${totalDue.toFixed(2)}</span></p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cashapp' && (
                    <div className="p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <DollarSign className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="inline-block bg-emerald-50 px-4 py-1.5 rounded-full text-emerald-700 font-black text-md mb-2">
                          {settings.cashapp_handle || SITE_CONFIG.payments.cashapp.cashtag}
                        </div>
                        <p className="text-gray-500 text-[11px] font-bold mb-1">{SITE_CONFIG.payments.cashapp.displayName}</p>
                        <p className="text-gray-400 text-[11px] font-bold px-4 leading-relaxed">
                          Send exactly <span className="text-dark">${totalDue.toFixed(2)}</span> to the Cashtag above.
                          Include your <span className="text-dark">Email Address</span> in the memo.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'zelle' && (
                    <div className="p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-16 w-16 bg-purple-50 text-[#8B5CF6] rounded-full flex items-center justify-center mx-auto">
                        <Mail className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 select-all">
                          <span className="text-dark font-black text-sm block">{settings.zelle_handle || SITE_CONFIG.payments.zelle.email}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Recipient Handle / Info</span>
                        </div>
                        <p className="text-gray-400 text-[11px] font-bold px-4 leading-relaxed">
                          Send <span className="text-dark">${totalDue.toFixed(2)}</span> to the handle above.
                          <br />Memo: <span className="text-dark">Membership - {formData.full_name || 'Your Name'}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl bg-gray-50 text-gray-400 font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <button type="submit" disabled={isPending} className="flex-[2] py-4 rounded-2xl bg-[#8B5CF6] text-white font-black text-sm shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">
                      {isPending ? 'PROCESSING...' : (paymentMethod === 'card' ? 'COMPLETE PAYMENT' : 'I HAVE SENT PAYMENT')}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-4 opacity-30 grayscale pt-2">
                   <div className="h-4 w-8 bg-blue-600 rounded-sm" />
                   <div className="h-4 w-8 bg-red-500 rounded-sm" />
                   <div className="h-4 w-8 bg-blue-400 rounded-sm" />
                   <div className="h-4 w-8 bg-orange-400 rounded-sm" />
                </div>
              </div>
            )}

            {/* Step 3: Success Welcome */}
            {step === 3 && (
              <div className="text-center space-y-5 animate-in zoom-in duration-500 py-6">
                <div className="h-14 w-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Check className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-dark tracking-tight">Success!</h2>
                  <p className="text-gray-400 text-[12px] font-medium">Welcome to the BUPEXSA Family.</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-50 space-y-2 text-left max-w-xs mx-auto">
                   <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">ID</span>
                    <span className="font-mono font-black text-md text-[#8B5CF6]">{registrationResult?.id || 'BUP-000000'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">Status</span>
                    <span className="text-green-600 font-black text-[9px] uppercase tracking-widest">Active</span>
                  </div>
                </div>
                <Link href="/dashboard" className="inline-flex items-center justify-center w-full max-w-xs py-3.5 rounded-2xl bg-dark text-white font-black text-md hover:bg-primary transition-all group">
                  Enter Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
