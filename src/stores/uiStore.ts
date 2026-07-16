import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,

  openMobileMenu: () => set({ isMobileMenuOpen: true, isSearchOpen: false, isCartOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openSearch: () => set({ isSearchOpen: true, isMobileMenuOpen: false, isCartOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),

  openCart: () => set({ isCartOpen: true, isMobileMenuOpen: false, isSearchOpen: false }),
  closeCart: () => set({ isCartOpen: false }),

  closeAll: () => set({ isMobileMenuOpen: false, isSearchOpen: false, isCartOpen: false }),
}));
