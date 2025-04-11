'use client'
import React, { useState } from 'react';
import { Mail, Globe, Send, User, Code, MapPin } from 'lucide-react';

// Contact Method Component
const ContactMethod = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <p className="font-medium text-gray-700">{label}</p>
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {value}
        </a>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, you would handle form submission to a backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-2">Contact Me</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Connect With Me</h3>
          
          <p className="text-slate-700 mb-6">
            While I&apos;m currently engaged in a professional role, I&apos;m open to discussing 
            interesting projects, technical challenges, or connecting with fellow developers. 
            I prefer written communication where I can articulate technical ideas clearly and thoughtfully.
          </p>
          
          <div className="space-y-4">
            <ContactMethod 
              icon={<Mail size={20} className="text-blue-600" />}
              label="Email"
              value="rene@bdec.ee"
              href="mailto:rene@bdec.ee"
            />
            
            <ContactMethod 
              icon={<Code size={20} className="text-slate-700" />}
              label="GitHub"
              value="https://github.com/rene98c"
              href="https://github.com/rene98c"
            />
            
            <ContactMethod 
              icon={<User size={20} className="text-blue-600" />}
              label="LinkedIn"
              value="https://www.linkedin.com/in/rene-prost-371643104"
              href="https://www.linkedin.com/in/rene-prost-371643104/"
            />
            
            <ContactMethod 
              icon={<Globe size={20} className="text-green-600" />}
              label="Portfolio"
              value="reneprost.ee"
              href="https://reneprost.ee"
            />
          </div>
  <h3 className="text-xl mt-4 font-semibold mb-4 text-gray-700">Location</h3>
  <div className="flex items-start">
    <MapPin size={20} className="text-red-500 mr-3 mt-1" />
    <div>
      <p className="text-gray-600 mb-3">
        Based near Tartu, Estonia
      </p>
      <p className="text-gray-600">
        I enjoy the focus that comes with countryside living, providing the perfect environment for deep coding sessions.
      </p>
    </div>
  </div>
        </div>
        
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Send Me a Message</h3>
          
          {formSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
              <p className="font-medium">Thank you for your message!</p>
              <p>I&apos;ll get back to you as soon as possible.</p>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-700 font-medium mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-slate-700 font-medium mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-slate-700 font-medium mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Send size={16} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}