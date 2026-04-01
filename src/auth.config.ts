import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        nextUrl.pathname.startsWith('/posts') ||
        nextUrl.pathname.startsWith('/bookmarks');

      const isLoginPage = nextUrl.pathname.startsWith('/login');

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/posts', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
