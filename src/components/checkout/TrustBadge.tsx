'use client';

import React from 'react';
import { PaymentIconRow } from '../icons/payment/PaymentIconRow';

interface TrustBadgeProps {
  variant: 'editorial' | 'marks' | 'minimal';
  className?: string;
}

export function TrustBadge({ variant, className = '' }: TrustBadgeProps) {
  const baseClasses = "animate-fade-in-up motion-reduce:animate-none opacity-0 [animation-fill-mode:forwards]";
  
  if (variant === 'editorial') {
    return (
      <div className={`flex flex-col items-center gap-2 py-8 text-center ${baseClasses} ${className}`}>
        <div className="h-px w-10 bg-neutral-200" />
        <p className="font-serif italic text-sm text-neutral-500">
          Paiement sécurisé par Stripe
        </p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">
          Visa · Mastercard · Amex · Apple Pay
        </p>
        <div className="mt-1 h-px w-10 bg-neutral-200" />
      </div>
    );
  }

  if (variant === 'marks') {
    return (
      <div className={`flex flex-col items-center gap-4 py-8 ${baseClasses} ${className}`}>
        {/* micro-label with hairlines */}
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-[#B8956A]/40" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            Paiement sécurisé
          </span>
          <div className="h-px w-6 bg-[#B8956A]/40" />
        </div>

        {/* Monochrome brand marks */}
        <div className="opacity-80">
          <PaymentIconRow size={24} />
        </div>

        {/* Subtle attribution */}
        <p className="text-[11px] text-neutral-500 text-center">
          Traitement bancaire assuré par Stripe · Certifié PCI-DSS
        </p>
      </div>
    );
  }

  // minimal
  return (
    <p className={`text-center py-4 font-serif italic text-[13px] text-neutral-500 ${baseClasses} ${className}`}>
      Paiement sécurisé par Stripe.
    </p>
  );
}
