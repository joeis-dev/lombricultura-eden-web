
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, Product } from '@app-types/index';
import apiClient from '@services/api';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  sessionId: string | null;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const generateSessionId = () => {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      sessionId: null,

      fetchCart: async () => {
        set({ isLoading: true });
        try {
          let sessionId = get().sessionId;
          if (!sessionId) {
            sessionId = generateSessionId();
            set({ sessionId });
          }

          const response = await apiClient.get<Cart>('/cart', {
            params: { sessionId },
          });
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      addItem: async (product: Product, quantity: number) => {
        set({ isLoading: true });
        try {
          let sessionId = get().sessionId;
          if (!sessionId) {
            sessionId = generateSessionId();
            set({ sessionId });
          }

          const response = await apiClient.post<Cart>('/cart/items', {
            productId: product.id,
            quantity,
            sessionId,
          });
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.put<Cart>(`/cart/items/${itemId}`, {
            quantity,
          });
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.delete<Cart>(`/cart/items/${itemId}`);
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      clearCart: async () => {
        set({ isLoading: true });
        try {
          await apiClient.delete('/cart');
          set({ cart: null, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getTotalItems: () => {
        const cart = get().cart;
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const cart = get().cart;
        if (!cart || !cart.items) return 0;
        return cart.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        sessionId: state.sessionId,
      }),
    }
  )
);
