import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';

const CaseStudyPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <CaseStudyContent lang={lang} dictionary={dictionary} />
  );
};

export default CaseStudyPage;