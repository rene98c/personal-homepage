'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  const [contentVisible, setContentVisible] = useState(false);

  // Use a brief delay to ensure content appears after layout is fully settled
  useEffect(() => {
    // A minimal timer to ensure layout is fully rendered
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative isolate h-[732px]">
      {/* Fixed absolute positioning for all structural elements */}
      {/* Background with fixed dimensions */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-800 to-indigo-900 -z-20"></div>
      
      {/* White diagonal overlay with fixed dimensions */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-[65%] bg-white transform skew-x-[20deg] origin-top-right"></div>
      </div>

      {/* Content container - full size absolutely positioned */}
      <div className="absolute inset-0">
        <div className="mx-auto max-w-7xl h-full px-6 py-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          {/* Left column - text content */}
          <div className="relative h-full">
            <div className="absolute inset-0 flex flex-col justify-center">
              <div className="max-w-2xl">
                <div className="max-w-lg">
                  {/* Badge */}
                  <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <a href="#" className="inline-flex space-x-6">
                      <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                        C# / .NET Specialist
                      </span>
                      <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                        <span>20+ Years Experience</span>
                      </span>
                    </a>
                  </div>
                  
                  {/* Heading */}
                  <div className={`mt-10 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                      Rene Prost
                    </h1>
                  </div>
                  
                  {/* Description */}
                  <div className={`mt-6 transition-all duration-700 delay-150 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-xl font-medium text-pretty text-gray-700">
                      C#/.NET specialist with 20+ years of experience crafting robust, maintainable systems that power real-world solutions.
                    </p>
                  </div>
                  
                  {/* Buttons */}
                  <div className={`mt-10 transition-opacity duration-700 delay-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-x-6">
                      <Link
                        href="/case-study"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-md"
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
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`transition-all duration-700 delay-200 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;