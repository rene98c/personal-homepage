import React from 'react';
import {   getDictionary } from '@/lib/dictionaries';
import AIPoweredDeveloperPost from '@/components/blog/posts/AiPoweredDeveloperPost';


const AIPoweredDeveloperPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <AIPoweredDeveloperPost lang={lang} dictionary={dictionary} />
  );
};

export default AIPoweredDeveloperPage;