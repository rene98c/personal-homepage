'use client';

import React, { useState, useEffect, useRef } from 'react';
import PhilosophyItem from "./PhilosophyItem";
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

export const Philosophy = ({ lang }: { lang: Locale }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);
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
  const philosophyTitle = dictionary?.home?.philosophy?.title || "My Approach";
  const philosophySubtitle = dictionary?.home?.philosophy?.subtitle || "Professional Philosophy";
  const philosophyDescription = dictionary?.home?.philosophy?.description || 
    "The distinctive aspects of my approach—particularly the explicit criticality classification, purpose-built testing tools, and manual override design—demonstrate my ability to adapt established patterns to meet unique requirements in specialized domains.";
  
  const items = [
    {
      number: "1",
      title: dictionary?.home?.philosophy?.item1?.title || "Architecture First",
      description: dictionary?.home?.philosophy?.item1?.description || 
        "I believe in establishing a solid architectural foundation before diving into implementation details. This approach ensures scalable, maintainable systems that can adapt to changing requirements."
    },
    {
      number: "2",
      title: dictionary?.home?.philosophy?.item2?.title || "Resilient by Design",
      description: dictionary?.home?.philosophy?.item2?.description || 
        "I build systems with resilience baked in from the start, not as an afterthought. Circuit breakers, retry policies, and graceful degradation are integral to my implementation approach."
    },
    {
      number: "3",
      title: dictionary?.home?.philosophy?.item3?.title || "Practical Patterns",
      description: dictionary?.home?.philosophy?.item3?.description || 
        "I leverage established design patterns to solve complex problems, but always with a practical mindset. The goal is clean, maintainable code that solves real business problems efficiently."
    },
    {
      number: "4",
      title: dictionary?.home?.philosophy?.item4?.title || "Testable Solutions",
      description: dictionary?.home?.philosophy?.item4?.description || 
        "I design systems with testability in mind, implementing comprehensive testing strategies across unit, integration, and scenario-based approaches."
    }
  ];

  return (
    <div ref={sectionRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className={`text-base/7 font-semibold text-indigo-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {philosophyTitle}
          </h2>
          <p className={`mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {philosophySubtitle}
          </p>
          <p className={`mt-6 text-lg/8 text-gray-600 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {philosophyDescription}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {items.map((item, index) => (
              <div key={index} className={`transition-all duration-700 delay-${450 + index * 150} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <PhilosophyItem 
                  number={item.number}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;