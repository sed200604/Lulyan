import { Star, BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import { mockReviews } from '@/data/products';
import { TrustBadge } from '@/components/checkout/TrustBadge';

export const metadata = {
  title: 'Avis Clients | LULIYANE',
  description: 'Découvrez les avis de nos clientes sur les créations LULIYANE Paris.',
};

export default function ReviewsPage() {
  const averageRating = mockReviews.reduce((acc, rev) => acc + rev.rating, 0) / mockReviews.length;

  return (
    <div className="min-h-screen bg-brand-cream-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-montserrat tracking-[0.4em] uppercase text-brand-gold-500">
            Témoignages
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-cormorant font-light text-brand-black-500">
            L'Avis de Nos Clientes
          </h1>
          <p className="mt-6 text-sm font-montserrat text-brand-black-400 max-w-xl mx-auto leading-relaxed">
            La satisfaction de nos clientes est au cœur de notre démarche. 
            Découvrez leurs retours sur l'élégance, le confort et la qualité de nos collections.
          </p>
        </div>

        {/* Global Score */}
        <div className="bg-white p-8 md:p-12 mb-16 shadow-sm border border-brand-black-100/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="text-6xl font-cormorant font-light text-brand-black-500">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 justify-center mt-3">
              {[1, 2, 3, 4, 5].map(s => (
                <Star 
                  key={s} 
                  className={`w-5 h-5 ${s <= Math.round(averageRating) ? 'fill-brand-gold-500 text-brand-gold-500' : 'text-neutral-200'}`} 
                />
              ))}
            </div>
            <p className="mt-2 text-sm font-montserrat text-brand-black-400">
              Sur la base de {mockReviews.length} avis vérifiés
            </p>
          </div>
          
          <div className="w-full md:w-auto flex-grow max-w-md">
            <div className="space-y-4">
              {[
                { label: 'Qualité du tissu', score: 4.9 },
                { label: 'Coupe & Taillant', score: 4.8 },
                { label: 'Confort', score: 4.9 },
              ].map(({ label, score }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-xs font-montserrat text-brand-black-400 w-32">
                    {label}
                  </span>
                  <div className="flex-1 h-1.5 bg-brand-cream-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-gold-500 rounded-full"
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-montserrat text-brand-black-500 w-8 text-right font-medium">
                    {score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Form Teaser */}
        <div className="bg-brand-black-500 p-8 text-center mb-16 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"></div>
          <div className="relative z-10">
            <h3 className="font-cormorant text-2xl text-brand-cream-500 mb-2">Vous avez commandé chez LULIYANE ?</h3>
            <p className="font-montserrat text-sm text-brand-cream-200 mb-6 max-w-lg mx-auto">
              Partagez votre expérience avec notre communauté. Votre avis nous est précieux.
            </p>
            <a href="#donner-avis" className="inline-block bg-brand-gold-500 text-brand-black-500 font-montserrat text-xs font-bold uppercase tracking-wider px-8 py-4 hover:bg-brand-gold-400 transition-colors">
              Laisser un avis
            </a>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-8 bg-white p-6 md:p-10 shadow-sm border border-brand-black-100/50">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-brand-black-100/50 last:border-0 pb-8 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-montserrat font-bold text-brand-black-500">
                      {review.name}
                    </span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-montserrat text-green-700 bg-green-50 px-2.5 py-1 rounded-sm uppercase tracking-wider font-semibold">
                        <BadgeCheck className="w-3 h-3" />
                        Achat vérifié
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star 
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= review.rating 
                            ? 'fill-brand-gold-500 text-brand-gold-500' 
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs font-montserrat text-brand-black-300">
                  {review.date}
                </span>
              </div>
              
              {review.size && (
                <p className="mt-3 text-xs font-montserrat text-brand-black-300">
                  Taille achetée : <span className="font-medium text-brand-black-400">{review.size}</span>
                </p>
              )}
              
              <p className="mt-4 text-sm font-montserrat text-brand-black-500 leading-relaxed">
                {review.text}
              </p>
              
              {review.images && review.images.length > 0 && (
                <div className="mt-5 flex gap-3 overflow-x-auto pb-2 snap-x">
                  {review.images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-32 flex-shrink-0 rounded-sm overflow-hidden snap-start hover:opacity-90 transition-opacity border border-brand-black-100/50">
                      <Image
                        src={img}
                        alt={`Photo de l'avis ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center" id="donner-avis">
          <TrustBadge variant="marks" />
        </div>
      </div>
    </div>
  );
}
