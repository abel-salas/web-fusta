import type { Metadata } from 'next';
import { getLocalizedData } from "@/app/lib/localization";
import { generatePageMetadata, getValidLocale } from '@/seo';
import { client } from '../../../../sanity/client';
import MenuContent from '@/app/[locale]/carta/MenuContent';
import { generateMenuSchema } from '@/seo/generators/advanced-schema';
import { menuContentQuery, menuItemsQuery } from '../../../../sanity/queries';

// Función para obtener nombres de categorías desde el diccionario
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCategoryName(category: string, dict: any): string {
  return dict.menu?.categoryNames?.[category] || category;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);

  return generatePageMetadata({
    locale: validLocale,
    page: 'carta',
    path: '/carta'
  });
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  const { dict } = getLocalizedData(locale);

  // Obtener items del menú y contenido desde Sanity
  let menuItems = [];
  let menuContentData = [];

  try {
    [menuItems, menuContentData] = await Promise.all([
      client.fetch(menuItemsQuery),
      client.fetch(menuContentQuery)
    ]);
  } catch (error) {
    console.warn('⚠️ No se pudo obtener contenido del menú desde Sanity:', error);
  }

  // Solo mostrar si hay datos de Sanity
  if (menuItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 to-white text-center px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-4 text-white">{dict.menu.title}</h1>
        <p className="text-slate-600 mb-8">El menú se está actualizando. Por favor, vuelve pronto.</p>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full" />
      </div>
    );
  }

  // Transformar array de menuItems en objeto por categorías
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuDataByCategory = menuItems.reduce((acc: any, item: any) => {
    const category = item.category || 'others';
    if (!acc[category]) {
      acc[category] = {
        title: getCategoryName(category, dict),
        items: []
      };
    }

    // Transformar el item de Sanity al formato esperado
    acc[category].items.push({
      name: item.name?.[locale] || item.name?.es || item.name?.en || 'Sin nombre',
      description: item.description?.[locale] || item.description?.es || item.description?.en || '',
      price: item.price || 'Consultar',
      recommended: item.recommended || false,
      allergens: item.allergens || [],
      image: item.image?.asset?.url || null,
      imageAlt: item.image?.alt || ''
    });

    return acc;
  }, {});

  return (
    <>
      {/* Menu Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMenuSchema(validLocale)),
        }}
      />
      <MenuContent dict={dict} menuData={menuDataByCategory} />
    </>
  );
}