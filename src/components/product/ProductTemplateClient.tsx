'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Product } from '@/types/product';
import { ProductGallery } from './ProductGallery';
import { ProductHeader } from './ProductHeader';
import { CredibilityPills } from './CredibilityPills';
import { ColorPicker } from './ColorPicker';
import { SizePicker } from './SizePicker';
import { PrimaryATC } from './PrimaryATC';
import { SecondaryActions } from './SecondaryActions';
import { TrustRow } from './TrustRow';
import { InfoAccordions } from './InfoAccordions';
import { CrossSell } from './CrossSell';
import { RelatedCarousel } from './RelatedCarousel';
import { ReviewsSection } from './ReviewsSection';
import { StickyAddBar } from './StickyAddBar';
import { useCartStore } from '@/stores/cartStore';

interface ProductTemplateClientProps {
  product: Product;
  crossSellProducts: Product[];
  relatedProducts: Product[];
}

export function ProductTemplateClient({ product, crossSellProducts, relatedProducts }: ProductTemplateClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const queryColor = searchParams.get('color');
  const querySize = searchParams.get('size');

  const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].slug : '';
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0].value : '';

  const [selectedColor, setSelectedColor] = useState(queryColor || defaultColor);
  const [selectedSize, setSelectedSize] = useState(querySize || defaultSize);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  const atcRef = useRef<HTMLDivElement>(null);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    if (selectedColor && selectedColor !== queryColor) {
      params.set('color', selectedColor);
      changed = true;
    }
    if (selectedSize && selectedSize !== querySize) {
      params.set('size', selectedSize);
      changed = true;
    }

    if (changed) {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [selectedColor, selectedSize, pathname, router, searchParams, queryColor, querySize]);

  // Intersection Observer for Sticky ATC
  useEffect(() => {
    if (!atcRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the ATC is out of view (scrolled past), show sticky bar
        // We only care if it goes out of view ABOVE the viewport (boundingClientRect.y < 0)
        const rect = entry.boundingClientRect;
        if (!entry.isIntersecting && rect.y < 0) {
          setIsStickyVisible(true);
        } else {
          setIsStickyVisible(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(atcRef.current);
    return () => observer.disconnect();
  }, []);

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    console.log('Adding to cart:', { product: product.id, selectedColor, selectedSize });
    addItem(product, selectedSize, selectedColor);

    window.dispatchEvent(new CustomEvent('luliyane:addToCart', {
      detail: {
        item: {
          sku: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          category: 'Apparel' // Using default generic string
        }
      }
    }));
  };

  // Ensure the image named "photo 1" (or similar) is always shown first
  const sortedImages = [...(product.images || [])].sort((a, b) => {
    const aName = a.src.toLowerCase();
    const bName = b.src.toLowerCase();
    const aIsFirst = aName.includes('photo 1') || aName.includes('photo-1') || aName.includes('photo_1') || aName.includes('photo%201');
    const bIsFirst = bName.includes('photo 1') || bName.includes('photo-1') || bName.includes('photo_1') || bName.includes('photo%201');
    
    if (aIsFirst && !bIsFirst) return -1;
    if (!aIsFirst && bIsFirst) return 1;
    return 0;
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 items-start px-0 lg:px-container">
        {/* Left Column: Gallery (Full width on mobile, 55% on desktop) */}
        <div className="w-full lg:w-[55%] lg:sticky lg:top-24">
          <ProductGallery images={sortedImages} />
        </div>

        {/* Right Column: Info (Padded on mobile, 45% on desktop) */}
        <div className="w-full lg:w-[45%] px-4 lg:px-0 mt-8 lg:mt-0">
          <ProductHeader product={product} />
          
          <CredibilityPills pillars={product.pillars} />
          
          {product.colors && product.colors.length > 0 && (
            <ColorPicker 
              colors={product.colors} 
              selectedColorSlug={selectedColor} 
              onColorSelect={setSelectedColor} 
            />
          )}

          {product.sizes && product.sizes.length > 0 && (
            <SizePicker 
              sizes={product.sizes} 
              selectedSizeValue={selectedSize} 
              onSizeSelect={setSelectedSize} 
            />
          )}

          <div ref={atcRef}>
            <PrimaryATC 
              price={product.price} 
              onClick={handleAddToCart}
            />
          </div>

          <SecondaryActions product={product} />
          
          <TrustRow />
          
          <InfoAccordions product={product} />
        </div>
      </div>

      <CrossSell products={crossSellProducts} />
      
      <RelatedCarousel products={relatedProducts} />
      
      <ReviewsSection product={product} />

      <StickyAddBar 
        product={product} 
        isVisible={isStickyVisible} 
        onAdd={handleAddToCart}
      />
    </>
  );
}
