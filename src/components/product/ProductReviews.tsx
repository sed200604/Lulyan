'use client';

import { Star, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types/product';
import { mockReviews } from '@/data/products';

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  if (!product.reviewCount || product.reviewCount === 0) return null;

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-montserrat tracking-[0.4em] uppercase text-brand-gold-500">
            Témoignages
          </span>
          <h2 className="mt-2 text-3xl font-cormorant font-light">
            Avis Clients
          </h2>
        </div>
        
        {/* Score global + barres */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
          {/* Note globale */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-cormorant font-light text-neutral-900">
              {product.rating.toFixed(1)}
            </div>
            <div className="flex gap-0.5 justify-center md:justify-start mt-2">
              {[1, 2, 3, 4, 5].map(s => (
                <Star 
                  key={s} 
                  className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-brand-gold-500' : 'text-neutral-200'}`} 
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="mt-1 text-xs font-montserrat text-neutral-500">
              Basé sur {product.reviewCount} avis
            </p>
          </div>
          
          {/* Barres de notation par critère */}
          <div className="flex-1 space-y-3">
            {[
              { label: 'Coupe', score: 4.8 },
              { label: 'Qualité', score: 5.0 },
              { label: 'Confort', score: 4.9 },
              { label: 'Rapport qualité-prix', score: 4.6 },
            ].map(({ label, score }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs font-montserrat text-neutral-600 w-32">
                  {label}
                </span>
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(score / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
                    className="h-full bg-brand-gold-500 rounded-full"
                  />
                </div>
                <span className="text-xs font-montserrat text-neutral-800 w-8 text-right">
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Avis individuels */}
        <div className="space-y-8">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-t border-neutral-100 pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-montserrat font-medium text-neutral-900">
                      {review.name}
                    </span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-montserrat text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <BadgeCheck className="w-3 h-3" />
                        Achat vérifié
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star 
                        key={s}
                        className={`w-3 h-3 ${
                          s <= review.rating 
                            ? 'text-brand-gold-500' 
                            : 'text-neutral-200'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs font-montserrat text-neutral-400">
                  {review.date}
                </span>
              </div>
              
              {/* Taille achetée */}
              {review.size && (
                <p className="mt-2 text-xs font-montserrat text-neutral-400">
                  Taille achetée : {review.size}
                </p>
              )}
              
              {/* Texte de l'avis */}
              <p className="mt-3 text-sm font-montserrat text-neutral-700 leading-relaxed">
                {review.text}
              </p>
              
              {/* Images */}
              {review.images && review.images.length > 0 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x">
                  {review.images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden snap-start cursor-pointer hover:opacity-90 transition-opacity">
                      <Image
                        src={img}
                        alt={`Photo de l'avis ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}