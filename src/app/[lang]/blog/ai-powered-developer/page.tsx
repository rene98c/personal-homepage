import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import AIPoweredDeveloperPost from '@/components/blog/posts/AIPoweredDeveloperPost';

const AIPoweredDeveloperPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <AIPoweredDeveloperPost lang={lang} dictionary={dictionary} />
  );
};

export default AIPoweredDeveloperPage;