'use client';

import React, { useState, useEffect } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import { PhaseSection } from '@/components/case-study/PhaseSection'; 
import CompleteReferences from '@/components/case-study/CompleteReferences';

// Import data from data directory
import { projectOverview } from '@/data/case-study/project-overview';
import { phases } from '@/data/case-study/phases';
import { distinctiveAspects } from '@/data/case-study/distinctive-aspects';
import { lessonsLearned } from '@/data/case-study/lessons-learned';
import { conclusion } from '@/data/case-study/conclusion-references';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

// CaseStudyContent Component
const CaseStudyContent = ({ 
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
  const caseStudyTitle = dictionary?.caseStudy?.title || "Case Study";
  const methodicalApproachTitle = dictionary?.caseStudy?.methodicalApproach || "The Methodical Approach: Step-by-Step (15 Days Total)";
  const distinctiveAspectsTitle = dictionary?.caseStudy?.distinctiveAspects || "Distinctive Aspects and Innovations";
  const lessonsLearnedTitle = dictionary?.caseStudy?.lessonsLearned || "Lessons Learned and Best Practices";
  const successFactorsTitle = dictionary?.caseStudy?.successFactors || "Key Success Factors";
  const challengesTitle = dictionary?.caseStudy?.challenges || "Challenges and Solutions";
  const conclusionTitle = dictionary?.caseStudy?.conclusion || "Conclusion";
  const referencesTitle = dictionary?.caseStudy?.references || "References";
  const executiveSummaryTitle = dictionary?.caseStudy?.executiveSummaryTitle || "Executive Summary";
  const projectOverviewTitle = dictionary?.caseStudy?.projectOverviewTitle || "Project Overview";
  const systemContextTitle = dictionary?.caseStudy?.systemContextTitle || "System Context";
  const systemContextIntegration = dictionary?.caseStudy?.systemContextIntegration || 
    "The system integrates with industry-standard biometric verification systems, permission management services, and hardware controllers for physical gates and sensors.";
  const developmentTimelineTitle = dictionary?.caseStudy?.developmentTimelineTitle || "Development Timeline";
  const developmentTimelineDescription = dictionary?.caseStudy?.developmentTimelineDescription || 
    "The system was developed over approximately 15 days with distinct phases reflecting my methodical approach to building complex systems. Each phase built upon the foundation of the previous one, resulting in a comprehensive solution delivered efficiently.";
  const buildingSecureAccess = dictionary?.caseStudy?.buildingSecureAccess || "Building Mission-Critical Access Control System";
  const missionCriticalSubtitle = dictionary?.caseStudy?.missionCriticalSubtitle || 
    "A detailed case study of SecureAccess - a mission-critical software system integrating biometric verification, access control, and permission systems to secure facility entrances.";
  const challengeTitle = dictionary?.caseStudy?.challengeTitle || "The Challenge";
  const outcomeHighlightsTitle = dictionary?.caseStudy?.outcomeHighlightsTitle || "Outcome Highlights";

  // Translate steps based on available dictionary entries
  const translatedSteps = projectOverview.systemContext.steps.map(step => {
    const titleKey = step.title.toLowerCase().replace(/\s/g, '');
    const descKey = titleKey + 'Desc';
    
    return {
      title: dictionary?.caseStudy?.[titleKey] || step.title,
      description: dictionary?.caseStudy?.[descKey] || step.description
    };
  });

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-base font-semibold leading-7 text-indigo-600 animate-pulse">
            <div className="h-5 w-24 bg-indigo-100 rounded mx-auto"></div>
          </div>
          <div className="mt-2 h-8 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="mt-6 h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="mt-2 h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">{caseStudyTitle}</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {buildingSecureAccess}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {missionCriticalSubtitle}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* New Introduction Block */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b border-gray-200 pb-2">
                {caseStudyTitle}: {buildingSecureAccess}
              </h3>
              <p className="text-gray-700 mb-6 italic font-medium">
                A mission-critical access control system integrating biometrics, physical gates, and permissions — built in 15 days.
              </p>
              
              <h4 className="font-medium text-gray-800 mb-2">{challengeTitle}</h4>
              <p className="text-gray-700 mb-4">
                A client needed a robust, fault-tolerant access control system that integrated biometric verification, physical gate control, and a permission service. The catch?
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-1 text-gray-700">
                <li>The hardware wasn&apos;t available during early development.</li>
                <li>The project complexity warranted a 2-month development cycle, but client requirements demanded completion in just 4 weeks.</li>
                <li>It needed to be resilient, auditable, and manually overridable — suitable for high-security environments.</li>
                <li>There was no room for brittle code, guesswork, or integration surprises.</li>
              </ul>
              
              <h4 className="font-medium text-gray-800 mb-2">{dictionary?.caseStudy?.approach || "Approach"}</h4>
              <p className="text-gray-700 mb-6">
                I led the project from scratch, applying a domain-first design strategy and Clean Architecture principles. The system was built in 6 structured phases, each focused on a different layer of stability: from domain modeling, to resilience patterns, to scenario testing tools.
              </p>
              <p className="text-gray-700 mb-6">
                The result was a fully testable, production-ready system that could run end-to-end — including simulated physical hardware — before the real devices ever arrived.
              </p>
              
              <h4 className="font-medium text-gray-800 mb-2">{outcomeHighlightsTitle}</h4>
              <ul className="list-disc pl-8 mb-3 space-y-1 text-gray-700">
                <li>Delivered on time with 100% functional coverage.</li>
                <li>Handled critical and non-critical failures with explicit retry and fallback policies.</li>
                <li>Enabled scenario-based testing through a custom-built interactive tool.</li>
              </ul>
            </div>
            
            {/* Executive Summary */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">{executiveSummaryTitle}</h3>
              {projectOverview.executiveSummary.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* Project Overview */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">{projectOverviewTitle}</h3>
              
              <h4 className="font-medium text-gray-800 mb-2">{systemContextTitle}</h4>
              <p className="text-gray-700 mb-4">
                {projectOverview.systemContext.description}
              </p>
              
              <div className="pl-4 border-l-4 border-indigo-500 mb-6">
                <ol className="list-decimal pl-5 space-y-2">
                  {translatedSteps.map((step, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{step.title}:</span> {step.description}
                    </li>
                  ))}
                </ol>
              </div>
              
              <p className="text-gray-700 mb-4">
                {systemContextIntegration}
              </p>
              
              <h4 className="font-medium text-gray-800 mb-2">{developmentTimelineTitle}</h4>
              <p className="text-gray-700">
                {developmentTimelineDescription}
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b border-gray-300 pb-2">{methodicalApproachTitle}</h3>
            
            {/* Phase Sections */}
            {phases.map((phase, index) => (
              <PhaseSection 
                key={index}
                number={phase.number}
                title={phase.title}
                approach={phase.approach}
                steps={phase.steps}
                results={phase.results}
                codeSnippet={phase.codeSnippet}
                lang={lang}
              />
            ))}
            
            {/* Distinctive Aspects */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">{distinctiveAspectsTitle}</h3>
              
              <div className="space-y-4">
                {distinctiveAspects.map((aspect) => (
                  <div key={aspect.number}>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-2">{aspect.number}</div>
                      {aspect.title}
                    </h4>
                    <p className="text-gray-700">
                      {aspect.description}
                    </p>
                    {aspect.details && (
                      <ul className="list-disc pl-10 mt-2 space-y-1">
                        {aspect.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-gray-700">
                            <span className="font-medium">{detail.title}:</span> {detail.description}
                          </li>
                        ))}
                      </ul>
                    )}
                    {aspect.conclusion && (
                      <p className="text-gray-700 mt-2">
                        {aspect.conclusion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Lessons Learned */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">{lessonsLearnedTitle}</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">{successFactorsTitle}</h4>
                <ol className="list-decimal pl-10 space-y-2">
                  {lessonsLearned.successFactors.map((factor, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{factor.title}:</span> {factor.description}
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">{challengesTitle}</h4>
                <div className="space-y-4">
                  {lessonsLearned.challenges.map((item, index) => (
                    <div key={index}>
                      <p className="text-gray-700">
                        <span className="font-medium">Challenge:</span> {item.challenge}
                      </p>
                      <p className="text-gray-700 pl-6">
                        <span className="font-medium">Solution:</span> {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Conclusion */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">{conclusionTitle}</h3>
              {conclusion.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Complete References Section */}
            <CompleteReferences lang={lang} title={referencesTitle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyContent;