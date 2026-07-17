export const HIJAB_GIFT_OFFER = {
  slug: 'hijab-ete-2026',
  isActive: true,
  validUntil: new Date('2026-08-31T23:59:59+02:00'),
  triggerCategory: 'burkini',
  giftProductSlug: 'hijab-ete-2026',
  originalValue: 25,
  bannerHeadline: 'Un hijab d\'été assorti, offert avec chaque burkini',
  bannerSubline: 'Édition d\'été jusqu\'au 31 août',
};

export function isGiftOfferActive(): boolean {
  if (!HIJAB_GIFT_OFFER.isActive) return false;
  
  const now = new Date();
  if (HIJAB_GIFT_OFFER.validUntil && now > HIJAB_GIFT_OFFER.validUntil) {
    return false;
  }
  
  return true;
}
