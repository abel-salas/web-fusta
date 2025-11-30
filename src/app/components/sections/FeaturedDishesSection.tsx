'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface Dish {
  name: string;
  description: string;
  category: string;
  emoji: string;
  color: string;
  bgGradient: string;
}

const dishes: Dish[] = [
  {
    name: 'Patatas Bravas',
    description: 'Crujientes patatas con nuestra salsa brava casera, un clásico que nunca falla',
    category: 'Tapa Clásica',
    emoji: '🥔',
    color: 'from-red-600 to-orange-600',
    bgGradient: 'from-red-500/20 to-orange-500/20'
  },
  {
    name: 'Croquetas de Jamón',
    description: 'Cremosas por dentro, crujientes por fuera. Elaboradas artesanalmente cada día',
    category: 'Especialidad',
    emoji: '🥖',
    color: 'from-amber-600 to-yellow-600',
    bgGradient: 'from-amber-500/20 to-yellow-500/20'
  },
  {
    name: 'Gambas al Ajillo',
    description: 'Gambas frescas salteadas con aceite de oliva virgen, ajo y guindilla',
    category: 'Del Mar',
    emoji: '🍤',
    color: 'from-blue-600 to-cyan-600',
    bgGradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    name: 'Pulpo a la Gallega',
    description: 'Tierno pulpo con pimentón de la Vera, aceite de oliva y patata',
    category: 'Del Mar',
    emoji: '🐙',
    color: 'from-purple-600 to-pink-600',
    bgGradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    name: 'Secreto Ibérico',
    description: 'Jugoso corte de cerdo ibérico a la brasa, un auténtico manjar',
    category: 'Carnes',
    emoji: '🥩',
    color: 'from-rose-600 to-red-700',
    bgGradient: 'from-rose-500/20 to-red-500/20'
  },
  {
    name: 'Tabla de Quesos',
    description: 'Selección de quesos artesanos con mermelada casera y frutos secos',
    category: 'Para Compartir',
    emoji: '🧀',
    color: 'from-yellow-600 to-amber-700',
    bgGradient: 'from-yellow-500/20 to-amber-500/20'
  }
];

export function FeaturedDishesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-gradient-to-b from-amber-100 via-orange-50 to-amber-100">
      {/* Header fijo */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-amber-900 to-amber-800 py-20 border-b-4 border-amber-950">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #654321 0px, #8B4513 2px, #654321 4px)'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="bg-amber-700 text-amber-50 px-8 py-3 rounded-none relative border-4 border-amber-950 shadow-xl">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-950 rounded-full" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-950 rounded-full" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-950 rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-950 rounded-full" />
                <span className="font-bold tracking-widest text-sm">PLATOS ESTRELLA</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-amber-50 mb-4 font-serif" style={{
              textShadow: '3px 3px 0px rgba(0, 0, 0, 0.3)'
            }}>
              Lo Mejor de La Fusta
            </h2>
            
            <p className="text-xl text-amber-100 max-w-2xl mx-auto font-serif">
              Descubre nuestros platos más populares, elaborados con pasión y tradición
            </p>
          </motion.div>
        </div>
      </div>

      {/* Carousel vertical con parallax */}
      <div className="relative">
        {dishes.map((dish, index) => {
          const targetScale = 1 - ((dishes.length - index) * 0.05);
          const start = index / dishes.length;
          const end = (index + 1) / dishes.length;

          return (
            <Card
              key={index}
              dish={dish}
              index={index}
              progress={scrollYProgress}
              range={[start, end]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Footer de sección */}
      <div className="relative py-20 bg-gradient-to-b from-amber-100 to-amber-200">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-2xl text-amber-900 mb-8 font-serif">
              Y muchos más platos esperándote en nuestra carta completa
            </p>
            <motion.a
              href="/es/carta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 px-12 py-4 rounded-none font-bold text-lg border-4 border-amber-950 hover:from-amber-700 hover:to-amber-800 transition-all shadow-xl uppercase tracking-wider"
            >
              Ver Carta Completa →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  dish: Dish;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ dish, index, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.5]);
  const y = useTransform(progress, range, [0, -50]);

  return (
    <div className="sticky top-32 flex items-center justify-center px-4 py-12">
      <motion.div
        ref={containerRef}
        style={{
          scale,
          opacity,
          y,
          transformOrigin: 'center center'
        }}
        className="w-full max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Tarjeta principal */}
          <div className={`relative bg-gradient-to-br ${dish.bgGradient} backdrop-blur-sm rounded-none border-4 border-amber-800 shadow-2xl overflow-hidden`}>
            {/* Patrón de fondo */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #8B4513 0px, #A0522D 2px, #8B4513 4px)'
            }} />

            {/* Clavos decorativos */}
            <div className="absolute top-3 left-3 w-4 h-4 bg-amber-900 rounded-full shadow-inner z-10" />
            <div className="absolute top-3 right-3 w-4 h-4 bg-amber-900 rounded-full shadow-inner z-10" />
            <div className="absolute bottom-3 left-3 w-4 h-4 bg-amber-900 rounded-full shadow-inner z-10" />
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-amber-900 rounded-full shadow-inner z-10" />

            <div className="relative z-10 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Contenido izquierdo */}
                <div>
                  {/* Badge de categoría */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4"
                  >
                    <div className={`bg-gradient-to-r ${dish.color} text-white px-4 py-2 rounded-none border-2 border-white/30 font-bold text-sm shadow-lg`}>
                      {dish.category}
                    </div>
                  </motion.div>

                  {/* Nombre del plato */}
                  <motion.h3
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif"
                    style={{ textShadow: '2px 2px 0px rgba(180, 83, 9, 0.2)' }}
                  >
                    {dish.name}
                  </motion.h3>

                  {/* Descripción */}
                  <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-lg text-amber-800 leading-relaxed mb-6"
                  >
                    {dish.description}
                  </motion.p>

                  {/* Número de plato */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-800 to-amber-900 rounded-none flex items-center justify-center border-2 border-amber-950">
                      <span className="text-2xl font-bold text-amber-50">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-800 to-transparent" />
                  </motion.div>
                </div>

                {/* Emoji gigante con animación */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-[180px] md:text-[220px] filter drop-shadow-2xl"
                  >
                    {dish.emoji}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Borde decorativo inferior */}
            <div className={`h-3 bg-gradient-to-r ${dish.color}`} />
          </div>

          {/* Sombra 3D */}
          <div className="absolute inset-0 bg-amber-900/20 blur-2xl -z-10 translate-y-4 rounded-none" />
        </motion.div>
      </motion.div>
    </div>
  );
}
