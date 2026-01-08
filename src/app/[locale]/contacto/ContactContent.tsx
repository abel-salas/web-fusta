'use client';

import Image from 'next/image';
import ContactForm from './ContactForm';
import WhatsAppReservation from './WhatsAppReservation';
import { getContactInfo } from '@/app/lib/contact-utils';
import { getLocalizedData } from '@/app/lib/localization';

interface ContactContentProps {
  locale: string;
}


export default function ContactContent({ locale }: ContactContentProps) {
  const { dict } = getLocalizedData(locale);
  const contactInfo = getContactInfo();

  const data = dict.contact;

  const sanityHours = {
    title: 'Horario',
    weekdays: 'Lunes a Domingo: 13:00 - 16:00 y 20:00 - 23:00',
    closed: 'Martes cerrado'
  }

  return (
    <div className="contact-contentmin-h-screen bg-neutral-50">
      {/* Cabecera con imagen y overlay */}
      <section className="relative w-full h-[300px] md:h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={data.image}
            alt={data.alt}
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full mt-8">
          <h1 className="text-5xl font-bold text-white mb-6 uppercase">{data.title}</h1>
          <p className="text-3xl md:text-6xl text-white md:mb-8 max-w-[80%] font-reenie-beanie">{data.subtitle}</p>
        </div>
      </section>

      {/* Botón de WhatsApp Reservation */}
      <section className="relative w-full flex flex-col items-center justify-center z-30 py-8 md:hidden">
        <div className="w-full md:w-[80%] max-w-5xl px-4">
          <WhatsAppReservation whatsapp={dict.contact.whatsapp} />
        </div>
      </section>

      {/* mapa superpuesto */}
      <section className="relative w-full flex flex-col items-center justify-center md:-mt-16 z-30">
        <div className="w-full md:w-[80%] max-w-5xl flex flex-col items-center justify-center relative mx-auto">
          <div className="w-full flex items-center justify-center relative md:-mt-16 md:mt-0 z-20 pb-4 px-4 pt-4 md:pt-10 md:px-10 bg-white">
            <div className="relative w-full h-[340px] md:h-[420px] bg-white overflow-hidden">
              <iframe
                src={contactInfo.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de La Fusta - Carrer de les Creus, 12, Calella"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formulario y datos */}
      <section className="relative w-full flex flex-col items-center justify-center z-30">
        <div className="w-full md:w-[80%] max-w-5xl flex flex-col md:flex-row gap-10 items-stretch justify-center relative mx-auto bg-white p-4 md:p-10 pb-10 md:pb-16">

          {/* Columna 1: Info de contacto */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 z-30 relative">
            <h2 className="text-3xl font-bold text-black mb-6">{data.contact.title}</h2>
            <p className="text-neutral-700 mb-2">{data.contact.subtitle}</p>
            <p className="text-neutral-600 mb-2">{data.contact.description}</p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <span className="material-icons-outlined mr-2 text-base text-amber-500">place</span>
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <span className="material-icons-outlined mr-2 text-base text-amber-500">phone</span>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-amber-700 transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <span className="material-icons-outlined mr-2 text-base text-amber-500">smartphone</span>
                <a href={`tel:${contactInfo.mobile.replace(/\s/g, '')}`} className="hover:text-amber-700 transition-colors">
                  {contactInfo.mobile}
                </a>
              </div>
              <div className="flex items-start">
                <span className="material-icons-outlined mr-2 text-base text-amber-500">access_time</span>
                <div>
                  <div className="font-semibold">{sanityHours.title}</div>
                  <div>{sanityHours.weekdays}</div>
                  <div>{sanityHours.closed}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Formulario */}
          <div className="w-full md:w-1/2 flex flex-col z-30 relative">
            <ContactForm formText={data.form} />
          </div>
        </div>
      </section>

    </div>
  );
}
