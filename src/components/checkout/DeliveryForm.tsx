'use client';

import { useCheckoutStore, type DeliveryMethod } from '@/stores/checkoutStore';
import Link from 'next/link';
import { AddressAutocomplete } from './AddressAutocomplete';

export function DeliveryForm() {
  const { 
    contactInfo, 
    setContactInfo, 
    shippingAddress, 
    setShippingAddress,
    deliveryMethod,
    setDeliveryMethod
  } = useCheckoutStore();

  const isAddressFilled = 
    shippingAddress.firstName.trim() !== '' &&
    shippingAddress.lastName.trim() !== '' &&
    shippingAddress.address1.trim() !== '' &&
    shippingAddress.zipCode.trim() !== '' &&
    shippingAddress.city.trim() !== '' &&
    shippingAddress.phone.trim() !== '';

  return (
    <div className="flex flex-col gap-10">
      {/* 4.1 Contact */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cormorant text-[20px] text-brand-black-500 uppercase tracking-widest">
            Contact
          </h2>
          <Link href="/login" className="font-sans text-[13px] text-brand-gold-500 hover:text-brand-gold-600 transition-colors">
            Déjà client ? Se connecter
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ email: e.target.value })}
            className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
          />
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={contactInfo.newsletter}
                onChange={(e) => setContactInfo({ newsletter: e.target.checked })}
                className="peer sr-only"
              />
              <div className="w-[18px] h-[18px] border border-brand-black-200 rounded-[2px] peer-checked:bg-brand-gold-500 peer-checked:border-brand-gold-500 transition-colors" />
              <svg 
                className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="font-sans text-[13px] text-brand-black-400 group-hover:text-brand-black-500 transition-colors">
              Recevoir nos offres exclusives
            </span>
          </label>
        </div>
      </section>

      {/* 4.2 Adresse de livraison */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-cormorant text-[20px] text-brand-black-500 uppercase tracking-widest">
            Livraison
          </h2>
        </div>
        <p className="font-sans text-[12px] text-brand-black-300 mb-6">
          Livraison en France uniquement pour le moment.
        </p>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              required
              value={shippingAddress.firstName}
              onChange={(e) => setShippingAddress({ firstName: e.target.value })}
              className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Nom"
              required
              value={shippingAddress.lastName}
              onChange={(e) => setShippingAddress({ lastName: e.target.value })}
              className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
            />
          </div>
          
          <AddressAutocomplete />

          <input
            type="text"
            placeholder="Complément (optionnel)"
            value={shippingAddress.address2 || ''}
            onChange={(e) => setShippingAddress({ address2: e.target.value })}
            className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Code Postal"
              required
              value={shippingAddress.zipCode}
              onChange={(e) => setShippingAddress({ zipCode: e.target.value })}
              className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Ville"
              required
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ city: e.target.value })}
              className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <input
              id="phone-input"
              type="tel"
              placeholder="Téléphone"
              required
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ phone: e.target.value })}
              className="w-full bg-transparent border-b border-brand-black-100/50 pb-2 text-[14px] text-brand-black-500 placeholder:text-brand-black-300 focus:outline-none focus:border-brand-gold-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 4.3 Mode de Livraison */}
      {isAddressFilled && (
        <section className="animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="font-cormorant text-[16px] text-brand-black-500 uppercase tracking-widest mb-4">
            Mode d'expédition
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors hover:border-brand-gold-500 border-brand-gold-500 bg-[#FDFBF7]">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="standard" 
                    checked={deliveryMethod === 'standard'}
                    onChange={() => setDeliveryMethod('standard')}
                    className="peer sr-only" 
                  />
                  <div className="w-[18px] h-[18px] rounded-full border border-brand-black-200 peer-checked:border-brand-gold-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-gold-500 scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] text-brand-black-500">Standard (2-3 jours)</span>
                </div>
              </div>
              <span className="font-sans text-[14px] text-brand-black-500 font-medium">4,90 €</span>
            </label>
            
            <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${deliveryMethod === 'express' ? 'border-brand-gold-500 bg-[#FDFBF7]' : 'border-brand-black-100/50 hover:border-brand-black-200'}`}>
               <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="express" 
                    checked={deliveryMethod === 'express'}
                    onChange={() => setDeliveryMethod('express')}
                    className="peer sr-only" 
                  />
                  <div className={`w-[18px] h-[18px] rounded-full border ${deliveryMethod === 'express' ? 'border-brand-gold-500' : 'border-brand-black-200'} flex items-center justify-center`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-brand-gold-500 transition-transform ${deliveryMethod === 'express' ? 'scale-100' : 'scale-0'}`} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] text-brand-black-500">Express (24h)</span>
                </div>
              </div>
              <span className="font-sans text-[14px] text-brand-black-500 font-medium">9,90 €</span>
            </label>

          </div>
        </section>
      )}
    </div>
  );
}
