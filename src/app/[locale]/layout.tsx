import type { Metadata } from 'next';
import Navbar from "./navbar/nav-bar";
import Footer from "../components/Footer";
import LanguageSelectorWrapper from "../components/LanguageSelectorWrapper";
import NoIndexWithParams from "../components/NoIndexWithParams";
import {
    generatePageMetadata,
    generateRestaurantJsonLd,
    generateWebsiteJsonLd,
    SEO_CONFIG,
    getValidLocale,
    type SupportedLocale
} from '@/seo';
import { generateFAQSchema } from '@/seo/generators/advanced-schema';
import HtmlLangUpdater from '../components/HtmlLangUpdater';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = getValidLocale(locale);

    return generatePageMetadata({
        locale: validLocale,
        page: 'home'
    });
}

export async function generateStaticParams() {
    // Temporalmente solo generamos ES mientras se completa el desarrollo
    return [{ locale: 'es' }];
    // return SEO_CONFIG.site.supportedLocales.map((locale) => ({
    //     locale,
    // }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const validLocale = getValidLocale(locale) as SupportedLocale;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateRestaurantJsonLd(validLocale)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateWebsiteJsonLd(validLocale)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateFAQSchema(validLocale)),
                }}
            />

            <div className="min-h-screen flex flex-col">
                <HtmlLangUpdater locale={validLocale} />
                <Navbar params={params} />
                <main className="flex-1 pt-16">
                    {children}
                </main>
                <Footer params={params} />
                <LanguageSelectorWrapper currentLocale={validLocale} />
                <NoIndexWithParams />
            </div>
        </>
    );
}