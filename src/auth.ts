import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string().min(1),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          try {
            const res = await fetch('https://dummyjson.com/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username,
                password,
                expiresInMins: 60,
              }),
            });

            const user = await res.json();

            if (!res.ok) {
              console.log('Ошибка от API DummyJSON', user.message);
              return null;
            }

            return {
              id: user.id.toString(),
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              image: user.image,
            };
          } catch (error) {
            console.error('Ошибка сети при запросе к DummyJSON', error);
            return null;
          }
        }

        console.log('Невалидные данные формы авторизации');
        return null;
      },
    }),
  ],
});
