// Interfaces para el contenido de Sanity

// Tipo base para textos multiidioma
export interface MultiLanguageText {
  es?: string;
  en?: string;
  ca?: string;
  nl?: string;
  de?: string;
}

// Tipo base para imágenes de Sanity
export interface SanityImage {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
  alt?: string;
}

// Contenido de la página MENÚ
export interface MenuContent {
  _id: string;
  sectionId: 'hero' | 'intro' | 'categories';
  order: number;
  isActive: boolean;

  // Encabezado del Menú
  heroTitle?: MultiLanguageText;
  heroSubtitle?: MultiLanguageText;
  heroDescription?: MultiLanguageText;
  heroBackgroundImage?: SanityImage;

  // Introducción
  introTitle?: MultiLanguageText;
  introDescription?: MultiLanguageText;

  // Categorías
  categoryTitles?: {
    starters?: MultiLanguageText;
    salads?: MultiLanguageText;
    rice?: MultiLanguageText;
    meat?: MultiLanguageText;
    fish?: MultiLanguageText;
    drinks?: MultiLanguageText;
  };
  categoryDescriptions?: {
    starters?: MultiLanguageText;
    salads?: MultiLanguageText;
    rice?: MultiLanguageText;
    meat?: MultiLanguageText;
    fish?: MultiLanguageText;
    drinks?: MultiLanguageText;
  };
}

// Contenido de la página CONTACTO
export interface ContactContent {
  _id: string;
  sectionId: 'header' | 'info' | 'hours' | 'location';
  order: number;
  isActive: boolean;

  // Encabezado de Contacto
  headerTitle?: MultiLanguageText;
  headerSubtitle?: MultiLanguageText;
  headerDescription?: MultiLanguageText;

  // Información de Contacto
  contactInfoTitle?: MultiLanguageText;
  contactInfoDescription?: MultiLanguageText;

  // Horarios
  hoursTitle?: MultiLanguageText;
  hoursDescription?: MultiLanguageText;
  specialHours?: MultiLanguageText;

  // Ubicación
  locationTitle?: MultiLanguageText;
  locationDescription?: MultiLanguageText;
  directions?: MultiLanguageText;
}

// Item del menú (plato individual)
export interface MenuItem {
  _id: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  price: string;
  category: 'starters' | 'salads' | 'rice' | 'meat' | 'fish' | 'drinks';
  recommended: boolean;
  order: number;
  image?: SanityImage;
  allergens?: string[];
}
