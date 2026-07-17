'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { animations } from '@/lib/animations';

import { getFeaturedProducts } from '@/data/products';

export function DesktopFeaturedProducts() {
  return (
    <section className="py-section bg-brand-cream-50 px-container overflow-hidden hidden md:block">
      <SectionHeader 
        overline="SÉLECTION DU MOMENT" 
        title="" 
        subtitle="Nos pièces les plus désirées cette saison"
        ornament={true} 
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          animate: { transition: { staggerChildren: 0.08 } }
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-4 gap-6 pb-12">
          {getFeaturedProducts().slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              variants={animations.fadeUp}
              className="w-auto"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={animations.fadeUp} className="flex justify-center mt-4">
          <Link
            href="/collection/luliyane-riviera"
            className="group flex items-center justify-center border border-brand-gold-500 px-8 py-4 text-brand-gold-600 font-accent text-overline tracking-[0.1em] hover:bg-brand-gold-500 hover:text-white transition-colors duration-300"
          >
            DÉCOUVRIR LA COLLECTION
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
