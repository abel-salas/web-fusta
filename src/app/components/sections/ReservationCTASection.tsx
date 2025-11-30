'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export function ReservationCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 overflow-hidden"
    >
      {/* Background pattern with wood grain */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`,
        }}
      />

      {/* Animated floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 text-8xl opacity-10"
      >
        🍽️
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-10 text-8xl opacity-10"
      >
        🍷
      </motion.div>

      {/* Decorative corner nails */}
      <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-amber-100 shadow-lg" />
      <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-amber-100 shadow-lg" />
      <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full bg-amber-100 shadow-lg" />
      <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-amber-100 shadow-lg" />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-6 py-2 bg-amber-100 border-4 border-amber-950 rounded-none mb-8">
            <span className="text-sm font-bold text-amber-950 uppercase tracking-widest">
              Reserva Tu Mesa
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-amber-50 mb-6 leading-tight">
            ¿Listo para una Experiencia Gastronómica Única?
          </h2>

          <p className="text-xl md:text-2xl text-amber-100 mb-12 max-w-3xl mx-auto">
            Reserva ahora y disfruta de los mejores sabores mediterráneos en un ambiente acogedor y tradicional
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contacto"
              className="group relative px-12 py-6 bg-amber-100 text-amber-950 font-bold text-lg uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-amber-50 border-4 border-amber-950 rounded-none"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                Reservar Mesa
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </Link>

            <a
              href="tel:+34937692539"
              className="group relative px-12 py-6 bg-transparent text-amber-100 font-bold text-lg uppercase tracking-widest border-4 border-amber-100 overflow-hidden transition-all duration-300 hover:bg-amber-100 hover:text-amber-950 rounded-none"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Llamar Ahora
              </span>
            </a>
          </div>

          {/* Info boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-amber-100/10 backdrop-blur-sm p-6 border-4 border-amber-100/30 rounded-none"
            >
              <div className="text-4xl mb-3">📍</div>
              <div className="text-amber-100 font-bold uppercase tracking-wide text-sm mb-2">
                Ubicación
              </div>
              <div className="text-amber-50 font-medium">
                Centro de Calella
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-amber-100/10 backdrop-blur-sm p-6 border-4 border-amber-100/30 rounded-none"
            >
              <div className="text-4xl mb-3">🕐</div>
              <div className="text-amber-100 font-bold uppercase tracking-wide text-sm mb-2">
                Horario
              </div>
              <div className="text-amber-50 font-medium">
                Lun-Dom: 12:00 - 23:00
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-amber-100/10 backdrop-blur-sm p-6 border-4 border-amber-100/30 rounded-none"
            >
              <div className="text-4xl mb-3">🅿️</div>
              <div className="text-amber-100 font-bold uppercase tracking-wide text-sm mb-2">
                Aparcamiento
              </div>
              <div className="text-amber-50 font-medium">
                Zona de fácil acceso
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
