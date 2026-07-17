import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { formatEUR } from '@/lib/utils';

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  // Determine primary tag to show
  let mainTag = '';
  if (product.isNew) mainTag = 'NOUVEAUTÉ';
  else if (product.tags.includes('best-seller')) mainTag = 'BEST-SELLER';
  else if (product.tags.includes('edition-limitee')) mainTag = 'ÉDITION LIMITÉE';

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col mb-6 mt-6">
      {/* Tag */}
      {mainTag && (
        <span className="text-[#C5A14E] font-sans text-[10px] uppercase tracking-[0.16em] mb-2 font-medium">
          {mainTag}
        </span>
      )}
      
      {/* Title */}
      <h1 className="font-heading text-[28px] leading-[1.2] text-[#1A1A1A] uppercase tracking-[0.02em] font-light mb-3">
        {product.name}
      </h1>

      {/* Reviews */}
      {product.reviewCount > 0 && (
        <button 
          onClick={scrollToReviews}
          className="flex items-center gap-2 text-[11px] font-sans font-medium tracking-[0.04em] text-[#1A1A1A] mb-4"
        >
          <div className="flex gap-0.5 text-[#1A1A1A]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" />
            ))}
          </div>
          {product.rating} (<span className="underline decoration-[#CCCCCC] underline-offset-2">{product.reviewCount} avis</span>)
        </button>
      )}

      {/* Price */}
      <div className="mb-2">
        <span className="font-sans text-[18px] font-normal text-[#1A1A1A]">
          {formatEUR(product.price)}
        </span>
      </div>

      {/* Payment installment */}
      <div className="flex items-center gap-1 font-sans text-[11px] text-[#666666] mb-6">
        <span>Ou 3x {formatEUR(product.price / 3)} € sans frais avec</span>
        <span className="font-bold text-[#1A1A1A] tracking-wide">alma</span>
      </div>

      {/* Hairline Divider */}
      <div className="w-full h-[1px] bg-[#1A1A1A]/[0.06]"></div>
    </div>
  );
}
