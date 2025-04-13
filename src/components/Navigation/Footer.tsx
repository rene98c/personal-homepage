'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { Locale } from '@/lib/dictionaries';

// Footer component that accepts a pre-loaded dictionary
const Footer = ({ lang, dictionary }: { lang: Locale; dictionary: any }) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  // Create navigation items using the dictionary
  const navigation = [
    { name: dictionary.common.home, href: `/${lang}` },
    { name: dictionary.common.experience, href: `/${lang}/experience` },
    { name: dictionary.common.caseStudy, href: `/${lang}/case-study` },
    { name: dictionary.common.designPatterns, href: `/${lang}/design-patterns` },
    { name: dictionary.common.contact, href: `/${lang}/contact` },
  ];

  const social = [
    {
      name: 'GitHub',
      href: 'https://github.com/rene98c',
      icon: (props: React.ComponentProps<'svg'>) => <Github {...props} />,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rene-prost-371643104/',
      icon: (props: React.ComponentProps<'svg'>) => <Linkedin {...props} />,
    },
    {
      name: 'Email',
      href: 'mailto:rene@bdec.ee',
      icon: (props: React.ComponentProps<'svg'>) => <Mail {...props} />,
    },
    {
      name: 'Website',
      href: 'https://reneprost.ee',
      icon: (props: React.ComponentProps<'svg'>) => <Globe {...props} />,
    },
  ];

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-20 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-indigo-600">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-indigo-600">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Rene Prost. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;