// src/app/[lang]/case-study/page.tsx
import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { generateCaseStudyMetadata } from '@/lib/metadata';

// Generate metadata based on the language parameter
export async function generateMetadata({ params }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Ensure lang is a valid locale
  const awaitedParams = await params;
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  return generateCaseStudyMetadata(lang as Locale);
}

// Validate that the lang param is a supported locale
function isValidLang(lang: string): lang is Locale {
  return ['en', 'et'].includes(lang);
}

const CaseStudyPage = async ({ params }: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  // Validate lang param - fallback to 'en' if invalid
  const awaitedParams = await params;
  const lang = isValidLang(awaitedParams.lang) ? awaitedParams.lang : 'en';
  
  // Load the dictionary for the selected language
  const dictionary = await getDictionary(lang);

  return (
    <CaseStudyContent lang={lang} dictionary={dictionary} />
  );
};

export default CaseStudyPage;