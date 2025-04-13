'use client';

import React, { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

const PDFResumeButton = ({ lang }: { lang: Locale }) => {
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);

  // Load the dictionary
  useEffect(() => {
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
  
  // Function to generate PDF resume with all the expanded information
  const generatePDFResume = () => {
    const doc = new jsPDF();
    
    // Set up document properties
    doc.setProperties({
      title: 'Rene Prost - Resume',
      subject: 'Professional Resume',
      author: 'Rene Prost',
      creator: 'Rene Prost Portfolio Website'
    });
    
    // Add content to PDF
    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('RENE PROST', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('C#/.NET Developer with 20+ Years Experience', 105, 30, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('rene@bdec.ee | Based near Tartu, Estonia', 105, 38, { align: 'center' });
    
    // Section: Professional Experience
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFESSIONAL EXPERIENCE', 20, 50);
    doc.line(20, 52, 190, 52);
    
    // Function to add job entry
    const addJobEntry = (title: string, company: string, period: string, duties: string[], yPos: number) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 20, yPos);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(company, 20, yPos + 6);
      
      doc.setFont('helvetica', 'normal');
      doc.text(period, 20, yPos + 12);
      
      doc.setFontSize(10);
      let bulletY = yPos + 18;
      
      duties.forEach(duty => {
        doc.text('• ' + duty, 25, bulletY);
        bulletY += 5;
      });
      
      return bulletY + 2; // Return the new Y position after this entry
    };


    
    // Add job entries with expanded details
    let yPosition = 60;
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Connected OÜ', 
      'January 2023 - June 2024',
      ['Developed and maintained enterprise-level .NET desktop application'],
      yPosition
    );
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Fujitsu Estonia AS', 
      'October 2019 - January 2023',
      [
        'Designed and maintained various software systems',
        '.NET on windows/linux, web APIs, entity framework, nHibernate',
        'Implemented test-driven design and domain-driven design principles',
        'Worked with Docker, PostgreSQL, MSSQL, and React'
      ],
      yPosition
    );
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Centre of Registers and Information Systems', 
      'April 2017 - September 2019',
      ['Developed secure, scalable systems for government information management'],
      yPosition
    );
    
    // Add additional page for more experience
    if (yPosition > 210) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Uptime OÜ / Turnit OÜ', 
      'November 2012 - February 2017',
      [
        'Built robust web applications and services using .NET technologies',
        'Implemented frontend solutions using various JavaScript frameworks',
        'Designed and optimized database schemas and queries',
        'Participated in full software development lifecycle'
      ],
      yPosition
    );
    
    // Add additional page for more experience
    if (yPosition > 210) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Centre of Registers and Information Systems', 
      'January 2008 - November 2012',
      ['Developed and maintained critical government information systems'],
      yPosition
    );
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Softronic Baltic AS / Centre of Registers and Information Systems', 
      'December 2005 - December 2007',
      [
        'Developed .NET web applications and services',
        'Implemented business logic and database integration',
        'Participated in requirements analysis and system design'
      ],
      yPosition
    );
    
    yPosition = addJobEntry(
      'IT Specialist', 
      'Estonian Air Force', 
      'April 2004 - November 2005',
      [
        'Maintained PC hardware, software, and network infrastructure',
        'Provided technical support and troubleshooting',
        'Ensured security and reliability of IT infrastructure'
      ],
      yPosition
    );
    
    // Add Educational Background to a new page
    doc.addPage();
    yPosition = 20;
    
    // Education Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    // Function to add education entry
    const addEducationEntry = (institution: string, degree: string, years: string, details: string, yPos: number) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(institution, 20, yPos);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(degree, 20, yPos + 6);
      
      doc.setFont('helvetica', 'normal');
      doc.text(years, 20, yPos + 12);
      
      doc.setFontSize(10);
      doc.text(details, 25, yPos + 18);
      
      return yPos + 24; // Return new position
    };
    
    yPosition = addEducationEntry(
      'Estonian University of Life Sciences',
      'Rural Building (Maaehitus)',
      '2001 - 2003',
      '• Studied rural building engineering (program not completed)',
      yPosition
    );
    
    yPosition = addEducationEntry(
      'Tartu Tamme Gümnaasium',
      'Secondary Education',
      '1998 - 2001',
      '• Completed secondary education with focus on sciences and mathematics',
      yPosition
    );
    
    // Certifications Section
    yPosition += 6;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATIONS', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const certifications = [
      'Developing and Implementing Web Applications with Microsoft Visual C# .NET (Microsoft, 2006)',
      'Designing and Implementing Databases with Microsoft SQL Server 2000 Enterprise Edition (Microsoft, 2006)',
      'Developing XML Web Services and Server Components with Microsoft Visual C# .NET (Microsoft, 2006)',
      'MOC#2273 Designing IT Managing and Maintaining a Microsoft Windows Server 2003 Environment (2005)',
      'Enterasys ESE Network Specialist Fastrack (TELEGRUPP, 2005)'
    ];
    
    certifications.forEach(cert => {
      doc.text('• ' + cert, 25, yPosition);
      yPosition += 5;
    });
    
    // Skills Section
    yPosition += 6;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TECHNICAL SKILLS', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    // Function to add skill category
    const addSkillCategory = (category: string, skills: string, yPos: number) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(category + ':', 20, yPos);
      yPos += 6;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('• ' + skills, 25, yPos);
      
      return yPos + 8;
    };
    
    yPosition = addSkillCategory(
      'Programming Languages',
      'C#, JavaScript, HTML, CSS, SQL, JAVA, Bash',
      yPosition
    );
    
    yPosition = addSkillCategory(
      'Frameworks & Libraries',
      '.NET, ASP.NET MVC, Entity Framework, nHibernate, React, Bootstrap, next.js, Node.js',
      yPosition
    );
    
    yPosition = addSkillCategory(
      'Databases',
      'Microsoft SQL Server, PostgreSQL, Oracle SQL',
      yPosition
    );
    
    yPosition = addSkillCategory(
      'Cloud & Infrastructure',
      'Docker, Google Cloud, Digital Ocean, Proxmox, Virtualization, Hyper-V',
      yPosition
    );
    
    yPosition = addSkillCategory(
      'Tools & Environments',
      'Visual Studio, Visual Studio Code, Android Studio, Git, Subversion, IIS, NGINX, REST API',
      yPosition
    );
    
    yPosition = addSkillCategory(
      'Languages',
      'Estonian (Native), English (Professional)',
      yPosition
    );
    
    // Personal Projects Section
    yPosition += 6;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL PROJECTS', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Homelab Infrastructure', 20, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const homelabDetails = [
      'Three-node high-availability Proxmox VE cluster with seamless service migration',
      'Virtualized desktop with GPU passthrough for near-bare-metal performance',
      'OPNsense virtualized router with VLANs and advanced networking features',
      'Self-hosted services including email, git repositories, and personal cloud storage'
    ];
    
    homelabDetails.forEach(detail => {
      doc.text('• ' + detail, 25, yPosition);
      yPosition += 5;
    });
    
    // Add footer with website and date
    // Use a more reliable approach for page count
    // @ts-expect-error - Method exists at runtime but TypeScript doesn't recognize it
    const pageCount = doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `reneprost.ee | Generated on ${new Date().toLocaleDateString()}`,
        105,
        285,
        { align: 'center' }
      );
      doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
    }
    
    // Save the PDF
    doc.save('Rene_Prost_Resume.pdf');
  };

  // Get translation or use fallback
  const buttonText = dictionary?.experience?.downloadResumePDF || "Download Resume (PDF)";

  return (
    <button
      onClick={generatePDFResume}
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:-translate-y-1"
    >
      <FileDown className="mr-2 h-5 w-5" />
      {buttonText}
    </button>
  );
};

export default PDFResumeButton;