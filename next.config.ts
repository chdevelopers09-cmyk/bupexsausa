import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
let supabaseHost = '';
try {
  if (supabaseUrl) supabaseHost = new URL(supabaseUrl).host;
} catch (e) {
  supabaseHost = '';
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1gb',
    },
  },
  images: {
    remotePatterns: (() => {
      const patterns: any[] = [];
      if (supabaseHost) patterns.push({ protocol: 'https', hostname: supabaseHost, pathname: '/storage/**' });
      patterns.push({ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' });
      patterns.push({ protocol: 'https', hostname: 'img.youtube.com', pathname: '/**' });
      return patterns as any;
    })(),
    // Configure allowed image quality presets used in the app (add 100 since some images request it)
    qualities: [100, 70, 70, 70, 70, 70, 75]
  }
};

export default nextConfig;
