import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  
  // Actions
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  addGiftItem: (product: Product, color: string, linkedToItemId: string, originalValue: number) => void;
  updateGiftColor: (giftItemId: string, color: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  applyPromoCode: (code: string) => { success: boolean, message: string };
  removePromoCode: () => void;
  
  // Computed (these will be accessed differently in Zustand but it's easier to use a hook or plain functions)
  totalItems: () => number;
  subtotal: () => number;
  promoDiscount: () => number;
  isFreeShipping: () => boolean;
  amountToFreeShipping: () => number;
}

const FREE_SHIPPING_THRESHOLD = 0;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,

      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const itemId = `${product.id}-${size}-${color}`;
          const existingItemIndex = state.items.findIndex(item => item.id === itemId);

          if (existingItemIndex > -1) {
            // Update existing item
            const newItems = [...state.items];
            const newQuantity = Math.min(newItems[existingItemIndex].quantity + quantity, 10);
            newItems[existingItemIndex].quantity = newQuantity;
            return { items: newItems, isOpen: true };
          }

          // Add new item
          return {
            items: [...state.items, { 
              id: itemId, 
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.images[0].src,
              size, 
              color, 
              quantity: Math.min(quantity, 10) 
            }],
            isOpen: true
          };
        });
      },

      addGiftItem: (product, color, linkedToItemId, originalValue) => {
        set((state) => {
          const giftId = `GIFT-${linkedToItemId}`;
          const existingItemIndex = state.items.findIndex(item => item.id === giftId);

          const linkedItem = state.items.find(item => item.id === linkedToItemId);
          const quantity = linkedItem ? linkedItem.quantity : 1;

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].color = color;
            newItems[existingItemIndex].quantity = quantity;
            return { items: newItems };
          }

          return {
            items: [...state.items, {
              id: giftId,
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: 0, // gift is free
              image: product.colors.find(c => c.slug === color)?.image || '',
              size: 'Standard',
              color,
              quantity,
              isGift: true,
              linkedToItemId,
              originalValue
            }]
          };
        });
      },

      updateGiftColor: (giftItemId, color) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === giftItemId
              ? { ...item, color, image: state.items.find(i => i.id === giftItemId)?.image || '' } // Could improve image selection, but acceptable
              : item
          )
        }));
      },

      removeItem: (itemId) => {
        set((state) => ({
          // Remove the item and any gift linked to it
          items: state.items.filter(item => item.id !== itemId && item.linkedToItemId !== itemId)
        }));
      },

      updateQuantity: (itemId, quantity) => {
        const newQuantity = Math.max(1, Math.min(quantity, 10));
        set((state) => ({
          items: state.items.map(item => 
            item.id === itemId || item.linkedToItemId === itemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        }));
      },

      clearCart: () => set({ items: [], promoCode: null }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      applyPromoCode: (code) => {
        const upperCode = code.toUpperCase().trim();
        const isDynamicLuli = /^LULI[A-Z0-9]{4}$/.test(upperCode);
        
        if (upperCode === 'BIENVENUE' || upperCode === 'PM10' || isDynamicLuli) {
          set({ promoCode: upperCode });
          return { success: true, message: 'Code promo appliqué !' };
        }
        return { success: false, message: 'Code promo invalide.' };
      },
      
      removePromoCode: () => set({ promoCode: null }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce((total, item) => {
          if (item.isGift) return total;
          return total + (item.price * item.quantity);
        }, 0);
      },
      
      promoDiscount: () => {
        const currentSubtotal = get().subtotal();
        const code = get().promoCode;
        if (!code) return 0;
        
        const isDynamicLuli = /^LULI[A-Z0-9]{4}$/.test(code);
        if (code === 'BIENVENUE' || isDynamicLuli) return currentSubtotal * 0.10; // 10%
        if (code === 'PM10') return currentSubtotal * 0.20; // 20%
        return 0;
      },

      isFreeShipping: () => {
        return (get().subtotal() - get().promoDiscount()) >= FREE_SHIPPING_THRESHOLD;
      },

      amountToFreeShipping: () => {
        const diff = FREE_SHIPPING_THRESHOLD - (get().subtotal() - get().promoDiscount());
        return diff > 0 ? diff : 0;
      }
    }),
    {
      name: 'luliyane-cart-storage',
      // Optionally, we could omit 'isOpen' from persistence if we want the drawer closed on reload
      partialize: (state) => ({ items: state.items, promoCode: state.promoCode }),
    }
  )
);