// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getSupportedLocales } from '@/lib/dictionaries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reneprost.ee';
  const locales = getSupportedLocales();
  const routes = [
    '',                 // Home
    '/experience',      // Experience
    '/blog',            // Blog
    '/case-study',      // Case Study
    '/design-patterns', // Design Patterns
    '/homelab',         // Homelab
    '/about',           // About Me
    '/contact'          // Contact
  ];
  
  // Blog posts
  const blogPosts = [
    //'/blog/ai-powered-developer',
    //'/blog/raw-thoughts-ai-development',
    '/blog/mews-directo-integration',
    '/blog/conversations-with-ai'
  ];
  
  // Create sitemap entries for all locales and routes
  const entries: MetadataRoute.Sitemap = [];
  
  // Add entries for each locale and route combination
  locales.forEach(locale => {
    // Add routes
    routes.forEach(route => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
    
    // Add blog posts
    blogPosts.forEach(post => {
      entries.push({
        url: `${baseUrl}/${locale}${post}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });
  
  return entries;
}