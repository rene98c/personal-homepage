'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/dictionaries';

// Navbar component that accepts a pre-loaded dictionary
const Navbar = ({ lang, dictionary }: { lang: Locale; dictionary: any }) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get the path without the language prefix
  const pathWithoutLang = pathname.replace(`/${lang}`, '');

  // Create navigation items using the dictionary
  const navigation = [
    { name: dictionary.common.home, href: `/${lang}`, current: pathWithoutLang === '' },
    { name: dictionary.common.experience, href: `/${lang}/experience`, current: pathWithoutLang === '/experience' },
    { name: dictionary.common.blog, href: `/${lang}/blog`, current: pathWithoutLang === '/blog' || pathWithoutLang.startsWith('/blog/') },
    { name: dictionary.common.caseStudy, href: `/${lang}/case-study`, current: pathWithoutLang === '/case-study' },
    { name: dictionary.common.designPatterns, href: `/${lang}/design-patterns`, current: pathWithoutLang === '/design-patterns' },
    { name: dictionary.common.homelab, href: `/${lang}/homelab`, current: pathWithoutLang === '/homelab' },
    { name: dictionary.common.contact, href: `/${lang}/contact`, current: pathWithoutLang === '/contact' },
  ];

  // Languages for the language switcher
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'et', name: 'Eesti' },
  ];

  // Function to get the URL with the switched language
  const getLanguageSwitchUrl = (newLang: string) => {
    return `/${newLang}${pathWithoutLang}`;
  };

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Rene Prost</span>
            <Image 
              src="/logo.png" 
              alt="Rene Prost Logo" 
              width={64} 
              height={64} 
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`text-sm font-semibold leading-6 ${item.current ? 'text-indigo-600' : 'text-gray-900 hover:text-indigo-600'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center px-3 py-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 border border-gray-200 rounded-md">
              <Globe className="h-5 w-5 mr-1" />
              <span>{languages.find(l => l.code === lang)?.name}</span>
            </button>
            <div className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1">
                {languages.map(language => (
                  <Link
                    key={language.code}
                    href={getLanguageSwitchUrl(language.code)}
                    className={`block px-4 py-2 text-sm ${lang === language.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {language.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a 
            href={`mailto:rene98c@gmail.com`} 
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            {dictionary.common.getInTouch} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      
      {/* Mobile menu, show/hide based on menu open state */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <Link href={`/${lang}`} className="-m-1.5 p-1.5">
                <span className="sr-only">Rene Prost</span>
                <Image 
                  src="/logo.png" 
                  alt="Rene Prost Logo" 
                  width={32} 
                  height={32} 
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                        item.current ? 'text-indigo-600' : 'text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {/* Language options in mobile menu */}
                  <div className="mb-4">
                    <p className="px-3 text-sm font-medium text-gray-500 mb-2">Language / Keel</p>
                    <div className="space-y-1">
                      {languages.map(language => (
                        <Link
                          key={language.code}
                          href={getLanguageSwitchUrl(language.code)}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                            lang === language.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                          {language.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <a
                    href="mailto:rene98c@gmail.com"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {dictionary.common.getInTouch}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;