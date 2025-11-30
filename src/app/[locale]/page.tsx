import type { Metadata } from 'next';
import { getDictionary } from "../lib/getDictionary";
import { generatePageMetadata, getValidLocale } from '@/seo';
import { HeroSectionModern } from '../components/sections/HeroSectionModern';
import { StatsSection } from '../components/sections/StatsSection';
import { MenuPreviewSection } from '../components/sections/MenuPreviewSection';
import { SpecialtiesSection } from '../components/sections/SpecialtiesSectionNew';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ReservationCTASection } from '../components/sections/ReservationCTASection';
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
    const dict = await getDictionary(locale);

    return (
        <>
            {/* Hero moderno con parallax */}
            <HeroSectionModern
                title="La Fusta"
                subtitle="Desde 1995 · Cocina Mediterránea de Primera"
                ctaText="Ver Carta"
                ctaHref="/es/carta"
                secondaryCtaText="Reservar Mesa"
                secondaryCtaHref="/es/reservas"
            />

            {/* Estadísticas animadas */}
            <StatsSection />

            {/* Preview del menú por categorías */}
            <MenuPreviewSection />

            {/* Sección de Especialidades */}
            <SpecialtiesSection />

            {/* Testimonios de clientes */}
            <TestimonialsSection />

            {/* Call to action de reservas */}
            <ReservationCTASection />

            {/* Sección de Ubicación */}
            <LocationSectionNew />
        </>
    );
}