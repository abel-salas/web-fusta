'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

const specialties = [
  {
    icon: "🥘",
    title: "Tapas Tradicionales",
    description: "Auténticas tapas españolas con el sabor de siempre",
    color: "from-red-500 to-orange-500",
    delay: 0
  },
  {
    icon: "🍤",
    title: "Mariscos Frescos",
    description: "Del mar a tu mesa cada día",
    color: "from-blue-500 to-cyan-500",
    delay: 0.2
  },
  {
    icon: "🥩",
    title: "Carnes Selectas",
    description: "Las mejores carnes a la brasa",
    color: "from-amber-600 to-yellow-500",
    delay: 0.4
  },
  {
    icon: "🍷",
    title: "Bodega Selecta",
    description: "Vinos y cervezas artesanales",
    color: "from-purple-500 to-pink-500",
    delay: 0.6
  }
];

export function SpecialtiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background pattern animado */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-6xl mb-4"
          >
            ✨
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nuestras Especialidades
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "150px" } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre lo mejor de nuestra cocina mediterránea
          </p>
        </motion.div>

        {/* Grid de especialidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                delay: specialty.delay,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group"
            >
              {/* Card con efecto de cristal */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 overflow-hidden h-full">
                {/* Gradient animado de fondo */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${specialty.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Brillo que se mueve */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear"
                  }}
                />

                {/* Contenido */}
                <div className="relative z-10">
                  {/* Icono con animación */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-7xl mb-6 inline-block"
                  >
                    {specialty.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {specialty.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {specialty.description}
                  </p>

                  {/* Botón que aparece al hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <span className="text-amber-500 group-hover:text-amber-400 font-semibold inline-flex items-center">
                      Ver más
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.div>
                </div>

                {/* Efecto de borde brillante */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(251, 191, 36, 0)",
                      "0 0 20px rgba(251, 191, 36, 0.3)",
                      "0 0 0px rgba(251, 191, 36, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: specialty.delay,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA al final */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Link href={"/carta" as Route}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 text-lg font-semibold text-white overflow-hidden group rounded-full"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Ver Carta Completa</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Círculos decorativos flotantes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-500/10 blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </section>
  );
}
