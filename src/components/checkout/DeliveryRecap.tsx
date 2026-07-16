'use client';

import { useCartStore } from '@/stores/cartStore';

export function DeliveryRecap() {
  const { isFreeShipping } = useCartStore();
  const shippingAmount = isFreeShipping() ? 0 : 4.90;

  // In a real app, this would come from a store or props populated by the ShippingStep
  const dummyAddress = {
    name: 'Fatima Zahra',
    street: '12 rue de Rivoli',
    city: '75001 Paris',
    phone: '+33 6 12 34 56 78'
  };

  return (
    <div className="w-full flex flex-col gap-0 border border-brand-black-200 rounded-[4px] p-4 bg-white mb-6">
      <div className="flex flex-col gap-2 font-cormorant text-[14px] text-brand-black-500 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-success text-[14px]">✓</span>
          <span>{shippingAmount === 0 ? 'Livraison offerte à partir de 150€' : 'Livraison Standard (3-5 jours ouvrés)'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-success text-[14px]">✓</span>
          <span>Livrée entre le 16 et 18 juillet</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-success text-[14px]">✓</span>
          <span>Chronopost — signature à réception</span>
        </div>
      </div>
      
      <div className="w-full h-[1px] bg-brand-black-100/50 mb-4" />
      
      <div className="flex flex-col relative">
        <div className="flex items-start gap-2">
          <span className="text-[16px]">📍</span>
          <div className="flex flex-col font-sans text-[13px] text-brand-black-500 leading-snug">
            <span className="font-medium mb-1">Adresse de livraison</span>
            <span className="text-brand-black-400">{dummyAddress.name}</span>
            <span className="text-brand-black-400">{dummyAddress.street}, {dummyAddress.city}</span>
            <span className="text-brand-black-400">{dummyAddress.phone}</span>
          </div>
        </div>
        <button className="absolute right-0 bottom-0 font-sans text-[12px] font-medium text-brand-gold-500 hover:text-brand-gold-600 transition-colors">
          Modifier
        </button>
      </div>
    </div>
  );
}
