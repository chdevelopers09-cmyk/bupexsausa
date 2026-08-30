import React from 'react';
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
    <html lang="en" style={{ scrollBehavior: 'smooth' }} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthHandshake />
        <DevConsoleFilter />
        <div id="content">{children}</div>
      </body>
    </html>
  );
}

function DevConsoleFilter() {
  // Suppress noisy browser-extension warnings in development only.
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return null;

  // Run once on the client
  React.useEffect(() => {
    const origLog = console.log.bind(console);
    const origWarn = console.warn.bind(console);
    const origError = console.error.bind(console);

    function shouldIgnore(args: any[]) {
      try {
        const txt = args.map(String).join(' ');
        return (
          txt.includes('failed to patch window.location setter') ||
          txt.includes('redirectionChainSiteScript') ||
          txt.includes('cently:') ||
          txt.includes('aarSiteScript') ||
          txt.includes('IsInPageViewTrackingList')
        );
      } catch (e) {
        return false;
      }
    }

    console.log = (...args: any[]) => {
      if (shouldIgnore(args)) return;
      origLog(...args);
    };
    console.warn = (...args: any[]) => {
      if (shouldIgnore(args)) return;
      origWarn(...args);
    };
    console.error = (...args: any[]) => {
      if (shouldIgnore(args)) return;
      origError(...args);
    };

    return () => {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
    };
  }, []);

  return null;
}
