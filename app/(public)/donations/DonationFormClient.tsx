'use client';

import { useState } from 'react';
import { Heart, DollarSign, CreditCard, Smartphone, Building, CheckCircle2, ArrowRight, Copy, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/mock-data';

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

const PAYMENT_METHODS = [
  { id: 'stripe', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex — Secure, instant' },
  { id: 'paypal', label: 'PayPal', icon: DollarSign, desc: 'PayPal account or card — Instant confirmation' },
  { id: 'zelle', label: 'Zelle', icon: Building, desc: 'US bank transfer — Admin verified (1-2 days)' },
  { id: 'cashapp', label: 'CashApp', icon: Smartphone, desc: 'Mobile payment — Admin verified (1-2 days)' },
];

export default function DonationFormClient() {
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState('stripe');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const finalAmount = amount || (customAmount ? parseFloat(customAmount) : 0);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) { setError('Please enter a valid donation amount.'); return; }
    if (!name.trim() && !anonymous) { setError('Please enter your name or check "Donate Anonymously".'); return; }
    if (!email.trim()) { setError('Please enter your email address.'); return; }

    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-bg-purple to-white">
        <div className="container-wide max-w-2xl mx-auto text-center animate-fade-in space-y-8">
          <div className="h-28 w-28 rounded-full bg-green-100 mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-14 w-14 text-green-600" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-dark mb-4">Thank You!</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {method === 'zelle' || method === 'cashapp'
                ? 'Your donation has been received and is pending admin verification. You will receive a confirmation email within 1-2 business days.'
                : `Your donation of $${finalAmount.toFixed(2)} has been processed successfully. A receipt has been sent to ${email}.`}
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-4 text-left">
            <h3 className="font-black text-dark">Donation Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-400 font-medium">Amount</p><p className="font-black text-dark text-lg">${finalAmount.toFixed(2)}</p></div>
              <div><p className="text-gray-400 font-medium">Method</p><p className="font-bold text-dark capitalize">{method}</p></div>
              <div><p className="text-gray-400 font-medium">Donor</p><p className="font-bold text-dark">{anonymous ? 'Anonymous' : name}</p></div>
              <div><p className="text-gray-400 font-medium">Status</p><p className="font-bold text-green-600">✓ {method === 'zelle' || method === 'cashapp' ? 'Pending Verification' : 'Completed'}</p></div>
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setAmount(''); setCustomAmount(''); }} className="btn-secondary">
            Make Another Donation
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-bg-purple/40 to-white" id="donate-form">
      <div className="container-wide max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple/10 p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-dark">Make a Donation</h2>
                  <p className="text-sm text-gray-500">100% goes to PCSS Buea students</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <label className="label-field mb-4">Select Amount (USD)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {PRESET_AMOUNTS.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setAmount(a); setCustomAmount(''); }}
                        className={`py-3 rounded-2xl text-sm font-black transition-all duration-200 border-2 ${
                          amount === a && !customAmount
                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                            : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                        }`}
                      >
                        ${a}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={e => { setCustomAmount(e.target.value); setAmount(''); }}
                      className={`input-field pl-8 ${customAmount ? 'border-primary' : ''}`}
                    />
                  </div>
                  {finalAmount > 0 && (
                    <p className="mt-2 text-sm text-primary font-bold">
                      You are donating: ${typeof finalAmount === 'number' ? finalAmount.toFixed(2) : parseFloat(finalAmount).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Donor Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="label-field mb-0">Your Information</label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-colors relative ${anonymous ? 'bg-primary' : 'bg-gray-200'}`} onClick={() => setAnonymous(!anonymous)}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${anonymous ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                      <span className="text-sm font-bold text-gray-600">Donate Anonymously</span>
                    </label>
                  </div>
                  {!anonymous && (
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="input-field"
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email Address * (for receipt)"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                  <textarea
                    placeholder="Dedication or message (optional)"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={2}
                    className="input-field resize-none"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="label-field mb-4">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map(m => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMethod(m.id)}
                          className={`p-4 rounded-2xl text-left transition-all border-2 ${
                            method === m.id
                              ? 'border-primary bg-purple-50 shadow-md'
                              : 'border-gray-200 hover:border-primary/40'
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-xl flex items-center justify-center mb-2 ${method === m.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <p className="font-black text-dark text-sm">{m.label}</p>
                          <p className="text-xs text-gray-400 leading-tight mt-0.5">{m.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Zelle / CashApp Instructions */}
                {(method === 'zelle' || method === 'cashapp') && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3 animate-fade-in">
                    <p className="font-black text-amber-800 text-sm">📋 Manual Payment Instructions</p>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      After submitting this form, send ${finalAmount || '___'} to the details below. Include your name as reference.
                    </p>
                    <div className="bg-white rounded-xl p-4 space-y-2">
                      {method === 'zelle' ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Zelle Handle</p>
                            <p className="font-black text-dark">{SITE_CONFIG.zelleHandle}</p>
                          </div>
                          <button type="button" onClick={() => handleCopy(SITE_CONFIG.zelleHandle, 'zelle')} className="text-primary hover:text-primary-dark p-2 rounded-lg hover:bg-purple-50">
                            {copied === 'zelle' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">CashApp Handle</p>
                            <p className="font-black text-dark">{SITE_CONFIG.cashappHandle}</p>
                          </div>
                          <button type="button" onClick={() => handleCopy(SITE_CONFIG.cashappHandle, 'cashapp')} className="text-primary hover:text-primary-dark p-2 rounded-lg hover:bg-purple-50">
                            {copied === 'cashapp' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-amber-700">Your donation will be verified and confirmed within 1-2 business days.</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-2xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-5 text-lg rounded-2xl font-black shadow-2xl shadow-primary/20"
                  id="donation-submit"
                >
                  {loading ? 'Processing...' : (
                    <>
                      <Heart className="h-5 w-5" />
                      {finalAmount > 0 ? `Donate $${typeof finalAmount === 'number' ? finalAmount.toFixed(2) : parseFloat(finalAmount as string).toFixed(2)}` : 'Donate Now'}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400">
                  🔒 Secured by {method === 'stripe' ? 'Stripe' : method === 'paypal' ? 'PayPal' : 'BUPEXSA USA'} · Your information is safe
                </p>
              </form>
            </div>
          </div>

          {/* Right: Impact Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-8 text-white space-y-6">
              <h3 className="text-xl font-black">Your Impact</h3>
              {[
                { amount: '$10', desc: 'Funds one month of school supplies for a student in need' },
                { amount: '$25', desc: 'Covers one full term of laboratory materials' },
                { amount: '$50', desc: 'Sponsors a student\'s full academic year fees' },
                { amount: '$100', desc: 'Contributes to our annual scholarship endowment fund' },
                { amount: '$250+', desc: 'Qualifies you as a BUPEXSA USA Patron — full recognition' },
              ].map(item => (
                <div key={item.amount} className="flex gap-4">
                  <div className="shrink-0 h-10 w-16 bg-white/15 rounded-xl flex items-center justify-center font-black text-sm">{item.amount}</div>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Total Raised */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-4 text-center">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Raised for PCSS Buea</p>
              <p className="text-5xl font-black text-dark">$125K+</p>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="h-3 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: '63%' }} />
              </div>
              <p className="text-sm text-gray-500">63% toward our $200K 3-year goal</p>
            </div>

            {/* Tax Info */}
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <p className="font-black text-dark text-sm mb-2">🎁 Tax Deductible</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                BUPEXSA USA is a registered 501(c)(3) non-profit. Your donation may be tax-deductible. A receipt will be emailed to you after your donation is processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
