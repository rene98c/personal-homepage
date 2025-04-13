// Instead of using server-only, we'll make this work with both client and server components

// Dictionary loader function
const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    et: () => import('../dictionaries/et.json').then((module) => module.default),
  };
  
  export type Locale = keyof typeof dictionaries;
  
  export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
  };
  
  // Helper function to get supported locales
  export const getSupportedLocales = (): Locale[] => {
    return Object.keys(dictionaries) as Locale[];
  };
  
  // Get the default locale
  export const getDefaultLocale = (): Locale => {
    return 'en';
  };