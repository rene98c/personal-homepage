import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import DesignPatternsContent from '@/components/design-patterns/DesignPatternsContent';

const DesignPatternsPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <DesignPatternsContent lang={lang} dictionary={dictionary} />
  );
};

export default DesignPatternsPage;