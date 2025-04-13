'use client';

import { useEffect, useState } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

// Personal Approach section to add to the homepage
const PersonalApproach = ({ lang }: { lang: Locale }) => {
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);

  // Load the dictionary
  useEffect(() => {
    async function loadDictionary() {
      setIsLoading(true);
      
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
  }, [lang]);

  // Default content to show while dictionary is loading
  if (isLoading || !dictionary) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">
              {dictionary?.home?.personal?.title || "Personal Perspective"}
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              {dictionary?.home?.personal?.subtitle || "Beyond the Code"}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">{dictionary.home.personal.title}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            {dictionary.home.personal.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <p className="text-lg/8 text-gray-600 mb-6">
            {dictionary.home.personal.description1}
          </p>
          
          <p className="text-lg/8 text-gray-600 mb-6">
            {dictionary.home.personal.description2}
          </p>
          
          <p className="text-lg/8 text-gray-600 mb-6">
            {dictionary.home.personal.description3}
          </p>
          
          <p className="text-lg/8 text-gray-600">
            {dictionary.home.personal.description4}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalApproach;