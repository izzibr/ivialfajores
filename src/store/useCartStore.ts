import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem } from '../types';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      
      decreaseQuantity: (id) => set((state) => {
        const existingItem = state.items.find((i) => i.id === id);
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
