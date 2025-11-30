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
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm text-white transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link href={href('/') as Route} className="text-xl font-bold text-white hover:text-blue-300 transition-colors">
                <LogoText className="w-logo-header-desk" />
              </Link>
            </div>

            {/* Desktop Menu - Centrado */}
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href as Route}
                    className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
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
