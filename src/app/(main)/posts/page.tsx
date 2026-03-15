import { getPosts, getTags } from '@/api/api';
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
import { PostsFilters } from '@/components/PostsFilters';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.searchQuery || '';
  const tag = params.tag || '';
  const sortBy = params.sortBy || '';

  const order = sortBy === 'title' ? 'asc' : 'desc';

  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const [data, tags] = await Promise.all([
    getPosts({ limit, skip, searchQuery, tag, sortBy, order }),
    getTags(),
  ]);

  const totalPages = Math.ceil(data.total / limit);
  const pages = generatePagination(currentPage, totalPages);

  return (
    <main className="py-6">
      <h1 className="text-3xl font-bold mb-8">Лента постов</h1>

      <PostsFilters tags={tags} />

      {data.posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Постов не найдено. Попробуйте изменить параметры поиска.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {data.posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
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
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `/posts?page=${currentPage - 1}` : '#'}
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
                    href={`/posts?page=${page}`}
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
                    ? `/posts?page=${currentPage + 1}`
                    : '#'
                }
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
    </main>
  );
}
