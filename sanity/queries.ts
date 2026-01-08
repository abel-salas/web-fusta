// Queries de Sanity para el Restaurant La Fusta
import { client } from './client'
import { MenuCategory, Dictionary } from '../src/app/lib/dictionary.models'
import { groq } from 'next-sanity';

// Query para items del menú (platos individuales)
export const menuItemsQuery = groq`
  *[_type == "menuItem" && !(_id in path("drafts.**")) && isActive == true] | order(category asc, order asc) {
    _id,
    name,
    description,
    price,
    category,
    recommended,
    order,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    allergens
  }
`;

// Query para obtener horarios del restaurant por locale
export const hoursContentQuery = `*[_type == "hoursContent" && locale == $locale && isActive == true][0] {
  _id,
  locale,
  title,
  subtitle,
  operatingDays,
  operatingHours,
  specialHours[] {
    title,
    description,
    dates,
    lunch,
    dinner,
    isActive
  },
  reservationNote,
  isActive,
  lastUpdated
}`

// Query para contenido del MENÚ
export const menuContentQuery = groq`
  *[_type == "menuContent" && !(_id in path("drafts.**")) && isActive == true] | order(order asc) {
    _id,
    sectionId,
    order,
    
    // Encabezado del Menú
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroBackgroundImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    
    // Introducción
    introTitle,
    introDescription,
    
    // Categorías
    categoryTitles,
    categoryDescriptions
  }
`;

// Query para obtener elementos del menú por categoría
export async function getMenuItemsByCategory(category: string, locale: string = 'es') {
  const query = `*[_type == "menuItem" && category == $category && isActive == true] | order(order asc) {
    _id,
    name,
    description,
    price,
    category,
    recommended,
    allergens,
    image,
    order
  }`
  
  const items = await client.fetch(query, { category })
  console.log('Menu items for category:', items);
  // Formatear para coincidir con MenuCategory interface
  return {
    title: getCategoryTitle(category, locale),
    subtitle: getCategorySubtitle(category, locale),
    items: items.map((item: any) => ({
      name: item.name?.[locale] || item.name?.es || 'Sin nombre',
      description: item.description?.[locale] || item.description?.es || 'Sin descripción',
      price: item.price || '0€',
      recommended: item.recommended || false,
      allergens: item.allergens || [],
      image: item.image || null,
      imageAlt: item.name?.[locale] || item.name?.es || 'Sin nombre',
    }))
  } as MenuCategory
}

// Query para obtener todas las categorías del menú
export async function getAllMenuCategories(locale: string = 'es') {
  const categories = ['starters', 'salads', 'rice', 'meat', 'fish', 'drinks']
  const menuData: any = {}
  
  for (const category of categories) {
    menuData[category] = await getMenuItemsByCategory(category, locale)
  }
  
  return menuData
}

// Query para obtener configuración del sitio
export async function getSiteConfig(configType: string, locale: string = 'es') {
  const query = `*[_type == "siteConfig" && configType == $configType][0] {
    _id,
    configType,
    siteName,
    siteDescription,
    keywords,
    address,
    phone,
    mobile,
    hours,
    facebook
  }`
  
  const config = await client.fetch(query, { configType })
  
  if (!config) return null
  
  return {
    siteName: config.siteName?.[locale] || config.siteName?.es || '',
    siteDescription: config.siteDescription?.[locale] || config.siteDescription?.es || '',
    keywords: config.keywords?.[locale] || config.keywords?.es || '',
    address: config.address || '',
    phone: config.phone || '',
    mobile: config.mobile || '',
    hours: config.hours?.[locale] || config.hours?.es || '',
    facebook: config.facebook || '',
  }
}

// Helper functions para títulos de categorías
function getCategoryTitle(category: string, locale: string): string {
  const titles: Record<string, Record<string, string>> = {
    starters: {
      es: 'Entrantes',
      en: 'Starters',
      ca: 'Entrants',
      nl: 'Voorgerechten'
    },
    salads: {
      es: 'Ensaladas',
      en: 'Salads',
      ca: 'Amanides',
      nl: 'Salades'
    },
    rice: {
      es: 'Arroces',
      en: 'Rice Dishes',
      ca: 'Arrossos',
      nl: 'Rijstgerechten'
    },
    meat: {
      es: 'Carnes',
      en: 'Meat',
      ca: 'Carns',
      nl: 'Vlees'
    },
    fish: {
      es: 'Pescados',
      en: 'Fish',
      ca: 'Peixos',
      nl: 'Vis'
    },
    drinks: {
      es: 'Bebidas',
      en: 'Drinks',
      ca: 'Begudes',
      nl: 'Drankjes'
    }
  }
  
  return titles[category]?.[locale] || titles[category]?.es || category
}

function getCategorySubtitle(category: string, locale: string): string {
  const subtitles: Record<string, Record<string, string>> = {
    starters: {
      es: 'Para compartir y disfrutar',
      en: 'To share and enjoy',
      ca: 'Per compartir i gaudir',
      nl: 'Om te delen en van te genieten'
    },
    salads: {
      es: 'Frescas y mediterráneas',
      en: 'Fresh and Mediterranean',
      ca: 'Fresques i mediterrànies',
      nl: 'Vers en mediterraan'
    },
    rice: {
      es: 'Especialidad de la casa',
      en: 'House specialty',
      ca: 'Especialitat de la casa',
      nl: 'Specialiteit van het huis'
    },
    meat: {
      es: 'Carnes selectas a la brasa',
      en: 'Select grilled meats',
      ca: 'Carns selectes a la brasa',
      nl: 'Geselecteerd gegrild vlees'
    },
    fish: {
      es: 'Del mar a tu mesa',
      en: 'From sea to table',
      ca: 'Del mar a la teva taula',
      nl: 'Van zee naar tafel'
    },
    drinks: {
      es: 'Refrescantes y variadas',
      en: 'Refreshing and varied',
      ca: 'Refrescants i variades',
      nl: 'Verfrissend en gevarieerd'
    }
  }
  
  return subtitles[category]?.[locale] || subtitles[category]?.es || ''
}
