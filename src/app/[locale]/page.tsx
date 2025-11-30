import type { Metadata } from 'next';
import { getLocalizedData } from "../lib/localization";
import { generatePageMetadata, getValidLocale } from '@/seo';
import { HeroSectionNew } from '../components/sections/HeroSectionNew';
import { SpecialtiesSection } from '../components/sections/SpecialtiesSectionNew';
import { AboutSectionNew } from '../components/sections/AboutSectionNew';
import { LocationSectionNew } from '../components/sections/LocationSectionNew';

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

    return (
        <>
            {/* Hero Section con animaciones espectaculares */}
            <HeroSectionNew
                title="La Fusta"
                subtitle="Tapas & Tradición en el Corazón de Calella"
                description="Auténtica cocina mediterránea con el sabor de siempre en pleno centro de Calella"
                ctaText="Descubre Nuestra Carta"
                ctaHref={href('/carta')}
            />

            {/* Sección Sobre Nosotros */}
            <AboutSectionNew />

            {/* Sección de Especialidades */}
            <SpecialtiesSection />

            {/* Sección de Ubicación */}
            <LocationSectionNew />
        </>
    );
}