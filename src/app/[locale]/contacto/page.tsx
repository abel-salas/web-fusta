import type { Metadata } from 'next';
import { generatePageMetadata, getValidLocale } from '@/seo';
import ContactContent from "./ContactContent";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);

  return generatePageMetadata({
    locale: validLocale,
    page: 'contacto',
    path: '/contacto'
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);

  return <ContactContent locale={validLocale} />;
}