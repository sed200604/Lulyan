'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { isGiftOfferActive, HIJAB_GIFT_OFFER } from '@/config/promotions';

export default function GiftOfferBanner() {
  const pathname = usePathname();

  // Hide on checkout or if offer is inactive
  if (!isGiftOfferActive() || pathname === '/checkout') {
    return null;
  }

  return (
    <div className="bg-[#F9F7F2] text-[#B8956A] border-b border-[#E8E2D2] text-xs md:text-sm font-medium tracking-wide py-2 px-4 text-center">
      <span>{HIJAB_GIFT_OFFER.bannerHeadline} — </span>
      <span className="opacity-80 italic">{HIJAB_GIFT_OFFER.bannerSubline}</span>
    </div>
  );
}
