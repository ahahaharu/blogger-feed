import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PostDetailsLoading() {
  return (
    <main className="py-10 max-w-3xl mx-auto w-full">
      <Button
        variant="ghost"
        asChild
        className="mb-8 -ml-4 text-gray-500 pointer-events-none"
      >
        <div>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к ленте
        </div>
      </Button>

      <article>
        <div className="space-y-3 mb-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </div>

        <div className="flex gap-2 mb-8">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        <div className="flex gap-6 mb-10 pb-6 border-b">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </article>

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
    </main>
  );
}
