'use client';

import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import PersonalApproach from '@/components/PersonalApproach';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import Philosophy from '../components/home/Philosophy';
import SkillSection from '../components/home/SkillSection';
import CTA from '../components/home/CTA';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}

// Main Homepage Component
const HomePage = () => {
  const { t } = useTranslation(['common', 'home']);
  
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