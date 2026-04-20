import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

export const metadata = {
  title: 'Register - BUPEXSA USA',
  description: 'Join BUPEXSA USA today.',
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-purple/30 flex items-center justify-center p-6"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <RegisterClient />
    </Suspense>
  );
}
