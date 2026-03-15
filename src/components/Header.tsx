import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const NAV_LINKS = [
  { href: '/posts', label: 'Лента' },
  { href: '/bookmarks', label: 'Закладки' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          BloggerFeed
        </Link>

        <nav className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <Button variant="outline">Войти</Button>
        </div>
      </div>
    </header>
  );
}
