'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useWishlistStore } from '@/stores/wishlistStore';
import { formatEUR } from '@/lib/utils';

interface MobileProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function MobileProductCard({ product, onQuickView }: MobileProductCardProps) {
  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isWishlisted = isClient ? wishlistItems.includes(product.id) : false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };



  return (
    <div className="flex flex-col w-full group">
      <div className="relative w-full aspect-[4/5] bg-[#E8D9A8]/10 overflow-hidden mb-3">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-[center_top]"
          />
        </Link>

        {/* Badges (Bottom Left) */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#FAF7F2] text-[#1A1A1A] font-sans font-medium text-[9px] tracking-[0.08em] uppercase px-1.5 py-1">
              NOUVEAU
            </span>
          )}
          {product.tags?.includes('upf-50') && (
            <span className="bg-[#FAF7F2] text-[#1A1A1A] font-sans font-medium text-[9px] tracking-[0.08em] uppercase px-1.5 py-1">
              UPF 50+
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-1 right-1 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          aria-label={isWishlisted ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? "fill-[#C5A14E] text-[#C5A14E]" : "text-[#1A1A1A]"
              }`}
              strokeWidth={isWishlisted ? 2 : 1.5}
            />
          </motion.div>
        </button>

        {/* Quick View Trigger (Bottom Right) */}
        <button
          onClick={handleQuickViewClick}
          className="absolute bottom-1 right-1 z-20 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110"
          aria-label="Aperçu rapide"
        >
          <Eye className="w-4 h-4 text-[#1A1A1A]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Product Meta */}
      <div className="flex flex-col items-start text-left gap-0.5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-sans text-[11px] font-medium tracking-[0.04em] uppercase text-[#1A1A1A]">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-[10px] font-normal tracking-[0.02em] text-[#5A5247] uppercase">
          {product.subtitle}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-sans text-[11px] font-normal text-[#1A1A1A]">
            {formatEUR(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="font-sans text-[10px] font-normal text-[#5A5247] line-through">
              {formatEUR(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
