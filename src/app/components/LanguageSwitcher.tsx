'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/app/lib/languages";
import type { Route } from 'next';
import Image from "next/image";

interface LanguageSwitcherProps {
    currentLocale: string;
    showFlags?: boolean;
    isModal?: boolean;
    onLanguageSelect?: (langCode: string) => void;
}

export default function LanguageSwitcher({
    currentLocale,
    isModal = false,
    onLanguageSelect
}: LanguageSwitcherProps) {
    const pathname = usePathname();

    // Extraer la ruta sin el locale
    let pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');

    // Si la ruta queda vacía o es solo '/', mantenerla como '/' para la página principal
    if (!pathWithoutLocale || pathWithoutLocale === '') {
        pathWithoutLocale = '/';
    }

    const handleLanguageClick = (langCode: string, e: React.MouseEvent) => {
        if (isModal && onLanguageSelect) {
            e.preventDefault();
            onLanguageSelect(langCode);
        }
    };

    const getFlag = (langCode: string, size: 'small' | 'large' = 'small') => {
        const flags = {
            'es': '🇪🇸',
            'en': '🇬🇧',
            'nl': '🇳🇱',
            'de': '🇩🇪'
        };

        // Caso especial para catalán - usar SVG
        if (langCode === 'ca') {
            const dimensions = size === 'large' ? { width: 28, height: 20 } : { width: 20, height: 14 };
            return (
                <Image
                    src="/catalan.png"
                    alt="Bandera catalana"
                    width={dimensions.width}
                    height={dimensions.height}
                    className="inline-block"
                />
            );
        }

        return flags[langCode as keyof typeof flags] || '';
    };

    if (isModal) {
        // Versión modal con diseño de madera
        return (
            <div className="space-y-3">
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <Link
                        key={lang.code}
                        href={`/${lang.code}${pathWithoutLocale}` as Route}
                        onClick={(e) => handleLanguageClick(lang.code, e)}
                        className={`w-full flex items-center justify-between p-4 rounded-none border-4 transition-all duration-200 relative ${
                            lang.code === currentLocale
                                ? 'border-amber-700 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-900'
                                : 'border-amber-800 bg-amber-50 hover:border-amber-600 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100'
                        }`}
                    >
                        {/* Clavos decorativos para el idioma seleccionado */}
                        {lang.code === currentLocale && (
                            <>
                                <div className="absolute top-1 left-1 w-2 h-2 bg-amber-900 rounded-full" />
                                <div className="absolute top-1 right-1 w-2 h-2 bg-amber-900 rounded-full" />
                                <div className="absolute bottom-1 left-1 w-2 h-2 bg-amber-900 rounded-full" />
                                <div className="absolute bottom-1 right-1 w-2 h-2 bg-amber-900 rounded-full" />
                            </>
                        )}
                        
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="flex items-center justify-center w-7 h-7">
                                {lang.code === 'ca' ? (
                                    getFlag(lang.code, 'large')
                                ) : (
                                    <span className="text-2xl">{getFlag(lang.code, 'large')}</span>
                                )}
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-lg font-serif">{lang.displayName}</div>
                                <div className="text-sm text-amber-700">{lang.name}</div>
                            </div>
                        </div>
                        {lang.code === currentLocale && (
                            <span className="material-icons-outlined text-amber-800 relative z-10">check_circle</span>
                        )}
                    </Link>
                ))}
            </div>
        );
    }

    // Versión normal del footer con diseño de madera
    return (
        <div className="flex gap-2 flex-wrap">
            {SUPPORTED_LANGUAGES.map((lang) => (
                <Link
                    key={lang.code}
                    href={`/${lang.code}${pathWithoutLocale}` as Route}
                    className={`px-4 py-2 rounded-none text-sm font-bold transition-all duration-200 border-2 uppercase tracking-wide ${
                        currentLocale === lang.code
                            ? 'bg-amber-700 text-amber-50 shadow-lg border-amber-900'
                            : 'bg-amber-900/50 text-amber-100 hover:bg-amber-800 hover:text-amber-50 border-amber-800 hover:border-amber-700 hover:shadow-md'
                    }`}
                    title={`Cambiar a ${lang.displayName}`}
                >
                    {lang.name}
                </Link>
            ))}
        </div>
    );
}