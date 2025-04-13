import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';

// Experience page component
const ExperiencePage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <ExperienceTimeline lang={lang} dictionary={dictionary} />
  );
};

export default ExperiencePage;