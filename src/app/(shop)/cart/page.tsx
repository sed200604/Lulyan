'use client';

import { useCartStore } from '@/stores/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { TrustBadge } from '@/components/checkout/TrustBadge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';

export default function CartPage() {
  const { items, totalItems } = useCartStore();
  const isCartEmpty = items.length === 0;

  return (
    <div className="pt-32 pb-24 px-container md:px-container-md lg:px-container-lg w-full max-w-7xl mx-auto flex-1">
      <div className="mb-8">
        <Breadcrumbs 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Panier', href: '/cart' }
          ]} 
        />
      </div>

      <h1 className="font-cormorant text-4xl md:text-5xl text-brand-black-500 mb-12 uppercase tracking-widest">
        Votre Panier
      </h1>

      {isCartEmpty ? (
        <div className="text-center py-20 bg-brand-cream-100/50">
          <p className="font-montserrat text-lg text-brand-black-400 mb-8">
            Votre panier est actuellement vide.
          </p>
          <Link
            href="/collections"
            className="inline-flex h-14 px-8 bg-brand-gold-500 text-brand-black-500 font-montserrat font-bold tracking-wider items-center justify-center hover:bg-brand-gold-400 transition-colors"
          >
            DÉCOUVRIR LES NOUVEAUTÉS
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Cart Items (65%) */}
          <div className="w-full lg:w-[65%]">
            <div className="flex justify-between items-end border-b border-brand-black-500 pb-4 mb-4">
              <span className="font-montserrat font-bold text-sm text-brand-black-500 tracking-wider">
                {totalItems()} ARTICLE{totalItems() > 1 ? 'S' : ''}
              </span>
            </div>
            
            <div className="flex flex-col">
              {items.map((item) => (
                <CartItem key={item.id} item={item} variant="page" />
              ))}
            </div>
          </div>

          {/* Cart Summary (35%) */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-32">
            <CartSummary variant="page" />
            <TrustBadge variant="marks" />
          </div>
        </div>
      )}
    </div>
  );
}