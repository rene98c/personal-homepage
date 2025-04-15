import React from 'react';
import { getDictionary } from '@/lib/dictionaries';
import MewsIntegrationPost from '@/components/blog/posts/MewsIntegrationPost';

// This page will be available at /[lang]/blog/mews-directo-integration
const MewsIntegrationPage = async ({ params }: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <MewsIntegrationPost lang={lang} dictionary={dictionary} />
  );
};

export default MewsIntegrationPage;