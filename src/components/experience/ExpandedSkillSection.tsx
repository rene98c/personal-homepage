'use client';

import React, { useEffect, useState } from 'react';
import { Code, Database, Server, Globe, Cloud, Cog } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

// Define proper types for our skills
type SimpleSkill = string;
type LanguageSkill = {
  name: string;
  level: string;
};

type Skill = SimpleSkill | LanguageSkill;

// Type guard to check if a skill is a language skill (has name and level)
const isLanguageSkill = (skill: Skill): skill is LanguageSkill => {
  return typeof skill === 'object' && 'name' in skill && 'level' in skill;
};

const ExpandedSkillsSection = ({ lang }: { lang?: Locale }) => {
  const [dictionary, setDictionary] = useState<any | null>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [, setIsLoading] = useState(true);

  // Load the dictionary if language is provided
  useEffect(() => {
    if (!lang) {
      setIsLoading(false);
      return;
    }

    async function loadDictionary() {
      setIsLoading(true);
      if (!lang) {
        setIsLoading(false);
        return;
      }
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

  const skillCategories = [
    {
      name: "Programming Languages",
      icon: <Code className="h-6 w-6 text-indigo-600" />,
      skills: ["C#", "JavaScript", "HTML", "CSS", "SQL", "JAVA", "Bash"] as Skill[]
    },
    {
      name: "Frameworks & Libraries",
      icon: <Cog className="h-6 w-6 text-indigo-600" />,
      skills: [".NET", "ASP.NET MVC", "Entity Framework", "nHibernate", "React", "Bootstrap", "next.js", "Node.js"] as Skill[]
    },
    {
      name: "Databases",
      icon: <Database className="h-6 w-6 text-indigo-600" />,
      skills: ["Microsoft SQL Server", "PostgreSQL", "Oracle SQL"] as Skill[]
    },
    {
      name: "Cloud & Infrastructure",
      icon: <Cloud className="h-6 w-6 text-indigo-600" />,
      skills: ["Docker", "Google Cloud", "Digital Ocean", "Proxmox", "Virtualization", "Hyper-V"] as Skill[]
    },
    {
      name: "Tools & Environments",
      icon: <Server className="h-6 w-6 text-indigo-600" />,
      skills: ["Visual Studio", "Visual Studio Code", "Android Studio", "Git", "Subversion", "IIS", "NGINX", "REST API"] as Skill[]
    },
    {
      name: "Languages",
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      skills: [
        { name: "Estonian", level: "Native" },
        { name: "English", level: "Professional" }
      ] as LanguageSkill[]
    }
  ];

  // Get translations or use defaults
  const skillsTitle = dictionary?.skills?.title || "Technical Capabilities";
  const skillsSubtitle = dictionary?.skills?.subtitle || "Comprehensive Skill Set";
  const skillsDescription = dictionary?.skills?.description || 
    "Throughout my career, I've developed expertise in a wide range of technologies, frameworks, and methodologies. Here's a detailed overview of my technical skills.";

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{skillsTitle}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {skillsSubtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {skillsDescription}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  {category.icon}
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
                
                {category.name === "Languages" ? (
                  <div className="space-y-3">
                    {category.skills.map((lang, langIndex) => {
                      // Use type guard to ensure TypeScript knows this is a LanguageSkill
                      if (isLanguageSkill(lang)) {
                        return (
                          <div key={langIndex} className="flex flex-col">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-700">{lang.name}</span>
                              <span className="text-sm text-gray-500">{lang.level}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: lang.level === "Native" ? "100%" : "80%" }}
                              ></div>
                            </div>
                          </div>
                        );
                      }
                      return null; // This should never happen, but keeps TypeScript happy
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedSkillsSection;