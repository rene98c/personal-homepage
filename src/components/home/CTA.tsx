'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useTranslation } from 'next-i18next';

export const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation(['common', 'home']);

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
    <div ref={sectionRef} className="bg-indigo-700">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={`text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home:cta.title')}
          </h2>
          <p className={`mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-indigo-200 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t('home:cta.description')}
          </p>
          <div className={`mt-10 flex items-center justify-center gap-x-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="/case-study"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition-all duration-300 hover:bg-indigo-50 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('common:buttons.viewCaseStudy')}
            </Link>
            <Link href="/contact" className="text-sm/6 font-semibold text-white group">
              {t('common:buttons.contactMe')} 
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;