'use client';

import { PaymentElement } from '@stripe/react-stripe-js';

export function StripePaymentForm() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-cormorant text-[20px] text-brand-black-500 uppercase tracking-widest">
        Mode de paiement
      </h2>
      
      <div className="bg-white border border-[#EEE] rounded-[12px] p-6">
        <div className="mb-6">
          <p className="font-sans text-[11px] text-[#888]">
            Vos informations sont sécurisées par Stripe · Certifié PCI-DSS
          </p>
        </div>
        
        <PaymentElement 
          options={{
            layout: 'accordion',
            paymentMethodOrder: ['card', 'klarna', 'scalapay', 'apple_pay', 'google_pay'],
            business: { name: 'LULIYANE PARIS' },
            wallets: { applePay: 'auto', googlePay: 'auto' },
            fields: {
              billingDetails: {
                name: 'auto',
                email: 'auto',
                phone: 'auto',
                address: 'auto',
              },
            },
            defaultValues: {
              billingDetails: {
                address: {
                  country: 'FR',
                },
              },
            },
          }} 
        />
      </div>
    </section>
  );
}
