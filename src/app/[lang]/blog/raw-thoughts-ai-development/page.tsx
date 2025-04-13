import React from 'react';
import {  getDictionary } from '@/lib/dictionaries';
import RawThoughtsBlogPost from '@/components/blog/posts/RawThoughtsBlogPost';

const RawThoughtsBlogPostPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <RawThoughtsBlogPost lang={lang} dictionary={dictionary} />
  );
};

export default RawThoughtsBlogPostPage;