// Configuración centralizada del SEO para Restaurant La Fusta
export const SEO_CONFIG = {
    site: {
        name: 'Restaurant La Fusta',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.lafusta.cat',
        defaultLocale: 'es',
        supportedLocales: ['es', 'en', 'ca', 'nl', 'de'],
        fullName: 'Restaurant La Fusta',
        tagline: 'Cocina Mediterránea Auténtica',
    },

    social: {
        twitter: '@lafusta',
        instagram: 'lafusta',
        facebook: 'lafusta',
        instagramUrl: 'https://www.instagram.com/lafusta',
        facebookUrl: 'https://www.facebook.com/lafusta',
    },

    business: {
        type: 'Restaurant',
        cuisine: 'Mediterranean',
        priceRange: '€€',
        phone: '+34 000 00 00 00',
        mobile: '+34 000 00 00 00',
        email: 'info@lafusta.cat',
        address: {
            street: 'Dirección por definir',
            city: 'Ciudad',
            region: 'Catalunya',
            postalCode: '00000',
            country: 'ES',
        },
        coordinates: {
            latitude: '41.0000',
            longitude: '2.0000',
        },
        openingHours: [
            'Mo-Su 09:00-23:30',
        ],
        rating: {
            value: '4.5',
            count: '100',
        },
        established: '2024',
        specialty: 'Cocina mediterránea con especialidades del mar y de la montaña',
    },

    images: {
        logo: '/images/logo.png',
        ogDefault: '/images/og-default.jpg',
        twitterDefault: '/images/twitter-default.jpg',
        restaurant: '/images/restaurant-interior.jpg',
    },
} as const;

export type SEOConfig = typeof SEO_CONFIG;