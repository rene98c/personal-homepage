'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { DownloadResumeButton } from '@/components/experience/DownloadResumeButton';
import PDFResumeButton from '@/components/experience/PDFResumeButton';
import ExpandedSkillsSection from '@/components/experience/ExpandedSkillsSection';
import CertificationsSection from '@/components/experience/CertificationsSection';
import EducationSection from '@/components/experience/EducationSection';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};

// Timeline component for work experience
const ExperienceTimeline = ({ 
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

  const experiences = [
    {
      title: '.NET Software Developer',
      company: 'Connected OÜ',
      period: 'January 2023 - June 2024',
      responsibilities: [
        "Developed and maintained enterprise-level .NET desktop application",
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Fujitsu Estonia AS',
      period: 'October 2019 - January 2023',
      responsibilities: [
        "Designed and maintained various software systems",
        ".NET on windows/linux, web APIs, entity framework, nHibernate",
        "Implemented test-driven design and domain-driven design principles",
        "Worked with Docker, PostgreSQL, MSSQL, and React"
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Centre of Registers and Information Systems',
      period: 'April 2017 - September 2019',
      responsibilities: [
        "Developed secure, scalable systems for government information management"
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Uptime OÜ / Turnit OÜ',
      period: 'November 2012 - February 2017',
      responsibilities: [
        "Built robust web applications and services using .NET technologies",
        "Implemented frontend solutions using various JavaScript frameworks",
        "Designed and optimized database schemas and queries",
        "Participated in full software development lifecycle from requirements to deployment"
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Centre of Registers and Information Systems',
      period: 'January 2008 - November 2012',
      responsibilities: [
        "Developed and maintained critical government information systems"
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Softronic Baltic AS / Center of Registers and Information Systems',
      period: 'December 2005 - December 2007',
      responsibilities: [
        "Developed .NET web applications and services",
        "Implemented business logic and database integration",
        "Created user interfaces following best practices",
        "Participated in requirements analysis and system design",
        "Collaborated in agile development processes"
      ]
    },
    {
      title: 'IT Specialist',
      company: 'Estonian Air Force',
      period: 'April 2004 - November 2005',
      responsibilities: [
        "Maintained PC hardware, software, and network infrastructure",
        "Provided technical support and troubleshooting",
        "Implemented and configured software systems",
        "Ensured security and reliability of IT infrastructure",
        "Documented technical procedures and system configurations"
      ]
    }
  ];

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
            <div className="mt-4 animate-pulse h-8 w-64 bg-gray-200 rounded"></div>
            <div className="mt-6 animate-pulse h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get translations or fallback to default text
  const experienceTitle = dictionary?.experience?.title || "Experience";
  const journeyTitle = dictionary?.experience?.journeyTitle || "Professional Journey";
  const journeyDesc = dictionary?.experience?.description || "With over 20 years of software development experience, I've worked across a variety of industries and projects, consistently delivering robust, well-designed solutions. My career has focused on .NET development since 2003, with expertise in building web services, backend systems, and user interfaces.";

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{experienceTitle}</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {journeyTitle}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {journeyDesc}
            </p>
            
            {/* Resume Download Section */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadResumeButton />
              <PDFResumeButton />
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-16 flex gap-x-4 sm:gap-x-8">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-indigo-600 shadow-md">
                  <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex-auto">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {exp.title} at {exp.company}
                    </h3>
                    <p className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1.5 h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
                      {exp.period}
                    </p>
                  </div>
                  <div className="mt-4 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="mt-2 space-y-1">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex gap-x-2">
                          <CheckCircle className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                          <span className="text-gray-600">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* New sections from the CV */}
      <ExpandedSkillsSection lang={lang} />
      <CertificationsSection lang={lang} />
      <EducationSection lang={lang} />
    </>
  );
};

export default ExperienceTimeline;