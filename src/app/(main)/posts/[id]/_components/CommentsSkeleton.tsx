import { Skeleton } from '@/components/ui/skeleton';

export default function CommentsSkeleton() {
  return (
    <div className="mt-12 pt-8 border-t space-y-6">
      <Skeleton className="h-8 w-48 mb-6" />
      {[1, 2].map((i) => (
        <div key={i} className="p-5 rounded-xl border border-gray-100">
          <div className="flex gap-3 items-center mb-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  );
}
