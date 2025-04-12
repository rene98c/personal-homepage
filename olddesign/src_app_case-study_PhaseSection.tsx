'use client'
import { Check, ChevronDown, ChevronRight, Clock, Code, Layers } from "lucide-react";
import { useState } from "react";

// Phase Section Component
export const PhaseSection = ({ number, title, approach, steps, results, codeSnippet }: { 
  number: string | number, 
  title: string, 
  approach: string, 
  steps: string[], 
  results: string[], 
  codeSnippet: string 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl mb-6">
      <div 
        className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center cursor-pointer transition-colors hover:bg-slate-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
            {number}
          </div>
          <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        {isExpanded ? 
          <ChevronDown size={20} className="text-slate-600 transition-transform duration-200" /> : 
          <ChevronRight size={20} className="text-slate-600 transition-transform duration-200" />
        }
      </div>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Layers size={16} className="mr-2 text-blue-600" />
              Approach
            </h5>
            <p className="text-slate-700">{approach}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Clock size={16} className="mr-2 text-blue-600" />
              Key Implementation Steps
            </h5>
            <ul className="space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Check size={16} className="mr-2 text-green-600" />
              Results
            </h5>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-slate-800 mb-2 flex items-center">
              <Code size={16} className="mr-2 text-blue-600" />
              Code Implementation
            </h5>
            <div className="bg-slate-900 border border-slate-700 text-gray-200 p-4 rounded overflow-x-auto">
              <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};