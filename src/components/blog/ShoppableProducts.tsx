'use client';

import { products as ALL_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';

export function ShoppableProducts({ productIds }: { productIds: string[] }) {
  const products = productIds.map(id => ALL_PRODUCTS.find((p: Product) => p.id === id)).filter(Boolean) as Product[];

  if (products.length === 0) return null;

  return (
    <div className="my-16 py-12 border-y border-brand-black-100">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="font-montserrat font-bold text-xs tracking-widest uppercase text-brand-black-500">
          Produits Mentionnés
        </h3>
        <div className="h-[1px] flex-grow bg-brand-black-100" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {products.map(product => (
          product && <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
