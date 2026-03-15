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

export async function getPosts(
  limit: number = 10,
  skip: number = 0
): Promise<DummyJSONResponse> {
  const res = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить посты');
  }

  return res.json();
}
