'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};

const RawThoughtsBlogPost = ({ 
  lang, 
  dictionary: propDictionary 
}: { 
  lang: Locale, 
  dictionary?: any 
}) => {
  // State for loading the dictionary if not provided as prop
  const [dictionary, setDictionary] = useState<any | null>(propDictionary || null);
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

  // Get translations or fallback to default text
  const backToAllArticles = dictionary?.blog?.backToAllArticles || "Back to all articles";

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-indigo-900 min-h-screen text-white">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-32 bg-indigo-800 rounded mb-10 animate-pulse"></div>
          <div className="h-8 w-3/4 bg-indigo-800 rounded mb-8 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-indigo-800 rounded w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}/blog`} className="inline-flex items-center text-indigo-300 hover:text-indigo-100 mb-10">
          <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          {backToAllArticles}
        </Link>
        
        <div className="mb-8 flex items-center text-indigo-300 text-sm">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
            </svg>
            April 13, 2025
          </span>
          <span className="mx-2">•</span>
          <span>AI • Unfiltered • Transparency</span>
        </div>
        
        <h1 className="text-3xl font-bold sm:text-4xl mb-10">Raw Thoughts: AI and My Development Journey</h1>
        
        <div className="space-y-6 text-white/90">
          <p className="text-lg">
            I was wondering, i did use lots of AI help to build this personal website and also AI help was used to build secureaccess system. AI tools have been of tremendous help, at the same time, it does make me wonder a bit if content is too clean and polished ..  But does it matter really, everything on this website is me, its not like i am producing content that ain&apos;t true. I would never in any chance would have completed the SecureAccess system in 15 days, not a chance, same goes regarding my personal website, it took a day to build it all. Truly i am impressed how powerful AI tools can be. 
          </p>
          
          <p className="text-lg">
            Heck, without an AI this website probably wouldn&apos;t even exist. But it does and it&apos;s awesome, i actually made this a reality.
          </p>
          
          <p className="text-lg">
              So I may worry a little over too clean AI content, if it confuses people ... In the end i am in control what the end result is gonna be, AI may add some extra sentences and words here or there, if i see them to be true, i leave them and i use them. When i use the AI, i describe what i want without a filter, i just shoot the words, most of the times and AI figures it out and produces clean output. Meaning stays the same, just the wording 100% not me.
          </p>
          
          <p className="text-lg">
            So once again, does it really matter, i feel these things are less of an importance. Without leveraging an AI, nothing here would have existed. So obviously, this is what matters, i created and produced something cool i am really proud of.  
          </p>
          
          <div className="my-10 py-6 border-t border-b border-indigo-700">
            <p className="font-semibold text-white text-lg">
              This blog post is 100% written by me and nothing is corrected by an AI, just for transparency. 
              Needed to clear this up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RawThoughtsBlogPost;