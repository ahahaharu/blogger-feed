import Link from 'next/link';
import { Button } from './ui/button';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import UserProfile from './UserProfile';
import { logout } from '@/lib/actions';
import { auth } from '@/auth';

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 border-b bg-white p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/posts" className="text-2xl font-bold">
          BloggerFeed
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <div className="w-px h-6 bg-gray-200 mx-2" />

          <UserProfile user={session?.user} />

          <form action={logout}>
            <Button variant="outline" type="submit">
              Выйти
            </Button>
          </form>
        </div>

        <MobileMenu>
          <NavLinks className="flex-col gap-2" />{' '}
          <div className="h-px w-full bg-gray-100 my-2" />
          <div className="flex flex-col gap-6 px-3">
            <UserProfile user={session?.user} />
            <form action={logout}>
              <Button
                variant="outline"
                type="submit"
                className="w-full justify-center py-6 text-base"
              >
                Выйти
              </Button>
            </form>
          </div>
        </MobileMenu>
      </div>
    </header>
  );
}
