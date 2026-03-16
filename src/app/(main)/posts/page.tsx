import React, { Suspense } from 'react';
import { getTags } from '@/api/api';
import { PostsFilters } from './_components/PostsFilters';
import { PostsList } from './_components/PostsList';
import { PostsSkeleton } from './_components/PostsSkeleton';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const suspenseKey = params.page || '1';
  const tags = await getTags();

  return (
    <main className="py-6">
      <h1 className="text-3xl font-bold mb-8">Лента постов</h1>

      <PostsFilters tags={tags} />

      <Suspense key={suspenseKey} fallback={<PostsSkeleton />}>
        <PostsList searchParams={params} />
      </Suspense>
    </main>
  );
}
