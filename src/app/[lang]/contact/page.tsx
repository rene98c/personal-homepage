import React from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import ContactForm from '@/components/contact/ContactForm';

// Contact page component
const ContactPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <ContactForm lang={lang} dictionary={dictionary} />
  );
};

export default ContactPage;