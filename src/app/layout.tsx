import './globals.css';
import type { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'Rene Prost - Software Developer Portfolio',
  description: 'Senior C#/.NET developer with 20+ years of experience building robust, maintainable software systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}