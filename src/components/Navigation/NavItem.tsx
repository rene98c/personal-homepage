// src/components/Navigation/NavItem.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const NavItem = ({ icon, text, isActive, href }: { icon: React.ReactNode, text: string, isActive: boolean, href: string }) => {
  return (
    <li>
      <Link 
        href={href}
        className={`flex items-center w-full p-2 rounded transition-colors ${
          isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
        {isActive && <ChevronRight size={16} className="ml-auto" />}
      </Link>
    </li>
  );
};

export default NavItem;