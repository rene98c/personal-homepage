import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Code, Server, Database, Layout, BookOpen } from 'lucide-react';
import PersonalApproach from '@/components/PersonalApproach';
// Hero Section (inspired by examplestwui_hero.js)
const Hero = () => {
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
                I&apos;m a C#/.NET specialist with over 20 years of experience building robust, maintainable software systems. 
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

// Stats Section (inspired by examplestwui_stats.js)
const stats = [
  { label: 'Years of Experience', value: '20+' },
  { label: 'Projects Involved With', value: '30+' },
  { label: 'Technologies Mastered', value: '15+' },
];

const Stats = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Professional Journey</h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl/8 text-gray-600">
                I&apos;ve been writing and developing software on the .NET platform in C# since 2003. Throughout my career, 
                I&apos;ve worked across a variety of industries including government systems, transportation, and enterprise solutions.
              </p>
              <p className="mt-10 max-w-xl text-base/7 text-gray-700">
                My approach to software development emphasizes clean architecture, design patterns, and resilient 
                systems that can adapt to changing requirements. I believe in building software that not only meets 
                current needs but is flexible enough to evolve over time.
              </p>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                    <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Grid (inspired by examplestwui_bento.js)
const Features = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">Technical Excellence</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          My Core Competencies
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
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
                <Code size={128} className="text-indigo-600/30" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Design Patterns</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  I leverage established design patterns to solve complex problems efficiently, creating robust and flexible codebases.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <Server size={72} className="text-indigo-600/30" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Resilience Engineering</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  I design systems that gracefully handle failures, using circuit breakers, retry policies, and graceful degradation.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <Database size={72} className="text-indigo-600/30" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
          </div>
          
          <div className="relative lg:row-span-2">
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
                <CheckCircle size={128} className="text-indigo-600/30" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Philosophy Section (based on your original content with new styling)
const PhilosophyItem = ({ number, title, description }: { 
  number: string, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
          <span className="text-xl font-semibold text-white">{number}</span>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
        <p className="mt-2 text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Philosophy = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">My Approach</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Professional Philosophy
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            The distinctive aspects of my approach—particularly the explicit criticality classification, purpose-built 
            testing tools, and manual override design—demonstrate my ability to adapt established patterns to meet 
            unique requirements in specialized domains.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div>
              <PhilosophyItem 
                number="1"
                title="Architecture First"
                description="I believe in establishing a solid architectural foundation before diving into implementation details. This approach ensures scalable, maintainable systems that can adapt to changing requirements."
              />
            </div>
            <div>
              <PhilosophyItem 
                number="2"
                title="Resilient by Design"
                description="I build systems with resilience baked in from the start, not as an afterthought. Circuit breakers, retry policies, and graceful degradation are integral to my implementation approach."
              />
            </div>
            <div>
              <PhilosophyItem 
                number="3"
                title="Practical Patterns"
                description="I leverage established design patterns to solve complex problems, but always with a practical mindset. The goal is clean, maintainable code that solves real business problems efficiently."
              />
            </div>
            <div>
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

// Skills Section (Based on your original content with new styling from Feature component)
const SkillSection = () => {
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
            className="bg-indigo-600 h-2 rounded-full" 
            style={{ width: `${level * 10}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Skill Item Component
  const SkillItem = ({ text }: { text: string }) => {
    return (
      <div className="flex items-center">
        <CheckCircle size={16} className="text-indigo-600 mr-2" />
        <span className="text-slate-700">{text}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Technical Toolkit</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Skills & Expertise
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-2">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-2 flex items-center">
              <Code size={20} className="mr-2 text-indigo-600" />
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
          
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-2 flex items-center">
              <Server size={20} className="mr-2 text-indigo-600" />
              Technologies & Tools
            </h3>
            
            <div className="grid grid-cols-1 gap-y-2 gap-x-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Database size={16} className="text-indigo-600 mr-2" />
                  Databases
                </h4>
                <div className="grid grid-cols-2 gap-2 pl-6">
                  <SkillItem text="PostgreSQL" />
                  <SkillItem text="MySQL" />
                  <SkillItem text="MS SQL" />
                </div>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Layout size={16} className="text-indigo-600 mr-2" />
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
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Server size={16} className="text-indigo-600 mr-2" />
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
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <BookOpen size={16} className="text-indigo-600 mr-2" />
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
      </div>
    </div>
  );
};

// CTA Section (inspired by examplestwui_ctablue.js)
const CTA = () => {
  return (
    <div className="bg-indigo-700">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            See how I translate creative thinking into elegant code
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-indigo-200">
            Check out my case study on building a mission-critical access control system to see how I apply creative problem-solving and technical excellence in practice.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/case-study"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Case Study
            </Link>
            <Link href="/contact" className="text-sm/6 font-semibold text-white">
              Contact Me →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Philosophy />
      <PersonalApproach />
      <SkillSection />
      <CTA />
    </>
  );
};

export default HomePage;