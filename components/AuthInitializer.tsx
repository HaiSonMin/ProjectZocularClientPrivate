'use client';

import { useAuthStore } from '@/app/stores/useAuth';
import { User } from '@/interfaces/models/IUser.interface';
import { useEffect } from 'react';

export function AuthInitializer({ user }: { user: User | null }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return null;
}
