import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';

interface JobExperienceProps {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

// Job Experience Component
const JobExperience = ({ title, company, period, responsibilities }: JobExperienceProps) => {
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <div className="flex items-center text-slate-600 mt-1">
            <Briefcase size={16} className="mr-2" />
            <span>{company}</span>
          </div>
        </div>
        <div className="flex items-center text-slate-600 mt-2 md:mt-0">
          <Calendar size={16} className="mr-2" />
          <span>{period}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium text-slate-700 mb-2">Key Responsibilities:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {responsibilities.map((responsibility: string, index: number) => (
            <li key={index} className="text-slate-600">{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-2">Professional Experience</h2>
    
    <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
      <p className="text-slate-700 mb-4">
        With over 20 years of software development experience, I&apos;ve worked across a variety of industries and projects,
        consistently delivering robust, well-designed solutions. My career has focused on .NET development since 2003,
        with expertise in building web services, backend systems, and user interfaces.
      </p>
    </div>
    
    <div className="space-y-6">
      <JobExperience 
        title=".NET Software Developer"
        company="Connected OÜ"
        period="January 2023 - June 2024"
        responsibilities={[
          "Developed and maintained enterprise-level .NET application"
        ]}
      />
      
      <JobExperience 
        title=".NET Software Developer"
        company="Fujitsu Estonia AS"
        period="October 2019 - January 2023"
        responsibilities={[
          "Designed and implemented various software systems"
        ]}
      />
      
      <JobExperience 
        title=".NET Software Developer"
        company="Centre of Registers and Information Systems"
        period="April 2017 - September 2019"
        responsibilities={[
          "Developed secure, scalable systems for government information management",
        ]}
      />
      
      <JobExperience 
        title=".NET Software Developer"
        company="Uptime OÜ / Turnit OÜ"
        period="November 2012 - February 2017"
        responsibilities={[
          "Built robust web applications and services using .NET technologies",
          "Implemented frontend solutions using various JavaScript frameworks",
          "Designed and optimized database schemas and queries",
          "Participated in full software development lifecycle from requirements to deployment"
        ]}
      />
      
      <JobExperience 
        title=".NET Software Developer"
        company="Centre of Registers and Information Systems"
        period="January 2008 - November 2012"
        responsibilities={[
          "Developed and maintained critical government information systems",
          "Collaborated on system architecture and technical specifications"
        ]}
      />
      
      <JobExperience 
        title=".NET Software Developer"
        company="Softronic Baltic AS / Center of Registers and Information Systems"
        period="December 2005 - December 2007"
        responsibilities={[
          "Developed .NET web applications and services",
          "Implemented business logic and database integration",
          "Created user interfaces following best practices",
          "Participated in requirements analysis and system design"
        ]}
      />
      
      <JobExperience 
        title="IT Specialist"
        company="Estonian Air Force"
        period="April 2004 - November 2005"
        responsibilities={[
          "Maintained PC hardware, software, and network infrastructure",
          "Provided technical support and troubleshooting",
          "Implemented and configured software systems",
          "Ensured security and reliability of IT infrastructure"
        ]}
      />
    </div>
  </div>
  );
} 