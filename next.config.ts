import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ensure TypeScript compilation is strict
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    // Re-enable ESLint with warnings instead of errors
    ignoreDuringBuilds: false,
  },
  // Moved from experimental to main config
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 75, 90],
    minimumCacheTTL: 31536000, // 1 año
  },
  // Redirects para SEO
  async redirects() {
    return [
      // Redirect de /menu a /carta para todos los idiomas
      {
        source: '/menu',
        destination: '/carta',
        permanent: true, // 301 redirect para SEO
      },
      {
        source: '/:locale/menu',
        destination: '/:locale/carta',
        permanent: true,
      },
      // Redirect de /contact a /contacto para todos los idiomas
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/:locale/contact',
        destination: '/:locale/contacto',
        permanent: true,
      },
      // Redirect de /history a /historia para todos los idiomas
      {
        source: '/history',
        destination: '/historia',
        permanent: true,
      },
      {
        source: '/:locale/history',
        destination: '/:locale/historia',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
