import type { Metadata, Route } from 'next';
import { generatePageMetadata, getValidLocale } from '@/seo';
import SectionSlider from './components/SectionSlider';
import { getLocalizedData } from '../lib/localization';
import Image from 'next/image';
import Link from 'next/link';
import ParallaxSection from '../components/ParallaxSection';
import ImageTextSection from '../components/ImageTextSection';
import ParallaxText from '../components/ParallaxText';
import { SectionImageText, SectionMain, SectionThree, SectionTwo } from '../lib/dictionary.models';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = getValidLocale(locale);

    return generatePageMetadata({
        locale: validLocale,
        page: 'home',
        path: ''
    });
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { dict, href } = getLocalizedData(locale);

    const sectionMain = dict?.home?.sectionMain as SectionMain;
    const sectionTwo = dict?.home?.sectionTwo as SectionTwo;
    const sectionImageText = dict?.home?.sectionImageText as SectionImageText;
    const sectionThree = {
        ...dict?.home?.sectionThree,
        "ctaHref": href(dict.home.sectionThree.ctaHref)
    } as SectionThree;

    return (
        <>
            {/* Sección 1: Imagen de fondo con texto y CTA */}
            <section className="section-1 relative w-full h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src={sectionMain.image}
                    alt={sectionMain.alt}
                    fill
                    className="object-cover object-top"
                    priority
                    fetchPriority="high"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
                    <h1 className="text-6xl md:text-[10rem] md:leading-[0.8] font-bold text-white mb-6 tracking-tight">{sectionMain.title}</h1>
                    <p className="text-4xl md:text-4xl text-white mb-8 max-w-[80%] md:max-w-2xl mx-auto font-reenie-beanie">{sectionMain.subtitle}</p>
                    <Link href={href(sectionMain.ctaHref) as Route}>
                        <span className="cta-cortina bg-amber-700 uppercase text-white font-bold py-4 px-10 rounded text-sm shadow-lg">
                            <span className="relative z-10">· {sectionMain.ctaText} ·</span>
                        </span>
                    </Link>
                </div>
            </section>

            {/* Texto con parallax inverso */}
            <ParallaxText text={sectionTwo.parallaxText} />

            {/* Sección 2: título + slider */}
            <section className="section-2 w-full flex flex-col md:flex-row items-center justify-center py-24 gap-8">
                <div className="w-full md:w-[30%] flex flex-col justify-center mb-8 md:mb-0 px-8">
                    <h2 className="text-4xl font-bold text-black mb-6">{sectionTwo.title}</h2>
                    <p className="text-lg text-gray-600">{sectionTwo.subtitle}</p>
                </div>
                <div className="w-full md:w-[70%] flex items-center">
                    <SectionSlider images={sectionTwo.images} />
                </div>
            </section>

            {/* Sección 3: Imagen + Contenido con parallax y animación */}
            <ImageTextSection {...sectionImageText} />

            {/* Sección 4: ParallaxSection con typewriter */}
            <ParallaxSection {...sectionThree} />
        </>
    );
}