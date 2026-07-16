import { Product } from '@/types/product';
import { MobileProductCard } from './MobileProductCard';

interface RelatedCarouselProps {
  products: Product[];
}

export function RelatedCarousel({ products }: RelatedCarouselProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="flex flex-col my-12">
      <h2 className="font-heading text-[24px] text-[#1A1A1A] uppercase tracking-[0.02em] font-light mb-6 px-4">
        VOUS AIMEREZ AUSSI
      </h2>
      
      {/* 
        Full width side-scrolling container.
        Using px-4 to give initial offset, but items scroll behind it.
      */}
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="relative flex flex-col shrink-0 snap-start w-[180px]">
            <MobileProductCard 
              product={product} 
              onQuickView={() => {
                // To be integrated with QuickView modal
                console.log('Quick view triggered for', product.name);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
