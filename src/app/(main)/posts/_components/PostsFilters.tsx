'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PostsFiltersProps {
  tags: string[];
}

export function PostsFilters({ tags }: PostsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== 'default') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');

    if (key == 'searchQuery') params.delete('tag');
    if (key === 'tag') params.delete('searchQuery');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQueryParams('searchQuery', term);
  }, 500);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          className="pl-9"
          placeholder="Поиск по статьям..."
          defaultValue={searchParams.get('searchQuery'?.toString()) || ''}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Select
        value={searchParams.get('tag') || 'all'}
        onValueChange={(val) => updateQueryParams('tag', val)}
      >
        <SelectTrigger className="w-full md:w-50">
          <SelectValue placeholder="Выберите тег" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все теги</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('sortBy') || 'default'}
        onValueChange={(val) => updateQueryParams('sortBy', val)}
      >
        <SelectTrigger className="w-full md:w-50">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">По умолчанию</SelectItem>
          <SelectItem value="title">По алфавиту</SelectItem>
          <SelectItem value="views">По просмотрам</SelectItem>
          <SelectItem value="reactions">По лайкам</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
