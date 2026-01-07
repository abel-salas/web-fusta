import React from 'react';
import { getDictionary } from '../../lib/getDictionary';
import { CONTACT_INFO } from '../../lib/contact-info';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.legal?.metaTitle || `Legal Notice - Restaurant La Fusta`,
    description: dict.legal?.metaDescription || 'Legal notice of Restaurant La Fusta website',
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.banyslagavina.cat/${locale}/legal`,
      languages: {
        'es': 'https://www.banyslagavina.cat/es/legal',
        'en': 'https://www.banyslagavina.cat/en/legal',
        'ca': 'https://www.banyslagavina.cat/ca/legal',
        'nl': 'https://www.banyslagavina.cat/nl/legal',
        'de': 'https://www.banyslagavina.cat/de/legal',
      }
    }
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  if (!dict.legal) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p>Legal notice not available in this language.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {dict.legal.title}
          </h1>
          <p className="text-xl text-gray-600">
            {dict.legal.sections.general.content}
          </p>
        </div>

        {/* Legal Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Owner Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.owner.title}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>{dict.legal.sections.owner.denomination}</strong> Restaurant La Fusta</p>
              <p><strong>{dict.legal.sections.owner.address}</strong> {CONTACT_INFO.address}</p>
              <p><strong>{dict.legal.sections.owner.phone}</strong> {CONTACT_INFO.phone}</p>
              <p><strong>{dict.legal.sections.owner.email}</strong> {CONTACT_INFO.email}</p>
            </div>
          </section>

          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.purpose.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.legal.sections.purpose.content}
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.data_protection.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.legal.sections.data_protection.content}{' '}
              <a href={`/${locale}/privacy`} className="text-blue-600 hover:text-blue-800 underline">
                {dict.footer?.privacy_policy || 'Privacy Policy'}
              </a>.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.intellectual_property.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.legal.sections.intellectual_property.content}
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.liability.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.legal.sections.liability.content}
            </p>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.external_links.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.legal.sections.external_links.content}
            </p>
          </section>

          {/* Applicable Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {dict.legal.sections.applicable_law.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.legal.sections.applicable_law.content}
            </p>
          </section>

          {/* No Cookies - Highlighted */}
          <section className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
              <span className="mr-2">🍪</span>
              {dict.legal.sections.no_cookies.title}
            </h2>
            <div className="text-green-700 space-y-2">
              <p className="font-medium">
                {dict.legal.sections.no_cookies.important} {dict.legal.sections.no_cookies.content}
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              <strong>{dict.legal.last_updated}</strong> {dict.legal.date}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}