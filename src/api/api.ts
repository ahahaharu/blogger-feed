export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface DummyJSONResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = 'https://dummyjson.com';

export interface ApiTag {
  slug: string;
  name: string;
  url: string;
}

export async function getTags(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/posts/tags`, { cache: 'force-cache' });
  if (!res.ok) return [];

  const data: ApiTag[] = await res.json();

  return data.map((tag) => tag.slug);
}

interface GetPostsParams {
  limit?: number;
  skip?: number;
  searchQuery?: string;
  tag?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export async function getPosts({
  limit = 10,
  skip = 0,
  searchQuery = '',
  tag = '',
  sortBy = '',
  order = 'desc',
}: GetPostsParams): Promise<DummyJSONResponse> {
  let endpoint = `${BASE_URL}/posts`;
  if (searchQuery) {
    endpoint = `${BASE_URL}/posts/search`;
  } else if (tag && tag !== 'all') {
    endpoint = `${BASE_URL}/posts/tag/${tag}`;
  }

  const queryParams = new URLSearchParams();
  queryParams.append('limit', limit.toString());
  queryParams.append('skip', skip.toString());

  if (searchQuery) queryParams.append('q', searchQuery);
  if (sortBy && sortBy !== 'default') {
    queryParams.append('sortBy', sortBy);
    queryParams.append('order', order);
  }

  const finalUrl = `${endpoint}?${queryParams.toString()}`;

  const res = await fetch(finalUrl, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить посты');
  }

  return res.json();
}
