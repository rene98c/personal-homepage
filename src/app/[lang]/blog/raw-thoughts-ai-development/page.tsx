import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import RawThoughtsBlogPost from '@/components/blog/posts/RawThoughtsBlogPost';

const RawThoughtsBlogPostPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <RawThoughtsBlogPost lang={lang} dictionary={dictionary} />
  );
};

export default RawThoughtsBlogPostPage;