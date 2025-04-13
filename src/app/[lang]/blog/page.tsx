import React from 'react';
import {   getDictionary } from '@/lib/dictionaries';
import BlogListing from '@/components/blog/BlogListing';

const BlogPage = async ({ params }: any ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <BlogListing lang={lang} dictionary={dictionary} />
  );
};

export default BlogPage;