// Update to src/lib/metadata.ts
import { Metadata } from 'next';
import { Locale } from './dictionaries';

// Base URL for your site
const baseUrl = 'https://reneprost.ee';

// Default image for Open Graph/Twitter
const defaultOgImage = '/og-image.jpg';

// Helper function to generate language-specific metadata
export async function generateLocalizedMetadata({
  title_en,
  title_et,
  description_en,
  description_et,
  path,
  locale,
  keywords_en = [],
  keywords_et = [],
  ogImage,
}: {
  title_en: string;
  title_et: string;
  description_en: string;
  description_et: string;
  path: string; // Path without leading slash or locale (e.g., 'blog/ai-powered-developer')
  locale: Locale;
  keywords_en?: string[];
  keywords_et?: string[];
  ogImage?: string;
}): Promise<Metadata> {
  // Use the correct language versions based on locale
  const title = locale === 'en' ? title_en : title_et;
  const description = locale === 'en' ? description_en : description_et;
  const keywords = locale === 'en' ? keywords_en : keywords_et;
  
  // Full URL for canonical
  const url = `${baseUrl}/${locale}/${path}`;
  
  // Image for Open Graph/Twitter
  const image = ogImage ? `${baseUrl}${ogImage}` : `${baseUrl}${defaultOgImage}`;
  
  // Alternate language versions
  const alternates: Record<string, string> = {};
  ['en', 'et'].forEach((lang) => {
    alternates[lang] = `${baseUrl}/${lang}/${path}`;
  });
  
  // Set locale tag for social media
  const ogLocale = locale === 'en' ? 'en_US' : 'et_EE';
  
  return {
    title,
    description,
    keywords: [locale === 'en' ? 'Rene Prost' : 'Rene Prost', ...keywords],
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: ogLocale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// For root layout
export async function generateRootLayoutMetadata(locale: Locale): Promise<Metadata> {
  if (locale === 'en') {
    return {
      title: {
        default: 'Rene Prost - Senior C#/.NET Developer',
        template: '%s | Rene Prost',
      },
      description: 'Senior C#/.NET developer with 20+ years of experience building robust, maintainable software systems, specializing in Clean Architecture and Design Patterns.',
      openGraph: {
        locale: 'en_US',
      }
    };
  } else {
    return {
      title: {
        default: 'Rene Prost - C#/.NET Tarkvaraarendaja',
        template: '%s | Rene Prost',
      },
      description: 'Kogenud C#/.NET arendaja rohkem kui 20-aastase kogemusega, spetsialiseerunud puhta arhitektuuri ja disainimustrite valdkonnas.',
      openGraph: {
        locale: 'et_EE',
      }
    };
  }
}

// For homepage
export async function generateHomePageMetadata(locale: Locale): Promise<Metadata> {
  return await generateLocalizedMetadata({
    title_en: 'Rene Prost - Senior C#/.NET Developer',
    title_et: 'Rene Prost - C#/.NET Tarkvaraarendaja',
    description_en: 'Senior C#/.NET developer with 20+ years of experience building robust, maintainable software systems.',
    description_et: 'Kogenud C#/.NET arendaja rohkem kui 20-aastase kogemusega, kes loob töökindlaid ja hästi hooldatavaid tarkvarasüsteeme.',
    path: '',
    locale,
    keywords_en: ['software developer', 'C#', '.NET', 'clean architecture'],
    keywords_et: ['tarkvaraarendaja', 'C#', '.NET', 'puhas arhitektuur'],
  });
}

// For about page
export async function generateAboutPageMetadata(locale: Locale): Promise<Metadata> {
  return await generateLocalizedMetadata({
    title_en: 'About Me - Rene Prost',
    title_et: 'Minust - Rene Prost',
    description_en: 'Learn more about Rene Prost, a senior C#/.NET developer with a focus on clean architecture and AI-augmented development.',
    description_et: 'Tutvu lähemalt Rene Prostiga, C#/.NET arendajaga, kes keskendub puhtale arhitektuurile ja AI-toega arendusele.',
    path: 'about',
    locale,
    keywords_en: ['about', 'personal journey', 'developer story', 'AI-augmented development'],
    keywords_et: ['minust', 'isiklik teekond', 'arendaja lugu', 'AI-toega arendus'],
  });
}

// General purpose metadata generator
export async function generateMetadata(
  locale: Locale, 
  path: string, 
  meta: {
    title_en: string,
    title_et: string,
    description_en: string,
    description_et: string,
    keywords_en?: string[],
    keywords_et?: string[]
  }
): Promise<Metadata> {
  return await generateLocalizedMetadata({
    title_en: meta.title_en,
    title_et: meta.title_et,
    description_en: meta.description_en,
    description_et: meta.description_et,
    path,
    locale,
    keywords_en: meta.keywords_en || [],
    keywords_et: meta.keywords_et || [],
  });
}

// For blog landing page
export async function generateBlogPageMetadata(locale: Locale): Promise<Metadata> {
  return await generateLocalizedMetadata({
    title_en: 'Blog - Rene Prost',
    title_et: 'Blogi - Rene Prost',
    description_en: 'Thoughts on software development, architecture, and resilience engineering.',
    description_et: 'Mõtisklused tarkvara arendusest, arhitektuurist ja vastupidavuse kujundamisest.',
    path: 'blog',
    locale,
    keywords_en: ['blog', 'software architecture', 'clean code'],
    keywords_et: ['blogi', 'tarkvaraarhitektuur', 'puhas kood'],
  });
}

// For case study page
export async function generateCaseStudyMetadata(locale: Locale): Promise<Metadata> {
  return await generateLocalizedMetadata({
    title_en: 'Case Study: Building Mission-Critical Access Control System',
    title_et: 'Projekt: Kriitilise ligipääsukontrolli süsteemi ehitamine',
    description_en: 'A detailed case study of SecureAccess - a mission-critical software system integrating biometric verification, access control, and permission systems.',
    description_et: 'Üksikasjalik projektinäide SecureAccess süsteemist - kriitilise tähtsusega tarkvarasüsteem, mis integreerib biomeetrilise tuvastamise, ligipääsukontrolli ja õiguste haldamise.',
    path: 'case-study',
    locale,
    keywords_en: ['case study', 'access control', 'biometric verification'],
    keywords_et: ['projekt', 'ligipääsukontroll', 'biomeetriline tuvastamine'],
  });
}