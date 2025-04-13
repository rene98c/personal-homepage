'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronRight, ChevronDown, Clock, Code, Layers } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

// Phase Section Component
export const PhaseSection = ({ 
  number, 
  title, 
  approach, 
  steps, 
  results, 
  codeSnippet,
  lang
}: { 
  number: string, 
  title: string, 
  approach: string, 
  steps: string[], 
  results: string[], 
  codeSnippet: string,
  lang?: Locale
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [, setIsLoading] = useState(true);

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
  const approachText = dictionary?.caseStudy?.approach || "Approach";
  const stepsText = dictionary?.caseStudy?.implementationSteps || "Key Implementation Steps";
  const resultsText = dictionary?.caseStudy?.results || "Results";
  const codeText = dictionary?.caseStudy?.codeImplementation || "Code Implementation";
    
  return (
    <div className="bg-white shadow-lg border border-gray-100 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl mb-6">
      <div 
        className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer transition-colors hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
            {number}
          </div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
        </div>
        {isExpanded ? 
          <ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-200" /> : 
          <ChevronRight className="w-5 h-5 text-gray-600 transition-transform duration-200" />
        }
      </div>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <h5 className="font-medium text-gray-800 mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-indigo-600" />
              {approachText}
            </h5>
            <p className="text-gray-700">{approach}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-800 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-600" />
              {stepsText}
            </h5>
            <ul className="space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-800 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              {resultsText}
            </h5>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-800 mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-indigo-600" />
              {codeText}
            </h5>
            <div className="bg-gray-900 border border-gray-700 text-gray-200 p-4 rounded overflow-x-auto">
              <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};