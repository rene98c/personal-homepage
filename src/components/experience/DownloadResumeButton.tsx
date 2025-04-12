'use client';

import React from 'react';
import { FileDown } from 'lucide-react';

export const DownloadResumeButton = () => {
  // Function to generate more comprehensive resume data
  const generateResumeData = () => {
    // Content for the resume - structured as plain text with all the new information
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
• .NET on windows/linux, web APIs, entity framework, nHibernate
• Implemented test-driven design and domain-driven design principles
• Worked with Docker, PostgreSQL, MSSQL, and React

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

EDUCATION

Estonian University of Life Sciences (2001 - 2003)
Rural Building (Maaehitus)
• Studied rural building engineering (program not completed)

Tartu Tamme Gümnaasium (1998 - 2001)
Secondary Education
• Completed secondary education with focus on sciences and mathematics

CERTIFICATIONS

• Developing and Implementing Web Applications with Microsoft Visual C# .NET (Microsoft, 2006)
• Designing and Implementing Databases with Microsoft SQL Server 2000 Enterprise Edition (Microsoft, 2006)
• Developing XML Web Services and Server Components with Microsoft Visual C# .NET (Microsoft, 2006)
• MOC#2273 Designing IT Managing and Maintaining a Microsoft Windows Server 2003 Environment (BCS Koolituse AS, 2005)
• Enterasys ESE Network Specialist Fastrack (TELEGRUPP, 2005)

TECHNICAL SKILLS

Programming Languages:
• C#, JavaScript, HTML, CSS, SQL, JAVA, Bash

Frameworks & Libraries:
• .NET, ASP.NET MVC, Entity Framework, nHibernate, React, Bootstrap, next.js, Node.js

Databases:
• Microsoft SQL Server, PostgreSQL, Oracle SQL

Cloud & Infrastructure:
• Docker, Google Cloud, Digital Ocean, Proxmox, Virtualization, Hyper-V

Tools & Environments:
• Visual Studio, Visual Studio Code, Android Studio, Git, Subversion, IIS, NGINX, REST API

Languages:
• Estonian (Native)
• English (Professional)

PERSONAL PROJECTS

Homelab Infrastructure
• Three-node high-availability Proxmox VE cluster with seamless service migration
• Virtualized desktop with GPU passthrough for near-bare-metal performance
• OPNsense virtualized router with VLANs and advanced networking features
• Self-hosted services including email, git repositories, and personal cloud storage

For more details and portfolio: https://reneprost.ee
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
    <button
      onClick={downloadResume}
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:-translate-y-1"
    >
      <FileDown className="mr-2 h-5 w-5" />
      Download Resume (Text)
    </button>
  );
};

export default DownloadResumeButton;