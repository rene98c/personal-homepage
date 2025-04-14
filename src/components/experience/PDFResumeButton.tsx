'use client';

import React, { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Define experience types
interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

const PDFResumeButton = ({ 
  lang, 
  experiences 
}: { 
  lang: Locale;
  experiences: Experience[];
}) => {
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [, setIsLoading] = useState(true);

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

  // Function to localize month names in date ranges
  const localizeDate = (dateStr: string): string => {
    if (!dictionary?.common?.months) return dateStr;
    
    // Match month names in the date string
    return dateStr.replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/g, 
      (match) => {
        const translatedMonth = dictionary.common.months[match];
        return translatedMonth || match;
      }
    );
  };
  
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
    
    // Add localized content based on language
    if (lang === 'et' && dictionary) {
      generateEstonianPDF(doc);
    } else {
      generateEnglishPDF(doc);
    }
    
    // Save the PDF
    doc.save('Rene_Prost_Resume.pdf');
  };

  // Generate English PDF resume
  const generateEnglishPDF = (doc: jsPDF) => {
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
    const addJobEntry = (exp: Experience, yPos: number) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.title, 20, yPos);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(exp.company, 20, yPos + 6);
      
      doc.setFont('helvetica', 'normal');
      doc.text(exp.period, 20, yPos + 12);
      
      doc.setFontSize(10);
      let bulletY = yPos + 18;
      
      exp.responsibilities.forEach(duty => {
        doc.text('• ' + duty, 25, bulletY);
        bulletY += 5;
      });
      
      return bulletY + 2; // Return the new Y position after this entry
    };

    // Add job entries with data from the experiences prop
    let yPosition = 60;
    
    for (let i = 0; i < experiences.length; i++) {
      yPosition = addJobEntry(experiences[i], yPosition);
      
      // Add additional page if needed
      if (yPosition > 250 && i < experiences.length - 1) {
        doc.addPage();
        yPosition = 20;
      }
    }
    
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
      'MOC#2273 Designing IT Managing and Maintaining a Microsoft Windows Server 2003 Environment (BCS Koolituse AS, 2005)',
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
    const pageCount = doc.getNumberOfPages();
    
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
  };

  // Generate Estonian PDF resume
  const generateEstonianPDF = (doc: jsPDF) => {
    
    const skillCategories = dictionary?.skills?.categories || {};
    const languageLevels = dictionary?.skills?.languageLevels || {};

    // Add content to PDF
    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('RENE PROST', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('C#/.NET Arendaja 20+ aasta kogemusega', 105, 30, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('rene@bdec.ee | Tartu lähistel, Eesti', 105, 38, { align: 'center' });
    
    // Section: Professional Experience
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TÖÖKOGEMUS', 20, 50);
    doc.line(20, 52, 190, 52);
    
    // Function to add job entry
    const addJobEntry = (exp: Experience, yPos: number) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.title, 20, yPos);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(exp.company, 20, yPos + 6);
      
      doc.setFont('helvetica', 'normal');
      doc.text(localizeDate(exp.period), 20, yPos + 12);
      
      doc.setFontSize(10);
      let bulletY = yPos + 18;
      
      exp.responsibilities.forEach(duty => {
        doc.text('• ' + duty, 25, bulletY);
        bulletY += 5;
      });
      
      return bulletY + 2; // Return the new Y position after this entry
    };

    // Add job entries from the experiences prop
    let yPosition = 60;
    
    for (let i = 0; i < experiences.length; i++) {
      yPosition = addJobEntry(experiences[i], yPosition);
      
      // Add additional page if needed
      if (yPosition > 250 && i < experiences.length - 1) {
        doc.addPage();
        yPosition = 20;
      }
    }
    
    // Add Educational Background to a new page
    doc.addPage();
    yPosition = 20;
    
    // Education Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HARIDUS', 20, yPosition);
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
      'Eesti Maaülikool',
      'Maaehitus',
      '2001 - 2003',
      '• Õppisin maaehituse inseneeriat (õppekava ei lõpetanud)',
      yPosition
    );
    
    yPosition = addEducationEntry(
      'Tartu Tamme Gümnaasium',
      'Keskharidus',
      '1998 - 2001',
      '• Lõpetasin keskhariduse, keskendudes reaalainetele ja matemaatikale',
      yPosition
    );
    
    // Certifications Section
    yPosition += 6;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SERTIFIKAADID', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const certifications = [
      'Developing and Implementing Web Applications with Microsoft Visual C# .NET (Microsoft, 2006)',
      'Designing and Implementing Databases with Microsoft SQL Server 2000 Enterprise Edition (Microsoft, 2006)',
      'Developing XML Web Services and Server Components with Microsoft Visual C# .NET (Microsoft, 2006)',
      'MOC#2273 Designing IT Managing and Maintaining a Microsoft Windows Server 2003 Environment (BCS Koolituse AS, 2005)',
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
    doc.text('TEHNILISED OSKUSED', 20, yPosition);
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
      skillCategories.programmingLanguages || 'Programmeerimiskeeled',
      'C#, JavaScript, HTML, CSS, SQL, JAVA, Bash',
      yPosition
    );
    
    yPosition = addSkillCategory(
      skillCategories.frameworksLibraries || 'Raamistikud ja teegid',
      '.NET, ASP.NET MVC, Entity Framework, nHibernate, React, Bootstrap, next.js, Node.js',
      yPosition
    );
    
    yPosition = addSkillCategory(
      skillCategories.databases || 'Andmebaasid',
      'Microsoft SQL Server, PostgreSQL, Oracle SQL',
      yPosition
    );
    
    yPosition = addSkillCategory(
      skillCategories.cloudInfrastructure || 'Pilv ja taristu',
      'Docker, Google Cloud, Digital Ocean, Proxmox, Virtualiseerimne, Hyper-V',
      yPosition
    );
    
    yPosition = addSkillCategory(
      skillCategories.toolsEnvironments || 'Tööriistad ja keskkonnad',
      'Visual Studio, Visual Studio Code, Android Studio, Git, Subversion, IIS, NGINX, REST API',
      yPosition
    );
    
    yPosition = addSkillCategory(
      skillCategories.languages || 'Keeled',
      `Eesti keel (${languageLevels.native || 'Emakeel'}), Inglise keel (${languageLevels.professional || 'Professionaalne'})`,
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
    doc.text('ISIKLIKUD PROJEKTID', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Kodulabori taristu', 20, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const homelabDetails = [
      'Kolme sõlmega kõrge käideldavusega Proxmox VE klaster sujuva teenuste migreerimisega',
      'Virtualiseeritud töölaud GPU läbipääsuga, pakkudes peaaegu riistvaralähedast jõudlust',
      'OPNsense virtualiseeritud ruuter VLANide ja täiustatud võrgufunktsioonidega',
      'Ise majutatud teenused, sealhulgas e-post, git hoidlad ja isiklik pilvsalvestus'
    ];
    
    homelabDetails.forEach(detail => {
      doc.text('• ' + detail, 25, yPosition);
      yPosition += 5;
    });
    
    // Add footer with website and date
    const pageCount = doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `reneprost.ee | Genereeritud ${new Date().toLocaleDateString()}`,
        105,
        285,
        { align: 'center' }
      );
      doc.text(`Lehekülg ${i} / ${pageCount}`, 190, 285, { align: 'right' });
    }
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