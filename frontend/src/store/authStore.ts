import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthResponse } from '@app-types/index';
import apiClient from '@services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email?: string;
    phone?: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post<AuthResponse>('/auth/login', {
            email,
            password,
          });
          const { token, refreshToken, user } = response.data;
          
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post<AuthResponse>('/auth/register', data);
          const { token, refreshToken, user } = response.data;
          
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      refreshUser: async () => {
        try {
          const response = await apiClient.get<User>('/users/me');
          set({ user: response.data });
        } catch (error) {
          console.error('Failed to refresh user:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
