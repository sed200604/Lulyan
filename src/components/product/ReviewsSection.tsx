import { Star, CheckCircle } from 'lucide-react';
import { Product } from '@/types/product';

interface ReviewsSectionProps {
  product: Product;
}

export function ReviewsSection({ product }: ReviewsSectionProps) {
  if (product.rating === 0 || product.reviewCount === 0) return null;

  // Mock reviews for the template
  const mockReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      date: '12 Juin 2026',
      rating: 5,
      content: 'Parfait. La matière est incroyable et la coupe très flatteuse. Je recommande vivement pour celles qui cherchent l\'élégance.',
      verified: true
    },
    {
      id: 2,
      author: 'Nadia B.',
      date: '28 Mai 2026',
      rating: 5,
      content: 'Le burkini est magnifique. Il sèche très rapidement et le tissu est vraiment premium.',
      verified: true
    }
  ];

  const ratingDist: { fit: number; quality: number; comfort: number } = { fit: 4.8, quality: 5.0, comfort: 4.9 };

  return (
    <div id="reviews" className="flex flex-col my-12 scroll-mt-24">
      <h2 className="font-heading text-[24px] text-[#1A1A1A] uppercase tracking-[0.02em] font-light mb-8">
        AVIS CLIENTS
      </h2>
      
      {/* Aggregate Block */}
      <div className="flex flex-col border border-[#1A1A1A]/10 p-6 mb-8 rounded-[4px] bg-[#FAF7F2]/50">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-heading text-[40px] text-[#1A1A1A] leading-none">{product.rating.toFixed(1)}</span>
          <div className="flex flex-col">
            <div className="flex text-[#C5A14E] mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current" strokeWidth={0} />
              ))}
            </div>
            <span className="font-sans text-[11px] text-[#666666]">
              Basé sur {product.reviewCount} avis
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
        {mockReviews.map((review) => (
          <div key={review.id} className="flex flex-col border-b border-[#1A1A1A]/10 pb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[13px] font-medium text-[#1A1A1A]">{review.author}</span>
                {review.verified && (
                  <CheckCircle className="w-3 h-3 text-[#C5A14E]" />
                )}
              </div>
              <span className="font-sans text-[11px] text-[#666666]">{review.date}</span>
            </div>
            
            <div className="flex text-[#C5A14E] mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" strokeWidth={0} />
              ))}
            </div>

            <p className="font-sans text-[13px] text-[#666666] leading-[1.6]">
              {review.content}
            </p>
          </div>
        ))}
      </div>
      
      <button className="mt-8 font-sans text-[12px] uppercase tracking-wide text-[#1A1A1A] underline decoration-[#1A1A1A]/30 underline-offset-4 hover:decoration-[#1A1A1A] transition-colors self-center">
        VOIR TOUS LES AVIS
      </button>
    </div>
  );
}
