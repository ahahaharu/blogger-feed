import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function PostsLoading() {
  return (
    <main className="py-6">
      <h1 className="text-3xl font-bold mb-8">Лента постов</h1>

      <Skeleton className="h-18 w-full mb-8 rounded-xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col h-62.5">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
