'use client';

import { PaymentIconRow } from '@/components/icons/payment/PaymentIconRow';

export function TrustBar() {
  return (
    <div className="w-full flex flex-col items-center justify-center my-8">
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-6 h-[1px] bg-brand-gold-500" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
          PAIEMENT SÉCURISÉ
        </span>
        <div className="w-6 h-[1px] bg-brand-gold-500" />
      </div>

      {/* Brand Marks */}
      <div className="mb-6">
        <PaymentIconRow size={24} />
      </div>

      {/* Trust Line */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 font-sans text-[12px] tracking-[0.05em] text-[#666]">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <span>🔒</span> SSL sécurisé
        </span>
        <span className="opacity-50">·</span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <span>⟲</span> Retours 30 jours
        </span>
        <span className="opacity-50">·</span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <span>🇫🇷</span> Marque française
        </span>
      </div>
    </div>
  );
}
