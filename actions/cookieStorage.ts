'use server';

import { cookies } from 'next/headers';

export type StoreKey = 'actoken' | 'retoken' | 'user_id';

export async function storeCookie(token: any, key: StoreKey) {
  cookies().set({
    name: key,
    value: JSON.stringify(token),
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  });
}

export async function clearCookie(key: StoreKey) {
  cookies().delete(key);
}

export async function getCookie(key: StoreKey) {
  return cookies().get(key);
}
