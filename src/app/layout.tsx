// src/app/layout.tsx
import type { Metadata } from 'next';
import Sidebar from '@/components/Navigation/Sidebar';
import './globals.css';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Rene Prost - Software Developer Portfolio',
  description: 'Senior C#/.NET developer with 20+ years of experience building robust, maintainable software systems, specializing in Clean Architecture and Design Patterns.',
  keywords: 'software developer, C#, .NET, design patterns, clean architecture, backend development, Rene Prost',
  authors: [{ name: 'Rene Prost' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reneprost.ee',
    siteName: 'Rene Prost - Software Developer Portfolio',
    title: 'Rene Prost - Senior C#/.NET Developer',
    description: 'C#/.NET specialist with expertise in robust, maintainable software systems and clean architecture',
    images: [
      {
        url: 'https://reneprost.ee/og-image.jpg', // Create this image
        width: 1200,
        height: 630,
        alt: 'Rene Prost - Software Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rene Prost - Senior C#/.NET Developer',
    description: 'C#/.NET specialist with expertise in robust, maintainable software systems and clean architecture',
    images: ['https://reneprost.ee/og-image.jpg'] // Same as OG image
  },
  robots: {
    index: true,
    follow: true
  }
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
<body className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #1e293b)' }}>
        {/* Header */}
        <header className="bg-slate-900 text-white shadow-md">
          <div className="container mx-auto py-4 px-6">
            <h1 className="text-2xl font-bold">Software Developer</h1>
            <p className="text-blue-200">C# / .NET Specialist</p>
          </div>
        </header>

        {/* Main Content Area with Sidebar */}
        <div className="flex flex-col md:flex-row flex-grow">
          {/* Sidebar/Navigation */}
          <Sidebar />
          <StructuredData />
          {/* Main Content */}
        <main className="flex-grow p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
  {children}
</main>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-4 px-6 text-center">
          <p>© {new Date().getFullYear()} - Professional Software Developer Portfolio</p>
        </footer>
      </body>
    </html>
  );
}