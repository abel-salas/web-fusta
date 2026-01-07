"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ImageTextSectionProps {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function ImageTextSection({ image, alt, title, subtitle, description }: ImageTextSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax: el texto se mueve más lento que el scroll normal
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="section-3 w-full py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Imagen izquierda con animación de entrada */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={image}
                alt={alt}
                fill
                className="object-cover rounded-lg shadow-lg"
                quality={90}
              />
            </div>
          </motion.div>
          
          {/* Contenido derecha con parallax vertical */}
          <motion.div 
            className="w-full md:w-1/2 px-4 md:px-8"
            style={{ y }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
