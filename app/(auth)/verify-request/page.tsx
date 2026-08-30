'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-purple-100/20 border border-gray-100">
        <div className="h-20 w-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-black text-dark">Check your email</h1>
        <p className="text-gray-500 leading-relaxed text-sm">
          We sent a sign-in link to your email. Please open it to complete sign-in. The link may take a minute to arrive.
        </p>
        <div className="pt-4">
          <Link href="/" className="text-primary font-black uppercase tracking-widest text-xs hover:underline inline-flex items-center gap-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
