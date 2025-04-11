// Component to add to your homepage
import Script from 'next/script';

export function StructuredData() {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rene Prost",
    "jobTitle": "Senior Software Developer",
    "description": "C#/.NET specialist with over 20 years of experience building robust, maintainable software systems",
    "url": "https://reneprost.ee",
    "sameAs": [
      "https://github.com/rene98c",
      "https://www.linkedin.com/in/rene-prost-371643104"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Novater OÜ" // Your current employer
    },
    "knowsAbout": [
      "C#", ".NET Core", "Design Patterns", "Clean Architecture", 
      "Web Services", "Domain-Driven Design", "React", 
      "Software Architecture", "PostgreSQL", "MySQL"
    ]
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rene Prost Software Development",
    "description": "Expert software development services specializing in .NET applications",
    "url": "https://reneprost.ee",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tartu",
      "addressRegion": "Tartumaa",
      "addressCountry": "Estonia"
    },
    "email": "rene@bdec.ee",
    "telephone": "+372XXXXXXXX", // Add your phone if you want to include it
    "makesOffer": [
      {
        "@type": "Offer",
        "name": ".NET Development Services",
        "description": "Custom .NET application development"
      },
      {
        "@type": "Offer",
        "name": "Software Architecture Consulting",
        "description": "Design and implementation of clean, maintainable software architectures"
      }
    ]
  };

  return (
    <>
      <Script 
        id="schema-person" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <Script 
        id="schema-service" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}

// Then add it to your main layout or home page
// <StructuredData />