'use client';

import React, { useState, useEffect } from 'react';
import { Code, AlertCircle, Award, CheckCircle } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};

interface PatternDetailProps {
  name: string;
  problem: string;
  benefits: string[];
  codeSnippet: string;
  category: string;
  lang?: Locale;
}

export const PatternDetail = ({ 
  name, 
  problem, 
  benefits, 
  codeSnippet, 
  category,
  lang
}: PatternDetailProps) => {
  const [dictionary, setDictionary] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load the dictionary if language is provided
  useEffect(() => {
    if (!lang) {
      setIsLoading(false);
      return;
    }

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

  // Get translations or fallback to default text
  const benefitsLabel = dictionary?.designPatterns?.benefits || "Benefits";
  const implementationLabel = dictionary?.designPatterns?.implementation || "Implementation";
  const problemLabel = dictionary?.designPatterns?.problem || "Problem";

  const getCategoryBorderColor = () => {
    switch (category) {
      case 'creational':
        return 'border-t-amber-500';
      case 'structural':
        return 'border-t-green-500';
      case 'behavioral':
        return 'border-t-blue-500';
      case 'architectural':
        return 'border-t-purple-500';
      case 'resilience':
        return 'border-t-red-500';
      case 'testing':
        return 'border-t-indigo-500';
      default:
        return 'border-t-gray-500';
    }
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-100 transition-all duration-200 hover:shadow-xl ${getCategoryBorderColor()} border-t-4`}>
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-5 h-5 text-indigo-600" />
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      </div>
      
      <div className="mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{problemLabel}</p>
            <p className="text-gray-700">{problem}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-medium text-gray-800">{benefitsLabel}</h4>
        </div>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">{implementationLabel}</h4>
        <div className="bg-gray-900 border border-gray-700 text-gray-200 p-4 rounded overflow-x-auto">
          <pre className="whitespace-pre-wrap">
            <code className="text-sm">
              {codeSnippet}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;