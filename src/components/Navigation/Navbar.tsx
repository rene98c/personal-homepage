'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Navbar component inspired by examplestwui_header2.js
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'Experience', href: '/experience', current: pathname === '/experience' },
    { name: 'Case Study', href: '/case-study', current: pathname === '/case-study' },
    { name: 'Design Patterns', href: '/design-patterns', current: pathname === '/design-patterns' },
    { name: 'Homelab', href: '/homelab', current: pathname === '/homelab' },
    { name: 'Contact', href: '/contact', current: pathname === '/contact' },
  ];

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Rene Prost</span>
            {/* <div className="h-8 w-auto text-2xl font-bold text-indigo-600">RP</div> */}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`text-sm font-semibold leading-6 ${item.current ? 'text-indigo-600' : 'text-gray-900 hover:text-indigo-600'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a 
            href="mailto:rene@bdec.ee" 
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Get in touch <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      
      {/* Mobile menu, show/hide based on menu open state */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Rene Prost</span>
              {/*   <div className="h-8 w-auto text-2xl font-bold text-indigo-600">RP</div> */}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                        item.current ? 'text-indigo-600' : 'text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="mailto:rene@bdec.ee"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;