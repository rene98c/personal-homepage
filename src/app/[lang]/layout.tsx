// src/app/[lang]/layout.tsx
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from '@/components/StructuredData';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Navigation/Footer';
import '../globals.css';
import { Locale, getDictionary } from '@/lib/dictionaries';
import { generateRootLayoutMetadata } from '@/lib/metadata';

const inter = Inter({ subsets: ['latin'] });

// Generate dynamic metadata based on the language
export async function generateMetadata({ params }: { params: { lang: string } }) {
  // Ensure lang is a valid locale
  const awaitedParams = await params;
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  return generateRootLayoutMetadata(lang as Locale);
}

// Validate that the lang param is a supported locale
function isValidLang(lang: string): lang is Locale {
  return ['en', 'et'].includes(lang);
}

export async function generateStaticParams() {
  // Generate versions for all supported languages
  return [{ lang: 'en' }, { lang: 'et' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const awaitedParams = await params;
  // Validate lang param - fallback to 'en' if invalid
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  
  // Load dictionary on the server to pass to client components
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full bg-white">
      <body className={`${inter.className} h-full antialiased`}>
        <StructuredData />
        <Analytics />
        
        <div className="min-h-screen flex flex-col">
          <Navbar lang={lang} dictionary={dictionary} />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer lang={lang} dictionary={dictionary} />
        </div>
      </body>
    </html>
  );
}