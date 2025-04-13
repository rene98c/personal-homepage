import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/dictionaries';

interface BlogPostPreviewProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  isRaw: boolean;
  lang: Locale;
  translations: {
    unedited: string;
    readMore: string;
    minRead: string;
  };
}

const BlogPostPreview = ({ 
  title, 
  excerpt, 
  date, 
  readTime, 
  slug, 
  isRaw, 
  lang,
  translations 
}: BlogPostPreviewProps) => {
  return (
    <div className="bg-indigo-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-600/20 transition-shadow duration-300 border border-indigo-700">
      <div className="p-6">
        {isRaw && (
          <span className="inline-block bg-indigo-200 text-indigo-900 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide mb-2">
            {translations.unedited}
          </span>
        )}
        
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        
        <div className="text-sm text-indigo-300 mb-4 flex items-center">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} {translations.minRead}</span>
        </div>
        
        <p className="text-indigo-100 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          href={`/${lang}/blog/${slug}`} 
          className="inline-flex items-center text-indigo-300 hover:text-indigo-100 font-medium"
        >
          {translations.readMore}
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPreview;