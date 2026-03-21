import Link from 'next/link';
import { Button } from './ui/button';
import NavLinks from './NavLinks';
import { logout } from '@/lib/actions';

export default async function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-2xl font-bold">
            BloggerFeed
          </Link>
          <NavLinks />
        </div>

        <form action={logout}>
          <Button variant="outline" type="submit">
            Выйти
          </Button>
        </form>
      </div>
    </header>
  );
}
