import { getLocalizedData } from "@/app/lib/localization";
import MobileNavbar from "./mobile-navbar";
import Link from "next/link";
import type { Route } from 'next';
import { LogoText } from "@/app/components/LogoText";

export default async function Navbar({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { dict, href } = getLocalizedData(locale);

  const navItems = [
    { href: href('/'), label: dict.nav.home },
    { href: href('/carta'), label: dict.nav.menu },
    { href: href('/contacto'), label: dict.nav.contacto || 'Contacto' },
    { href: href('/historia'), label: dict.nav.history },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-lg border-b-4 border-amber-950 transition-all duration-300">
        {/* Textura de madera sutil */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #654321 0px, #8B4513 2px, #654321 4px)'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link href={href('/') as Route} className="text-xl font-bold text-amber-50 hover:text-amber-200 transition-colors">
                <LogoText className="w-logo-header-desk" />
              </Link>
            </div>

            {/* Desktop Menu - Centrado */}
            <ul className="flex space-x-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href as Route}
                    className="text-amber-50 hover:bg-amber-950/30 px-4 py-2 rounded-none transition-all duration-200 font-semibold tracking-wide text-sm uppercase border-2 border-transparent hover:border-amber-700 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Espacio para mantener el logo centrado */}
            <div className="flex-shrink-0 w-24"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavbar
        navItems={navItems}
        homeHref={href('/') as Route}
      />
    </>
  );
}
