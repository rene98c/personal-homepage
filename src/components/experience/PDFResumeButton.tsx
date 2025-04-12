'use client';

import React from 'react';
import { FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';

const PDFResumeButton = () => {
  // Function to generate PDF resume
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
    
    // Add job entries
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
      ['Designed and maintained various software systems'],
      yPosition
    );
    
    yPosition = addJobEntry(
      '.NET Software Developer', 
      'Centre of Registers and Information Systems', 
      'April 2017 - September 2019',
      ['Developed secure, scalable systems for government information management'],
      yPosition
    );
    
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
    if (yPosition > 250) {
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
    
    // Skills section
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    } else {
      yPosition += 10;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS & EXPERTISE', 20, yPosition);
    doc.line(20, yPosition + 2, 190, yPosition + 2);
    yPosition += 10;
    
    // Programming & Technologies
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Programming & Technologies:', 20, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const techSkills = [
      'C# / .NET Core',
      'Web Services / Web APIs',
      'SQL (Microsoft SQL Server, PostgreSQL)',
      'Front-end technologies (React, Angular)',
      'Cloud services (AWS, Azure)',
      'Database Design & Optimization'
    ];
    
    techSkills.forEach(skill => {
      doc.text('• ' + skill, 25, yPosition);
      yPosition += 5;
    });
    
    yPosition += 5;
    
    // Methodologies & Practices
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Methodologies & Practices:', 20, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const methodSkills = [
      'Clean Architecture',
      'Design Patterns',
      'Domain-Driven Design',
      'Test-Driven Development',
      'Resilience Engineering',
      'SOLID Principles'
    ];
    
    methodSkills.forEach(skill => {
      doc.text('• ' + skill, 25, yPosition);
      yPosition += 5;
    });
    
    // Add footer with website and date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageCount = (doc.internal as any).getNumberOfPages();
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

  return (
    <button
      onClick={generatePDFResume}
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:-translate-y-1"
    >
      <FileDown className="mr-2 h-5 w-5" />
      Download Resume (PDF)
    </button>
  );
};

export default PDFResumeButton;