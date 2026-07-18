import { Star, CheckCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { mockReviews } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

interface ReviewsSectionProps {
  product: Product;
}

export function ReviewsSection({ product }: ReviewsSectionProps) {
  if (product.rating === 0 || product.reviewCount === 0) return null;

  const ratingDist = { fit: 4.8, quality: 5.0, comfort: 4.9 };

  return (
    <div id="reviews" className="flex flex-col my-12 scroll-mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-[24px] text-[#1A1A1A] uppercase tracking-[0.02em] font-light">
          AVIS CLIENTS
        </h2>
        <Link href="/avis" className="text-[12px] uppercase tracking-widest text-[#B8956A] underline decoration-[#B8956A]/30 underline-offset-4 hover:decoration-[#B8956A]">
          Laisser un avis
        </Link>
      </div>
      
      {/* Aggregate Block */}
      <div className="flex flex-col border border-[#1A1A1A]/10 p-6 mb-8 rounded-[4px] bg-[#FAF7F2]/50">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-heading text-[40px] text-[#1A1A1A] leading-none">{product.rating.toFixed(1)}</span>
          <div className="flex flex-col">
            <div className="flex text-[#C5A14E] mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="font-sans text-[11px] text-[#666666]">
              Basé sur {product.reviewCount} avis authentiques
            </span>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="flex flex-col gap-3 border-t border-[#1A1A1A]/10 pt-6">
          <div className="flex items-center justify-between font-sans text-[12px] text-[#1A1A1A]">
            <span className="w-20">Coupe</span>
            <div className="flex-1 mx-4 h-1 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#1A1A1A]" style={{ width: `${(ratingDist.fit / 5) * 100}%` }} />
            </div>
            <span className="w-6 text-right">{ratingDist.fit.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center justify-between font-sans text-[12px] text-[#1A1A1A]">
            <span className="w-20">Qualité</span>
            <div className="flex-1 mx-4 h-1 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#1A1A1A]" style={{ width: `${(ratingDist.quality / 5) * 100}%` }} />
            </div>
            <span className="w-6 text-right">{ratingDist.quality.toFixed(1)}</span>
          </div>

          <div className="flex items-center justify-between font-sans text-[12px] text-[#1A1A1A]">
            <span className="w-20">Confort</span>
            <div className="flex-1 mx-4 h-1 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#1A1A1A]" style={{ width: `${(ratingDist.comfort / 5) * 100}%` }} />
            </div>
            <span className="w-6 text-right">{ratingDist.comfort.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="flex flex-col gap-6">
        {mockReviews.slice(0, 3).map((review) => (
          <div key={review.id} className="flex flex-col border-b border-[#1A1A1A]/10 pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[13px] font-medium text-[#1A1A1A]">{review.name}</span>
                {review.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-[#C5A14E] uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3" /> Achat vérifié
                  </span>
                )}
              </div>
              <span className="font-sans text-[11px] text-[#666666]">{review.date}</span>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="flex text-[#C5A14E]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              {review.size && (
                <span className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  Taille achetée : {review.size}
                </span>
              )}
            </div>

            <p className="font-sans text-[13px] text-[#444] leading-[1.6] mb-3">
              {review.text}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                {review.images.map((imgSrc, idx) => (
                  <div key={idx} className="relative w-20 h-20 shrink-0 rounded bg-neutral-100 overflow-hidden snap-start border border-neutral-200">
                    <Image
                      src={imgSrc}
                      alt={`Photo client ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="mt-8 font-sans text-[12px] uppercase tracking-wide text-[#1A1A1A] border border-[#1A1A1A] px-6 py-3 hover:bg-[#1A1A1A] hover:text-white transition-colors self-center rounded">
        VOIR TOUS LES AVIS ({product.reviewCount})
      </button>
    </div>
  );
}
