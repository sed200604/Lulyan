'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types/product';

interface CollectionGridProps {
  products: Product[];
  onReset?: () => void;
}

export default function CollectionGrid({ products, onReset }: CollectionGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="font-sans text-body text-brand-black-400">Aucun produit ne correspond à vos filtres.</p>
        {onReset && (
          <button
            onClick={onReset}
            className="font-sans text-body-sm text-brand-gold-500 underline underline-offset-4 hover:text-brand-gold-600 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 px-4 sm:px-0">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0, 1] }}
          layout
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
