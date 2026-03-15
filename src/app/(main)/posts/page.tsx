import { getPosts } from '@/api/api';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

export default async function PostsPage() {
  const data = await getPosts();

  return (
    <main className="py-6">
      <h1 className="text-3xl font-bold mb-8">Лента постов</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="text-black font-medium hover:underline"
              >
                Читать далее
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
