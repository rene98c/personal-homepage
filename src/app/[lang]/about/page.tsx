// src/app/[lang]/about/page.tsx
import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import AboutMeContent from '@/components/AboutMeContent';
import { generateMetadata as generateBaseMetadata } from '@/lib/metadata';

// Generate metadata based on the language parameter
export async function generateMetadata({ params }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Ensure lang is a valid locale
  const awaitedParams = await params;
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  
  // Generate basic metadata
  const baseMetadata = await generateBaseMetadata(lang as Locale, 'about', {
    title_en: 'About Me - Rene Prost',
    title_et: 'Minust - Rene Prost',
    description_en: 'Learn more about Rene Prost, a senior C#/.NET developer with a focus on clean architecture and AI-augmented development.',
    description_et: 'Tutvu lähemalt Rene Prostiga, C#/.NET arendajaga, kes keskendub puhtale arhitektuurile ja AI-toega arendusele.'
  });
  
  return baseMetadata;
}

// Validate that the lang param is a supported locale
function isValidLang(lang: string): lang is Locale {
  return ['en', 'et'].includes(lang);
}

const AboutPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Validate lang param - fallback to 'en' if invalid
  const awaitedParams = await params;
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  
  // Load the dictionary for the selected language
  const dictionary = await getDictionary(lang);

  return (
    <AboutMeContent lang={lang} dictionary={dictionary} />
  );
};

export default AboutPage;