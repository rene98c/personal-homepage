import React from 'react'; 
import { Locale, getDictionary } from '@/lib/dictionaries';
import PersonalApproach from '@/components/PersonalApproach';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Features from '@/components/home/Features';
import Philosophy from '@/components/home/Philosophy';
import SkillSection from '@/components/home/SkillSection';
import CTA from '@/components/home/CTA';

// Main Homepage Component
const HomePage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  
  // For server components, we can fetch the dictionary directly
  const dictionary = await getDictionary(lang);

  return (
    <>
      {/* For client components, we'll pass the lang parameter */}
      {/* They'll handle dictionary loading internally */}
      <Hero lang={lang} dictionary={dictionary} />
      <Stats lang={lang} dictionary={dictionary} />
      <Features lang={lang} dictionary={dictionary} />
      <Philosophy lang={lang} dictionary={dictionary} />
      <PersonalApproach lang={lang} />
      <SkillSection lang={lang} />
      <CTA lang={lang} dictionary={dictionary} />
    </>
  );
};

export default HomePage;