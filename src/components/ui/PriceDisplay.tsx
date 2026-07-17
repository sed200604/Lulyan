export interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  showInstallments?: boolean;
  className?: string;
}

import { formatEUR } from '@/lib/utils';

export function PriceDisplay({ price, compareAtPrice, showInstallments = true, className = '' }: PriceDisplayProps) {

  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;
  
  const installmentAmount = price / 3;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="font-sans text-heading-2 font-bold text-brand-black-600">
          {formatEUR(price)}
        </span>
        
        {hasDiscount && (
          <>
            <span className="font-sans text-body line-through text-brand-black-300">
              {formatEUR(compareAtPrice)}
            </span>
            <span className="inline-block px-2 py-0.5 bg-[#FF3B30] text-white font-sans text-xs font-bold rounded-sm tracking-wide">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {showInstallments && (
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-[1px] bg-brand-black-100"></div>
          <span className="font-sans text-body-sm text-brand-black-400">
            ou 3x {formatEUR(installmentAmount)} sans frais
          </span>
          <div className="flex-1 h-[1px] bg-brand-black-100"></div>
        </div>
      )}
    </div>
  );
}
