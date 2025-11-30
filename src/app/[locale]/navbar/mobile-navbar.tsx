'use client';

import { useState, useEffect } from 'react';
import { useCloseOnEscape, useBodyScrollLock } from '@/app/components/hooks/useModal';
import Link from 'next/link';
import type { Route } from 'next';
import { LogoText } from '@/app/components/LogoText';

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavbarProps {
  navItems: NavItem[];
  homeHref: string;
}

export default function MobileNavbar({ navItems, homeHref }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Usar hooks personalizados
  useCloseOnEscape(isMenuOpen, closeMenu);
  useBodyScrollLock(isMenuOpen);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    const handleRouteChange = () => closeMenu();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);



  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-lg border-b-4 border-amber-950 transition-all duration-300">
        {/* Textura de madera sutil */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #654321 0px, #8B4513 2px, #654321 4px)'
        }} />
        
        <div className="px-4 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link
                href={homeHref as Route}
                className="text-xl font-bold text-amber-50 hover:text-amber-200 transition-colors"
                onClick={closeMenu}
              >
                <LogoText className="w-logo-header-mobile" />
              </Link>
            </div>

            {/* Hamburger Button - Siempre visible encima del modal */}
            <button
              onClick={toggleMenu}
              className={`relative z-50 inline-flex items-center justify-center p-2 rounded-none text-amber-50 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-inset transition-all duration-300 border-2 ${isMenuOpen ? 'bg-amber-950/50 border-amber-700 hover:bg-amber-950/70' : 'border-transparent hover:bg-amber-950/30'
                }`}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              <span className="sr-only">{isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}</span>
              {/* Hamburger Icon con animación mejorada */}
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                    }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-60"
          onClick={closeMenu}
        >
          {/* Modal Content */}
          <div
            className="fixed top-0 right-0 h-full w-80 max-w-sm bg-gradient-to-b from-amber-900 to-amber-950 shadow-2xl transform transition-transform duration-300 ease-in-out border-l-4 border-amber-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Textura de madera */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #654321 0px, #8B4513 3px, #654321 6px)'
            }} />
            
            {/* Modal Header - Sin botón X, solo título */}
            <div className="p-4 border-b-2 border-amber-800 relative z-10">
              <h2 className="text-lg font-semibold text-amber-50 uppercase tracking-widest font-serif">Menú</h2>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col h-full relative z-10">
              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-3">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href as Route}
                        onClick={closeMenu}
                        className="block py-3 px-4 text-lg text-amber-50 hover:text-amber-200 hover:bg-amber-950/50 rounded-none transition-all duration-200 font-semibold border-2 border-transparent hover:border-amber-700 uppercase tracking-wide"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>


            </div>
          </div>
        </div>
      )}
    </>
  );
}