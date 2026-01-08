// Helper simple para generar enlaces con locale
export function localizedHref(locale: string, path: string): string {
    return `/${locale}${path}`;
}

// Helper para obtener traducciones (server-side)
import { getDictionary } from './getDictionary';
import type { Dictionary } from './dictionary.models';

export function getLocalizedData(locale: string): {
    dict: Dictionary;
    href: (path: string) => string;
    locale: string;
} {
    const dictObj = getDictionary(locale);
    return {
        dict: dictObj.fusta,
        href: (path: string) => localizedHref(locale, path),
        locale
    };
}

// Versión mejorada con Sanity + fallback JSON (TEMPORALMENTE DESHABILITADA)
export async function getLocalizedDataWithSanity(locale: string) {
    const fallbackDict = getDictionary(locale);
    // const dict = await getSanityDict(locale, fallbackDict);

    return {
        dict: fallbackDict,
        href: (path: string) => localizedHref(locale, path),
        locale,
        isUsingFallback: true // dict === fallbackDict
    };
}