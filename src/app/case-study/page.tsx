import React from 'react';
import { PhaseSection } from '@/components/case-study/PhaseSection'; 
import CompleteReferences from '@/components/case-study/CompleteReferences';

// Import data from data directory
import { projectOverview } from '@/data/case-study/project-overview';
import { phases } from '@/data/case-study/phases';
import { distinctiveAspects } from '@/data/case-study/distinctive-aspects';
import { lessonsLearned } from '@/data/case-study/lessons-learned';
import { conclusion } from '@/data/case-study/conclusion-references';

// CaseStudyPage Component
const CaseStudyPage = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">Case Study</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {projectOverview.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {projectOverview.subtitle}
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
                Case Study: Building SecureAccess
              </h3>
              <p className="text-gray-700 mb-6 italic font-medium">
                A mission-critical access control system integrating biometrics, physical gates, and permissions — built in 15 days.
              </p>
              
              <h4 className="font-medium text-gray-800 mb-2">The Challenge</h4>
              <p className="text-gray-700 mb-4">
                A client needed a robust, fault-tolerant access control system that integrated biometric verification, physical gate control, and a permission service. The catch?
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-1 text-gray-700">
                <li>The hardware wasn&apos;t available during early development.</li>
                <li>The system had to be operational within a month.</li>
                <li>Under normal circumstances, i would have estimated minimum 2 months to complete the project.</li>
                <li>It needed to be resilient, auditable, and manually overridable — suitable for high-security environments.</li>
                <li>There was no room for brittle code, guesswork, or integration surprises.</li>
              </ul>
              
              <h4 className="font-medium text-gray-800 mb-2">The Approach</h4>
              <p className="text-gray-700 mb-6">
                I led the project from scratch, applying a domain-first design strategy and Clean Architecture principles. The system was built in 6 structured phases, each focused on a different layer of stability: from domain modeling, to resilience patterns, to scenario testing tools.
              </p>
              <p className="text-gray-700 mb-6">
                The result was a fully testable, production-ready system that could run end-to-end — including simulated physical hardware — before the real devices ever arrived.
              </p>
              
              <h4 className="font-medium text-gray-800 mb-2">Outcome Highlights</h4>
              <ul className="list-disc pl-8 mb-3 space-y-1 text-gray-700">
                <li>Delivered on time with 100% functional coverage.</li>
                <li>Handled critical and non-critical failures with explicit retry and fallback policies.</li>
                <li>Enabled scenario-based testing through a custom-built interactive tool.</li>
              </ul>
            </div>
            
            {/* Executive Summary */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Executive Summary</h3>
              {projectOverview.executiveSummary.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* Project Overview */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Project Overview</h3>
              
              <h4 className="font-medium text-gray-800 mb-2">System Context</h4>
              <p className="text-gray-700 mb-4">
                {projectOverview.systemContext.description}
              </p>
              
              <div className="pl-4 border-l-4 border-indigo-500 mb-6">
                <ol className="list-decimal pl-5 space-y-2">
                  {projectOverview.systemContext.steps.map((step, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{step.title}:</span> {step.description}
                    </li>
                  ))}
                </ol>
              </div>
              
              <p className="text-gray-700 mb-4">
                {projectOverview.systemContext.integration}
              </p>
              
              <h4 className="font-medium text-gray-800 mb-2">Development Timeline</h4>
              <p className="text-gray-700">
                {projectOverview.developmentTimeline.description}
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b border-gray-300 pb-2">The Methodical Approach: Step-by-Step (15 Days Total)</h3>
            
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
              />
            ))}
            
            {/* Distinctive Aspects */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-6 mb-8 transition-all duration-200 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Distinctive Aspects and Innovations</h3>
              
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
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Lessons Learned and Best Practices</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Key Success Factors</h4>
                <ol className="list-decimal pl-10 space-y-2">
                  {lessonsLearned.successFactors.map((factor, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{factor.title}:</span> {factor.description}
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Challenges and Solutions</h4>
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
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Conclusion</h3>
              {conclusion.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Complete References Section */}
            <CompleteReferences />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;