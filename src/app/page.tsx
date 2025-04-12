import React from 'react'; 
import PersonalApproach from '@/components/PersonalApproach';
import Hero from './home/Hero';
import Stats from './home/Stats';
import Features from './home/Features';
import Philosophy from './home/Philosophy';
import SkillSection from './home/SkillSection';
import CTA from './home/CTA';

 

// Main Homepage Component
const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Philosophy />
      <PersonalApproach />
      <SkillSection />
      <CTA />
    </>
  );
};

export default HomePage;