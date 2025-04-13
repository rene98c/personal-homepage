import React from 'react';
import {   getDictionary } from '@/lib/dictionaries';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';

// Experience page component
const ExperiencePage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <ExperienceTimeline lang={lang} dictionary={dictionary} />
  );
};

export default ExperiencePage;