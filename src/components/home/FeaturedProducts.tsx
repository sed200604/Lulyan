'use client';

import { DesktopFeaturedProducts } from './DesktopFeaturedProducts';
import { MobileFeaturedCarousel } from './MobileFeaturedCarousel';

export function FeaturedProducts() {
  return (
    <>
      <DesktopFeaturedProducts />
      <MobileFeaturedCarousel />
    </>
  );
}