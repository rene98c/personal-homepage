import { redirect } from 'next/navigation';

// This is just a fallback in case the middleware doesn't redirect
export default function RootPage() {
  redirect('/en');
  return null;
}