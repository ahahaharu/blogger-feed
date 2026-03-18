import { getPosts } from '@/api/api';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
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
          <Card key={post.id} className="flex flex-col h-full min-h-70">
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-600 line-clamp-3">{post.body}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> {post.views}
                </span>
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4" /> {post.reactions.likes}
                </span>
              </div>
              <Link
                href={`/posts/${post.id}`}
                className="flex items-center gap-1 text-black font-medium hover:text-gray-600 transition-colors"
              >
                Читать далее <ArrowRight className="w-4 h-4" />
              </Link>
            </CardFooter>
          </Card>
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
