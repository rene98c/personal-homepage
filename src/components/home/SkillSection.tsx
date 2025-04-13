'use client';

import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Code, Database, Layout, Server } from "lucide-react";
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};

// Skills Section
export const SkillSection = ({ lang }: { lang?: Locale }) => {
  const [dictionary, setDictionary] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load the dictionary if language is provided
  useEffect(() => {
    if (!lang) {
      setIsLoading(false);
      return;
    }

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

  // Skill Bar Component
  const SkillBar = ({ name, level }: { name: string, level: number }) => {
    return (
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-700">{name}</span>
          <span className="text-sm font-medium text-slate-700">{level}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full" 
            style={{ width: `${level * 10}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Skill Item Component
  const SkillItem = ({ text }: { text: string }) => {
    return (
      <div className="flex items-center">
        <CheckCircle size={16} className="text-indigo-600 mr-2" />
        <span className="text-slate-700">{text}</span>
      </div>
    );
  };

  // Default titles if dictionary is not loaded
  const title = dictionary?.skills?.title || "Technical Toolkit";
  const subtitle = dictionary?.skills?.subtitle || "Skills & Expertise";
  const technicalTitle = dictionary?.skills?.sections?.technical || "Technical Expertise";
  const technologiesTitle = dictionary?.skills?.sections?.technologies || "Technologies & Tools";
  const databasesTitle = dictionary?.skills?.sections?.databases || "Databases";
  const frontendTitle = dictionary?.skills?.sections?.frontend || "Front-End";
  const cloudTitle = dictionary?.skills?.sections?.cloud || "Cloud & Hosting";
  const methodologiesTitle = dictionary?.skills?.sections?.methodologies || "Methodologies";

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">{title}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            {subtitle}
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-2">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-2 flex items-center">
              <Code size={20} className="mr-2 text-indigo-600" />
              {technicalTitle}
            </h3>
            
            <div className="space-y-3">
              <SkillBar name="C# / .NET Core" level={9.5} />
              <SkillBar name="Web Services / Web APIs" level={9} />
              <SkillBar name="Design Patterns" level={9} />
              <SkillBar name="Clean Architecture" level={8.5} />
              <SkillBar name="Resilience Engineering" level={8.5} />
              <SkillBar name="Database Design" level={8} />
              <SkillBar name="Web UI Development" level={7.5} />
              <SkillBar name="Mobile Development" level={4} />
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-2 flex items-center">
              <Server size={20} className="mr-2 text-indigo-600" />
              {technologiesTitle}
            </h3>
            
            <div className="grid grid-cols-1 gap-y-2 gap-x-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Database size={16} className="text-indigo-600 mr-2" />
                  {databasesTitle}
                </h4>
                <div className="grid grid-cols-2 gap-2 pl-6">
                  <SkillItem text="PostgreSQL" />
                  <SkillItem text="MySQL" />
                  <SkillItem text="MS SQL" />
                </div>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Layout size={16} className="text-indigo-600 mr-2" />
                  {frontendTitle}
                </h4>
                <div className="grid grid-cols-2 gap-2 pl-6">
                  <SkillItem text="React" />
                  <SkillItem text="Next.js" />
                  <SkillItem text="Tailwind CSS" />
                  <SkillItem text="Angular" />
                  <SkillItem text="jQuery" />
                  <SkillItem text="Bootstrap" />
                </div>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Server size={16} className="text-indigo-600 mr-2" />
                  {cloudTitle}
                </h4>
                <div className="grid grid-cols-2 gap-2 pl-6">
                  <SkillItem text="AWS" />
                  <SkillItem text="Google Cloud" />
                  <SkillItem text="Azure" />
                  <SkillItem text="IIS" />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <BookOpen size={16} className="text-indigo-600 mr-2" />
                  {methodologiesTitle}
                </h4>
                <div className="grid grid-cols-2 gap-2 pl-6">
                  <SkillItem text="Clean Architecture" />
                  <SkillItem text="Design Patterns" />
                  <SkillItem text="Domain-Driven Design" />
                  <SkillItem text="Test-Driven Development" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSection;