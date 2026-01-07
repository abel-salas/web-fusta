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
    title: dict.privacy?.metaTitle || 'Política de Privacidad',
    description: dict.privacy?.metaDescription || 'Política de privacidad del restaurante',
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const privacy = dict.privacy;
  
  // Fallback content if translations are not available
  if (!privacy) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Política de Privacidad
          </h1>
          <p className="text-center text-gray-600">
            Esta página está en desarrollo. Por favor, contacte con nosotros para más información.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {privacy.title}
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. {privacy.sections.general.title}</h2>
            <p>{privacy.sections.general.content}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. {privacy.sections.responsible.title}</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>{privacy.sections.responsible.denomination}</strong> La Fusta</p>
              <p><strong>{privacy.sections.responsible.address}</strong> {CONTACT_INFO.address}</p>
              <p><strong>{privacy.sections.responsible.phone}</strong> {CONTACT_INFO.phone}</p>
              <p><strong>{privacy.sections.responsible.email}</strong> {CONTACT_INFO.email}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. {privacy.sections.data_collected.title}</h2>
            <p>{privacy.sections.data_collected.intro}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              {privacy.sections.data_collected.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. {privacy.sections.purpose.title}</h2>
            <p>{privacy.sections.purpose.intro}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              {privacy.sections.purpose.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. {privacy.sections.legal_basis.title}</h2>
            <p>{privacy.sections.legal_basis.intro}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>{privacy.sections.legal_basis.contractual}</strong></li>
              <li><strong>{privacy.sections.legal_basis.consent}</strong></li>
              <li><strong>{privacy.sections.legal_basis.legitimate}</strong></li>
              <li><strong>{privacy.sections.legal_basis.legal}</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. {privacy.sections.retention.title}</h2>
            <p>{privacy.sections.retention.content}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. {privacy.sections.recipients.title}</h2>
            <p>{privacy.sections.recipients.intro}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              {privacy.sections.recipients.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. {privacy.sections.rights.title}</h2>
            <p>{privacy.sections.rights.intro}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>{privacy.sections.rights.access}</strong></li>
              <li><strong>{privacy.sections.rights.rectification}</strong></li>
              <li><strong>{privacy.sections.rights.erasure}</strong></li>
              <li><strong>{privacy.sections.rights.restriction}</strong></li>
              <li><strong>{privacy.sections.rights.portability}</strong></li>
              <li><strong>{privacy.sections.rights.objection}</strong></li>
            </ul>
            <p className="mt-4">{privacy.sections.rights.exercise}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. {privacy.sections.authority.title}</h2>
            <p>{privacy.sections.authority.content}</p>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">10. {privacy.sections.cookies.title}</h2>
            <p className="text-blue-800">
              <strong>{privacy.sections.cookies.important}</strong> {privacy.sections.cookies.no_cookies}
            </p>
            <p className="text-blue-800 mt-3">{privacy.sections.cookies.basic_data}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. {privacy.sections.security.title}</h2>
            <p>{privacy.sections.security.content}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. {privacy.sections.modifications.title}</h2>
            <p>{privacy.sections.modifications.content}</p>
          </section>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>{privacy.last_updated}</strong> {privacy.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}