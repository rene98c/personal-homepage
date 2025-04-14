'use client';

import React, { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';
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

export const DownloadResumeButton = ({ 
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
  
  // Function to generate resume data in the selected language
  const generateResumeData = () => {
    // If dictionary isn't loaded yet, use English as fallback
    if (!dictionary) {
      return generateEnglishResumeData();
    }
    
    // Generate resume in the selected language
    if (lang === 'et') {
      return generateEstonianResumeData();
    } else {
      return generateEnglishResumeData();
    }
  };

  // English resume content
  const generateEnglishResumeData = () => {
    let resumeContent = `
RENE PROST
C#/.NET Developer with 20+ Years Experience
rene@bdec.ee | Based near Tartu, Estonia

PROFESSIONAL EXPERIENCE
`;

    // Add experience sections using the provided experiences data
    experiences.forEach(exp => {
      resumeContent += `
${exp.title}
${exp.company}
${exp.period}
${exp.responsibilities.map(r => `• ${r}`).join('\n')}
`;
    });

    // Add education and other sections
    resumeContent += `
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

  // Estonian resume content
  const generateEstonianResumeData = () => {
   

    let resumeContent = `
RENE PROST
C#/.NET Arendaja 20+ aasta kogemusega
rene@bdec.ee | Tartu lähistel, Eesti

TÖÖKOGEMUS
`;

    // Add experience sections using the provided experiences data
    experiences.forEach(exp => {
      resumeContent += `
${exp.title}
${exp.company}
${localizeDate(exp.period)}
${exp.responsibilities.map(r => `• ${r}`).join('\n')}
`;
    });

    // Add education and other sections in Estonian
    resumeContent += `
HARIDUS

Eesti Maaülikool (2001 - 2003)
Maaehitus
• Õppisin maaehituse inseneeriat (õppekava ei lõpetanud)

Tartu Tamme Gümnaasium (1998 - 2001)
Keskharidus
• Lõpetasin keskhariduse, keskendudes reaalainetele ja matemaatikale

SERTIFIKAADID

• Developing and Implementing Web Applications with Microsoft Visual C# .NET (Microsoft, 2006)
• Designing and Implementing Databases with Microsoft SQL Server 2000 Enterprise Edition (Microsoft, 2006)
• Developing XML Web Services and Server Components with Microsoft Visual C# .NET (Microsoft, 2006)
• MOC#2273 Designing IT Managing and Maintaining a Microsoft Windows Server 2003 Environment (BCS Koolituse AS, 2005)
• Enterasys ESE Network Specialist Fastrack (TELEGRUPP, 2005)

TEHNILISED OSKUSED

Programmeerimiskeeled:
• C#, JavaScript, HTML, CSS, SQL, JAVA, Bash

Raamistikud ja teegid:
• .NET, ASP.NET MVC, Entity Framework, nHibernate, React, Bootstrap, next.js, Node.js

Andmebaasid:
• Microsoft SQL Server, PostgreSQL, Oracle SQL

Pilv ja taristu:
• Docker, Google Cloud, Digital Ocean, Proxmox, Virtualiseerimine, Hyper-V

Tööriistad ja keskkonnad:
• Visual Studio, Visual Studio Code, Android Studio, Git, Subversion, IIS, NGINX, REST API

Keeled:
• Eesti keel (Emakeel)
• Inglise keel (Professionaalne)

ISIKLIKUD PROJEKTID

Kodulabori taristu
• Kolme sõlmega kõrge käideldavusega Proxmox VE klaster sujuva teenuste migreerimisega
• Virtualiseeritud töölaud GPU läbipääsuga, pakkudes peaaegu riistvaralähedast jõudlust
• OPNsense virtualiseeritud ruuter VLANide ja täiustatud võrgufunktsioonidega
• Ise majutatud teenused, sealhulgas e-post, git hoidlad ja isiklik pilvsalvestus

Rohkem teavet ja portfoolio: https://reneprost.ee
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

  // Get translation or use fallback
  const buttonText = dictionary?.experience?.downloadResumeText || "Download Resume (Text)";

  return (
    <button
      onClick={downloadResume}
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:-translate-y-1"
    >
      <FileDown className="mr-2 h-5 w-5" />
      {buttonText}
    </button>
  );
};

export default DownloadResumeButton;