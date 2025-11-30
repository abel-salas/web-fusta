'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

export function LocationSectionNew() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: "📍",
      title: "Dirección",
      info: "Calle Mayor, 15\nCalella, Barcelona",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📞",
      title: "Teléfono",
      info: "+34 937 XX XX XX",
      link: "tel:+34937XXXXXX",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "⏰",
      title: "Horario",
      info: "Mar-Dom: 12:00 - 23:30\nLunes: Cerrado",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: "✉️",
      title: "Email",
      info: "hola@lafusta.com",
      link: "mailto:hola@lafusta.com",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 blur-3xl"
            style={{
              width: 600,
              height: 600,
              left: `${i * 40}%`,
              top: `${i * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Encuéntranos
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "150px" } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            En pleno centro de Calella, te esperamos con los brazos abiertos
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="relative group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Gradient background animado al hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Línea decorativa lateral */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color}`}
                  />

                  <div className="flex items-start gap-4 relative z-10">
                    {/* Icono */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`text-5xl flex-shrink-0 bg-gradient-to-br ${item.color} bg-clip-text`}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-amber-600 transition-colors whitespace-pre-line block"
                        >
                          {item.info}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.info}
                        </p>
                      )}
                    </div>

                    {/* Flecha que aparece al hover */}
                    {item.link && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-amber-500 text-2xl"
                      >
                        →
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-6"
            >
              <Link href={"/contacto" as Route}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-xl group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                    whileHover={{
                      backgroundPosition: ["0% 50%", "100% 50%"],
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contacta con Nosotros
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mapa con animaciones */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[600px] group">
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Iframe del mapa */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.123456789!2d2.65864!3d41.61414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM2JzUwLjkiTiAywrAzOSczMS4xIkU!5e0!3m2!1ses!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="relative z-0"
              />

              {/* Badge flotante sobre el mapa */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-3xl"
                  >
                    📍
                  </motion.div>
                  <div>
                    <p className="font-bold text-gray-900">La Fusta</p>
                    <p className="text-sm text-gray-600">Centro de Calella</p>
                  </div>
                </div>
              </motion.div>

              {/* Efecto de pulso en esquina */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-4 h-4 bg-amber-500 rounded-full z-20"
              />
            </div>

            {/* Elementos decorativos alrededor del mapa */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
