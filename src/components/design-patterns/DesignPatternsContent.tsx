'use client';

import React, { useState, useEffect } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import { creationalPatterns } from '@/data/design-patterns/creational-patterns';
import { structuralPatterns } from '@/data/design-patterns/structural-patterns';
import { behavioralPatterns } from '@/data/design-patterns/behavioral-patterns';
import { architecturalPatterns } from '@/data/design-patterns/architectural-patterns';
import { resiliencePatterns } from '@/data/design-patterns/resilience-patterns';
import { testingPatterns } from '@/data/design-patterns/testing-patterns';
import PatternDetail from '@/components/design-patterns/PatternDetail';
import CategoryButton from '@/components/design-patterns/CategoryButton';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};

// Design Patterns Content Component
const DesignPatternsContent = ({ 
  lang, 
  dictionary: propDictionary 
}: { 
  lang: Locale, 
  dictionary?: any 
}) => {
  // State for loading the dictionary if not provided as prop
  const [dictionary, setDictionary] = useState<any | null>(propDictionary || null);
  const [isLoading, setIsLoading] = useState(!propDictionary);
  const [activeCategory, setActiveCategory] = useState('creational');

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

  // Render patterns based on active category
  const renderPatterns = () => {
    switch (activeCategory) {
      case 'creational':
        return creationalPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} lang={lang} />
        ));
      case 'structural':
        return structuralPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} lang={lang} />
        ));
      case 'behavioral':
        return behavioralPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} lang={lang} />
        ));
      case 'architectural':
        return architecturalPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} lang={lang} />
        ));
      case 'resilience':
        return resiliencePatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} lang={lang} />
        ));
      case 'testing':
        return testingPatterns.map((pattern, index) => (
          <PatternDetail key={index} {...pattern} lang={lang} />
        ));
      default:
        return null;
    }
  };

  // Get translations or fallback to default text
  const designPatternsTitle = dictionary?.designPatterns?.title || "Design Patterns";
  const designPatternsSubtitle = dictionary?.designPatterns?.subtitle || "Design Patterns Implementation";
  const designPatternsDescription = dictionary?.designPatterns?.description || 
    "Throughout my career as a software developer, I've implemented numerous design patterns to solve complex problems with elegant, maintainable solutions. This catalog showcases practical examples of design patterns I've used in real-world applications.";
  const introTitle = dictionary?.designPatterns?.introTitle || "Introduction";
  const introDescription = dictionary?.designPatterns?.introDescription || 
    "Design patterns represent proven solutions to common software design challenges. By leveraging these established patterns, I create robust, flexible code that can adapt to changing requirements and scale effectively. This catalog documents my hands-on experience with key patterns across different categories.";
  const introDescription2 = dictionary?.designPatterns?.introDescription2 || 
    "The patterns demonstrated here reflect not just theoretical knowledge, but practical experience implementing and refining these solutions in production systems. Each implementation has been battle-tested in mission-critical environments.";
  
  // Category translations
  const categoryDescriptions = {
    creational: dictionary?.designPatterns?.creationalDescription || 
      "Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. These patterns provide flexibility in what gets created, how it gets created, and who creates it. They abstract the instantiation process, helping make a system independent of how its objects are created, composed, and represented.",
    structural: dictionary?.designPatterns?.structuralDescription || 
      "Structural patterns deal with object composition, creating relationships between objects to form larger structures. These patterns help ensure that when one part of a system changes, the entire structure doesn't need to change. They help build flexible, loosely coupled systems that can be easily maintained and adapted to new requirements over time.",
    behavioral: dictionary?.designPatterns?.behavioralDescription || 
      "Behavioral patterns are concerned with the assignment of responsibilities between objects and how they communicate. These patterns help make complex flows more manageable and improve communication between different objects. They characterize how objects interact and distribute responsibility, increasing flexibility in carrying out this communication.",
    architectural: dictionary?.designPatterns?.architecturalDescription || 
      "Architectural patterns address fundamental structural organization of software systems. These high-level patterns define the overall shape and structure of applications and guide the relationships between major components. They provide reusable solutions to commonly occurring organizational problems in software architecture.",
    resilience: dictionary?.designPatterns?.resilienceDescription || 
      "Resilience patterns help applications handle failures gracefully and continue functioning under adverse conditions. These patterns enable systems to recover from failures and maintain service even when components are degraded. They are essential for mission-critical systems that must maintain high availability and reliability, even when faced with transient failures or unexpected conditions.",
    testing: dictionary?.designPatterns?.testingDescription || 
      "Testing patterns ensure software quality through systematic verification approaches. These patterns provide structured ways to create reliable tests and test environments for complex systems. They help in creating maintainable, repeatable tests that can verify application behavior across various scenarios, from unit testing to integration testing and end-to-end validation."
  };

  // Category button labels
  const categoryLabels = {
    creational: dictionary?.designPatterns?.creational || "Creational",
    structural: dictionary?.designPatterns?.structural || "Structural",
    behavioral: dictionary?.designPatterns?.behavioral || "Behavioral",
    architectural: dictionary?.designPatterns?.architectural || "Architectural",
    resilience: dictionary?.designPatterns?.resilience || "Resilience",
    testing: dictionary?.designPatterns?.testing || "Testing"
  };

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div>
        {/* Header */}
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="h-5 w-32 bg-indigo-100 rounded mx-auto animate-pulse"></div>
            <div className="mt-2 h-8 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="mt-6 h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-2 h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">Software Design</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {designPatternsTitle}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {designPatternsDescription}
          </p>
          <p className="text-gray-700">
            The distinctive aspects of my approach—particularly the explicit criticality classification, purpose-built 
            testing tools, and manual override design—demonstrate my ability to adapt established patterns to meet 
            unique requirements in specialized domains.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">{introTitle}</h3>
              <p className="text-gray-700 mb-4">
                {introDescription}
              </p>
              <p className="text-gray-700">
                {introDescription2}
              </p>
            </div>
            
            {/* Pattern Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              <CategoryButton 
                text={categoryLabels.creational} 
                isActive={activeCategory === 'creational'} 
                onClick={() => setActiveCategory('creational')} 
              />
              <CategoryButton 
                text={categoryLabels.structural} 
                isActive={activeCategory === 'structural'} 
                onClick={() => setActiveCategory('structural')} 
              />
              <CategoryButton 
                text={categoryLabels.behavioral} 
                isActive={activeCategory === 'behavioral'} 
                onClick={() => setActiveCategory('behavioral')} 
              />
              <CategoryButton 
                text={categoryLabels.architectural} 
                isActive={activeCategory === 'architectural'} 
                onClick={() => setActiveCategory('architectural')} 
              />
              <CategoryButton 
                text={categoryLabels.resilience} 
                isActive={activeCategory === 'resilience'} 
                onClick={() => setActiveCategory('resilience')} 
              />
              <CategoryButton 
                text={categoryLabels.testing} 
                isActive={activeCategory === 'testing'} 
                onClick={() => setActiveCategory('testing')} 
              />
            </div>
            
            {/* Category Description */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                {categoryLabels[activeCategory as keyof typeof categoryLabels]} {designPatternsTitle}
              </h3>
              {categoryDescriptions[activeCategory as keyof typeof categoryDescriptions] && (
                <p className="text-gray-700">
                  {categoryDescriptions[activeCategory as keyof typeof categoryDescriptions]}
                </p>
              )}
            </div>
            
            {/* Pattern Details */}
            <div className="space-y-6">
              {renderPatterns()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPatternsContent;