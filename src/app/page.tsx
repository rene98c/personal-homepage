import React from 'react'; 
import PersonalApproach from '@/components/PersonalApproach';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import Philosophy from '../components/home/Philosophy';
import SkillSection from '../components/home/SkillSection';
import CTA from '../components/home/CTA';

 

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