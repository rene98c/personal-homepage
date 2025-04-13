import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import HomelabContent from '@/components/homelab/HomelabContent';

const HomelabPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <HomelabContent lang={lang} dictionary={dictionary} />
  );
};

export default HomelabPage;