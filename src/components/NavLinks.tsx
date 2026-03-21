'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/posts', label: 'Лента' },
  { href: '/bookmarks', label: 'Закладки' },
];

export default function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex gap-6', className)}>
      {NAV_LINKS.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'transition-colors rounded-md',
              className?.includes('flex-col') ? 'px-3 py-2 text-base' : '',
              isActive
                ? 'text-black font-semibold bg-gray-100/50 md:bg-transparent'
                : 'text-gray-600 hover:text-black hover:bg-gray-50 md:hover:bg-transparent'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
