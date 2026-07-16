'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';

interface StickyAddBarProps {
  product: Product;
  isVisible: boolean;
  onAdd: () => void;
  disabled?: boolean;
}

export function StickyAddBar({ product, isVisible, onAdd, disabled }: StickyAddBarProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR', { minimumFractionDigits: 2 }).replace('.', ',') + ' €';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#1A1A1A]/10 px-4 py-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden flex flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-sans text-[10px] font-bold text-[#1A1A1A] uppercase truncate">
              {product.name}
            </span>
            <span className="font-sans text-[10px] text-[#666666]">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={onAdd}
            disabled={disabled}
            className={`shrink-0 px-6 py-3 bg-[#1A1A1A] text-white font-sans text-[11px] uppercase tracking-wide rounded-none focus:outline-none
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1A1A1A]/90 active:bg-black'}
            `}
          >
            AJOUTER
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
