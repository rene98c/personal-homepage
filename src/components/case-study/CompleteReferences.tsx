'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

// Complete references component
const CompleteReferences = ({ 
  lang,
  title
}: { 
  lang?: Locale,
  title?: string
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
      if (!lang) {
        setIsLoading(false);
        return;
      }

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
  
  // Combined references from both documents
  const references = [
    {
      category: "Architecture & Design",
      items: [
        {
          author: "Evans, E.",
          year: 2003,
          title: "Domain-Driven Design: Tackling Complexity in the Heart of Software",
          publisher: "Addison-Wesley"
        },
        {
          author: "Martin, R. C.",
          year: 2017,
          title: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
          publisher: "Prentice Hall"
        },
        {
          author: "Martin, R. C.",
          year: 2008,
          title: "Clean Code: A Handbook of Agile Software Craftsmanship",
          publisher: "Prentice Hall"
        },
        {
          author: "Gamma, E., Helm, R., Johnson, R., & Vlissides, J.",
          year: 1994,
          title: "Design Patterns: Elements of Reusable Object-Oriented Software",
          publisher: "Addison-Wesley"
        },
        {
          author: "Fowler, M.",
          year: 2002,
          title: "Patterns of Enterprise Application Architecture",
          publisher: "Addison-Wesley"
        },
        {
          author: "Vernon, V.",
          year: 2013,
          title: "Implementing Domain-Driven Design",
          publisher: "Addison-Wesley"
        },
        {
          author: "Fairbanks, G.",
          year: 2010,
          title: "Just Enough Software Architecture: A Risk-Driven Approach",
          publisher: "Marshall & Brainerd"
        },
        {
          author: "Clements, P., et al.",
          year: 2010,
          title: "Documenting Software Architectures: Views and Beyond",
          publisher: "Addison-Wesley"
        }
      ]
    },
    {
      category: "Software Development Process",
      items: [
        {
          author: "Freeman, S., & Pryce, N.",
          year: 2009,
          title: "Growing Object-Oriented Software, Guided by Tests",
          publisher: "Addison-Wesley"
        },
        {
          author: "Humble, J., & Farley, D.",
          year: 2010,
          title: "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation",
          publisher: "Addison-Wesley"
        },
        {
          author: "Feathers, M.",
          year: 2004,
          title: "Working Effectively with Legacy Code",
          publisher: "Prentice Hall"
        },
        {
          author: "Adzic, G.",
          year: 2011,
          title: "Specification by Example: How Successful Teams Deliver the Right Software",
          publisher: "Manning Publications"
        },
        {
          author: "Meszaros, G.",
          year: 2007,
          title: "xUnit Test Patterns",
          publisher: "Addison-Wesley"
        }
      ]
    },
    {
      category: "Resilience & DevOps",
      items: [
        {
          author: "Nygard, M. T.",
          year: 2018,
          title: "Release It!: Design and Deploy Production-Ready Software",
          publisher: "Pragmatic Bookshelf"
        },
        {
          author: "Beyer, B., Jones, C., Petoff, J., & Murphy, N. R.",
          year: 2016,
          title: "Site Reliability Engineering: How Google Runs Production Systems",
          publisher: "O'Reilly Media"
        },
        {
          author: "Fowler, S. J.",
          year: 2016,
          title: "Production-Ready Microservices: Building Standardized Systems Across an Engineering Organization",
          publisher: "O'Reilly Media"
        },
        {
          author: "Turnbull, J.",
          year: 2016,
          title: "The Art of Monitoring",
          publisher: "Turnbull Press"
        },
        {
          author: "Brazil, B.",
          year: 2018,
          title: "Prometheus: Up & Running",
          publisher: "O'Reilly Media"
        },
        {
          author: "Garrison, J., & Nova, K.",
          year: 2017,
          title: "Cloud Native Infrastructure",
          publisher: "O'Reilly Media"
        }
      ]
    },
    {
      category: "Methodologies & Best Practices",
      items: [
        {
          author: "Cockburn, A.",
          year: 2005,
          title: "Hexagonal Architecture",
          publisher: "alistair.cockburn.us"
        },
        {
          author: "Heroku",
          year: null,
          title: "The Twelve-Factor App",
          publisher: "https://12factor.net/"
        },
        {
          author: "Smith, J.",
          year: 2015,
          title: ".NET Microservices: Architecture for Containerized .NET Applications",
          publisher: "Microsoft Press"
        }
      ]
    }
  ];

  // Get translations or fallback to default text
  const referencesTitle = title || dictionary?.caseStudy?.references || "References";
  const clickToView = dictionary?.caseStudy?.clickToViewReferences || "Click to view the complete list of references that informed this work.";
  const architectureCategory = dictionary?.caseStudy?.architectureCategory || "Architecture & Design";
  const developmentCategory = dictionary?.caseStudy?.developmentCategory || "Software Development Process";
  const resilienceCategory = dictionary?.caseStudy?.resilienceCategory || "Resilience & DevOps";
  const methodologiesCategory = dictionary?.caseStudy?.methodologiesCategory || "Methodologies & Best Practices";
  const footerText = dictionary?.caseStudy?.referencesFooter || "These references represent the academic and professional foundations of the methodologies, patterns, and approaches demonstrated in the case study and throughout this portfolio.";

  // Map category names to their translations
  const categoryTranslations: Record<string, string> = {
    "Architecture & Design": architectureCategory,
    "Software Development Process": developmentCategory,
    "Resilience & DevOps": resilienceCategory,
    "Methodologies & Best Practices": methodologiesCategory
  };

  return (
    <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 transition-all duration-200 hover:shadow-xl">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
          {referencesTitle}
        </h3>
        {isExpanded ? 
          <ChevronDown className="w-5 h-5 text-gray-600" /> : 
          <ChevronRight className="w-5 h-5 text-gray-600" />
        }
      </div>

      {!isExpanded && (
        <p className="mt-2 text-gray-600 text-sm italic">
          {clickToView}
        </p>
      )}
      
      {isExpanded && (
        <div className="mt-4 space-y-6">
          {references.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="font-medium text-indigo-600 mb-3">
                {categoryTranslations[category.category] || category.category}
              </h4>
              <ul className="space-y-2">
                {category.items.map((reference, refIndex) => (
                  <li key={refIndex} className="text-gray-700">
                    {reference.author} {reference.year ? `(${reference.year})` : ''}.{" "}
                    <span className="italic">{reference.title}</span>.{" "}
                    {reference.publisher}.
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="pt-4 text-sm text-gray-600 border-t border-gray-200 mt-8">
            <p>{footerText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteReferences;