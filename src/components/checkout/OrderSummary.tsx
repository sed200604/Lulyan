'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { ChevronDown } from 'lucide-react';
import { formatEUR } from '@/lib/utils';

export function OrderSummary({ variant = 'desktop' }: { variant?: 'mobile' | 'desktop' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { items, subtotal, isFreeShipping, promoCode, promoDiscount, applyPromoCode, removePromoCode } = useCartStore();
  
  const subtotalValue = subtotal();
  const discountValue = promoDiscount();
  const shippingCost = isFreeShipping() ? 0 : 4.90;
  const total = subtotalValue - discountValue + shippingCost;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setPromoInput('');
    }
    setTimeout(() => setPromoMessage(null), 3000);
  };

  const SummaryContent = () => (
    <div className="flex flex-col gap-6 w-full pt-4 lg:pt-0">
      <div className="hidden lg:block">
        <h2 className="font-cormorant text-2xl text-brand-black-500 uppercase tracking-widest mb-6">
          Récapitulatif
        </h2>
        <div className="w-full h-[1px] bg-brand-black-100/50 mb-6" />
      </div>

      <div className="flex flex-col max-h-[400px] overflow-y-auto hide-scrollbar gap-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-14 h-[72px] bg-brand-cream-200 shrink-0 rounded-[4px] border border-[#EEE] overflow-hidden">
              <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex flex-col flex-grow justify-center">
              <div className="flex justify-between items-start">
                <h3 className="font-cormorant font-medium text-[14px] text-brand-black-500">{item.name}</h3>
                <span className="font-sans text-[14px] text-brand-black-500 font-medium tabular-nums whitespace-nowrap ml-4">
                  {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                </span>
              </div>
              <p className="font-sans text-[12px] text-[#888] mt-1">{item.color} · Taille {item.size}</p>
              <p className="font-sans text-[12px] text-[#888] mt-1">Qté {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full h-[1px] bg-brand-black-100/50 my-2" />

      <div className="flex flex-col gap-3 font-sans text-[14px] text-brand-black-400">
        <div className="flex justify-between items-center">
          <span>Sous-total</span>
          <span className="tabular-nums">{subtotalValue.toFixed(2).replace('.', ',')} €</span>
        </div>
        {discountValue > 0 && (
          <div className="flex justify-between items-center text-brand-gold-500">
            <span>Code promo ({promoCode})</span>
            <span className="tabular-nums">−{discountValue.toFixed(2).replace('.', ',')} €</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span>Livraison</span>
          <span className="tabular-nums">{isFreeShipping() ? 'Offerte' : `${shippingCost.toFixed(2).replace('.', ',')} €`}</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-brand-black-100/50 my-2" />

      <div className="flex justify-between items-center font-sans font-semibold text-[16px] text-brand-black-500">
        <span>TOTAL</span>
        <span className="tabular-nums">{total.toFixed(2).replace('.', ',')} €</span>
      </div>

      <div className="mt-2 border border-dashed border-brand-black-200 p-4 rounded-[4px] flex flex-col">
        {!isPromoOpen ? (
          <div className="flex items-center justify-between">
            <span className="font-sans text-[14px] text-brand-black-400 flex items-center gap-2">
              🎁 Code promo ?
            </span>
            <button 
              onClick={() => setIsPromoOpen(true)}
              className="font-sans text-[12px] font-medium text-brand-gold-500 hover:text-brand-gold-600 transition-colors uppercase tracking-wider"
            >
              Ajouter
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <label className="font-sans text-[12px] text-brand-black-400 uppercase tracking-wider">
                Entrez votre code
              </label>
              {promoCode && (
                <button 
                  onClick={removePromoCode}
                  className="font-sans text-[12px] text-brand-black-300 hover:text-red-500"
                >
                  Retirer
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                className="flex-grow h-10 px-3 border border-brand-black-200 bg-white font-sans text-brand-black-500 text-[14px] focus:outline-none focus:border-brand-gold-500 transition-colors uppercase"
                placeholder="Ex: BIENVENUE"
              />
              <button 
                onClick={handleApplyPromo}
                className="h-10 px-4 bg-brand-black-500 text-brand-cream-500 font-sans text-[12px] tracking-wider hover:bg-brand-gold-500 transition-colors uppercase"
              >
                Appliquer
              </button>
            </div>
            {promoMessage && (
              <p className={`font-sans text-[12px] ${promoMessage.type === 'success' ? 'text-brand-gold-500' : 'text-red-500'}`}>
                {promoMessage.text}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {variant === 'mobile' && (
        <div className="lg:hidden w-full bg-[#FDFBF7] border-b border-brand-black-100/50 overflow-hidden mb-8">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-brand-black-500 font-sans text-[14px]">
              <span>🛒 Voir le récapitulatif ({itemCount} article{itemCount > 1 ? 's' : ''})</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-1 text-brand-black-400"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
            <span className="font-sans font-medium text-[14px] text-brand-black-500 tabular-nums">
              {total.toFixed(2).replace('.', ',')} €
            </span>
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden bg-[#FDFBF7] pb-6"
              >
                <SummaryContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {variant === 'desktop' && (
        <div className="hidden lg:block bg-transparent p-0 sticky top-8">
          <SummaryContent />
        </div>
      )}
    </>
  );
}
