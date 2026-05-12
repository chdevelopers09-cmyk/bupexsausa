import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/mock-data";

let safeMetadataBase: URL | undefined;
try {
  safeMetadataBase = new URL(SITE_CONFIG.url || 'https://bupexsausa.org');
} catch (e) {
  safeMetadataBase = undefined;
}

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: safeMetadataBase,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
