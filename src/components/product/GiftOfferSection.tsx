'use client';

import React from 'react';
import Image from 'next/image';
import { isGiftOfferActive, HIJAB_GIFT_OFFER } from '@/config/promotions';

interface GiftOfferSectionProps {
  onColorSelect: (colorSlug: string) => void;
  selectedColor: string | null;
  giftProduct: any;
}

export function GiftOfferSection({ onColorSelect, selectedColor, giftProduct }: GiftOfferSectionProps) {
  // Image mode config from user requirement: launch without photos first
  const showImages = false;

  if (!isGiftOfferActive() || !giftProduct) return null;

  return (
    <div className="my-8 p-6 bg-[#F9F7F2] border border-[#E8E2D2] rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-cormorant font-medium text-brand-black-900">
          🎁 En Cadeau : {giftProduct.name}
        </h3>
        <span className="text-sm line-through opacity-60">{HIJAB_GIFT_OFFER.originalValue.toFixed(2)} €</span>
      </div>
      <p className="text-sm text-brand-black-800 mb-6 font-montserrat">
        {HIJAB_GIFT_OFFER.bannerSubline}. Choisissez la couleur de votre hijab offert avec ce burkini.
      </p>

      <div className="space-y-4">
        <label className="block text-xs font-medium uppercase tracking-wider text-brand-black-600">
          Couleur du hijab offert <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-4 gap-3">
          {giftProduct.colors.map((color: any) => {
            const isSelected = selectedColor === color.slug;
            return (
              <button
                key={color.slug}
                type="button"
                onClick={() => onColorSelect(color.slug)}
                className={`relative flex flex-col items-center gap-2 group transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div 
                  className={`w-12 h-12 rounded-full border-2 p-0.5 transition-colors ${
                    isSelected ? 'border-[#B8956A]' : 'border-transparent'
                  }`}
                >
                  {showImages && color.image ? (
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image 
                        src={color.image} 
                        alt={color.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full rounded-full shadow-sm"
                      style={{ backgroundColor: color.value }}
                    />
                  )}
                </div>
                <span className={`text-[10px] text-center font-medium transition-colors ${
                  isSelected ? 'text-[#B8956A]' : 'text-brand-black-500'
                }`}>
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
