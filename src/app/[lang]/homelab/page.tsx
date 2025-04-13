import React from 'react';
import { getDictionary } from '@/lib/dictionaries';
import HomelabContent from '@/components/homelab/HomelabContent';

const HomelabPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <HomelabContent lang={lang} dictionary={dictionary} />
  );
};

export default HomelabPage;