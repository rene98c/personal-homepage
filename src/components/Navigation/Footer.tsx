'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/dictionaries';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};

// Footer component
const Footer = ({ lang }: { lang: Locale }) => {
  const [dictionary, setDictionary] = useState<any | null>(null);

  // Load the dictionary
  useEffect(() => {
    async function loadDictionary() {
      if (dictionaryCache[lang]) {
        setDictionary(dictionaryCache[lang]);
        return;
      }

      try {
        const dict = await getDictionary(lang);
        dictionaryCache[lang] = dict;
        setDictionary(dict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
      }
    }
    
    loadDictionary();
  }, [lang]);

  // Default navigation when dictionary isn't loaded yet
  const defaultNavigation = [
    { name: 'Home', href: `/${lang}` },
    { name: 'Experience', href: `/${lang}/experience` },
    { name: 'Case Study', href: `/${lang}/case-study` },
    { name: 'Design Patterns', href: `/${lang}/design-patterns` },
    { name: 'Contact', href: `/${lang}/contact` },
  ];

  // Use dictionary if available, otherwise fall back to default navigation
  const navigation = dictionary ? [
    { name: dictionary.common.home, href: `/${lang}` },
    { name: dictionary.common.experience, href: `/${lang}/experience` },
    { name: dictionary.common.caseStudy, href: `/${lang}/case-study` },
    { name: dictionary.common.designPatterns, href: `/${lang}/design-patterns` },
    { name: dictionary.common.contact, href: `/${lang}/contact` },
  ] : defaultNavigation;

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