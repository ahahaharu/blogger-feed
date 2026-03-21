import Link from 'next/link';
import { Button } from './ui/button';
import NavLinks from './NavLinks';
import { logout } from '@/lib/actions';
import { auth } from '@/auth';
import Image from 'next/image';

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 border-b bg-white p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-2xl font-bold">
            BloggerFeed
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          {session?.user && (
            <div className="flex items-center gap-3 mr-2 border-r pr-4 border-gray-200">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'Аватар'}
                  width={32}
                  height={32}
                  className="rounded-full bg-gray-100 object-cover"
                />
              ) : (
                <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
              )}

              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {session.user.name}
              </span>
            </div>
          )}
          <form action={logout}>
            <Button variant="outline" type="submit">
              Выйти
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
