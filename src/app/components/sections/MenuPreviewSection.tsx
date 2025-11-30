'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface MenuCategory {
  title: string;
  description: string;
  icon: string;
  dishes: string[];
  color: string;
}

const categories: MenuCategory[] = [
  {
    title: 'Tapas Tradicionales',
    description: 'Auténticos sabores de la cocina española',
    icon: '🍤',
    dishes: ['Patatas Bravas', 'Croquetas Caseras', 'Pimientos de Padrón', 'Jamón Ibérico'],
    color: 'from-amber-100 to-amber-200',
  },
  {
    title: 'Mariscos Frescos',
    description: 'Directos del Mediterráneo a tu mesa',
    icon: '🦐',
    dishes: ['Gambas al Ajillo', 'Mejillones', 'Pulpo a la Gallega', 'Calamares'],
    color: 'from-orange-100 to-orange-200',
  },
  {
    title: 'Carnes Selectas',
    description: 'Las mejores carnes a la parrilla',
    icon: '🥩',
    dishes: ['Secreto Ibérico', 'Chuletón', 'Costillas BBQ', 'Pollo al Horno'],
    color: 'from-amber-200 to-amber-300',
  },
];

export function MenuPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 overflow-hidden"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 3px,
            rgba(255, 255, 255, 0.1) 3px,
            rgba(255, 255, 255, 0.1) 6px
          )`,
        }}
      />

      {/* Decorative corner nails */}
      <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-amber-100" />
      <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-amber-100" />
      <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full bg-amber-100" />
      <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-amber-100" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-amber-100 border-4 border-amber-950 rounded-none mb-6">
            <span className="text-sm font-bold text-amber-950 uppercase tracking-widest">
              Nuestra Selección
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-amber-50 mb-4">
            Explora Nuestra Carta
          </h2>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Descubre los sabores auténticos de la cocina mediterránea
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className={`relative bg-gradient-to-br ${category.color} p-8 border-4 border-amber-950 rounded-none overflow-hidden`}>
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-950" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-950" />
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-950" />
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-950" />

                {/* Icon */}
                <div className="text-7xl mb-6 text-center transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-amber-950 mb-3 text-center uppercase tracking-wide">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-amber-800 text-center mb-6 font-medium">
                  {category.description}
                </p>

                {/* Dishes list */}
                <ul className="space-y-2">
                  {category.dishes.map((dish, dishIndex) => (
                    <li
                      key={dishIndex}
                      className="flex items-center text-amber-900 font-medium"
                    >
                      <span className="w-2 h-2 bg-amber-950 rounded-full mr-3 flex-shrink-0" />
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/carta"
            className="inline-block px-12 py-5 bg-amber-100 text-amber-950 font-bold text-lg uppercase tracking-widest border-4 border-amber-950 rounded-none hover:bg-amber-50 transition-all duration-300 group"
          >
            <span className="inline-flex items-center gap-3">
              Ver Carta Completa
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
