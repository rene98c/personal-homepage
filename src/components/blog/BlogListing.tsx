'use client';

import React, { useState, useEffect } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import BlogPostPreview from './BlogPostPreview';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

const BlogListing = ({ 
  lang, 
  dictionary: propDictionary 
}: { 
  lang: Locale, 
  dictionary?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  // State for loading the dictionary if not provided as prop
  const [dictionary, setDictionary] = useState<any | null>(propDictionary || null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(!propDictionary);

  // Load the dictionary if not provided as prop
  useEffect(() => {
    if (propDictionary) {
      setDictionary(propDictionary);
      return;
    }

    async function loadDictionary() {
      if (dictionaryCache[lang]) {
        setDictionary(dictionaryCache[lang]);
        setIsLoading(false);
        return;
      }

      try {
        const dict = await getDictionary(lang);
        dictionaryCache[lang] = dict;
        setDictionary(dict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDictionary();
  }, [lang, propDictionary]);

  // Define blog posts (we'll keep these in English)
  const blogPosts = [
    {
      id: 'ai-conversations',
      title: 'Conversations with an AI, #1',
      excerpt: "I am still reflecting on the this system i built, this thing took less than 20 days to build solo. I still cannot believe it, under normal circumstances, for me 2 months at least. They key to 15 day delivery was an AI actually. It was surreal , like pair programming but with an AI, it is mind boggling.",
      date: 'April 15, 2025',
      readTime: '5',
      slug: 'conversations-with-ai',
      isRaw: true
    },
    {
      id: 'ai-powered-developer',
      title: 'The AI-Powered Developer: Reflections on My Journey',
      excerpt: "The landscape of software development has fundamentally changed. As I look at the SecureAccess system and this website—both projects I'm deeply proud of—I can't help but reflect on the role AI played in bringing them to life.",
      date: 'April 13, 2025',
      readTime: '8',
      slug: 'ai-powered-developer',
      isRaw: false
    },
    {
      id: 'raw-thoughts',
      title: 'Raw Thoughts: AI and My Development Journey',
      excerpt: "I was wondering, i did use lots of AI help to build this personal website and also AI help was used to build secureaccess system. AI tools have been of tremendous help...",
      date: 'April 13, 2025',
      readTime: '3',
      slug: 'raw-thoughts-ai-development',
      isRaw: true
    }
  ];

  // Get translations or fallback to default text
  const blogTitle = dictionary?.blog?.title || "Blog";
  const blogDescription = dictionary?.blog?.description || 
    "Thoughts on software development, architecture, resilience engineering, and the evolving role of AI in our craft.";
  const unedited = dictionary?.blog?.unedited || "Unedited";
  const readMore = dictionary?.blog?.readMore || "Read more";
  const minRead = dictionary?.blog?.minRead || "min read";

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-indigo-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="h-8 w-32 bg-indigo-900 rounded mx-auto animate-pulse"></div>
            <div className="h-4 w-64 bg-indigo-900 rounded mx-auto mt-4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="bg-indigo-800 rounded-lg overflow-hidden shadow-lg border border-indigo-700 h-64 animate-pulse">
                <div className="p-6">
                  <div className="h-4 bg-indigo-700 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-indigo-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-indigo-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-indigo-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-indigo-700 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-indigo-700 rounded w-1/3 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">{blogTitle}</h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            {blogDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostPreview 
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
              isRaw={post.isRaw}
              lang={lang}
              translations={{
                unedited,
                readMore,
                minRead
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListing;