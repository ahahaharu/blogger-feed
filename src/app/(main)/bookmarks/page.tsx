'use client';

import { useBookmarks, useHasHydrated } from '@/store/useBookmarksStore';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookmarksPage() {
  const bookmarks = useBookmarks();
  const _hasHydrated = useHasHydrated();

  if (!_hasHydrated) {
    return (
      <main className="py-6">
        <h1 className="text-3xl font-bold mb-8">Мои закладки</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-70 w-full rounded-xl" />
          ))}
        </div>
      </main>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <main className="py-6">
        <h1 className="text-3xl font-bold mb-8">Мои закладки</h1>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4 border border-gray-100">
            <Bookmark className="size-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Здесь пока пусто
          </h2>
          <p className="text-gray-500 max-w-sm mb-6">
            Вы еще не добавили ни одного поста в закладки. Перейдите в ленту,
            чтобы найти что-нибудь интересное!
          </p>
          <Button asChild>
            <Link href="/posts">Перейти к ленте постов</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8">Мои закладки</h1>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {bookmarks.length} {bookmarks.length === 1 ? 'пост' : 'постов'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookmarks.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
