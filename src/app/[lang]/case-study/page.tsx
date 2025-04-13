import React from 'react';
import {   getDictionary } from '@/lib/dictionaries';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';

const CaseStudyPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <CaseStudyContent lang={lang} dictionary={dictionary} />
  );
};

export default CaseStudyPage;