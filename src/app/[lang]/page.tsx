// src/app/[lang]/page.tsx
import React from 'react'; 
import { Locale, getDictionary } from '@/lib/dictionaries';
import PersonalApproach from '@/components/PersonalApproach';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Features from '@/components/home/Features';
import Philosophy from '@/components/home/Philosophy';
import SkillSection from '@/components/home/SkillSection';
import CTA from '@/components/home/CTA';
import { generateHomePageMetadata } from '@/lib/metadata';

// Generate metadata based on the language parameter
export async function generateMetadata({ params }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Ensure lang is a valid locale
  const awaitedParams = await params;
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  return generateHomePageMetadata(lang as Locale);
}

// Validate that the lang param is a supported locale
function isValidLang(lang: string): lang is Locale {
  return ['en', 'et'].includes(lang);
}

// Main Homepage Component
const HomePage = async ({ params }: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  
  const awaitedParams = await params;
  const { lang } = awaitedParams;
  // Validate lang param - fallback to 'en' if invalid
  const validLang = isValidLang(lang) ? lang : 'en';
  
  // For server components, we can fetch the dictionary directly
  const dictionary = await getDictionary(validLang);

  return (
    <>
      {/* For client components, we'll pass the lang parameter */}
      {/* They'll handle dictionary loading internally */}
      <Hero lang={validLang} dictionary={dictionary} />
      <Stats lang={validLang} />
      <Features lang={validLang} />
      <Philosophy lang={validLang} />
      <PersonalApproach lang={validLang} />
      <SkillSection lang={validLang} />
      <CTA lang={validLang} />
    </>
  );
};

export default HomePage;