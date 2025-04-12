import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 


export  const Hero = () => {
    return (
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                      C# / .NET Specialist
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                      <span>20+ Years Experience</span>
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                  Rene Prost
                </h1>
                <p className="mt-6 text-xl font-medium text-pretty text-gray-700">
                 C#/.NET specialist with 20+ years of experience crafting robust, maintainable systems that power real-world solutions.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/case-study"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View Case Study
                  </Link>
                  <Link href="/contact" className="text-sm/6 font-semibold text-gray-900">
                    Contact Me →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-full overflow-hidden rounded-tl-xl bg-gray-900 p-8">
                      <div className="flex items-center justify-center h-full">
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
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    );
  };
  export default Hero;
  