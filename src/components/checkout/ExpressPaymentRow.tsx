'use client';

import { useState } from 'react';
import { ExpressCheckoutElement } from '@stripe/react-stripe-js';

interface ExpressPaymentRowProps {
  onConfirm: () => void;
}

export function ExpressPaymentRow({ onConfirm }: ExpressPaymentRowProps) {
  const [isAvailable, setIsAvailable] = useState(true);

  if (!isAvailable) return null;

  return (
    <div className="w-full">
      <div className="border border-brand-black-100/50 rounded-lg p-5 bg-white">
        <h3 className="font-sans text-[13px] text-brand-black-500 font-medium mb-4 text-center">
          Paiement rapide
        </h3>
        
        <div className="w-full">
          <ExpressCheckoutElement 
            onReady={({availablePaymentMethods}) => {
              const methods = availablePaymentMethods as any;
              const hasAppleOrGoogle = methods?.applePay || methods?.googlePay || methods?.link;
              if (!hasAppleOrGoogle) {
                setIsAvailable(false);
              }
            }}
            options={{
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              }
            }}
            onConfirm={onConfirm} 
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 my-8">
        <div className="h-[1px] flex-1 bg-brand-black-100/50" />
        <span className="font-sans text-[12px] text-brand-black-300">
          ou par carte
        </span>
        <div className="h-[1px] flex-1 bg-brand-black-100/50" />
      </div>
    </div>
  );
}
