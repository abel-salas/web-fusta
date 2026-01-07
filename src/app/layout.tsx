import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import { SEO_CONFIG } from "@/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Restaurante La Fusta',
    default: 'Restaurante La Fusta - Cocina Mediterránea Auténtica',
  },
  description: "Descubre la auténtica cocina mediterránea en Restaurante La Fusta. Platos caseros, ingredientes frescos y un ambiente acogedor.",
  metadataBase: new URL(SEO_CONFIG.site.url),
  alternates: {
    canonical: '/',
    languages: SEO_CONFIG.site.supportedLocales.reduce((acc, locale) => {
      acc[locale] = `/${locale}`;
      return acc;
    }, {} as Record<string, string>),
  },
  manifest: '/favicon_io/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect to critical domains for faster loading */}
        {/* Sanity CDN - only if using Sanity images */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

