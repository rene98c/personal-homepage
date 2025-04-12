import React from 'react';
import { Calendar, Briefcase, CheckCircle } from 'lucide-react';

// Timeline component (inspired by examplestwui_timeline.js)
const ExperienceTimeline = () => {
  const experiences = [
    {
      title: '.NET Software Developer',
      company: 'Connected OÜ',
      period: 'January 2023 - June 2024',
      responsibilities: [
        "Developed and maintained enterprise-level .NET applications",
        "Designed and implemented clean architecture solutions",
        "Created robust, resilient systems with comprehensive testing",
        "Collaborated with cross-functional teams to deliver high-quality software"
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Fujitsu Estonia AS',
      period: 'October 2019 - January 2023',
      responsibilities: [
        "Designed and implemented various software systems",
        "Created resilient, maintainable code with a focus on design patterns",
        "Developed backend services and APIs for enterprise applications",
        "Implemented comprehensive testing strategies"
      ]
    },
    {
      title: '.NET Software Developer',
      company: 'Centre of Registers and Information Systems',
      period: 'April 2017 - September 2019',
      responsibilities: [
        "Developed secure, scalable systems for government information management",
        "Implemented robust data processing systems with high reliability requirements",
        "Created clean, maintainable code with comprehensive unit and integration tests",
        "Collaborated with stakeholders to ensure solutions met specific requirements"
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
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Experience</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Professional Journey
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With over 20 years of software development experience, I&apos;ve worked across a variety of industries and projects,
            consistently delivering robust, well-designed solutions. My career has focused on .NET development since 2003,
            with expertise in building web services, backend systems, and user interfaces.
          </p>
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

        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Earlier Experience</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Prior to 2012, I worked in various roles that built the foundation for my software development career,
              including positions at the Centre of Registers and Information Systems (2008-2012), Softronic Baltic AS (2005-2007),
              and as an IT Specialist in the Estonian Air Force (2004-2005).
            </p>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Skills & Expertise</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Throughout my career, I&apos;ve developed expertise in a wide range of technologies and methodologies.
              Here are some of the key skills I&apos;ve mastered:
            </p>
            
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Programming & Technologies</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">C# / .NET Core</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Web Services / Web APIs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">SQL (Microsoft SQL Server, PostgreSQL)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Front-end technologies (React, Angular)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Cloud services (AWS, Azure)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Methodologies & Practices</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Clean Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Design Patterns</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Domain-Driven Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Test-Driven Development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Resilience Engineering</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;