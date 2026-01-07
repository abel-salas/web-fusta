"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxTextProps {
  text: string;
}

export default function ParallaxText({ text }: ParallaxTextProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax inverso: el texto se mueve más rápido que el scroll (sentido contrario)
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} className="w-full py-16 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="text-center"
          style={{ y }}
        >
          <p className="text-4xl md:text-6xl text-gray-800 font-reenie-beanie leading-relaxed">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
