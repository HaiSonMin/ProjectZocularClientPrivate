'use client';

import { useAuthStore } from '@/app/stores/useAuth';
import { IUser } from '@/interfaces/models';
import { useEffect } from 'react';

export function AuthInitializer({ user }: { user: IUser | null }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
}
