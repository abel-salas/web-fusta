'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

export function SpecialtiesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const specialties = [
    {
      icon: '🥘',
      title: 'Tapas Tradicionales',
      description: 'Auténticas tapas españolas elaboradas con recetas de toda la vida',
      highlight: 'Patatas bravas, Croquetas caseras, Jamón ibérico',
      color: 'from-orange-600 to-red-600',
      bgPattern: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)',
      delay: 0
    },
    {
      icon: '🍤',
      title: 'Mariscos Frescos',
      description: 'Del mar a tu mesa, productos frescos de la mejor calidad',
      highlight: 'Gambas al ajillo, Sepia a la plancha, Pulpo gallego',
      color: 'from-blue-600 to-cyan-600',
      bgPattern: 'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
      delay: 0.2
    },
    {
      icon: '🥩',
      title: 'Carnes Selectas',
      description: 'Las mejores carnes a la brasa con el punto perfecto',
      highlight: 'Entrecot, Secreto ibérico, Chuletón de buey',
      color: 'from-amber-700 to-orange-700',
      bgPattern: 'radial-gradient(circle at 50% 20%, rgba(180, 83, 9, 0.3) 0%, transparent 50%)',
      delay: 0.4
    },
    {
      icon: '🍷',
      title: 'Bodega Selecta',
      description: 'Cuidada selección de vinos para maridar tus tapas',
      highlight: 'Vinos locales, Reservas especiales, Vermuts artesanos',
      color: 'from-purple-600 to-pink-600',
      bgPattern: 'radial-gradient(circle at 50% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
      delay: 0.6
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* Textura de madera animada de fondo */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #8B4513 0px, #A0522D 2px, #8B4513 4px)',
          y
        }}
      />

      {/* Partículas flotantes decorativas */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-800/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header con animación de escritura */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-br from-amber-800 to-amber-900 text-amber-50 px-8 py-3 rounded-none relative border-4 border-amber-700 shadow-xl">
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-900 rounded-full" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-900 rounded-full" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-900 rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-900 rounded-full" />
              <span className="font-bold tracking-widest text-sm">NUESTRAS ESPECIALIDADES</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold text-amber-900 mb-4 font-serif"
            style={{ textShadow: '3px 3px 0px rgba(180, 83, 9, 0.2)' }}
          >
            El Sabor de la Tradición
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-amber-800 max-w-2xl mx-auto font-serif"
          >
            Cada tapa cuenta una historia, cada plato es una experiencia
          </motion.p>
        </motion.div>

        {/* Grid de especialidades con efecto 3D */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto perspective-1000">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -30, z: -100 }}
              animate={isInView ? { opacity: 1, rotateY: 0, z: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: specialty.delay,
                type: "spring",
                stiffness: 100
              }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="relative group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="relative h-full bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-none border-4 border-amber-800 shadow-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  rotateZ: 2,
                  boxShadow: "0 25px 50px -12px rgba(120, 53, 15, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Patrón de fondo dinámico */}
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  style={{ background: specialty.bgPattern }}
                  animate={activeCard === index ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Clavos decorativos */}
                <div className="absolute top-3 left-3 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />
                <div className="absolute top-3 right-3 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />
                <div className="absolute bottom-3 left-3 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />
                <div className="absolute bottom-3 right-3 w-3 h-3 bg-amber-900 rounded-full shadow-inner" />

                {/* Icono con animación 3D */}
                <motion.div
                  className="text-7xl mb-6 relative z-10"
                  animate={activeCard === index ? {
                    rotateY: [0, 360],
                    scale: [1, 1.3, 1]
                  } : {}}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: specialty.delay
                    }}
                  >
                    {specialty.icon}
                  </motion.div>
                </motion.div>

                {/* Contenido */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-900 mb-3 font-serif"
                    animate={activeCard === index ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {specialty.title}
                  </motion.h3>
                  
                  <p className="text-amber-800 mb-4 text-base leading-relaxed">
                    {specialty.description}
                  </p>

                  {/* Badge con gradiente animado */}
                  <motion.div
                    className={`inline-block px-4 py-2 rounded-none bg-gradient-to-r ${specialty.color} text-white font-semibold text-sm relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: '-100%', opacity: 0.3 }}
                      animate={activeCard === index ? { x: '100%' } : { x: '-100%' }}
                      transition={{ duration: 0.6, repeat: activeCard === index ? Infinity : 0 }}
                    />
                    <span className="relative z-10">★ Destacado</span>
                  </motion.div>

                  {/* Platos destacados con animación de aparición */}
                  <AnimatePresence>
                    {activeCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 pt-4 border-t-2 border-amber-700"
                      >
                        <p className="text-sm text-amber-900 font-semibold mb-2">
                          🍽️ Prueba nuestros:
                        </p>
                        <p className="text-sm text-amber-800 italic">
                          {specialty.highlight}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Brillo hover que se mueve */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-20 pointer-events-none"
                  animate={activeCard === index ? {
                    background: [
                      'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                      'linear-gradient(225deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Sombra 3D debajo de la tarjeta */}
              <motion.div
                className="absolute inset-0 bg-amber-900/30 blur-xl -z-10 rounded-none"
                animate={activeCard === index ? {
                  scale: 1.1,
                  opacity: 0.5
                } : {
                  scale: 1,
                  opacity: 0.3
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA inferior con animación */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href={"/es/carta" as Route}
              className="inline-block bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 px-12 py-4 rounded-none font-bold text-lg border-4 border-amber-950 hover:from-amber-700 hover:to-amber-800 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 uppercase tracking-wider">Ver Carta Completa →</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
