import es from "@/app/translations/ES.json";
import en from "@/app/translations/EN.json";
import ca from "@/app/translations/CA.json";
import nl from "@/app/translations/NL.json";
import de from "@/app/translations/DE.json";

import { Dictionary } from "./dictionary.models";
import { DEFAULT_LOCALE, isValidLocale } from "./languages";

const dictionaries: Record<string, { fusta: Dictionary }> = {
    es: es as unknown as { fusta: Dictionary },
    en: en as unknown as { fusta: Dictionary },
    ca: ca as unknown as { fusta: Dictionary },
    nl: nl as unknown as { fusta: Dictionary },
    de: de as unknown as { fusta: Dictionary },
};

export function getDictionary(locale: string): { fusta: Dictionary } {
    // Validar que el locale es válido antes de usarlo
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
    return dictionaries[validLocale] || dictionaries[DEFAULT_LOCALE];
}
