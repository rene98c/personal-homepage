'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, AlertCircle } from 'lucide-react';
import { Locale } from '@/lib/dictionaries';

// Contact form component that accepts a pre-loaded dictionary
const ContactForm = ({  dictionary }: { lang: Locale, dictionary: any }) => {// eslint-disable-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call our API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Success
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you as soon as possible.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          error: false,
          message: ''
        });
      }, 5000);
      
    } catch (error) {
      // Error
      setFormStatus({
        submitted: true,
        error: true,
        message: error instanceof Error ? error.message : 'An error occurred. Please try again later.'
      });
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          ...formStatus,
          submitted: false
        });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full stroke-gray-200"
              >
                <defs>
                  <pattern
                    id="pattern-1"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#pattern-1)" />
              </svg>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
              {dictionary.contact.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {dictionary.contact.description}
            </p>
            <p className="mt-4 text-lg leading-8 text-indigo-600 italic">
              {dictionary.contact.note}
            </p>
            <dl className="mt-10 space-y-6 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-indigo-600" aria-hidden="true" />
                </dt>
                <dd>
                  <a href="mailto:rene@bdec.ee" className="text-indigo-600 hover:text-indigo-500">
                    rene@bdec.ee
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a href="https://github.com/rene98c" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                    github.com/rene98c
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a href="https://www.linkedin.com/in/rene-prost-371643104/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                    linkedin.com/in/rene-prost-371643104
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Location</span>
                  <MapPin className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  {dictionary.contact.location}
                  <p className="mt-1">
                    {dictionary.contact.locationDescription}
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <form action="#" method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48" onSubmit={handleSubmit}>
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            {formStatus.submitted && (
              <div className={`mb-6 rounded-md ${formStatus.error ? 'bg-red-50' : 'bg-green-50'} p-4`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {formStatus.error ? (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${formStatus.error ? 'text-red-800' : 'text-green-800'}`}>
                      {formStatus.error ? dictionary.contact.form.error : dictionary.contact.form.success}
                    </h3>
                    <div className={`mt-2 text-sm ${formStatus.error ? 'text-red-700' : 'text-green-700'}`}>
                      <p>{formStatus.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                  {dictionary.contact.form.name}
                </label>
                <div className="mt-2.5">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                  {dictionary.contact.form.email}
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900">
                  {dictionary.contact.form.subject}
                </label>
                <div className="mt-2.5">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                  {dictionary.contact.form.message}
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? dictionary.contact.form.sending : dictionary.contact.form.submit}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;