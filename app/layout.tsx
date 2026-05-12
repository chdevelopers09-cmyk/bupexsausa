import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG, getAbsoluteUrl } from "@/lib/config";
import AuthHandshake from "@/components/auth/AuthHandshake";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthHandshake />
        {children}
      </body>
    </html>
  );
}
