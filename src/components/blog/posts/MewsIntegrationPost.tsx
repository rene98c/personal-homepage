'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

export const MewsIntegrationPost = ({ 
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
            {[...Array(8)].map((_, i) => (
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
            April 20, 2025
          </span>
          <span className="mx-2">•</span>
          <span>Integration • AI • Development</span>
        </div>
        
        <h1 className="text-3xl font-bold sm:text-4xl mb-10">How I Delivered a €10k Integration in 6 Hours</h1>
        
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-lg">
            So, I was handed a new project: build an integration between two business-critical systems — MEWS (a hotel management system) and Directo (an ERP platform).
          </p>
          
          <p className="text-lg">
            The company had quoted the client €10,000 for this integration.
          </p>
          
          <p className="text-lg font-bold">
            I completed it in 6 hours.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Phase 1: Analyzing With an AI Pair</h2>
          
          <p className="text-lg">
            As soon as I got the requirements (two documents and a couple of XSD schemas), I sat down with my AI assistant. We worked as if in a real-time whiteboard session:
          </p>
          
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li className="text-lg"><strong>Pasted in sample API responses and schemas</strong></li>
            <li className="text-lg">Asked the AI to <strong>summarize, extract, and contextualize</strong> key information</li>
            <li className="text-lg">Identified all <strong>inputs and outputs</strong>: what the XML needs to contain, what fields come from MEWS, what Directo expects</li>
            <li className="text-lg">Mapped the fields directly from requirements docs to concrete DTOs</li>
            <li className="text-lg">Clarified behavior rules like how to handle credit notes, prepayments, and missing customers</li>
          </ul>
          
          <p className="text-lg">
            The AI became a force multiplier. It didn&apos;t guess. It helped me <strong>see the integration clearly</strong>.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Phase 2: Creating a Precise Action Plan</h2>
          
          <p className="text-lg">
            With the AI&apos;s help, I had a complete breakdown:
          </p>
          
          <ul className="list-none pl-6 my-4 space-y-2">
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Input and output formats (MEWS JSON → Directo XML)</span>
            </li>
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Field mappings between domains</span>
            </li>
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Data validation rules</span>
            </li>
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>API endpoints and credentials</span>
            </li>
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Edge case handling (zero balances, missing customers, duplicate entries)</span>
            </li>
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Required objects: bills, items, customers, payment requests</span>
            </li>
            <li className="text-lg flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Schedule and retry strategy</span>
            </li>
          </ul>
          
          <p className="text-lg">
            At that point, I didn&apos;t feel overwhelmed. I felt <em>ready</em>.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Phase 3: Build Mode</h2>
          
          <p className="text-lg">
            Then I said the magic word: <strong>&quot;execute.&quot;</strong>
          </p>
          
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li className="text-lg">The AI scaffolded the core logic to fetch and process MEWS bills.</li>
            <li className="text-lg">It wrote clean C# models, serializers, DTOs.</li>
            <li className="text-lg">It generated working XML payloads that matched the Directo schemas.</li>
            <li className="text-lg">I tweaked, adjusted, clarified a few mappings.</li>
          </ul>
          
          <p className="text-lg">
            Boom. That was 95% of the system, done.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Phase 4: Architecture & Orchestration</h2>
          
          <p className="text-lg">
            Next, I added the structure:
          </p>
          
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li className="text-lg">Created a <strong>background worker</strong> with a CRON schedule (runs nightly)</li>
            <li className="text-lg">Abstracted MEWS and Directo into <strong>interface-driven service layers</strong></li>
            <li className="text-lg">Injected configuration, added structured logging, cleaned up exception handling</li>
            <li className="text-lg">Repackaged everything with <strong>clear boundaries and separation of concerns</strong></li>
          </ul>
          
          <p className="text-lg">
            I plugged in the pieces, ran the job, checked the output — everything clicked.
          </p>
          
          <p className="text-lg">
            Done.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Reflections</h2>
          
          <p className="text-lg">
            I used to procrastinate. A task like this would feel like a mountain.
          </p>
          
          <p className="text-lg">
            Now? I sit down with my AI pair. We analyze, plan, and execute.
          </p>
          
          <p className="text-lg">
            It feels like I&apos;m the director of a thousand silent coders, waiting for instructions. When I say go, they deliver.
          </p>
          
          <p className="text-lg">
            The AI didn&apos;t replace me.
          </p>
          
          <p className="text-lg font-bold">
            It <strong>amplified</strong> me.
          </p>
          
          <p className="text-lg">
            And that&apos;s how a €10,000 integration got built in 6 hours. With confidence, clarity, and creative flow.
          </p>
          
          <p className="text-lg">
            This is the new way forward. And I&apos;m here for it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MewsIntegrationPost;