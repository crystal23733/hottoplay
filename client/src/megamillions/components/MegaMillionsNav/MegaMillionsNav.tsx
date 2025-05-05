'use client';

import Link from 'next/link';
import navItems from './constants/navItems';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const MegaMillionsNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col sm:flex-row gap-2 mb-8">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'flex-1 justify-center sm:justify-start',
            pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          <item.icon className="h-4 w-4" />
          <span className="font-medium">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MegaMillionsNav;
