import { getPostById } from '@/api/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import PostComments from './_components/PostComments';
import { Suspense } from 'react';
import CommentsSkeleton from './_components/CommentsSkeleton';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailsPage({ params }: Props) {
  const resolvedParams = await params;

  const post = await getPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="py-10 max-w-3xl mx-auto">
      <Button
        variant="ghost"
        asChild
        className="mb-8 -ml-4 text-gray-500 hover:text-black"
      >
        <Link href="/posts">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к ленте
        </Link>
      </Button>
      <article>
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-sm px-3 py1">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6 text-gray-500 mb-10 pb-6 border-b">
          <span className="flex items-center gap-2">
            <Eye className="w-5 h-5" /> {post.views} просмотров
          </span>
          <span className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" /> {post.reactions.likes} лайков
          </span>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p className="whitespace-pre-wrap">{post.body}</p>
        </div>
      </article>
      <Suspense fallback={<CommentsSkeleton />}>
        <PostComments postId={resolvedParams.id} />
      </Suspense>
    </main>
  );
}
