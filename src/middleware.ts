import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher'; 

// Define supported locales
const supportedLocales = ['en', 'et']; // English and Estonian
const defaultLocale = 'et';

// Get the preferred locale from the request
function getLocale(request: NextRequest) {  
  // Negotiator expects a plain object, not a Next.js request
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value; 
  }); 
  // Use negotiator and intl-localematcher to get the best locale
  const acceptLanguage = request.headers.get('accept-language') || ''; 
  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim()); 
  // Default to defaultLocale if no match is found
  try {
    const matchedLocale = match(languages, supportedLocales, defaultLocale); 
    return matchedLocale;
  } catch   { 
    return defaultLocale;
  }
}

export function middleware(request: NextRequest)  {
  
  const { pathname } = request.nextUrl; 
  // Special case for root path - always redirect to the language version
  if (pathname === '/') {
     
    const locale = getLocale(request); 
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  
  // Check if pathname already has a locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );  
  if (pathnameHasLocale) return;
 
  const locale = getLocale(request);  
  request.nextUrl.pathname = `/${locale}${pathname}`;  
  return NextResponse.redirect(request.nextUrl);
} 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|_vercel|.*\\..*).*)',
  ],
};