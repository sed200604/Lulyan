import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/meta-capi';
import { TrustBadge } from '../checkout/TrustBadge';
import { PaymentIconRow } from '@/components/icons/payment/PaymentIconRow';
import { formatEUR } from '@/lib/utils';

interface CartSummaryProps {
  variant?: 'drawer' | 'page' | 'checkout';
}

export function CartSummary({ variant = 'page' }: CartSummaryProps) {
  const { subtotal, isFreeShipping, amountToFreeShipping, items, promoCode, promoDiscount, applyPromoCode, removePromoCode } = useCartStore();
  const subtotalValue = subtotal();
  const discountValue = promoDiscount();
  const shippingCost = isFreeShipping() ? 0 : 4.90; // Default standard shipping
  const total = subtotalValue - discountValue + shippingCost;
  const isCartEmpty = items.length === 0;
  
  const giftSavings = items.filter(item => item.isGift).reduce((sum, item) => sum + ((item.originalValue || 25) * item.quantity), 0);
  
  const [promoInput, setPromoInput] = React.useState('');
  const [promoMessage, setPromoMessage] = React.useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const router = useRouter();
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleCheckout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    trackEvent('InitiateCheckout', {
      content_ids: items.map(item => item.productId),
      num_items: items.reduce((sum, item) => sum + item.quantity, 0),
      value: total,
      currency: 'EUR'
    });
    setIsOpen(false);
    router.push('/checkout');
  };
  
  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setPromoInput('');
    }
    setTimeout(() => setPromoMessage(null), 3000);
  };

  if (variant === 'drawer') {
    return (
      <div className="py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center font-montserrat text-brand-black-500">
          <span>Sous-total</span>
          <span>{subtotalValue.toFixed(2)} €</span>
        </div>
        {discountValue > 0 && (
          <div className="flex justify-between items-center font-montserrat text-brand-gold-500">
            <span>Code promo ({promoCode})</span>
            <span>-{discountValue.toFixed(2)} €</span>
          </div>
        )}
        <div className="flex justify-between items-center font-montserrat font-bold text-brand-black-500">
          <span>TOTAL</span>
          <span>{(subtotalValue - discountValue).toFixed(2)} €</span>
        </div>
        {giftSavings > 0 && (
          <div className="text-right text-xs font-montserrat text-[#2E7D32] font-medium">
            Vous économisez {giftSavings.toFixed(2)} €
          </div>
        )}
        <button 
          onClick={() => handleCheckout()}
          disabled={isCartEmpty}
          className={`w-full h-[52px] bg-brand-gold-500 text-brand-black-500 font-montserrat font-bold text-sm tracking-wider flex items-center justify-center transition-colors ${isCartEmpty ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-gold-400'}`}
        >
          PASSER COMMANDE
        </button>
        <button onClick={() => handleNavigate('/cart')} className="text-center font-montserrat text-sm text-brand-black-400 hover:text-brand-gold-500 transition-colors">
          ou continuer vers le panier →
        </button>
        <TrustBadge variant="marks" />
      </div>
    );
  }

  // Page / Checkout Variant
  return (
    <div className="bg-brand-cream-100 p-6 sm:p-8">
      <h2 className="font-cormorant text-2xl text-brand-black-500 mb-6 uppercase tracking-widest">
        Résumé de commande
      </h2>
      
      <div className="flex flex-col gap-4 border-b border-brand-black-100/50 pb-6 mb-6">
        <div className="flex justify-between items-center font-montserrat text-brand-black-400">
          <span>Sous-total</span>
          <span>{subtotalValue.toFixed(2)} €</span>
        </div>
        
        {discountValue > 0 && (
          <div className="flex justify-between items-center font-montserrat text-brand-gold-500">
            <span>Code promo ({promoCode})</span>
            <span>-{discountValue.toFixed(2)} €</span>
          </div>
        )}
        
        <div className="flex justify-between items-center font-montserrat text-brand-black-400">
          <span>Livraison</span>
          <span>{isFreeShipping() ? 'Gratuite' : `${shippingCost.toFixed(2)} €`}</span>
        </div>
      </div>

      <div className="flex justify-between items-center font-montserrat font-bold text-xl text-brand-black-500 mb-1">
        <span>TOTAL</span>
        <span>{total.toFixed(2)} €</span>
      </div>
      
      {giftSavings > 0 && (
        <div className="text-right text-sm font-montserrat text-[#2E7D32] font-medium mb-8">
          Vous économisez {giftSavings.toFixed(2)} €
        </div>
      )}
      
      {giftSavings === 0 && <div className="mb-8"></div>}

      {variant === 'page' && (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block font-montserrat text-sm text-brand-black-400">Code promo</label>
              {promoCode && (
                <button 
                  onClick={removePromoCode}
                  className="font-montserrat text-xs text-brand-black-300 hover:text-red-500"
                >
                  Retirer
                </button>
              )}
            </div>
            
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                placeholder="Ex: BIENVENUE"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                className="flex-grow h-12 px-4 border border-brand-black-200 bg-transparent font-montserrat text-brand-black-500 focus:outline-none focus:border-brand-gold-500 transition-colors uppercase"
              />
              <button 
                onClick={handleApplyPromo}
                className="h-12 px-6 bg-brand-black-500 text-brand-cream-500 font-montserrat text-sm tracking-wider hover:bg-brand-gold-500 transition-colors"
              >
                APPLIQUER
              </button>
            </div>
            {promoMessage && (
              <p className={`mt-2 font-montserrat text-xs ${promoMessage.type === 'success' ? 'text-brand-gold-500' : 'text-red-500'}`}>
                {promoMessage.text}
              </p>
            )}
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={isCartEmpty}
            className={`w-full h-14 bg-brand-gold-500 text-brand-black-500 font-montserrat font-bold tracking-wider flex items-center justify-center transition-colors ${isCartEmpty ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-brand-gold-400'}`}
          >
            PROCÉDER AU PAIEMENT
          </button>

          {!isFreeShipping() && (
            <p className="mt-4 text-center font-montserrat text-sm text-brand-black-400">
              Plus que <span className="text-brand-gold-500 font-medium">{amountToFreeShipping().toFixed(2)} €</span> pour la livraison offerte
            </p>
          )}

          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
              PAIEMENT SÉCURISÉ
            </span>
            <PaymentIconRow size={20} className="justify-center opacity-70" />
          </div>
        </>
      )}
    </div>
  );
}
