// src/app/layout.tsx
import type { Metadata } from 'next';
import Sidebar from '@/components/Navigation/Sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Professional Portfolio - Software Developer',
  description: 'C#/.NET Development Portfolio',
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