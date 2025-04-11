import React from 'react';
import { CheckCircle, Code, Server, Database, Layout, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Skill Item Component
const SkillItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <CheckCircle size={16} className="text-blue-600 mr-2" />
      <span className="text-slate-700">{text}</span>
    </div>
  );
};

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
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${level * 10}%` }}
        ></div>
      </div>
    </div>
  );
};

// Philosophy Item Component
const PhilosophyItem = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium text-slate-800 ml-2">{title}</h4>
      </div>
      <p className="text-slate-600 pl-7">
        {description}
      </p>
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-2">About Me</h2>
      
      {/* Profile Section */}
      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg bg-white p-1">
              <Image 
                src="/profile-photo.jpeg" 
                alt="Rene Prost - Software Developer"
                width={192}
                height={192}
                className="object-cover w-full h-full rounded-full"
                priority
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Rene Prost</h3>
            <h4 className="text-lg text-blue-600 font-medium mb-4">Senior Software Developer</h4>
            
            <p className="text-slate-700 mb-4">
              I&apos;m a C#/.NET specialist with over 20 years of experience building robust, maintainable software systems. 
              With deep expertise in design patterns, clean architecture, and resilience engineering, I specialize in 
              creating solutions that stand the test of time.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">C#</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">.NET Core</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Design Patterns</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Clean Architecture</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Software Design</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Journey */}
      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Professional Journey</h3>
        
        <p className="text-slate-700 mb-4">
          I&apos;ve been writing and developing software on the .NET platform in C# since 2003. Throughout my career, 
          I&apos;ve worked across a variety of industries including government systems, transportation, and enterprise solutions.
          I&apos;m passionate about well-designed systems and enjoy building software that&apos;s both robust and maintainable.
        </p>
        
        <p className="text-slate-700 mb-4">
          My approach to software development emphasizes clean architecture, design patterns, and resilient 
          systems that can adapt to changing requirements. I believe in building software that not only meets 
          current needs but is flexible enough to evolve over time.
        </p>
        
        <p className="text-slate-700">
          I have a good eye for seeing systems as a whole and can navigate any project with relative ease. 
          I never say no to a challenge and continuously strive to improve my craft through learning and applying 
          new techniques and best practices.
        </p>
      </div>
      
      {/* Core Skills & Expertise */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center">
            <Code size={20} className="mr-2 text-blue-600" />
            Technical Expertise
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
        
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center">
            <Server size={20} className="mr-2 text-blue-600" />
            Technologies & Tools
          </h3>
          
          <div className="grid grid-cols-1 gap-y-2 gap-x-4">
            <div className="mb-3">
              <h4 className="font-medium text-slate-800 mb-2 flex items-center">
                <Database size={16} className="text-blue-600 mr-2" />
                Databases
              </h4>
              <div className="grid grid-cols-2 gap-2 pl-6">
                <SkillItem text="PostgreSQL" />
                <SkillItem text="MySQL" />
                <SkillItem text="MS SQL" />
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium text-slate-800 mb-2 flex items-center">
                <Layout size={16} className="text-blue-600 mr-2" />
                Front-End
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
              <h4 className="font-medium text-slate-800 mb-2 flex items-center">
                <Server size={16} className="text-blue-600 mr-2" />
                Cloud & Hosting
              </h4>
              <div className="grid grid-cols-2 gap-2 pl-6">
                <SkillItem text="AWS" />
                <SkillItem text="Google Cloud" />
                <SkillItem text="Azure" />
                <SkillItem text="IIS" />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-800 mb-2 flex items-center">
                <BookOpen size={16} className="text-blue-600 mr-2" />
                Methodologies
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
      
      {/* Professional Philosophy */}
      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Professional Philosophy</h3>
        
        <div className="space-y-5">
          <PhilosophyItem 
            icon={<div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>}
            title="Architecture First"
            description="I believe in establishing a solid architectural foundation before diving into implementation details. This approach ensures scalable, maintainable systems that can adapt to changing requirements."
          />
          
          <PhilosophyItem 
            icon={<div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">2</div>}
            title="Resilient by Design"
            description="I build systems with resilience baked in from the start, not as an afterthought. Circuit breakers, retry policies, and graceful degradation are integral to my implementation approach."
          />
          
          <PhilosophyItem 
            icon={<div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">3</div>}
            title="Practical Patterns"
            description="I leverage established design patterns to solve complex problems, but always with a practical mindset. The goal is clean, maintainable code that solves real business problems efficiently."
          />
          
          <PhilosophyItem 
            icon={<div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">4</div>}
            title="Testable Solutions"
            description="I design systems with testability in mind, implementing comprehensive testing strategies across unit, integration, and scenario-based approaches."
          />
        </div>
      </div>
      
      {/* Personal Approach */}
      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-2">Beyond the Code</h3>
        
        <p className="text-slate-700 mb-4">
          While technical skills are essential, I believe that exceptional coding ability is at the core of truly impactful software development. 
          I express myself most fluently through code, where I often enter a flow state that allows me to create elegant solutions to complex problems. 
          Coding is an art form to me - I lose track of time when I&apos;m in the zone, fully immersed in crafting clean, efficient solutions.
        </p>
        
        <p className="text-slate-700 mb-4">
          While I may find verbal communication challenging at times, I excel at expressing complex technical concepts in written form. 
          I leverage various tools, including AI, to articulate my ideas clearly and effectively when collaborating with others.
        </p>
        
        <p className="text-slate-700 mb-4">
          I&apos;m based in a beautiful rural area near the city of Tartu, Estonia. This location offers
          me the perfect balance between focused work environment and access to a vibrant tech community
          when needed.
        </p>
        
        <p className="text-slate-700">
          Outside of coding, I enjoy exploring new technologies, reading about software architecture, and 
          continuously enhancing my skills to stay at the forefront of the industry. While I&apos;m currently engaged
          in a professional role, I&apos;m always open to discussing interesting projects and opportunities.
        </p>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600 shadow-md rounded-lg p-6 text-white text-center">
        <h3 className="text-xl font-semibold mb-3">See how I translate creative thinking into elegant code</h3>
        <p className="mb-4">
          Check out my case study on building a mission-critical access control system to see how I apply creative problem-solving and technical excellence in practice.
        </p>
        <Link 
          href="/case-study" 
          className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
        >
          View Case Study <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}