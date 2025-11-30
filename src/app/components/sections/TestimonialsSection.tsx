'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'María García',
    role: 'Cliente habitual',
    comment: 'La mejor comida tradicional de Calella. El ambiente es acogedor y el servicio excepcional. ¡Llevamos viniendo 10 años!',
    rating: 5,
    avatar: '👩',
  },
  {
    name: 'John Smith',
    role: 'Turista',
    comment: 'Authentic Spanish cuisine! The tapas were amazing and the staff was very friendly. Highly recommended!',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Laura Martínez',
    role: 'Local',
    comment: 'Un lugar perfecto para celebraciones familiares. La paella está buenísima y las carnes a la brasa son espectaculares.',
    rating: 5,
    avatar: '👩‍🦰',
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

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
              Testimonios
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Miles de clientes satisfechos nos avalan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative bg-gradient-to-br from-amber-100 to-amber-200 p-8 border-4 border-amber-950 rounded-none group hover:scale-105 transition-transform duration-300"
            >
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-950" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-950" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-950" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-950" />

              {/* Quote icon */}
              <div className="text-6xl text-amber-950 opacity-20 mb-4">&ldquo;</div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-amber-900 mb-6 italic text-lg leading-relaxed">
                {testimonial.comment}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t-4 border-amber-950">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-bold text-amber-950 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-amber-800 text-sm uppercase tracking-wide">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Google Reviews badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-amber-200 to-amber-300 border-4 border-amber-950 rounded-none">
            <div className="flex items-center gap-4">
              <span className="text-4xl">⭐</span>
              <div className="text-left">
                <div className="text-3xl font-bold text-amber-950">4.8 / 5</div>
                <div className="text-sm text-amber-800 uppercase tracking-wide">
                  Basado en 200+ reseñas
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
