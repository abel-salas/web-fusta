'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import type { Route } from 'next';

interface HeroSectionModernProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function HeroSectionModern({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
}: HeroSectionModernProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950">
      {/* Background Pattern */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(217, 119, 6, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(217, 119, 6, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Wood grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.1) 2px,
              rgba(0, 0, 0, 0.1) 4px
            )`,
          }}
        />
      </motion.div>

      {/* Decorative corner nails */}
      <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-amber-950 shadow-lg" />
      <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-amber-950 shadow-lg" />
      <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full bg-amber-950 shadow-lg" />
      <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-amber-950 shadow-lg" />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-block px-6 py-2 bg-amber-100 rounded-none border-4 border-amber-950">
            <span className="text-sm font-bold text-amber-950 uppercase tracking-widest">
              Desde 1995
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-7xl md:text-9xl font-bold text-amber-50 mb-6 tracking-tight"
          style={{ textShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)' }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-3xl text-amber-100 mb-12 max-w-3xl font-light"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link
            href={ctaHref as Route}
            className="group relative px-12 py-5 bg-amber-100 text-amber-950 font-bold text-lg uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-amber-50 border-4 border-amber-950 rounded-none"
          >
            <span className="relative z-10">{ctaText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </Link>

          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref as Route}
              className="group relative px-12 py-5 bg-transparent text-amber-100 font-bold text-lg uppercase tracking-widest border-4 border-amber-100 overflow-hidden transition-all duration-300 hover:bg-amber-100 hover:text-amber-950 rounded-none"
            >
              <span className="relative z-10">{secondaryCtaText}</span>
            </Link>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-amber-100 text-sm uppercase tracking-widest">Descubre más</span>
            <svg
              className="w-6 h-6 text-amber-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
