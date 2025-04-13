'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  
  const currentLocale = i18n.language;
  
  const languages = [
    { code: 'en', name: t('languageSelector.english') },
    { code: 'et', name: t('languageSelector.estonian') }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const changeLanguage = (locale: string) => {
    // Get the current path and redirect to the same path with the new locale
    const path = window.location.pathname;
    const newPath = currentLocale === 'en' 
      ? `/${locale}${path}` 
      : path.replace(`/${currentLocale}`, locale === 'en' ? '' : `/${locale}`);
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
        onClick={toggleDropdown}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{t('languageSelector.language')}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 w-full text-left ${
                currentLocale === language.code ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
              onClick={() => changeLanguage(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;