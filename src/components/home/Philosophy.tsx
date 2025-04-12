'use client';

import React, { useState, useEffect, useRef } from 'react';
import PhilosophyItem from "./PhilosophyItem";

export const Philosophy = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className={`text-base/7 font-semibold text-indigo-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            My Approach
          </h2>
          <p className={`mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Professional Philosophy
          </p>
          <p className={`mt-6 text-lg/8 text-gray-600 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            The distinctive aspects of my approach—particularly the explicit criticality classification, purpose-built 
            testing tools, and manual override design—demonstrate my ability to adapt established patterns to meet 
            unique requirements in specialized domains.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className={`transition-all duration-700 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <PhilosophyItem 
                number="1"
                title="Architecture First"
                description="I believe in establishing a solid architectural foundation before diving into implementation details. This approach ensures scalable, maintainable systems that can adapt to changing requirements."
              />
            </div>
            <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <PhilosophyItem 
                number="2"
                title="Resilient by Design"
                description="I build systems with resilience baked in from the start, not as an afterthought. Circuit breakers, retry policies, and graceful degradation are integral to my implementation approach."
              />
            </div>
            <div className={`transition-all duration-700 delay-750 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <PhilosophyItem 
                number="3"
                title="Practical Patterns"
                description="I leverage established design patterns to solve complex problems, but always with a practical mindset. The goal is clean, maintainable code that solves real business problems efficiently."
              />
            </div>
            <div className={`transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <PhilosophyItem 
                number="4"
                title="Testable Solutions"
                description="I design systems with testability in mind, implementing comprehensive testing strategies across unit, integration, and scenario-based approaches."
              />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;