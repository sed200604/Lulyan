'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { formatEUR } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StickyAddToCartProps {
  product: Product;
}

export function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const originalButton = document.getElementById('add-to-cart-button');
    if (!originalButton) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar only if we've scrolled PAST the original button
        // (i.e. it's not intersecting AND it's above the viewport)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      },
      { threshold: 0 }
    );
    
    observer.observe(originalButton);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    const originalButton = document.getElementById('add-to-cart-button');
    if (originalButton) {
      originalButton.click();
      
      // Assume the add to cart will succeed if there's no error message currently displayed
      // Wait a tiny bit to see if the original button triggers an error (which would scroll the page)
      setTimeout(() => {
        const hasError = document.querySelector('.text-red-500') !== null;
        if (!hasError) {
          setIsAdding(true);
          setTimeout(() => setIsAdding(false), 2000);
        }
      }, 50);
    }
  };

  return (
    <AnimatePresence>
      {showStickyBar && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-100 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-montserrat text-neutral-800 truncate">
                {product.name}
              </p>
              <p className="text-sm font-montserrat font-medium text-neutral-900">
                {formatEUR(product.price)}
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="px-6 py-3 bg-neutral-900 text-white text-xs font-montserrat tracking-[0.2em] uppercase whitespace-nowrap active:bg-gold-500 transition-colors w-[140px] flex justify-center disabled:opacity-50"
            >
              {isAdding ? <Check className="w-4 h-4" /> : 'Ajouter'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
