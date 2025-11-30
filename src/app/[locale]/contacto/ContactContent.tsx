'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

interface ContactContentProps {
  locale: string;
}

export default function ContactContent({ locale }: ContactContentProps) {
  const heroRef = useRef(null);
  const contactCardsRef = useRef(null);
  const mapRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(contactCardsRef, { once: true, margin: "-100px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: '📍',
      title: 'Ubicación',
      value: 'Carrer Sant Pere, 27',
      subtitle: '08370 Calella, Barcelona',
      link: 'https://maps.google.com/?q=Carrer+Sant+Pere+27+Calella'
    },
    {
      icon: '📞',
      title: 'Teléfono',
      value: '+34 937 69 XX XX',
      subtitle: 'Llámanos para reservar',
      link: 'tel:+34937690000'
    },
    {
      icon: '🕐',
      title: 'Horario',
      value: 'Lunes a Domingo',
      subtitle: '13:00 - 16:00 / 20:00 - 23:00',
      link: null
    },
    {
      icon: '✉️',
      title: 'Email',
      value: 'info@lafusta.com',
      subtitle: 'Escríbenos tu consulta',
      link: 'mailto:info@lafusta.com'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Hero Section - Estilo Madera Tradicional */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Textura de madera animada */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #8B4513 0px, #A0522D 2px, #8B4513 4px)',
            backgroundSize: '100px 100%'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 0px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Patrón de vetas de madera */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, #654321 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, #8B4513 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, #654321 0%, transparent 50%)
          `
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge tradicional */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-br from-amber-800 to-amber-900 text-amber-50 px-8 py-3 rounded-none relative border-4 border-amber-700 shadow-xl">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-900 rounded-full" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-900 rounded-full" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-900 rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-900 rounded-full" />
                <span className="font-bold tracking-widest text-sm">TRADICIÓN DESDE 2020</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-7xl font-bold mb-6 text-amber-900"
              style={{ 
                textShadow: '3px 3px 0px rgba(180, 83, 9, 0.2)',
                fontFamily: 'Georgia, serif'
              }}
            >
              Visítanos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto mb-8 font-serif"
            >
              En el corazón de Calella, donde la madera cuenta historias<br />
              y la tradición se vive en cada rincón
            </motion.p>

            {/* Decoración de tablas de madera */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-amber-800 to-transparent"
            />
          </motion.div>
        </div>

        {/* Elementos decorativos flotantes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-900 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </section>

      {/* Tarjetas de Contacto - Estilo Tablas de Madera */}
      <section ref={contactCardsRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif">
              Información de Contacto
            </h2>
            <div className="h-1 w-32 mx-auto bg-amber-800 mb-6" />
            <p className="text-amber-700 text-lg">
              Estamos aquí para atenderte
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={cardsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                {info.link ? (
                  <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    <ContactCard info={info} />
                  </a>
                ) : (
                  <ContactCard info={info} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa con overlay de madera */}
      <section ref={mapRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-none overflow-hidden shadow-2xl border-8 border-amber-900 max-w-5xl mx-auto"
          >
            {/* Esquinas decorativas */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-amber-700 z-10" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-amber-700 z-10" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-amber-700 z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-amber-700 z-10" />

            {/* Badge flotante sobre el mapa */}
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              animate={mapInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-8 left-8 z-20 bg-gradient-to-br from-amber-800 to-amber-900 text-white px-6 py-4 rounded-none shadow-2xl border-4 border-amber-700"
            >
              <div className="text-center">
                <div className="text-4xl mb-1">📍</div>
                <div className="font-bold text-sm">LA FUSTA</div>
                <div className="text-xs opacity-90">Centro de Calella</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={mapInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-[500px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.123456789!2d2.65!3d41.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM2JzM2LjAiTiAywrAzOScwMC4wIkU!5e0!3m2!1ses!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final - Tablón de Madera */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 opacity-95" />
        
        {/* Textura de vetas */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #654321 0px,
            #8B4513 3px,
            #654321 6px
          )`
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6 font-serif">
              Te Esperamos en La Fusta
            </h2>
            <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto">
              Ven a disfrutar de nuestras tapas en un ambiente tradicional y acogedor
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/${locale}/carta` as Route}
                  className="inline-block bg-amber-50 text-amber-900 px-10 py-4 rounded-none font-bold text-lg border-4 border-amber-700 hover:bg-amber-100 transition-colors shadow-xl"
                >
                  Ver Nuestra Carta
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="tel:+34937690000"
                  className="inline-block border-4 border-amber-50 text-amber-50 px-10 py-4 rounded-none font-bold text-lg hover:bg-amber-50 hover:text-amber-900 transition-colors"
                >
                  Llamar Ahora
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Componente de tarjeta de contacto con estilo de madera
function ContactCard({ info }: { info: any }) {
  return (
    <div className="h-full bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-none relative border-4 border-amber-800 shadow-xl group-hover:shadow-2xl transition-shadow">
      {/* Clavos decorativos en las esquinas */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />
      <div className="absolute top-2 right-2 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />

      {/* Veta de madera sutil */}
      <div className="absolute inset-0 opacity-10 rounded-none" style={{
        backgroundImage: 'linear-gradient(90deg, transparent 0%, #654321 50%, transparent 100%)'
      }} />

      <div className="relative z-10 text-center">
        <motion.div
          className="text-5xl mb-4"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
        >
          {info.icon}
        </motion.div>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3 font-serif border-b-2 border-amber-800 pb-2">
          {info.title}
        </h3>
        
        <p className="text-amber-800 font-semibold mb-1">
          {info.value}
        </p>
        
        <p className="text-amber-700 text-sm">
          {info.subtitle}
        </p>
      </div>

      {/* Brillo hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-300 to-transparent opacity-0 group-hover:opacity-20 transition-opacity rounded-none"
        initial={false}
      />
    </div>
  );
}