'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: "📍",
    title: "Centro de Calella",
    description: "Ubicación privilegiada en pleno centro"
  },
  {
    icon: "👨‍🍳",
    title: "Cocina Tradicional",
    description: "Recetas auténticas de toda la vida"
  },
  {
    icon: "🌟",
    title: "Producto Fresco",
    description: "Ingredientes seleccionados diariamente"
  },
  {
    icon: "❤️",
    title: "Ambiente Familiar",
    description: "Como en casa, pero mejor"
  }
];

export function AboutSectionNew() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagen con parallax y efectos */}
          <motion.div
            style={{ y: imageY, opacity }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Overlay con gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-transparent z-10" />
              
              {/* Imagen */}
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src="/images/home/mesa.jpg"
                alt="La Fusta Restaurant"
                className="w-full h-[600px] object-cover"
              />

              {/* Elemento decorativo flotante */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl z-20"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-5xl mb-2"
                  >
                    ⭐
                  </motion.div>
                  <p className="text-2xl font-bold text-gray-800">4.8/5</p>
                  <p className="text-sm text-gray-600">Valoración</p>
                </div>
              </motion.div>

              {/* Badge flotante */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 left-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6 py-3 shadow-lg z-20"
              >
                <p className="font-bold text-lg">Desde 2020</p>
              </motion.div>
            </div>

            {/* Elementos decorativos */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"
            />
          </motion.div>

          {/* Contenido */}
          <div ref={textRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-block text-amber-600 font-semibold text-lg mb-4"
              >
                Sobre Nosotros
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                La Fusta
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-amber-600"
                >
                  .
                </motion.span>
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100px" } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-gray-700 leading-relaxed mb-8"
              >
                En el corazón de Calella, La Fusta es más que un restaurante de tapas. 
                Es un lugar donde la tradición mediterránea se encuentra con la innovación, 
                donde cada plato cuenta una historia y cada visita se convierte en un recuerdo.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg text-gray-600 leading-relaxed mb-12"
              >
                Nuestra cocina combina los sabores auténticos de siempre con un toque 
                contemporáneo, utilizando productos frescos y de temporada seleccionados 
                cada mañana.
              </motion.p>
            </motion.div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 h-full border border-gray-200">
                    {/* Efecto de brillo */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 rounded-xl"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />

                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-3 inline-block"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
