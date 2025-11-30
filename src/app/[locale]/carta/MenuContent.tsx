'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MenuCategory, Dictionary } from '@/app/lib/dictionary.models';

interface MenuContentInfo {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
}

interface MenuContentProps {
    dict: Dictionary;
    menuData: Record<string, MenuCategory>;
    menuContent?: MenuContentInfo;
}

interface ModalState {
    description: string;
    isOpen: boolean;
    imageSrc: string;
    title: string;
    imageAlt: string;
}

export default function MenuContent({ dict, menuData, menuContent }: MenuContentProps) {
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        imageSrc: '',
        title: '',
        imageAlt: '',
        description: ''
    });

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

    const openModal = (item: { name: string; image?: string | null; imageAlt?: string }) => {
        if (!item.image) return; // Solo abrir modal si hay imagen
        setModal({
            isOpen: true,
            imageSrc: item.image,
            title: item.name,
            imageAlt: item.imageAlt || item.name,
            description: ''
        });
    };

    const closeModal = () => {
        setModal({
            isOpen: false,
            imageSrc: '',
            title: '',
            imageAlt: '',
            description: ''
        });
    };

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

    return (
        <>
            <main className="pt-12 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 min-h-screen">
                {/* Hero con estilo madera */}
                <div className="relative py-16 overflow-hidden">
                    {/* Textura de madera animada */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, #8B4513 0px, #A0522D 2px, #8B4513 4px)'
                    }} />
                    
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        {/* Badge tradicional */}
                        <div className="inline-block mb-6">
                            <div className="bg-gradient-to-br from-amber-800 to-amber-900 text-amber-50 px-8 py-3 rounded-none relative border-4 border-amber-700 shadow-xl">
                                <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-900 rounded-full" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-900 rounded-full" />
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-900 rounded-full" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-900 rounded-full" />
                                <span className="font-bold tracking-widest text-sm">NUESTRA CARTA</span>
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-amber-900" style={{
                            textShadow: '3px 3px 0px rgba(180, 83, 9, 0.2)',
                            fontFamily: 'Georgia, serif'
                        }}>
                            {menuContent?.title || dict.menu?.title || "Sabores Tradicionales"}
                        </h1>
                        <p className="text-xl md:text-2xl text-amber-800 mb-8 max-w-3xl mx-auto font-serif">
                            {menuContent?.subtitle || dict.menu?.subtitle || "Tapas auténticas en el corazón de Calella"}
                        </p>
                        <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-amber-800 to-transparent" />
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <section className="grid lg:grid-cols-2 gap-6">
                        {categories.map(({ key, data }) => (
                            <article key={key} className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-none shadow-xl border-4 border-amber-800 relative">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold mb-2 text-blue-800">{data.title}</h2>
                                    {data.subtitle && (
                                        <p className="text-sm text-gray-500 italic">{data.subtitle}</p>
                                    )}
                                </div>
                                <div className="space-y-4 relative z-10">
                                    {data.items.map((item: MenuCategory['items'][0], index: number) => (
                                        <div
                                            key={index}
                                            className={`border-b-2 border-amber-700 pb-4 last:border-b-0 p-3 rounded-none transition-all ${item.image ? 'cursor-pointer hover:bg-amber-50/50 hover:shadow-md' : ''}`}
                                            onClick={() => item.image && openModal(item)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`font-semibold text-amber-900 flex-1 transition-colors ${item.image ? 'hover:text-amber-700' : ''}`}>
                                                    {item.name}
                                                    {item.recommended && (
                                                        <span className="ml-2 text-xs bg-amber-800 text-amber-50 px-3 py-1 rounded-none border-2 border-amber-950 font-bold">
                                                            ⭐ {dict.menu?.recommended || 'Recomendado'}
                                                        </span>
                                                    )}
                                                    {item.image && (
                                                        <span className="ml-2 text-amber-700 hover:text-amber-900 transition-colors inline-flex items-center align-middle" title="Ver imagen del plato">
                                                            <span className="material-icons-outlined text-[16px] leading-none">photo_camera</span>
                                                        </span>
                                                    )}
                                                </h3>
                                                <span className="text-amber-900 font-bold ml-4 text-lg">{item.price}</span>
                                            </div>
                                            <p className="text-amber-800 text-sm">{item.description}</p>

                                            {/* Allergens */}
                                            {item.allergens && item.allergens.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    <span className="text-xs text-gray-500 mr-2">
                                                        {dict.menu?.allergens?.label || 'Alérgenos:'}
                                                    </span>
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
                                    ))}
                                </div>
                            </article>
                        ))}
                    </section>
                </div>

                {/* Allergens Legend - Horizontal scroll on mobile */}
                <section className="bg-gradient-to-r from-amber-900 to-amber-800 py-8 mt-8 border-y-4 border-amber-950 relative">
                    {/* Textura de vetas */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, #654321 0px, #8B4513 3px, #654321 6px)'
                    }} />
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <h3 className="text-2xl font-bold text-amber-50 mb-6 text-center uppercase tracking-widest font-serif">
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
                                        <span className="material-icons-outlined mr-1 text-[12px]">
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

                {/* Menu Image Section */}
                <section className="menu-image relative h-96 md:h-[500px]">
                    <Image
                        src={menuContent?.backgroundImage || "/images/menu/mesa_carta.jpg"}
                        alt="Carta del restaurante Banys La Gavina"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                </section>

                {/* Menu Description Section */}
                <section className="menu-description py-16 bg-gradient-to-br from-amber-100 to-amber-200 border-y-4 border-amber-900 relative">
                    {/* Decoración de vetas */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `radial-gradient(ellipse at 30% 40%, #654321 0%, transparent 50%),
                                         radial-gradient(ellipse at 70% 60%, #8B4513 0%, transparent 50%)`
                    }} />
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center max-w-4xl mx-auto bg-amber-50 p-8 border-4 border-amber-800 rounded-none shadow-2xl">
                            {/* Clavos decorativos */}
                            <div className="absolute top-2 left-2 w-4 h-4 bg-amber-900 rounded-full" />
                            <div className="absolute top-2 right-2 w-4 h-4 bg-amber-900 rounded-full" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-900 rounded-full" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-900 rounded-full" />
                            
                            <p className="text-xl text-amber-900 max-w-3xl mx-auto leading-relaxed font-serif relative z-10">
                                {menuContent?.description || dict.menu?.description || "En La Fusta trabajamos con productos de primera calidad, elaborando tapas tradicionales con el sabor auténtico de siempre. Cada plato cuenta una historia, cada ingrediente se selecciona con mimo."}
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal con estilo madera */}
            {modal.isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-gradient-to-br from-amber-100 to-amber-200 rounded-none max-w-4xl max-h-[90vh] w-[90vw] overflow-hidden border-8 border-amber-900 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Esquinas decorativas */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-amber-700 z-10" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-amber-700 z-10" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-amber-700 z-10" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-amber-700 z-10" />
                        
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-20 bg-amber-900 text-amber-50 rounded-none w-10 h-10 flex items-center justify-center hover:bg-amber-950 transition-colors border-2 border-amber-700 font-bold text-xl shadow-lg"
                        >
                            ✕
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-[60vh] bg-amber-50">
                            <Image
                                src={modal.imageSrc}
                                alt={modal.imageAlt}
                                fill
                                className="object-contain"
                                quality={90}
                            />
                        </div>

                        {/* Title */}
                        <div className="p-6 bg-gradient-to-r from-amber-800 to-amber-900 border-t-4 border-amber-950">
                            <h3 className="text-2xl font-bold text-amber-50 mb-2 font-serif">{modal.title}</h3>
                            {modal.description && (
                                <p className="text-amber-100 text-sm">
                                    {modal.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}