"use client";
import { getLocalizedData } from "@/app/lib/localization";
import { useEffect, useState } from "react";
import MobileNavbar from "./mobile-navbar";
import Link from "next/link";
import type { Route } from 'next';
import { LogoText } from "@/app/components/LogoText";

export default function Navbar({ params }: { params: Promise<{ locale: string }> }) {
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Detectar si estamos en la home principal
    const checkHomePage = () => {
      const path = window.location.pathname;
      setIsHomePage(path === '/' || path.match(/^\/[a-z]{2}$/));
    };
    checkHomePage();
    window.addEventListener('popstate', checkHomePage);
    return () => window.removeEventListener('popstate', checkHomePage);
  }, []);
  
  const [locale, setLocale] = useState("es");
  const [dict, setDict] = useState({ nav: {}, footer: {} });
  const [href, setHref] = useState((path: string) => path);
  useEffect(() => {
    params.then(({ locale }) => {
      setLocale(locale);
      const data = getLocalizedData(locale);
      setDict(data.dict);
      setHref(() => data.href);
    });
  }, [params]);

  if (!dict.nav.home) return null;
  const navItems = [
    { href: href('/'), label: dict.nav.home },
    { href: href('/carta'), label: dict.nav.menu },
    { href: href('/contacto'), label: dict.nav.contacto || 'Contacto' },
  ];
  // Dividir items en izquierda y derecha
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2, 4);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-neutral-900/95" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center items-center h-16">
            {/* Left Menu Items */}
            <ul className="flex space-x-2">
              {leftItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href as Route}
                    className="text-white px-4 py-2 rounded-none transition-all duration-200 font-semibold tracking-wide text-sm uppercase border-2 border-transparent inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Logo Centered */}
            <div className="mx-8">
              <Link 
                href={href('/') as Route} 
                className={`text-4xl tracking-tight font-bold text-white transition-all duration-300 ${
                  isHomePage && !scrolled ? 'opacity-0 invisible' : 'opacity-100 visible'
                }`}
              >
                LA FUSTA
              </Link>
            </div>

            {/* Right Menu Items */}
            <ul className="flex space-x-2">
              {rightItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href as Route}
                    className="text-white px-4 py-2 rounded-none transition-all duration-200 font-semibold tracking-wide text-sm uppercase border-2 border-transparent inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
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
