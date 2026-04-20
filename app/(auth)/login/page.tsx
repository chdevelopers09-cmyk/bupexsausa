import { Suspense } from 'react';
import LoginClient from './LoginClient';

export const metadata = {
  title: 'Login - BUPEXSA USA',
  description: 'Login to your BUPEXSA USA member account.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-purple/30 flex items-center justify-center p-6"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <LoginClient />
    </Suspense>
  );
}
