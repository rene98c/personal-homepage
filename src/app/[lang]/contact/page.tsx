// src/app/[lang]/contact/page.tsx
import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import ContactForm from '@/components/contact/ContactForm';

// Contact page component - This is a Server Component
const ContactPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  
  // Load dictionary on the server
  const dictionary = await getDictionary(lang);

  // Pass the fully loaded dictionary to the client component
  return (
    <ContactForm lang={lang} dictionary={dictionary} />
  );
};

export default ContactPage;