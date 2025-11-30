import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configuración de idiomas directa para el middleware
const locales = ["es"]; // , "en", "ca", "nl", "de"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar rutas estáticas
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  // Redirigir la ruta principal "/" a "/es/"
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL("/es/", request.url)
    );
  }

  // Verificar si ya tiene un locale válido en la ruta
  const pathLocale = pathname.split("/")[1];
  if (locales.includes(pathLocale)) {
    return;
  }

  // Para otras rutas sin locale válido, redirigir con el idioma por defecto
  return NextResponse.redirect(
    new URL(`/es${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Incluir específicamente la ruta raíz
    '/',
    // Incluir rutas que necesitan procesamiento de locale
    '/((?!_next|api|favicon.ico).*)',
  ],
};