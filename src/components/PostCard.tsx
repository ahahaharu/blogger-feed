import { Post } from '@/api/api';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ArrowRight, Eye, ThumbsUp } from 'lucide-react';
import BookmarkButton from './BookmarkButton';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card key={post.id} className="flex flex-col h-full min-h-70">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
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
            <Eye className="size-4" /> {post.views}
          </span>
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="size-4" /> {post.reactions.likes}
          </span>
          <BookmarkButton post={post} className="size-4" />
        </div>
        <Link
          href={`/posts/${post.id}`}
          className="flex items-center gap-1 text-black font-medium hover:text-gray-600 transition-colors"
        >
          Читать далее <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
