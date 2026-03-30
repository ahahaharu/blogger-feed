import { Post } from '@/api/api';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BookmarksState {
  bookmarks: Post[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addBookmark: (post: Post) => void;
  removeBookmark: (postId: number) => void;
  isBookmarked: (postId: number) => boolean;
}

const initialState = {
  bookmarks: [],
  _hasHydrated: false,
};

export const useBookmarksStore = create<BookmarksState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setHasHydrated: (state) =>
          set({ _hasHydrated: state }, false, 'bookmarks/setHydrated'),

        addBookmark: (post) =>
          set(
            (state) => {
              if (!state.bookmarks.find((b) => b.id === post.id)) {
                return { bookmarks: [...state.bookmarks, post] };
              }
              return state;
            },
            false,
            'bookmarks/addBookmark'
          ),

        removeBookmark: (postId) =>
          set(
            (state) => ({
              bookmarks: state.bookmarks.filter((b) => b.id !== postId),
            }),
            false,
            'bookmarks/removeBookmark'
          ),

        isBookmarked: (postId) => get().bookmarks.some((b) => b.id === postId),
      }),
      {
        name: 'bookmarks-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
);

export const useBookmarks = () => useBookmarksStore((state) => state.bookmarks);
export const useAddBookmark = () =>
  useBookmarksStore((state) => state.addBookmark);
export const useRemoveBookmark = () =>
  useBookmarksStore((state) => state.removeBookmark);
export const useIsBookmarked = (postId: number) =>
  useBookmarksStore((state) => state.bookmarks.some((b) => b.id === postId));
export const useHasHydrated = () =>
  useBookmarksStore((state) => state._hasHydrated);
