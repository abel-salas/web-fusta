"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';

// SliderAuto: slider de imágenes con autoplay y bucle
// slider, autoplay, loop
export default function SectionSlider({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);
    const [visibleImages, setVisibleImages] = useState(3);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Responsive: 2 images on mobile, 3 on md+
        const updateVisible = () => {
            const mobile = window.innerWidth < 768;
            setVisibleImages(mobile ? 2 : 3);
            setIsMobile(mobile);
        };
        updateVisible();
        window.addEventListener('resize', updateVisible);
        return () => window.removeEventListener('resize', updateVisible);
    }, []);

    useEffect(() => {
        if (isMobile) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 2500);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [index, images.length, isMobile]);

    // Calcula las imágenes visibles en bucle
    const getVisible = () => {
        const arr = [];
        for (let i = 0; i < visibleImages; i++) {
            arr.push(images[(index + i) % images.length]);
        }
        return arr;
    };

    if (isMobile) {
        // Scroll horizontal nativo en mobile
        return (
            <div className="flex gap-5 w-full overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                    <div className="relative w-[80vw] h-[320px] max-w-[340px] flex-shrink-0" key={i}>
                        <Image
                            src={img}
                            alt={`slide-${i}`}
                            fill
                            className="shadow-lg object-cover w-full h-full"
                            key={i}
                            quality={90}
                        />
                    </div>
                ))}
            </div>
        );
    }

    // Slider animado en desktop
    return (
        <div className="flex gap-5 w-full overflow-hidden">
            {getVisible().map((img, i) => (
                <div className="relative w-full h-[320px] max-w-[340px] flex-shrink-0" key={i}>
                    <Image
                        src={img}
                        alt={`slide-${i}`}
                        fill
                        className="shadow-lg object-cover w-full h-full"
                        key={i}
                        quality={90}
                    />
                </div>
            ))}
        </div>
    );
}
