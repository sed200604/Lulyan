import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getAllProducts } from '@/data/products';
import CollectionHero from '@/components/collection/CollectionHero';
import CollectionGrid from '@/components/collection/CollectionGrid';
import CollectionFilters from '@/components/collection/CollectionFilters';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.collectionName} | ${SITE_CONFIG.name}`,
  description: `Découvrez ${SITE_CONFIG.collectionName} — 8 burkinis élégants conçus à Paris. Qualité premium, séchage rapide, protection solaire. Livraison offerte.`,
  openGraph: {
    title: `${SITE_CONFIG.collectionName} — ${SITE_CONFIG.name}`,
    description: 'La collection exclusive de burkinis. Conçue à Paris, qualité premium.',
    images: [{ url: '/images/og/og-riviera.webp', width: 1200, height: 630 }],
  },
};

export default function LuliyaneRivieraPage() {
  const products = getAllProducts();

  return (
    <main>
      <CollectionHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <CollectionFilters />
        <CollectionGrid products={products} />
      </div>
    </main>
  );
}
