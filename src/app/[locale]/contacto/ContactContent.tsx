import Link from 'next/link';
import type { Route } from 'next';
// import { getContactInfo } from "@/app/lib/contact-utils"; // No usado actualmente
import HoursSection from "@/app/components/HoursSection";
import SocialMedia from '@/app/components/SocialMedia';
import { getLocalizedData } from '@/app/lib/localization';

// Interfaz para datos desde Sanity
interface ContactContent {
  _id?: string;
  locale?: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contactInfo: {
    title: string;
    subtitle?: string;
    description?: string;
    contactMethods: Array<{
      type: 'phone' | 'whatsapp' | 'email' | 'address';
      icon: string;
      label: string;
      value: string;
      link?: string;
    }>;
  };
  scheduleSection: {
    title: string;
    subtitle?: string;
    description?: string;
    scheduleNote?: string;
    schedules: Array<{
      period: string;
      days: string;
      hours: string;
      note?: string;
    }>;
  };
  locationSection: {
    title: string;
    subtitle?: string;
    address: string;
    mapDescription?: string;
    transportInfo?: Array<{
      type: 'car' | 'public' | 'walking';
      icon: string;
      title: string;
      description: string;
    }>;
  };
  contactForm: {
    title: string;
    description?: string;
    successMessage: string;
    errorMessage: string;
  };
  finalCta: {
    title: string;
    description: string;
    buttons: Array<{
      text: string;
      href: string;
      variant: 'primary' | 'secondary' | 'outline';
      icon?: string;
    }>;
  };
}

interface ContactContentProps {
  content: ContactContent;
  locale: string;
}

export default function ContactContent({ content, locale }: ContactContentProps) {
  const { href } = getLocalizedData(locale);
  // const contactInfo = getContactInfo(); // Comentado temporalmente, se usa contenido de Sanity

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 px-6 py-2 rounded-full mb-6">
          <span className="text-blue-800 font-medium">{content.hero.badge}</span>
        </div>
        
        <h1 className="text-5xl font-parisienne mb-4">
          {content.hero.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {content.hero.subtitle}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Información de Contacto */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            {content.contactInfo.title}
          </h2>
          {content.contactInfo.subtitle && (
            <p className="text-gray-600 mb-4">{content.contactInfo.subtitle}</p>
          )}
          {content.contactInfo.description && (
            <p className="text-gray-700 mb-6">{content.contactInfo.description}</p>
          )}

          <div className="space-y-4">
            {content.contactInfo.contactMethods.map((method, index) => (
              <div key={index} className="flex items-center">
                <span className="material-icons-outlined text-blue-600 text-2xl mr-3">
                  {method.icon}
                </span>
                <div>
                  <h3 className="font-semibold">{method.label}</h3>
                  {method.link ? (
                    <a 
                      href={method.link} 
                      className="text-blue-600 hover:text-blue-800"
                      {...(method.type === 'phone' || method.type === 'whatsapp' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 whitespace-pre-line">{method.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Horarios integrados */}
            <div className="flex items-start">
              <span className="material-icons-outlined text-blue-600 text-2xl mr-3 mt-1">schedule</span>
              <div className="flex-1">
                <HoursSection
                  locale={locale}
                  showTitle={true}
                  className="text-gray-600"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <SocialMedia theme="light" iconSize="large" />
            </div>
          </div>
        </section>

        {/* Formulario de Contacto Simple */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            {content.contactForm.title}
          </h2>
          {content.contactForm.description && (
            <p className="text-gray-700 mb-6">{content.contactForm.description}</p>
          )}
          
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Para contactar con nosotros, utiliza los datos de la izquierda o visítanos directamente.</p>
          </div>
        </section>
      </div>

      {/* CTA Final */}
      <section className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white">
        <h2 className="text-3xl font-bold mb-4">
          {content.finalCta.title}
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          {content.finalCta.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {content.finalCta.buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href as Route}
              className={`
                font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center justify-center gap-2
                ${button.variant === 'primary' 
                  ? 'bg-white text-blue-600 hover:bg-blue-50' 
                  : button.variant === 'secondary'
                  ? 'bg-blue-500 text-white hover:bg-blue-400'
                  : 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
                }
              `}
            >
              {button.icon && (
                <span className="material-icons-outlined text-xl">{button.icon}</span>
              )}
              {button.text}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}