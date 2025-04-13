'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

export const Stats = ({ lang }: { lang: Locale }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current; // Store ref value in a variable

    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) { // Use the stored variable here
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Get translations or fallback to default text
  const statsTitle = dictionary?.home?.stats?.title || "Professional Journey";
  const statsDescription = dictionary?.home?.stats?.description || 
    "I've been writing and developing software on the .NET platform in C# since 2003. Throughout my career, I've worked across a variety of industries including government systems, transportation, and enterprise solutions.";
  const statsDescription2 = dictionary?.home?.stats?.description2 || 
    "My approach to software development emphasizes clean architecture, design patterns, and resilient systems that can adapt to changing requirements. I believe in building software that not only meets current needs but is flexible enough to evolve over time.";
  
  const stats = [
    { 
      label: dictionary?.home?.stats?.experience || "Years of Experience", 
      value: '20+' 
    },
    { 
      label: dictionary?.home?.stats?.projects || "Projects Involved With", 
      value: '30+' 
    },
    { 
      label: dictionary?.home?.stats?.technologies || "Technologies Mastered", 
      value: '15+' 
    },
  ];

  return (
    <div ref={sectionRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className={`text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {statsTitle}
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className={`text-xl/8 text-gray-600 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {statsDescription}
              </p>
              <p className={`mt-10 max-w-xl text-base/7 text-gray-700 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {statsDescription2}
              </p>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className={`flex flex-col-reverse gap-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
                    style={{ transitionDelay: `${300 + index * 150}ms` }}
                  >
                    <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900 transition-all duration-500 hover:text-indigo-600">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;