import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col h-62.5">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="flex-1">
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
