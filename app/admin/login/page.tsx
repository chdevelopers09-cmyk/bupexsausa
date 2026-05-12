import { Suspense } from 'react';
import AdminLoginClient from './AdminLoginClient';

export const metadata = {
  title: 'Admin Login | BUPEXSA USA Portal',
  description: 'Administrative access for BUPEXSA USA staff members.',
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <AdminLoginClient />
    </Suspense>
  );
}
