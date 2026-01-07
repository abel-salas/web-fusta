
import { getLocalizedData } from "@/app/lib/localization";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Link from "next/link";
import type { Route } from 'next';
import { getContactInfo } from "@/app/lib/contact-utils";
import SocialMedia from "./SocialMedia";


export default async function Footer({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { dict, href } = getLocalizedData(locale);
  const contactInfo = getContactInfo();

  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-16 pb-0 px-0 border-t border-neutral-800">
      <div className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-neutral-800">
          {/* Columna 1: Logo y descripción */}
          <div>
            <Link href={href('/') as Route} className="inline-flex items-center mb-6 group">
              <span className="material-icons-outlined mr-2 text-3xl group-hover:text-amber-500 transition-colors">restaurant</span>
              <span className="text-2xl font-bold group-hover:text-amber-500 transition-colors">Restaurant La Fusta</span>
            </Link>
            <p className="text-neutral-400 mt-4 mb-8 text-base leading-relaxed max-w-xs">
              {dict.footer?.description || 'Restaurant tradicional con auténtica cocina mediterránea en el corazón de Calella.'}
            </p>
            <SocialMedia theme="dark" iconSize="large" className="mt-4" />
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="flex flex-col md:items-center">
            <h4 className="text-lg font-bold mb-6 text-neutral-100 uppercase tracking-widest">Enlaces</h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href={href('/') as Route} className="hover:text-amber-500 transition-colors">{dict.nav.home}</Link>
              </li>
              <li>
                <Link href={href('/carta') as Route} className="hover:text-amber-500 transition-colors">{dict.nav.menu}</Link>
              </li>
              <li>
                <Link href={href('/contacto') as Route} className="hover:text-amber-500 transition-colors">{dict.nav.contacto || 'Contacto'}</Link>
              </li>
              <li>
                <Link href={href('/privacy') as Route} className="hover:text-amber-500 transition-colors text-sm">{dict.footer?.privacy_policy || 'Política de Privacidad'}</Link>
              </li>
              <li>
                <Link href={href('/legal') as Route} className="hover:text-amber-500 transition-colors text-sm">{dict.legal?.title || 'Aviso Legal'}</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de contacto */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-neutral-100 uppercase tracking-widest">{dict.footer?.contact?.title || 'Contacto'}</h4>
            <div className="space-y-4 text-base">
              <div className="flex items-start">
                <span className="material-icons-outlined mr-3 text-xl text-amber-500">place</span>
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <span className="material-icons-outlined mr-3 text-xl text-amber-500">phone</span>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-amber-500 transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <span className="material-icons-outlined mr-3 text-xl text-amber-500">smartphone</span>
                <a href={`tel:${contactInfo.mobile.replace(/\s/g, '')}`} className="hover:text-amber-500 transition-colors">
                  {contactInfo.mobile}
                </a>
              </div>
              {/* Horarios desactivados temporalmente por desconexión de Sanity */}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <div className="text-neutral-500 text-sm">
            {dict.footer?.copyright || '© 2024 Restaurant La Fusta. Todos los derechos reservados.'}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}