'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/data/products';

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // On récupère les produits featured et on exclut le produit courant
  const relatedProducts = getFeaturedProducts()
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#FFFEF9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] font-montserrat tracking-[0.4em] uppercase text-gold-500">
            Vous aimerez aussi
          </span>
          <h2 className="mt-2 text-3xl font-cormorant font-light">
            Compléter le Look
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}