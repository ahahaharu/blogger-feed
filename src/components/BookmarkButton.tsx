'use client';

import { Post } from '@/api/api';
import {
  useAddBookmark,
  useHasHydrated,
  useIsBookmarked,
  useRemoveBookmark,
} from '@/store/useBookmarksStore';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  post: Post;
}

export default function BookmarkButton({ post }: BookmarkButtonProps) {
  const bookmarked = useIsBookmarked(post.id);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();
  const _hasHydrated = useHasHydrated();

  if (!_hasHydrated) {
    return (
      <Button variant="ghost" size="icon" disabled className="text-gray-300">
        <Bookmark className="w-5 h-5" />
      </Button>
    );
  }

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();

    if (bookmarked) {
      removeBookmark(post.id);
    } else {
      addBookmark(post);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleBookmark}
      className={cn(
        'transition-all duration-200 hover:bg-gray-100',
        bookmarked ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
      )}
    >
      <Bookmark
        className="w-5 h-5"
        fill={bookmarked ? 'currentColor' : 'none'}
      />
    </Button>
  );
}
