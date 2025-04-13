import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from '@/components/StructuredData';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Navigation/Footer';
import '../globals.css';
import { Locale } from '@/lib/dictionaries';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rene Prost - Software Developer Portfolio',
  description: 'Senior C#/.NET developer with 20+ years of experience building robust, maintainable software systems, specializing in Clean Architecture and Design Patterns.',
  keywords: 'software developer, C#, .NET, design patterns, clean architecture, backend development, Rene Prost',
  authors: [{ name: 'Rene Prost' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reneprost.ee',
    siteName: 'Rene Prost - Software Developer Portfolio',
    title: 'Rene Prost - Senior C#/.NET Developer',
    description: 'C#/.NET specialist with expertise in robust, maintainable software systems and clean architecture',
    images: [
      {
        url: 'https://reneprost.ee/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rene Prost - Software Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rene Prost - Senior C#/.NET Developer',
    description: 'C#/.NET specialist with expertise in robust, maintainable software systems and clean architecture',
    images: ['https://reneprost.ee/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export async function generateStaticParams() {
  // Generate versions for all supported languages
  return [{ lang: 'en' }, { lang: 'et' }];
}

// Validate that the lang param is a supported locale
function isValidLang(lang: string): lang is Locale {
  return ['en', 'et'].includes(lang);
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Validate lang param - fallback to 'en' if invalid
  const lang = isValidLang(params.lang) ? params.lang : 'en';

  return (
    <html lang={lang} className="h-full bg-white">
      <body className={`${inter.className} h-full antialiased`}>
        <StructuredData />
        <Analytics />
        
        <div className="min-h-screen flex flex-col">
          <Navbar lang={lang} />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}