'use client'
import { ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-2">Welcome</h2>
    
    <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 mb-6 transition-all duration-200 hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-slate-800">Senior Software Developer</h3>
      <p className="text-slate-700 mb-4">
        .NET specialist with over 20 years of experience building robust, maintainable software systems.
        My approach combines strong architectural principles with practical implementation skills.
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors hover:bg-blue-200">C#</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors hover:bg-blue-200">.NET Core</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors hover:bg-blue-200">Design Patterns</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors hover:bg-blue-200">Clean Architecture</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors hover:bg-blue-200">Web Services</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors hover:bg-blue-200">React</span>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 border-b border-slate-200 pb-2">Featured Case Study</h3>
        <p className="text-slate-700 mb-3">
          SecureAccess: A mission-critical access control system implementing robust design patterns and clean architecture.
        </p>
        <button 
          onClick={() => router.push('/case-study')} 
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors duration-200"
        >
          Read more <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 transition-all duration-200 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 border-b border-slate-200 pb-2">Design Pattern Expertise</h3>
        <p className="text-slate-700 mb-3">
          Explore my practical implementation of design patterns across creational, structural, and behavioral categories.
        </p>
        <button 
          onClick={() => router.push('/design-patterns')} 
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors duration-200"
        >
          View patterns <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  </div>
  );
} 