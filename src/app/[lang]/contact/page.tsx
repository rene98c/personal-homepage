// src/app/[lang]/contact/page.tsx
import React from 'react';
import {   getDictionary } from '@/lib/dictionaries';
import ContactForm from '@/components/contact/ContactForm';

// Contact page component - This is a Server Component
const ContactPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  
  // Load dictionary on the server
  const dictionary = await getDictionary(lang);

  // Pass the fully loaded dictionary to the client component
  return (
    <ContactForm lang={lang} dictionary={dictionary} />
  );
};

export default ContactPage;