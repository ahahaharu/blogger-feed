import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function PostNotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[60vh]">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <FileQuestion className="w-12 h-12 text-gray-400" />
      </div>

      <h2 className="text-3xl font-bold tracking-tight mb-3">Пост не найден</h2>

      <p className="text-gray-500 mb-8 max-w-md">
        Кажется, вы перешли по неверной ссылке, или этот пост был удален
        автором.
      </p>

      <Button asChild size="lg">
        <Link href="/posts">Вернуться к ленте постов</Link>
      </Button>
    </main>
  );
}
