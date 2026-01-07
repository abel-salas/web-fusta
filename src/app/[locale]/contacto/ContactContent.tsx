'use client';


import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import ContactForm from './ContactForm';
import { getContactInfo } from '@/app/lib/contact-utils';
import { getLocalizedData } from '@/app/lib/localization';

interface ContactContentProps {
  locale: string;
}


export default function ContactContent({ locale }: ContactContentProps) {
  const { dict } = getLocalizedData(locale);
  const contactInfo = getContactInfo();
  // Imagen de sección grande
  const sectionMain = {
    image: "/location.jpg",
    alt: "Ubicación La Fusta Calella"
  };
  // Datos de contacto
  const address = "Carrer de les Creus, 12, 08370 Calella, Barcelona";
  const phone = "+34 937 69 XX XX";
  const email = "info@lafusta.com";
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.5!2d2.6601!3d41.6127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bae6c8e8c8c8c8%3A0x0!2zNDHCsDM2JzQ1LjciTiAywrAzOSczNi4wIkU!5e0!3m2!1ses!2ses!4v1234567890";

  return (
    <div className="contact-contentmin-h-screen bg-neutral-50">
      {/* Cabecera con imagen y overlay */}
      <section className="relative w-full h-[260px] md:h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={sectionMain.image}
            alt={sectionMain.alt}
            fill
            className="object-cover object-top"
            priority
            fetchPriority="high"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full -translate-y-8 md:-translate-y-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Contacto</h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl text-center">¿Tienes dudas o quieres reservar? ¡Escríbenos!</p>
        </div>
      </section>

      {/* mapa superpuesto */}
      <section className="relative w-full flex flex-col items-center justify-center md:-mt-16 z-30">
        <div className="w-full md:w-[80%] max-w-5xl flex flex-col items-center justify-center relative mx-auto">
          <div className="w-full flex items-center justify-center relative md:-mt-16 md:mt-0 z-20 pb-4 px-4 pt-4 md:pt-10 md:px-10 bg-white">
            <div className="relative w-full h-[340px] md:h-[420px] bg-white overflow-hidden">
              <iframe
                src={mapSrc}
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
          {/* Columna 1: Formulario */}
          <div className="w-full md:w-1/2 flex flex-col z-30 relative">
            <ContactForm />
          </div>
          {/* Columna 2: Info de contacto */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 z-30 relative">
            <h2 className="text-2xl font-bold mb-2 text-amber-700 uppercase">{dict.footer?.contact?.title || 'Contacto'}</h2>
            <p className="text-neutral-700 mb-2">{dict.footer?.description || 'Restaurante tradicional con auténtica cocina mediterránea en el corazón de Calella.'}</p>
            <p className="text-neutral-600 mb-2">¿Tienes alguna pregunta, quieres reservar o necesitas información adicional? ¡Estamos aquí para ayudarte! Puedes contactarnos por teléfono, email o visitarnos directamente en el restaurante.</p>
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
                  <div className="font-semibold">Horario</div>
                  <div>Lunes a Domingo: 13:00 - 16:00 y 20:00 - 23:00</div>
                  <div>Martes cerrado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
