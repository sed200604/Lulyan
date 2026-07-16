'use client';

import { Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface PayButtonProps {
  isProcessing: boolean;
  isDisabled: boolean;
  onClick?: () => void;
}

export function PayButton({ isProcessing, isDisabled, onClick }: PayButtonProps) {
  const { subtotal, isFreeShipping, promoDiscount } = useCartStore();
  
  const subtotalValue = subtotal();
  const discountValue = promoDiscount();
  const shippingCost = isFreeShipping() ? 0 : 4.90; // Default flat rate, can be optimized later
  const total = subtotalValue - discountValue + shippingCost;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-[18px_20px_calc(18px+env(safe-area-inset-bottom))] bg-brand-cream-50 border-t border-brand-black-100/50 lg:relative lg:p-0 lg:pb-0 lg:bg-transparent lg:border-none lg:z-auto lg:max-w-[480px] lg:mx-auto lg:mt-8">
      <button 
        type="button"
        onClick={onClick}
        disabled={isDisabled || isProcessing}
        className="group relative w-full h-14 bg-[#2A2A2A] text-white font-sans font-medium text-[15px] tracking-[0.15em] flex flex-col items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black overflow-hidden active:scale-[0.98] rounded-md"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="uppercase">TRAITEMENT EN COURS...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center justify-center gap-2">
              <span className="uppercase">PAYER {total.toFixed(2).replace('.', ',')} €</span>
              <span className="text-[16px] transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
            <span className="text-[11px] font-normal opacity-70 tracking-normal mt-0.5">
              Livraison entre le 16 et 18 juillet
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
