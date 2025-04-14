'use client';
 
import { Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { DownloadResumeButton } from '@/components/experience/DownloadResumeButton';
import PDFResumeButton from '@/components/experience/PDFResumeButton';
import ExpandedSkillsSection from '@/components/experience/ExpandedSkillsSection';
import CertificationsSection from '@/components/experience/CertificationsSection';
import EducationSection from '@/components/experience/EducationSection';
import { Locale } from '@/lib/dictionaries';

// Experience Timeline component that accepts a pre-loaded dictionary
const ExperienceTimeline = ({ lang, dictionary }: { lang: Locale; dictionary: any }) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  
  // Function to localize month names in date ranges
  const localizeDate = (dateStr: string): string => {
    if (!dictionary.common?.months) return dateStr;
    
    // Match month names in the date string
    return dateStr.replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/g, 
      (match) => {
        const translatedMonth = dictionary.common.months[match];
        return translatedMonth || match;
      }
    );
  };
  
  // Create experience timeline using the dictionary - this is what will be displayed AND exported
  const experiences = [
    {
      title: dictionary.experience.jobTitles?.netDeveloper || '.NET Software Developer',
      company: dictionary.experience.companyNames?.connected || 'Connected OÜ',
      period: 'January 2023 - June 2024',
      responsibilities: [
        dictionary.experience.responsibilities?.developedEnterprise || "Developed and maintained enterprise-level .NET desktop application"
      ]
    },
    {
      title: dictionary.experience.jobTitles?.netDeveloper || '.NET Software Developer',
      company: dictionary.experience.companyNames?.fujitsu || 'Fujitsu Estonia AS',
      period: 'October 2019 - January 2023',
      responsibilities: [
        dictionary.experience.responsibilities?.designedMaintained || "Designed and maintained various software systems",
      ]
    },
    {
      title: dictionary.experience.jobTitles?.netDeveloper || '.NET Software Developer',
      company: dictionary.experience.companyNames?.rik || 'Centre of Registers and Information Systems',
      period: 'April 2017 - September 2019',
      responsibilities: [
        dictionary.experience.responsibilities?.designedMaintained || "Designed and maintained various software systems",
      ]
    },
    {
      title: dictionary.experience.jobTitles?.netDeveloper || '.NET Software Developer',
      company: dictionary.experience.companyNames?.uptime || 'Uptime OÜ / Turnit OÜ',
      period: 'November 2012 - February 2017',
      responsibilities: [
        dictionary.experience.responsibilities?.builtRobust || "Built robust web applications and services using .NET technologies",
        dictionary.experience.responsibilities?.implementedFrontend || "Implemented frontend solutions using various JavaScript frameworks",
        dictionary.experience.responsibilities?.designedDatabase || "Designed and optimized database schemas and queries",
        dictionary.experience.responsibilities?.participatedSDLC || "Participated in full software development lifecycle from requirements to deployment"
      ]
    },
    {
      title: dictionary.experience.jobTitles?.netDeveloper || '.NET Software Developer',
      company: dictionary.experience.companyNames?.rik || 'Centre of Registers and Information Systems',
      period: 'January 2008 - November 2012',
      responsibilities: [
        dictionary.experience.responsibilities?.developedNetApps || "Developed .NET web applications and services",
        dictionary.experience.responsibilities?.implementedBusiness || "Implemented business logic and database integration",
        dictionary.experience.responsibilities?.createdUI || "Created user interfaces following best practices",
        dictionary.experience.responsibilities?.participatedRequirements || "Participated in requirements analysis and system design",
        dictionary.experience.responsibilities?.collaboratedAgile || "Collaborated in agile development processes"]
    },
    {
      title: dictionary.experience.jobTitles?.netDeveloper || '.NET Software Developer',
      company: dictionary.experience.companyNames?.softronic || 'Softronic Baltic AS / Center of Registers and Information Systems',
      period: 'December 2005 - December 2007',
      responsibilities: [
        dictionary.experience.responsibilities?.developedNetApps || "Developed .NET web applications and services",
        dictionary.experience.responsibilities?.implementedBusiness || "Implemented business logic and database integration",
        dictionary.experience.responsibilities?.createdUI || "Created user interfaces following best practices",
        dictionary.experience.responsibilities?.participatedRequirements || "Participated in requirements analysis and system design",
        dictionary.experience.responsibilities?.collaboratedAgile || "Collaborated in agile development processes"
      ]
    },
    {
      title: dictionary.experience.jobTitles?.itSpecialist || 'IT Specialist',
      company: dictionary.experience.companyNames?.airforce || 'Estonian Air Force',
      period: 'April 2004 - November 2005',
      responsibilities: [
        dictionary.experience.responsibilities?.maintainedPC || "Maintained PC hardware, software, and network infrastructure",
        dictionary.experience.responsibilities?.providedSupport || "Provided technical support and troubleshooting",
        dictionary.experience.responsibilities?.implementedSoftware || "Implemented and configured software systems",
        dictionary.experience.responsibilities?.ensuredSecurity || "Ensured security and reliability of IT infrastructure",
        dictionary.experience.responsibilities?.documentedProcedures || "Documented technical procedures and system configurations"
      ]
    }
  ];

  // Function to format job title and company based on language
  const formatPosition = (title: string, company: string) => {
    if (lang === 'et') {
      // In Estonian, use a comma instead of "at"
      return `${title}, ${company}`;
    } else {
      // In English, use "at"
      return `${title} at ${company}`;
    }
  };

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{dictionary.experience.title}</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {dictionary.experience.journeyTitle}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {dictionary.experience.description}
            </p>
            
            {/* Resume Download Section - Pass the experiences data to the download buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadResumeButton lang={lang} experiences={experiences} />
              <PDFResumeButton lang={lang} experiences={experiences} />
            </div>
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
                      {formatPosition(exp.title, exp.company)}
                    </h3>
                    <p className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1.5 h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
                      {localizeDate(exp.period)}
                    </p>
                  </div>
                  <div className="mt-4 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-2">{dictionary.experience.keyResponsibilities}:</h4>
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
        </div>
      </div>
      
      {/* New sections from the CV */}
      <ExpandedSkillsSection lang={lang} />
      <CertificationsSection lang={lang} />
      <EducationSection lang={lang} />
    </>
  );
};

export default ExperienceTimeline;