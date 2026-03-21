'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/posts', label: 'Лента' },
  { href: '/bookmarks', label: 'Закладки' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {NAV_LINKS.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              isActive
                ? 'text-black font-semibold'
                : 'text-gray-600 hover:text-black'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
