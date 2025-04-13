import React from 'react'; 
import {   getDictionary } from '@/lib/dictionaries';
import PersonalApproach from '@/components/PersonalApproach';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Features from '@/components/home/Features';
import Philosophy from '@/components/home/Philosophy';
import SkillSection from '@/components/home/SkillSection';
import CTA from '@/components/home/CTA';

// Main Homepage Component
const HomePage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  
  // For server components, we can fetch the dictionary directly
  const dictionary = await getDictionary(lang);

  return (
    <>
      {/* For client components, we'll pass the lang parameter */}
      {/* They'll handle dictionary loading internally */}
      <Hero lang={lang} dictionary={dictionary} />
      <Stats   />
      <Features  />
      <Philosophy  />
      <PersonalApproach lang={lang} />
      <SkillSection lang={lang} />
      <CTA   />
    </>
  );
};

export default HomePage;