'use client';

// import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MenuCategory, Dictionary } from '@/app/lib/dictionary.models';
import { motion } from 'framer-motion';

interface MenuContentInfo {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
}

interface MenuContentProps {
    dict: Dictionary;
    menuData: Record<string, MenuCategory>;
}

export default function MenuContent({ dict, menuData }: MenuContentProps) {
    // Definir el orden deseado de las categorías (7, 6, 5, 4, 3, 2, 1)
    const categoryOrder = ['drinks', 'desserts', 'fish', 'meat', 'rice', 'salads', 'starters'];

    // Convertir el objeto de categorías a array con orden específico
    const categories = categoryOrder
        .map(key => ({
            key,
            data: menuData[key] as MenuCategory
        }))
        .filter(category => category.data && category.data.items && category.data.items.length > 0)
        .reverse();

    // Allergen mapping for display with translations
    const getAllergenLabel = (allergen: string) => {
        return dict.menu?.allergens?.types?.[allergen as keyof typeof dict.menu.allergens.types] || allergen;
    };

    const allergenIcons: Record<string, string> = {
        gluten: 'grass',
        shellfish: 'set_meal',
        fish: 'phishing',
        dairy: 'local_drink',
        eggs: 'egg',
        nuts: 'nature',
        soy: 'eco',
        celery: 'local_florist',
        mustard: 'spa',
        sesame: 'grain',
        sulfites: 'science'
    };

    // Colores específicos para cada alérgeno basados en el ingrediente real
    const allergenColors: Record<string, { bg: string; text: string }> = {
        gluten: { bg: 'bg-amber-100', text: 'text-amber-800' }, // Dorado como el trigo
        shellfish: { bg: 'bg-red-100', text: 'text-red-800' }, // Rojo como las gambas cocidas
        fish: { bg: 'bg-blue-100', text: 'text-blue-800' }, // Azul como el mar
        dairy: { bg: 'bg-slate-100', text: 'text-slate-800' }, // Blanco como la leche
        eggs: { bg: 'bg-orange-100', text: 'text-orange-800' }, // Naranja/marrón como la yema
        nuts: { bg: 'bg-yellow-100', text: 'text-yellow-800' }, // Amarillo como las almendras
        soy: { bg: 'bg-green-100', text: 'text-green-800' }, // Verde como la soja
        celery: { bg: 'bg-lime-100', text: 'text-lime-800' }, // Verde lima como el apio
        mustard: { bg: 'bg-yellow-200', text: 'text-yellow-900' }, // Amarillo intenso como la mostaza
        sesame: { bg: 'bg-stone-100', text: 'text-stone-800' }, // Beige como las semillas
        sulfites: { bg: 'bg-purple-100', text: 'text-purple-800' } // Púrpura como químico
    };

    // Imagen de cabecera de la carta
    const sectionMain = {
        image: "/wine.jpg",
        alt: "Vino y tapas en La Fusta Calella",
        title: "Nuestra Carta",
        subtitle: "Tapas auténticas en el corazón de Calella"
    };


    return (
        <>
            <div className="contact-contentmin-h-screen bg-neutral-50">
                {/* Cabecera con imagen y overlay */}
                <section className="relative w-full h-[260px] md:h-[520px] flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 w-full h-full z-0 bg-cover bg-fixed"
                        style={{ backgroundImage: `url('${sectionMain.image}')`, backgroundPosition: 'bottom' }}
                    />
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative z-20 flex flex-col items-center justify-center w-full h-full -translate-y-0 md:-translate-y-4"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
                        >
                            {sectionMain.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                            className="text-xl md:text-2xl text-white max-w-2xl text-center"
                        >
                            {sectionMain.subtitle}
                        </motion.p>
                    </motion.div>
                </section>

                {/* mapa superpuesto */}
                <section className="relative w-full flex flex-col items-center justify-center md:-mt-16 z-30">
                    <div className="w-full md:w-[90%] max-w-6xl flex flex-col items-center justify-center relative mx-auto">
                        <div className="w-full md:-mt-16 md:mt-0 z-20 pb-4 pt-4 md:pt-10 md:px-10 bg-white">

                            <section className="grid lg:grid-cols-2 gap-6">
                                {categories.map(({ key, data }) => (
                                    <article key={key}>
                                        {/* TITULO TIPOS DE PLATOS */}
                                        <div>
                                            <div className="flex items-center justify-center mb-8 mt-8">
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="h-px bg-black w-full" />
                                                    <div className="h-px bg-black w-full" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-center text-black px-6 uppercase">{data.title}</h2>
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="h-px bg-black w-full" />
                                                    <div className="h-px bg-black w-full" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* CARD ITEM */}
                                        <div className="relative z-10">
                                            {data.items.map((item: MenuCategory['items'][0], index: number) => (
                                                <div
                                                    key={index}
                                                    className={`border-b border-amber-200 p-4 ${item.recommended ? 'bg-amber-50' : ''} ${index === 0 ? 'border-t' : ''}`}
                                                >
                                                    <div className="flex items-center gap-4">

                                                        {/* IMAGE ITEM */}
                                                        <div className="relative w-16 h-16 flex-shrink-0">
                                                            {item.image ? (
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.imageAlt || item.name}
                                                                    width={64}
                                                                    height={64}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src="/100x100.svg"
                                                                    alt="placeholder"
                                                                    width={64}
                                                                    height={64}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            )}
                                                        </div>

                                                        {/* DESCRIPTION ITEM */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center w-full gap-2">
                                                                <div className="flex-2 min-w-[55%] transition-colors group-hover:text-amber-700">
                                                                    <h3 className="font-bold uppercase text-md mb-2">{item.name}</h3>
                                                                </div>
                                                                <div className="hidden md:block border-b-2 border-black mt-2 w-full border-dotted mx-2" />
                                                                <span className="text-amber-900 font-bold text-md mb-2 whitespace-nowrap ml-auto">{item.price}</span>
                                                            </div>

                                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                                            {/* Allergens */}
                                                            {item.allergens && item.allergens.length > 0 && (
                                                                <div className="mt-2 flex flex-wrap gap-1 ml-auto justify-start">
                                                                    {item.allergens.map((allergen: string, allergenIndex: number) => {
                                                                        const colors = allergenColors[allergen] || { bg: 'bg-gray-100', text: 'text-gray-800' };
                                                                        return (
                                                                            <span
                                                                                key={allergenIndex}
                                                                                className={`inline-flex items-center text-[10px] ${colors.bg} ${colors.text} px-1.5 py-0.5 rounded-full`}
                                                                                title={getAllergenLabel(allergen)}
                                                                            >
                                                                                <span className="material-icons-outlined text-[14px] leading-none" style={{ fontSize: '14px', lineHeight: '14px' }}>
                                                                                    {allergenIcons[allergen] || 'warning'}
                                                                                </span>
                                                                            </span>
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </article>
                                ))}
                            </section>

                            {/* Allergens Legend - Horizontal scroll on mobile */}
                            <section>
                                <div className="container mx-auto px-2 relative z-10">
                                    <h3 className="text-sm font-bold text-neutral-700 mb-2 mt-6 uppercase">
                                        {dict.menu?.allergens?.legend || 'Leyenda de Alérgenos'}
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <div className="flex gap-3 pb-2 min-w-max lg:justify-center">
                                            {Object.keys(allergenIcons).map((allergen) => {
                                                const colors = allergenColors[allergen] || { bg: 'bg-gray-100', text: 'text-gray-800' };
                                                return (
                                                    <div
                                                        key={allergen}
                                                        className={`inline-flex items-center text-[10px] ${colors.bg} ${colors.text} px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0`}
                                                    >
                                                        <span className="material-icons-outlined mr-1">
                                                            {allergenIcons[allergen] || 'warning'}
                                                        </span>
                                                        {getAllergenLabel(allergen)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}