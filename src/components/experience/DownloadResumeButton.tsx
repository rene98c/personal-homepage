'use client';

import React from 'react';
import { FileDown } from 'lucide-react';

const DownloadResumeButton = () => {
  // Function to generate PDF resume data
  const generateResumeData = () => {
    // This is a simplified approach - for a real implementation, 
    // you would use a pre-generated PDF file stored in your public folder
    
    // Content for the resume - structured as plain text
    const resumeContent = `
RENE PROST
C#/.NET Developer with 20+ Years Experience
rene@bdec.ee | Based near Tartu, Estonia

PROFESSIONAL EXPERIENCE

.NET Software Developer
Connected OÜ
January 2023 - June 2024
• Developed and maintained enterprise-level .NET desktop application

.NET Software Developer
Fujitsu Estonia AS
October 2019 - January 2023
• Designed and maintained various software systems

.NET Software Developer
Centre of Registers and Information Systems
April 2017 - September 2019
• Developed secure, scalable systems for government information management

.NET Software Developer
Uptime OÜ / Turnit OÜ
November 2012 - February 2017
• Built robust web applications and services using .NET technologies
• Implemented frontend solutions using various JavaScript frameworks
• Designed and optimized database schemas and queries
• Participated in full software development lifecycle from requirements to deployment

.NET Software Developer
Centre of Registers and Information Systems
January 2008 - November 2012
• Developed and maintained critical government information systems

.NET Software Developer
Softronic Baltic AS / Center of Registers and Information Systems
December 2005 - December 2007
• Developed .NET web applications and services
• Implemented business logic and database integration
• Created user interfaces following best practices
• Participated in requirements analysis and system design
• Collaborated in agile development processes

IT Specialist
Estonian Air Force
April 2004 - November 2005
• Maintained PC hardware, software, and network infrastructure
• Provided technical support and troubleshooting
• Implemented and configured software systems
• Ensured security and reliability of IT infrastructure
• Documented technical procedures and system configurations

SKILLS & EXPERTISE

Programming & Technologies:
• C# / .NET Core
• Web Services / Web APIs
• SQL (Microsoft SQL Server, PostgreSQL)
• Front-end technologies (React, Angular)
• Cloud services (AWS, Azure)
• Database Design & Optimization

Methodologies & Practices:
• Clean Architecture
• Design Patterns
• Domain-Driven Design
• Test-Driven Development
• Resilience Engineering
• SOLID Principles
`;

    return resumeContent;
  };

  // Function to trigger download of text file
  const downloadResume = () => {
    const resumeData = generateResumeData();
    const blob = new Blob([resumeData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rene_Prost_Resume.txt';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <button
        onClick={downloadResume}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:-translate-y-1"
      >
        <FileDown className="mr-2 h-5 w-5" />
        Download Resume
      </button>
      <p className="mt-2 text-sm text-gray-500">Get a plain text version of my professional experience</p>
    </div>
  );
};

// Enhanced Experience Page Component with Download Button
const EnhancedExperienceSection = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
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
          
          {/* Add the download resume button */}
          <DownloadResumeButton />
        </div>
        
        {/* Rest of your experience timeline would go here */}
      </div>
    </div>
  );
};

export default EnhancedExperienceSection;
export { DownloadResumeButton };