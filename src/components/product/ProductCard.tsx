'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useWishlistStore } from '@/stores/wishlistStore';
import { isGiftOfferActive } from '@/config/promotions';

// Format price with comma and space: 99,99 €
const formatEUR = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price).replace(/\s?€/, ' €');
};

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
  const showSecondary = isHovered && hasMultipleImages;
  const showGift = product.isGiftEligible && isGiftOfferActive();
  
  const collectionLabel = 'LULIYANE RIVIERA';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  return (
    <article
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block relative">
        {/* IMAGE — nothing overlaid on top zone */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-[#F5F0E8]">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={80}
            className={`
              object-cover transition-opacity duration-500
              ${showSecondary ? 'opacity-0' : 'opacity-100'}
            `}
          />
          {/* Secondary image on desktop hover */}
          {hasMultipleImages && (
            <Image
              src={product.images[1].src}
              alt={product.images[1].alt || `${product.name} - Vue alternative`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={80}
              className={`
                object-cover transition-opacity duration-500 absolute inset-0
                ${showSecondary ? 'opacity-100' : 'opacity-0'}
              `}
            />
          )}
        </div>

        {/* WISHLIST HEART — bottom-right of image, subtle */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Retirer de la wishlist' : 'Ajouter à la wishlist'}
          aria-pressed={isWishlisted}
          className="
            absolute bottom-3 right-3 w-8 h-8 rounded-full
            bg-white/70 backdrop-blur-sm
            flex items-center justify-center
            hover:bg-white transition-all duration-200
            hover:scale-110 z-10
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isWishlisted ? '#B8956A' : 'none'}
            stroke={isWishlisted ? '#B8956A' : '#2A2A2A'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </Link>

      {/* INFO SECTION — everything below the image */}
      <div className="mt-3 space-y-1.5 text-center sm:text-left">
        {/* Micro-label row */}
        {(collectionLabel || product.isNew) && (
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            {collectionLabel && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#B8956A] font-medium font-sans">
                {collectionLabel}
              </p>
            )}
            {product.isNew && collectionLabel && <span className="text-[10px] text-neutral-400">·</span>}
            {product.isNew && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#2A2A2A] font-medium font-sans">
                Nouveau
              </p>
            )}
          </div>
        )}

        {/* Product name */}
        <Link href={`/products/${product.slug}`} className="block group/name">
          <h3 className="font-heading text-[17px] sm:text-[19px] font-light leading-tight text-[#2A2A2A] transition-colors group-hover/name:text-[#B8956A]">
            {product.name}
          </h3>
        </Link>

        {/* Subtitle */}
        {product.subtitle && (
          <p className="font-heading italic text-[12px] sm:text-[13px] text-neutral-500 leading-snug">
            {product.subtitle}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 justify-center sm:justify-start pt-1">
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[13px] text-neutral-400 line-through tabular-nums font-sans">
              {formatEUR(product.compareAtPrice)}
            </span>
          )}
          <span className="text-[15px] font-medium text-[#2A2A2A] tabular-nums font-sans">
            {formatEUR(product.price)}
          </span>
        </div>

        {/* Gift line — subtle, editorial */}
        {showGift && (
          <p className="pt-0.5 text-[12px] italic text-[#B8956A] font-heading flex items-center justify-center sm:justify-start gap-1.5">
            <span className="text-[#B8956A]/50">─</span>
            Hijab d'été offert
          </p>
        )}
      </div>
    </article>
  );
}