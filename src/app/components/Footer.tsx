import { getLocalizedData } from "@/app/lib/localization";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Link from "next/link";
import type { Route } from 'next';
import { getContactInfo } from "@/app/lib/contact-utils";
import HoursSection from "./HoursSection";
import SocialMedia from "./SocialMedia";

export default async function Footer({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { dict, href } = getLocalizedData(locale);
  const contactInfo = getContactInfo();

  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-amber-50 relative overflow-hidden border-t-4 border-amber-800">
      {/* Textura de madera */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, #654321 0px, #8B4513 3px, #654321 6px)'
      }} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="mb-4">
              <Link href={href('/') as Route} className="text-2xl font-bold text-amber-50 hover:text-amber-200 transition-colors inline-flex items-center">
                <span className="material-icons-outlined mr-2 text-3xl">restaurant</span>
                <span className="font-serif">Restaurant La Fusta</span>
              </Link>
            </div>
            <p className="text-amber-100 mb-6 text-sm leading-relaxed">
              {dict.footer?.description || 'Restaurant tradicional con auténtica cocina mediterránea en el corazón de Calella.'}
            </p>
            <SocialMedia theme="dark" iconSize="large" />
          </div>

          {/* Enlaces rápidos en dos columnas */}
          <div className="grid grid-cols-2 gap-4">
            {/* Columna 1: Páginas principales */}
            <div>
              <h4 className="text-md font-bold mb-4 text-amber-200 uppercase tracking-wider border-b-2 border-amber-700 pb-2 font-serif">Restaurante</h4>
              <ul className="space-y-3">
                <li>
                  <Link href={href('/') as Route} className="text-amber-100 hover:text-amber-50 transition-colors text-sm flex items-center group">
                    <span className="w-2 h-2 bg-amber-700 mr-2 group-hover:bg-amber-500 transition-colors" />
                    {dict.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={href('/carta') as Route} className="text-amber-100 hover:text-amber-50 transition-colors text-sm flex items-center group">
                    <span className="w-2 h-2 bg-amber-700 mr-2 group-hover:bg-amber-500 transition-colors" />
                    {dict.nav.menu}
                  </Link>
                </li>
                <li>
                  <Link href={href('/historia') as Route} className="text-amber-100 hover:text-amber-50 transition-colors text-sm flex items-center group">
                    <span className="w-2 h-2 bg-amber-700 mr-2 group-hover:bg-amber-500 transition-colors" />
                    {dict.nav.history}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 2: Servicios y legal */}
            <div>
              <h4 className="text-md font-bold mb-4 text-amber-200 uppercase tracking-wider border-b-2 border-amber-700 pb-2 font-serif">Información</h4>
              <ul className="space-y-3">
                <li>
                  <Link href={href('/contacto') as Route} className="text-amber-100 hover:text-amber-50 transition-colors text-sm flex items-center group">
                    <span className="w-2 h-2 bg-amber-700 mr-2 group-hover:bg-amber-500 transition-colors" />
                    {dict.nav.contacto || 'Contacto'}
                  </Link>
                </li>
                <li className="pt-3">
                  <Link href={href('/privacy') as Route} className="text-amber-200/70 hover:text-amber-100 transition-colors text-xs flex items-center">
                    <span className="material-icons-outlined text-xs mr-1">security</span>
                    {dict.footer?.privacy_policy || 'Política de Privacidad'}
                  </Link>
                </li>
                <li>
                  <Link href={href('/legal') as Route} className="text-amber-200/70 hover:text-amber-100 transition-colors text-xs flex items-center">
                    <span className="material-icons-outlined text-xs mr-1">gavel</span>
                    {dict.legal?.title || 'Aviso Legal'}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-200 uppercase tracking-wider border-b-2 border-amber-700 pb-2 font-serif">{dict.footer?.contact?.title || 'Contacto'}</h3>
            <div className="space-y-3 text-amber-100 text-sm">
              <p className="flex items-start">
                <span className="material-icons-outlined mr-2 mt-0.5 text-lg text-amber-400">place</span>
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </p>
              <p className="flex items-center">
                <span className="material-icons-outlined mr-2 text-lg text-amber-400">phone</span>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-amber-50 transition-colors">
                  {contactInfo.phone}
                </a>
              </p>
              <p className="flex items-center">
                <span className="material-icons-outlined mr-2 text-lg text-amber-400">smartphone</span>
                <a href={`tel:${contactInfo.mobile.replace(/\s/g, '')}`} className="hover:text-amber-50 transition-colors">
                  {contactInfo.mobile}
                </a>
              </p>
              <div className="flex items-start">
                <span className="material-icons-outlined mr-2 mt-0.5 text-lg text-amber-400">access_time</span>
                <div className="flex-1">
                  <HoursSection
                    locale={locale}
                    showTitle={true}
                    isFooter={true}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior con selector de idiomas */}
        <div className="border-t-2 border-amber-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-amber-200/80 text-sm font-serif">
              {dict.footer?.copyright || '© 2024 Restaurant La Fusta. Todos los derechos reservados.'}
            </div>

            {/* Selector de idiomas */}
            <div className="flex flex-col items-center md:items-end">
              <div className="mb-2">
                <span className="text-sm text-amber-200 font-semibold uppercase tracking-wider">{dict.footer?.language_selector || 'Idioma'}</span>
              </div>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}