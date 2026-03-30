import { getPosts } from '@/api/api';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { generatePagination } from '@/lib/utils';
import PostCard from '@/components/PostCard';

interface PostsListProps {
  searchParams: { [key: string]: string | undefined };
}

export async function PostsList({ searchParams }: PostsListProps) {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.searchQuery || '';
  const tag = searchParams.tag || '';
  const sortBy = searchParams.sortBy || '';
  const order = sortBy === 'title' ? 'asc' : 'desc';

  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const data = await getPosts({ limit, skip, searchQuery, tag, sortBy, order });
  const totalPages = Math.ceil(data.total / limit);
  const pages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('page', pageNumber.toString());
    return `/posts?${params.toString()}`;
  };

  if (data.posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-500mb-10">
        <p className="text-lg font-medium text-gray-900 mb-2">
          Постов не найдено
        </p>
        <p>Попробуйте изменить параметры поиска или выбрать другой тег.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {pages.map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? createPageURL(currentPage + 1)
                    : '#'
                }
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
