// src/components/AboutMeContent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

const AboutMeContent = ({ 
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

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <div className="h-5 w-32 bg-indigo-100 rounded mx-auto animate-pulse"></div>
              <div className="mt-2 h-8 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
              <div className="mt-6 h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{dictionary.about.title}</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {dictionary.about.subtitle}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-3xl">
            <div className="space-y-8">
              <p className="text-xl leading-8 text-gray-700">
                {dictionary.about.content.paragraph1}
              </p>
              
              <p className="text-xl leading-8 text-gray-700">
                {dictionary.about.content.paragraph2}
              </p>
              
              <p className="text-xl leading-8 text-gray-700">
                {dictionary.about.content.paragraph3}
              </p>
              
              <p className="text-xl leading-8 text-gray-700 font-semibold">
                {dictionary.about.content.paragraph4}
              </p>
              
              <p className="text-xl leading-8 text-gray-700">
                {dictionary.about.content.paragraph5}
              </p>
              
              <p className="text-xl leading-8 text-gray-700 font-semibold">
                {dictionary.about.content.paragraph6}
              </p>
              
              <p className="text-xl leading-8 text-gray-700 font-semibold">
                {dictionary.about.content.paragraph7}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeContent;