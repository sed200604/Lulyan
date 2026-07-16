'use client';

import { useState, useEffect } from 'react';

import { Heart, Share2 } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlistStore';
import { Product } from '@/types/product';

interface SecondaryActionsProps {
  product: Product;
}

export function SecondaryActions({ product }: SecondaryActionsProps) {
  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isWishlisted = isClient ? wishlistItems.includes(product.id) : false;

  const handleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="flex flex-row justify-center gap-8 mb-10 mt-4">
      <button 
        onClick={handleWishlist}
        className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C5A14E] transition-colors group"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A14E] text-[#C5A14E]' : ''}`} />
        <span className="font-sans text-[11px] tracking-wide group-hover:underline underline-offset-4 decoration-[#C5A14E]/30">
          {isWishlisted ? 'RETIRER DE LA WISHLIST' : 'AJOUTER À LA WISHLIST'}
        </span>
      </button>

      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C5A14E] transition-colors group"
      >
        <Share2 className="w-4 h-4" />
        <span className="font-sans text-[11px] tracking-wide group-hover:underline underline-offset-4 decoration-[#C5A14E]/30">
          PARTAGER
        </span>
      </button>
    </div>
  );
}
