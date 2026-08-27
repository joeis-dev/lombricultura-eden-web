import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@app-types/index';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity: number, variant?: ProductVariant) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const getItemId = (product: Product, variant?: ProductVariant) =>
  variant ? `${product.id}-${variant.id}` : product.id;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      fetchCart: async () => {
        set({ isLoading: false });
      },

      addItem: async (product, quantity, variant) => {
        const items = [...get().items];
        const id = getItemId(product, variant);
        const existing = items.find((item) => item.id === id);
        const stock = variant?.stock ?? product.stock;

        if (existing) {
          existing.quantity = Math.min(existing.quantity + quantity, stock || 99);
        } else {
          const now = new Date().toISOString();
          items.push({
            id,
            cartId: 'local',
            product,
            variant,
            quantity: Math.min(quantity, stock || 99),
            createdAt: now,
            updatedAt: now,
          });
        }

        set({ items });
      },

      updateQuantity: async (itemId, quantity) => {
        const nextQuantity = Math.max(1, Math.floor(quantity));
        const items = get().items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: nextQuantity, updatedAt: new Date().toISOString() }
            : item
        );
        set({ items });
      },

      removeItem: async (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      clearCart: async () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const unitPrice = item.variant ? item.variant.price : item.product.price;
          return total + unitPrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);