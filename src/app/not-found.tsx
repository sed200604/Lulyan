import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { products } from '@/data/products';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream-50 flex flex-col items-center justify-center px-6 text-center">
      <p className="font-accent text-overline text-brand-gold-500 tracking-[0.2em] uppercase mb-4">
        Erreur 404
      </p>

      <h1 className="font-heading text-display-2 text-brand-black-950 mb-4">
        Page introuvable
      </h1>

      <p className="font-body text-body text-brand-black-400 max-w-md mb-12">
        La page que vous recherchez n&apos;existe pas ou a été déplacée. Explorez notre collection exclusive LULIYANE RIVIERA ci-dessous.
      </p>

      <Link
        href={ROUTES.COLLECTION}
        className="inline-flex items-center gap-2 bg-brand-black-950 text-brand-cream-50 px-8 py-4 font-accent text-overline tracking-[0.1em] hover:bg-brand-gold-500 transition-colors duration-300 mb-12 uppercase tracking-widest text-xs font-montserrat"
      >
        DÉCOUVRIR LA COLLECTION
      </Link>

      <div className="flex flex-wrap justify-center gap-4">
        {products.slice(0, 4).map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="border border-brand-gold-300 px-5 py-2 font-body text-body-sm text-brand-black-600 hover:border-brand-gold-500 hover:text-brand-gold-600 transition-colors"
          >
            {product.name}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 font-body text-body-sm text-brand-black-400 hover:text-brand-gold-500 transition-colors underline underline-offset-4"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
