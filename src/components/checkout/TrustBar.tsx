'use client';

import { VisaMark } from '@/components/icons/payment/VisaMark';
import { MastercardMark } from '@/components/icons/payment/MastercardMark';
import { AmexMark } from '@/components/icons/payment/AmexMark';
import { CBMark } from '@/components/icons/payment/CBMark';
import { ApplePayMark } from '@/components/icons/payment/ApplePayMark';
import { GooglePayMark } from '@/components/icons/payment/GooglePayMark';

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
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-neutral-800">
        <VisaMark className="h-6 w-auto" />
        <MastercardMark className="h-6 w-auto" />
        <AmexMark className="h-6 w-auto" />
        <CBMark className="h-6 w-auto" />
        <ApplePayMark className="h-6 w-auto" />
        <GooglePayMark className="h-6 w-auto" />
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
