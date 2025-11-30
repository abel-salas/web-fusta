import { SEO_CONFIG } from '../config/site';

type SupportedLocale = 'es' | 'en' | 'ca' | 'de' | 'nl';

interface MenuItemSchema {
    name: string;
    description?: string;
    price?: string;
    image?: string;
    category: string;
}

interface FAQSchema {
    question: string;
    answer: string;
}

// Schema para el menú
export function generateMenuSchema(_locale: SupportedLocale, _menuItems?: MenuItemSchema[]) {
    const business = SEO_CONFIG.business;

    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": `Carta Restaurant La Fusta`,
        "description": "Carta de cocina mediterránea auténtica con especialidades del mar y de la montaña",
        "provider": {
            "@type": "Restaurant",
            "name": SEO_CONFIG.site.name,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": business.address.street,
                "addressLocality": business.address.city,
                "addressRegion": business.address.region,
                "postalCode": business.address.postalCode,
                "addressCountry": business.address.country
            }
        }
    };

    return baseSchema;
}

// Schema para preguntas frecuentes (FAQ)
export function generateFAQSchema(locale: SupportedLocale, faqs?: FAQSchema[]) {
    const defaultFAQs = {
        es: [
            {
                question: "¿Dónde está ubicado el restaurante?",
                answer: "Restaurant La Fusta está ubicado en una zona privilegiada con fácil acceso."
            },
            {
                question: "¿Qué tipo de cocina ofrecen?",
                answer: "Ofrecemos cocina mediterránea auténtica con especialidades del mar y de la montaña, utilizando productos frescos de calidad."
            },
            {
                question: "¿Es necesario reservar?",
                answer: "Recomendamos reservar con antelación para asegurar su mesa, especialmente en fines de semana y temporada alta."
            }
        ],
        en: [
            {
                question: "Where is the restaurant located?",
                answer: "Restaurant La Fusta is located in a privileged area with easy access."
            },
            {
                question: "What type of cuisine do you offer?",
                answer: "We offer authentic Mediterranean cuisine with specialties from the sea and mountains, using fresh quality products."
            },
            {
                question: "Do I need to make a reservation?",
                answer: "We recommend booking in advance to secure your table, especially on weekends and high season."
            }
        ],
        ca: [
            {
                question: "On està ubicat el restaurant?",
                answer: "Restaurant La Fusta està ubicat en una zona privilegiada amb fàcil accés."
            },
            {
                question: "Quin tipus de cuina oferiu?",
                answer: "Oferim cuina mediterrània autèntica amb especialitats del mar i de la muntanya, utilitzant productes frescos de qualitat."
            },
            {
                question: "És necessari reservar?",
                answer: "Recomanem reservar amb antelació per assegurar la vostra taula, especialment els caps de setmana i temporada alta."
            }
        ],
        de: [
            {
                question: "Wo befindet sich das Restaurant?",
                answer: "Restaurant La Fusta befindet sich in einer privilegierten Lage mit einfachem Zugang."
            },
            {
                question: "Welche Art von Küche bieten Sie an?",
                answer: "Wir bieten authentische mediterrane Küche mit Spezialitäten aus dem Meer und den Bergen, unter Verwendung frischer Qualitätsprodukte."
            },
            {
                question: "Muss ich reservieren?",
                answer: "Wir empfehlen, im Voraus zu buchen, um Ihren Tisch zu sichern, besonders an Wochenenden und in der Hochsaison."
            }
        ],
        nl: [
            {
                question: "Waar is het restaurant gevestigd?",
                answer: "Restaurant La Fusta is gevestigd op een bevoorrechte locatie met gemakkelijke toegang."
            },
            {
                question: "Welk type keuken bieden jullie aan?",
                answer: "We bieden authentieke mediterrane keuken met specialiteiten uit de zee en de bergen, met verse kwaliteitsproducten."
            },
            {
                question: "Moet ik reserveren?",
                answer: "We raden aan om vooraf te reserveren om uw tafel te garanderen, vooral in het weekend en het hoogseizoen."
            }
        ]
    };

    const faqsToUse = faqs || defaultFAQs[locale as keyof typeof defaultFAQs] || defaultFAQs.es;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqsToUse.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

// Schema para reseñas y ratings
export function generateReviewSchema(
    locale: SupportedLocale,
    reviews?: Array<{ author: string; rating: number; text: string; date: string }>
) {
    const business = SEO_CONFIG.business;

    return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": SEO_CONFIG.site.name,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": reviews?.length || 100
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": business.address.street,
            "addressLocality": business.address.city,
            "addressRegion": business.address.region,
            "postalCode": business.address.postalCode,
            "addressCountry": business.address.country
        },
        "telephone": business.phone,
        "priceRange": "€€-€€€"
    };
}

// Schema para breadcrumbs
export function generateBreadcrumbSchema(locale: SupportedLocale, items: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}
