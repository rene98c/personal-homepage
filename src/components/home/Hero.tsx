'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const maxHeight = '1440px'; // Set a reasonable maximum height

  // Effect to handle viewport height changes
  useEffect(() => {
    // Function to update height
    const updateHeight = () => {
      const vh = window.innerHeight;
      // Set maximum height to ensure it doesn't get unreasonably tall
      const height = Math.min(vh, parseInt(maxHeight)) + 'px';
      setViewportHeight(height);
    };

    // Set initial height
    updateHeight();

    // Update height on window resize
    window.addEventListener('resize', updateHeight);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative isolate overflow-hidden" style={{ height: viewportHeight }}>
      {/* Original blue background gradient - only visible in specific areas */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-800 to-indigo-900 -z-20"></div>
      
      {/* White overlay that creates the diagonal shape */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-[65%] bg-white transform skew-x-[20deg] origin-top-right"></div>
      </div>

      <div className="absolute inset-0 mx-auto max-w-7xl flex items-center lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="px-6 lg:px-0">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <div className="mt-0 sm:mt-0 lg:mt-0">
                <a href="#" className={`inline-flex space-x-6 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                    C# / .NET Specialist
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                    <span>20+ Years Experience</span>
                  </span>
                </a>
              </div>
              
              <h1 className={`mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Rene Prost
              </h1>
              
              <p className={`mt-6 text-xl font-medium text-pretty text-gray-700 transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                C#/.NET specialist with 20+ years of experience crafting robust, maintainable systems that power real-world solutions.
              </p>
              
              <div className={`mt-10 flex items-center gap-x-6 transition-opacity duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <Link
                  href="/case-study"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Case Study
                </Link>
                <Link href="/contact" className="text-sm/6 font-semibold text-gray-900 group">
                  Contact Me 
                  <span className="inline-block transition-all duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-0 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          {/* Profile card */}
          <div className="shadow-lg md:rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div className="w-full overflow-hidden rounded-tl-xl bg-gray-900 p-8">
                    <div className="flex items-center justify-center h-full">
                      <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg bg-white p-1 transition-all duration-300 hover:scale-105">
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
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle indicator that suggests scrolling */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${loaded ? 'opacity-70' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce mt-1"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;