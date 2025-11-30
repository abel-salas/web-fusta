'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function HeroSectionNew({
  title = "La Fusta",
  subtitle = "Tapas & Tradición en el Corazón de Calella",
  description = "Auténtica cocina mediterránea con el sabor de siempre en pleno centro de Calella",
  ctaText = "Descubre Nuestra Carta",
  ctaHref = "/carta"
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background con parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/home/mesa.jpg')`,
            filter: 'brightness(0.8)'
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4"
      >
        {/* Logo animado con efecto de entrada */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.3)",
                "0 0 60px rgba(251, 191, 36, 0.6)",
                "0 0 20px rgba(251, 191, 36, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
          >
            <span className="text-6xl">🍷</span>
          </motion.div>
        </motion.div>

        {/* Título principal con efecto de escritura */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-7xl md:text-9xl font-bold mb-4 text-center"
          style={{
            fontFamily: 'Georgia, serif',
            textShadow: '0 0 40px rgba(0,0,0,0.8)'
          }}
        >
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + index * 0.05,
                duration: 0.5
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Línea decorativa animada */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6"
        />

        {/* Subtítulo con fade in */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-2xl md:text-3xl mb-4 text-center font-light tracking-wide"
        >
          {subtitle}
        </motion.p>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-lg md:text-xl mb-12 text-center max-w-2xl text-gray-200"
        >
          {description}
        </motion.p>

        {/* CTA Button con efecto hover espectacular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          <Link href={ctaHref as Route}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-4 text-xl font-semibold overflow-hidden group"
            >
              {/* Background animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 100%" }}
              />
              
              {/* Efecto de brillo al hover */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              
              {/* Texto */}
              <span className="relative z-10 text-white tracking-wide">
                {ctaText}
              </span>
              
              {/* Flecha animada */}
              <motion.span
                className="relative z-10 inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2 text-gray-300">Descubre más</span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-amber-500"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Partículas flotantes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-2 h-2 bg-amber-400/30 rounded-full blur-sm"
          style={{ zIndex: 15 }}
        />
      ))}
    </div>
  );
}
