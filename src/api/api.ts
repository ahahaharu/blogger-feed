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

export async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!res.ok) {
    throw new Error('Пост не найден');
  }

  return res.json();
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export async function getPostComments(
  postId: string
): Promise<CommentsResponse> {
  const res = await fetch(`https://dummyjson.com/posts/${postId}/comments`);

  if (!res.ok) {
    throw new Error('Не удалось загрузить комментарии');
  }

  return res.json();
}
