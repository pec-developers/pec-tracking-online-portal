import { create } from 'zustand';
import { api } from '../lib/api';

export type Role =
  | 'STUDENT'
  | 'FACULTY'
  | 'MENTOR'
  | 'CLASS_COORDINATOR'
  | 'HOD'
  | 'PRINCIPAL'
  | 'ADMIN'
  | 'PARENT';

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: Role;
  department?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password?: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },

  login: async (username: string, password = 'password123') => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.post('/auth/login', { username, password });
      const { accessToken, user } = data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token: accessToken, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Login failed', isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

