"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Route } from "next";

interface ParallaxSectionProps {
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function ParallaxSection(data: ParallaxSectionProps) {
  const [displayed, setDisplayed] = useState("");
  const [startTypewriter, setStartTypewriter] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTypewriter(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTypewriter) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(data.title.slice(0, i + 1));
      i++;
      if (i === data.title.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, [startTypewriter, data.title]);

  return (
    <section
      ref={sectionRef}
      className="section-3 relative w-full flex items-center justify-start overflow-hidden"
      style={{ height: "550px" }}
    >
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-fixed"
        style={{ backgroundImage: `url('${data.image}')`, backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex flex-col items-start justify-center h-full px-8 text-left">
        <motion.h2
          className="text-5xl md:text-5xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {displayed}
          <span className="animate-blink">|</span>
        </motion.h2>
        <p className="text-4xl md:text-4xl text-white mb-8 max-w-4xl font-reenie-beanie">{data.description}</p>
        <Link href={data.ctaHref as Route}>
          <span className="cta-cortina bg-amber-700 uppercase text-white font-bold py-4 px-10 rounded text-sm shadow-lg">
            <span className="relative z-10">· {data.ctaText} ·</span>
          </span>
        </Link>
        <style>{`
          .animate-blink {
            animation: blink 1s steps(2, start) infinite;
          }
          @keyframes blink {
            to { visibility: hidden; }
          }
        `}</style>
      </div>
    </section>
  );
}
