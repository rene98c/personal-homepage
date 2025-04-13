import React from 'react';
import {  getDictionary } from '@/lib/dictionaries';
import DesignPatternsContent from '@/components/design-patterns/DesignPatternsContent';

const DesignPatternsPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <DesignPatternsContent lang={lang} dictionary={dictionary} />
  );
};

export default DesignPatternsPage;