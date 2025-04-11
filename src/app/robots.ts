// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // If you have any admin pages
    },
    sitemap: 'https://reneprost.ee/sitemap.xml',
  };
}