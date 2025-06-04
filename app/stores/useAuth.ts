import { IUser } from '@/interfaces/models';
import { create } from 'zustand';

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  isLoginPromptOpen: boolean;
  openLoginPrompt: () => void;
  closeLoginPrompt: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  isLoginPromptOpen: false,
  openLoginPrompt: () => set({ isLoginPromptOpen: true }),
  closeLoginPrompt: () => set({ isLoginPromptOpen: false })
}));
