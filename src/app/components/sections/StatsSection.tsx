'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Stat {
  number: number;
  suffix?: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { number: 30, suffix: '+', label: 'Años de Experiencia', icon: '🏆' },
  { number: 50, suffix: '+', label: 'Platos en Carta', icon: '🍽️' },
  { number: 1000, suffix: '+', label: 'Clientes Satisfechos', icon: '😊' },
  { number: 5, suffix: '★', label: 'Valoración Media', icon: '⭐' },
];

function Counter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(217, 119, 6, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(217, 119, 6, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative corner nails */}
      <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-amber-950" />
      <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-amber-950" />
      <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-amber-950" />
      <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-amber-950" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-amber-200 border-4 border-amber-950 rounded-none mb-6">
            <span className="text-sm font-bold text-amber-950 uppercase tracking-widest">
              Nuestra Historia en Números
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            Tradición y Calidad
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Más de tres décadas sirviendo los mejores sabores de la cocina mediterránea
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-amber-100 to-amber-200 p-8 border-4 border-amber-950 rounded-none group hover:scale-105 transition-transform duration-300"
            >
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-950" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-950" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-950" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-950" />

              <div className="text-center">
                <div className="text-6xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-bold text-amber-950 mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm uppercase tracking-widest text-amber-800 font-bold">
                  {stat.label}
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
