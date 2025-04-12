'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Code, Database, Server } from "lucide-react";

export const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current; // Store ref value in a variable

    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) { // Use the stored variable here
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className={`text-center text-base/7 font-semibold text-indigo-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Technical Excellence
        </h2>
        <p className={`mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          My Core Competencies
        </p>
        
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className={`relative lg:row-span-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Clean Architecture
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  I build systems with clear separation of concerns, keeping the domain model at the center
                  and infrastructure details at the edges. This approach ensures maintainability and testability.
                </p>
              </div>
              <div className="relative min-h-[20rem] w-full grow max-lg:mx-auto max-lg:max-w-sm flex items-center justify-center">
                <Code size={128} className="text-indigo-600/30 transform transition-all duration-700 hover:scale-110 hover:text-indigo-600/50" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          
          <div className={`relative max-lg:row-start-1 transition-all duration-700 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Design Patterns</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  I leverage established design patterns to solve complex problems efficiently, creating robust and flexible codebases.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <Server size={72} className="text-indigo-600/30 transform transition-all duration-700 hover:scale-110 hover:text-indigo-600/50" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          
          <div className={`relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Resilience Engineering</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  I design systems that gracefully handle failures, using circuit breakers, retry policies, and graceful degradation.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <Database size={72} className="text-indigo-600/30 transform transition-all duration-700 hover:scale-110 hover:text-indigo-600/50" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
          </div>
          
          <div className={`relative lg:row-span-2 transition-all duration-700 delay-750 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Testing & Quality
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  I implement comprehensive testing strategies, from unit tests to integration tests and scenario-based validation.
                </p>
              </div>
              <div className="relative min-h-[20rem] w-full grow flex items-center justify-center">
                <CheckCircle size={128} className="text-indigo-600/30 transform transition-all duration-700 hover:scale-110 hover:text-indigo-600/50" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;