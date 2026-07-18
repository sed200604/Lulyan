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
import { GiftEligibleBadge } from './GiftEligibleBadge';
import { isGiftOfferActive } from '@/config/promotions';

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Add to cart logic
  };

  return (
    <motion.div
      className="group relative flex flex-col w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="w-full flex flex-col flex-grow">
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full bg-brand-cream-100 overflow-hidden mb-4 rounded-sm">
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

          {/* Top Left Badges (Promo/New) */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isGiftEligible && isGiftOfferActive() && (
              <span className="bg-white/95 backdrop-blur-sm text-brand-black-900 font-medium text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
                <span>🎁</span> Hijab offert
              </span>
            )}
            {product.isNew && (
              <span className="bg-brand-gold-500 text-white font-medium text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-sm w-fit">
                Nouveau
              </span>
            )}
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="bg-[#D94F4F] text-white font-medium text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-sm w-fit">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 hover:bg-white transition-all"
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

          {/* Hover Actions (Desktop) */}
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:flex flex-col gap-2 bg-gradient-to-t from-black/50 to-transparent">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-white text-brand-black-900 font-medium text-xs tracking-widest uppercase py-3 hover:bg-brand-black-900 hover:text-white transition-colors rounded-sm"
            >
              Ajouter au panier
            </button>
            <div className="w-full bg-transparent border border-white text-white font-medium text-xs tracking-widest uppercase py-3 text-center hover:bg-white hover:text-brand-black-900 transition-colors rounded-sm backdrop-blur-sm">
              Aperçu rapide
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow items-start text-left">
          {/* Overline / Brand */}
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-brand-black-400 mb-1">
            Luliyane Riviera
          </span>
          
          {/* Title */}
          <h3 className="font-heading text-lg lg:text-xl text-brand-black-900 mb-1 leading-tight group-hover:text-brand-gold-500 transition-colors">
            {product.name}
          </h3>
          
          {/* Subtitle / Short Description */}
          <p className="text-xs text-brand-black-500 mb-2 line-clamp-1 w-full">
            {product.subtitle || product.shortDescription}
          </p>
          
          {/* Price */}
          <div className="mt-auto flex items-center gap-2 font-medium text-brand-black-900 text-sm md:text-base">
            <span>{product.price}€</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-brand-black-400 line-through font-normal text-xs md:text-sm">
                {product.compareAtPrice}€
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}