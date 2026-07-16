'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isWishlisted = isClient ? wishlistItems.includes(product.id) : false;
  const hasMultipleImages = product.images.length > 1;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  return (
    <motion.div
      className="group relative flex flex-col w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="w-full">
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full bg-brand-cream-100 overflow-hidden mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-medium">
          {/* Main Image */}
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-[0.16,1,0.3,1]",
              isHovered && hasMultipleImages ? "scale-105" : "scale-100"
            )}
          />

          {/* Hover Image */}
          {hasMultipleImages && (
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-in-out",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={product.images[1].src}
                alt={product.images[1].alt || `${product.name} - Vue alternative`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Badges */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="bg-brand-gold-500 text-brand-black-950 font-accent text-[0.625rem] tracking-wider uppercase px-2 py-1">
                Nouveau
              </span>
            )}
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="bg-[#D94F4F] text-white font-accent text-[0.625rem] tracking-wider uppercase px-2 py-1">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-20 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
            aria-label={isWishlisted ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  isWishlisted ? "fill-brand-gold-500 text-brand-gold-500" : "text-brand-black-600"
                )}
                strokeWidth={isWishlisted ? 2 : 1.5}
              />
            </motion.div>
          </button>

          {/* Quick View Bar */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm py-3 text-center z-10"
              >
                <span className="font-accent text-overline text-brand-black-950 tracking-widest">
                  APERÇU RAPIDE
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-center text-center mt-4">
          <span className="text-[9px] font-montserrat tracking-[0.3em] uppercase text-brand-gold-500 mb-1.5">
            LULIYANE RIVIERA
          </span>
          <h3 className="font-heading text-heading-3 text-brand-black-600 mb-1">
            {product.name}
          </h3>
          <p className="text-[10px] font-montserrat tracking-[0.2em] text-brand-black-400 mb-2 uppercase">
            {product.subtitle}
          </p>
          <div className="flex items-center gap-2 font-body text-body text-brand-black-600 font-semibold">
            <span>{product.price}€</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-brand-black-300 line-through font-normal text-sm">
                {product.compareAtPrice}€
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}