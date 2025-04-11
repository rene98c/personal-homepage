// src/components/Navigation/Sidebar.tsx
'use client';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, FileText, Code, Mail } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <nav className="w-full md:w-64 bg-slate-800 p-6">
      <ul className="space-y-2">
        <NavItem 
          icon={<Home size={18} />} 
          text="Home" 
          isActive={pathname === '/'} 
          href="/" 
        />
        <NavItem 
          icon={<Briefcase size={18} />} 
          text="Experience" 
          isActive={pathname === '/experience'} 
          href="/experience" 
        />
        <NavItem 
          icon={<FileText size={18} />} 
          text="Case Study" 
          isActive={pathname === '/case-study'} 
          href="/case-study" 
        />
        <NavItem 
          icon={<Code size={18} />} 
          text="Design Patterns" 
          isActive={pathname === '/design-patterns'} 
          href="/design-patterns" 
        />
        <NavItem 
          icon={<Mail size={18} />} 
          text="Contact" 
          isActive={pathname === '/contact'} 
          href="/contact" 
        />
      </ul>
    </nav>
  );
};

export default Sidebar;