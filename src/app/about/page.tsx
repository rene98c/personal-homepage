import React from 'react';
import { CheckCircle } from 'lucide-react';



// Skill Item Component
const SkillItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <CheckCircle size={16} className="text-blue-600 mr-2" />
      <span className="text-slate-700">{text}</span>
    </div>
  );
};



export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-2">About Me</h2>
    
    <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
      <p className="text-slate-700 mb-4">
        I've been writing and developing software on the .NET platform in C# since 2003. I'm passionate about 
        well-designed systems and enjoy building software that's both robust and maintainable. I have a good 
        eye for seeing systems as a whole and can navigate any project with relative ease. I never say no to a challenge.
      </p>
      
      <p className="text-slate-700 mb-4">
        My approach to software development emphasizes clean architecture, design patterns, and resilient 
        systems that can adapt to changing requirements. I believe in building software that not only meets 
        current needs but is flexible enough to evolve over time.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="bg-gray-50 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Technical Expertise</h3>
        
        <div className="grid grid-cols-1 gap-2">
          <SkillItem text="C# / .NET Core / ASP.NET" />
          <SkillItem text="Web Services / Web APIs" />
          <SkillItem text="Web UI Development" />
          <SkillItem text="Backend Systems" />
          <SkillItem text="Windows Applications" />
          <SkillItem text="Android (Java, MAUI)" />
        </div>
      </div>
      
      <div className="bg-gray-50 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Technologies</h3>
        
        <div className="grid grid-cols-1 gap-2">
          <SkillItem text="PostgreSQL, MySQL, MS SQL" />
          <SkillItem text="React, jQuery, Bootstrap, Angular" />
          <SkillItem text="AWS, Google Cloud, Azure" />
          <SkillItem text="IIS, Windows/Linux Servers" />
          <SkillItem text="Clean Architecture & Design Patterns" />
          <SkillItem text="Domain-Driven Design" />
        </div>
      </div>
    </div>
    
    <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Professional Philosophy</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-slate-800 mb-2">Architecture First</h4>
          <p className="text-slate-600">
            I believe in establishing a solid architectural foundation before diving into implementation details. This approach ensures scalable, maintainable systems that can adapt to changing requirements.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-800 mb-2">Resilient by Design</h4>
          <p className="text-slate-600">
            I build systems with resilience baked in from the start, not as an afterthought. Circuit breakers, retry policies, and graceful degradation are integral to my implementation approach.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-800 mb-2">Practical Patterns</h4>
          <p className="text-slate-600">
            I leverage established design patterns to solve complex problems, but always with a practical mindset. The goal is clean, maintainable code that solves real business problems efficiently.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-800 mb-2">Testable Solutions</h4>
          <p className="text-slate-600">
            I design systems with testability in mind, implementing comprehensive testing strategies across unit, integration, and scenario-based approaches.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
} 