import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import BlogListing from '@/components/blog/BlogListing';

const BlogPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <BlogListing lang={lang} dictionary={dictionary} />
  );
};

export default BlogPage;