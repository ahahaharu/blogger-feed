'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      const customMessage = error.cause?.err?.message;

      if (customMessage) {
        return customMessage;
      }

      switch (error.type) {
        case 'CredentialsSignin':
          return 'Неверное имя пользователя или пароль.';
        default:
          return 'Произошла неизвестная ошибка при авторизации.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
