import { getPostComments } from '@/api/api';
import { MessageSquare, ThumbsUp } from 'lucide-react';

export default async function PostComments({ postId }: { postId: string }) {
  const data = await getPostComments(postId);

  console.log(data);

  if (!data.comments || data.comments.length === 0) {
    return (
      <div className="mt-12 pt-8 border=t text-gray-500">
        Пока нет комментариев.
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Комментарии ({data.total})
      </h3>

      <div className="space-y-6">
        {data.comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex items=center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                {comment.user.fullName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {comment.user.fullName}
                </div>
                <div className="text-xs text-gray-500">
                  @{comment.user.username}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{comment.body}</p>

            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4" /> {comment.likes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
