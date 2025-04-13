// src/lib/dictionaries.ts

export type Locale = 'en' | 'et';

// Dictionary cache to avoid reloading
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

export const getDictionary = async (locale: Locale) => {
  // Check if dictionary is already in cache
  const cacheKey = `dictionary-${locale}`;
  if (dictionaryCache[cacheKey]) {
    return dictionaryCache[cacheKey];
  }

  try {
    // Load all sections
    const common = await import(`../dictionaries/${locale}/common.json`).then(m => m.default);
    const home = await import(`../dictionaries/${locale}/home.json`).then(m => m.default);
    const contact = await import(`../dictionaries/${locale}/contact.json`).then(m => m.default);
    const blog = await import(`../dictionaries/${locale}/blog.json`).then(m => m.default);
    const caseStudy = await import(`../dictionaries/${locale}/caseStudy.json`).then(m => m.default);
    const designPatterns = await import(`../dictionaries/${locale}/designPatterns.json`).then(m => m.default);
    const homelab = await import(`../dictionaries/${locale}/homelab.json`).then(m => m.default);
    const experience = await import(`../dictionaries/${locale}/experience.json`).then(m => m.default);
    const skills = await import(`../dictionaries/${locale}/skills.json`).then(m => m.default);
    const certifications = await import(`../dictionaries/${locale}/certifications.json`).then(m => m.default);
    const education = await import(`../dictionaries/${locale}/education.json`).then(m => m.default);

    // Recreate the same structure as before so components can access translations the same way
    const dictionary = {
      common,
      home,
      contact,
      blog,
      caseStudy,
      designPatterns,
      homelab,
      experience,
      skills,
      certifications,
      education
    };

    // Cache the result
    dictionaryCache[cacheKey] = dictionary;
    return dictionary;
  } catch (error) {
    console.error(`Failed to load dictionary for locale ${locale}:`, error);
    throw error;
  }
};

// Helper function to get supported locales
export const getSupportedLocales = (): Locale[] => {
  return ['en', 'et'];
};

// Get the default locale
export const getDefaultLocale = (): Locale => {
  return 'en';
};