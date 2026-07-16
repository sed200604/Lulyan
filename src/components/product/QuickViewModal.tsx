'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCartStore } from '@/stores/cartStore';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  // Format price (replace dot with comma, add non-breaking space for €)
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',') + '\u00A0€';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-[#FAF7F2] z-50 rounded-t-2xl lg:hidden flex flex-col shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
          >
            {/* Handle & Header */}
            <div className="flex flex-col items-center pt-3 pb-4 border-b border-[#1A1A1A]/10 sticky top-0 bg-[#FAF7F2] z-20 rounded-t-2xl px-5">
              <div className="w-12 h-1 bg-black/10 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <h2 className="font-sans text-[12px] font-normal tracking-[0.16em] uppercase text-[#1A1A1A]">Aperçu Rapide</h2>
                <button onClick={onClose} className="p-2 -mr-2 text-[#1A1A1A]">
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {/* Image Carousel */}
              <div className="relative w-full aspect-[4/5] bg-[#E8D9A8]/20">
                <Image
                  src={product.images[currentImageIdx].src}
                  alt={product.images[currentImageIdx].alt}
                  fill
                  className="object-cover object-[center_top]"
                  sizes="100vw"
                  priority
                />
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[#1A1A1A] shadow-sm backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[#1A1A1A] shadow-sm backdrop-blur-sm"
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      {product.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 rounded-full transition-all ${idx === currentImageIdx ? 'w-4 bg-[#C5A14E]' : 'w-1.5 bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-5 flex flex-col gap-5">
                {/* Product Info */}
                <div>
                  <h3 className="font-serif text-[24px] font-light tracking-[0.02em] text-[#1A1A1A] mb-1">
                    {product.name}
                  </h3>
                  <div className="font-sans text-[14px] font-medium tracking-[0.04em] text-[#1A1A1A]">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Colors (Read Only Preview) */}
                {product.colors?.length > 0 && (
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#5A5247] mb-2 block">
                      Couleur : {product.colors[0].name}
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map((color, idx) => (
                        <div
                          key={color.name}
                          className={`w-6 h-6 rounded-full border border-[#1A1A1A]/20 ${idx === 0 ? 'ring-1 ring-offset-2 ring-[#C5A14E]' : ''}`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes Selection */}
                {product.sizes?.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#5A5247]">
                        Taille
                      </span>
                      <button className="font-sans text-[10px] underline text-[#5A5247]">
                        Guide des tailles
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size.label}
                          disabled={!size.inStock}
                          onClick={() => setSelectedSize(size.label)}
                          className={`py-2.5 font-sans text-[11px] uppercase tracking-[0.04em] transition-colors border
                            ${selectedSize === size.label 
                              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                              : !size.inStock 
                                ? 'bg-transparent border-[#1A1A1A]/10 text-[#1A1A1A]/40 line-through cursor-not-allowed'
                                : 'bg-white border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#C5A14E]'
                            }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="font-sans text-[12px] leading-[1.6] text-[#5A5247]">
                  {product.shortDescription}
                </p>
              </div>
            </div>

            {/* Sticky CTA */}
            <div className="sticky bottom-0 bg-[#FAF7F2] border-t border-[#1A1A1A]/10 p-5 z-20 pb-safe">
              <button 
                disabled={!selectedSize}
                onClick={() => {
                  if (selectedSize) {
                    addItem(product, selectedSize, product.colors[0]?.name || 'Standard', 1);
                    window.dispatchEvent(new CustomEvent('luliyane:addToCart', {
                      detail: {
                        item: {
                          sku: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          category: 'Apparel'
                        }
                      }
                    }));
                    onClose();
                  }
                }}
                className={`w-full font-sans text-[11px] font-medium tracking-[0.24em] uppercase py-3.5 px-4 transition-colors text-center
                  ${selectedSize 
                    ? 'bg-[#1A1A1A] text-white hover:bg-[#C5A14E]' 
                    : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/40 cursor-not-allowed'
                  }`}
              >
                {selectedSize ? 'AJOUTER AU PANIER' : 'SÉLECTIONNER UNE TAILLE'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
