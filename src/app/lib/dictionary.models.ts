
export interface SectionTwo {
    title: string;
    subtitle: string;
    images: string[];
    parallaxText: string;
}

export interface SectionImageText {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    description: string;
}

export interface SectionThree {
    title: string;
    description: string;
    image: string;
    ctaText: string;
    ctaHref: string;
}
export interface SectionMain {
    image: string,
    alt: string,
    ctaHref: string,
    title: string,
    subtitle: string,
    ctaText: string
}

export interface ContactFormProps {
    title: string;
    ctaText: string;
    submittedMessage: string;
    errorMessage: string;
    name: string;
    email: string;
    message: string;
}

export interface WhatsAppReservationProps {
    title: string;
    description: string;
    button: string;
}

export interface Dictionary {
    home: {
        sectionMain: SectionMain;
        sectionTwo: SectionTwo;
        sectionImageText: SectionImageText;
        sectionThree: SectionThree;
    },
    nav: {
        home: string;
        menu: string;
        contact: string;
    },
    footer: {
        description: string;
        subtitle: string;
        title: string;
        privacy_policy?: string;
        copyright: string;
    },
    menu: {
        section: any;
        allergens: any;
        categoryNames: any;
        title: string;
    };
    legal: {
        title: string;
        metaTitle: string;
        metaDescription: string;
        sections: {
            general: {
                title: string;
                content: string;
            };
            owner: {
                title: string;
                denomination: string;
                address: string;
                phone: string;
                email: string;
            };
            purpose: {
                title: string;
                content: string;
            };
            data_protection: {
                title: string;
                content: string;
            };
            intellectual_property: {
                title: string;
                content: string;
            };
            liability: {
                title: string;
                content: string;
            };
            external_links: {
                title: string;
                content: string;
            };
            applicable_law: {
                title: string;
                content: string;
            };
            no_cookies: {
                title: string;
                important: string;
                content: string;
            };
        };
        last_updated: string;
        date: string;
    },
    contact: {
        image: string;
        alt: string;
        title: string;
        subtitle: string;
        form: ContactFormProps;
        whatsapp: WhatsAppReservationProps;
        contact: {
            title: string;
            subtitle: string;
            description: string;
        };
    },
    privacy: {
        title: string;
        metaTitle: string;
        metaDescription: string;
        sections: {
            general: {
                title: string;
                content: string;
            };
            responsible: {
                title: string;
                denomination: string;
                address: string;
                phone: string;
                email: string;
            };
            data_collected: {
                title: string;
                intro: string;
                items: string[];
            };
            purpose: {
                title: string;
                intro: string;
                items: string[];
            };
            legal_basis: {
                title: string;
                intro: string;
                contractual: string;
                consent: string;
                legitimate: string;
                legal: string;
            };
            retention: {
                title: string;
                content: string;
            };
            recipients: {
                title: string;
                intro: string;
                items: string[];
            };
            rights: {
                title: string;
                intro: string;
                access: string;
                rectification: string;
                erasure: string;
                restriction: string;
                portability: string;
                objection: string;
                exercise: string;
            };
            authority: {
                title: string;
                content: string;
            };
            cookies: {
                title: string;
                important: string;
                no_cookies: string;
                basic_data: string;
            };
            security: {
                title: string;
                content: string;
            };
            modifications: {
                title: string;
                content: string;
            };
        };
        last_updated: string;
        date: string;
    }
}

export interface MenuCategory {
    title: string;
    subtitle?: string;
    items: Array<{
        allergens: string[];
        name: string;
        description: string;
        price: string;
        recommended?: boolean;
        image?: string | null;
        imageAlt?: string;
    }>;
}