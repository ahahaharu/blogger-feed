'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/posts', label: 'Лента' },
  { href: '/bookmarks', label: 'Закладки' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b bg-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          BloggerFeed
        </Link>

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

        <div>
          <Button variant="outline">Выйти</Button>
        </div>
      </div>
    </header>
  );
}
