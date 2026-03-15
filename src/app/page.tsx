import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">BloggerFeed</h1>

      <p className="text-xl text-gray-500 mb-8 max-w-xl">
        Платформа для чтения и обсуждения статей. Пожалуйста, авторизуйтесь,
        чтобы получить доступ к ленте и закладкам.
      </p>

      <Link href="/login">
        <Button
          size="lg"
          className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800"
        >
          Войти в аккаунт
        </Button>
      </Link>
    </main>
  );
}
