'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { formatEUR } from '@/lib/utils';

export function CartDrawer() {
  const { isOpen, setIsOpen, items, amountToFreeShipping } = useCartStore();
  const isCartEmpty = items.length === 0;
  const missingAmount = amountToFreeShipping();
  const progressPercent = Math.min(100, Math.max(0, 100 - (missingAmount / 1) * 100));

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-50"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 w-full max-w-[420px] h-full bg-brand-cream-50 z-50 flex flex-col shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-brand-black-100">
              <h2 id="cart-title" className="font-montserrat font-bold text-sm tracking-widest text-brand-black-500">
                VOTRE PANIER ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-brand-black-400 hover:text-brand-black-500 transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">
              {isCartEmpty ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <p className="font-montserrat text-brand-black-400 mb-6">Votre panier est vide</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full max-w-[280px] h-[52px] border border-brand-black-500 text-brand-black-500 font-montserrat font-bold text-sm tracking-wider hover:bg-brand-black-500 hover:text-brand-cream-500 transition-colors flex items-center justify-center"
                  >
                    CONTINUER MES ACHATS
                  </button>
                </div>
              ) : (
                <div className="p-6 flex flex-col">
                  {/* Items */}
                  <div className="flex flex-col">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CartItem item={item} variant="drawer" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Free Shipping Bar */}
                  <div className="mt-8 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      {missingAmount > 0 ? (
                        <p className="font-montserrat text-sm text-brand-black-400">
                          Il vous manque <span className="font-bold text-brand-black-500">{formatEUR(missingAmount)}</span> pour la livraison offerte
                        </p>
                      ) : (
                        <p className="font-montserrat text-sm text-brand-gold-500 font-medium flex items-center gap-2">
                          <span>✓</span> Livraison offerte !
                        </p>
                      )}
                    </div>
                    <div className="h-1.5 w-full bg-brand-black-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-brand-gold-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 border-t border-brand-black-100 bg-brand-cream-50">
              <CartSummary variant="drawer" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}