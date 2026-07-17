'use client';
import Link from 'next/link';
import Image from 'next/image';
import { HIJAB_COLORS } from '@/data/hijab-gift';
import { isGiftOfferActive } from '@/config/promotions';

export function GiftOfferHomeCallout() {
  if (!isGiftOfferActive()) return null;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F9F7F2] to-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left — 4 hijab photos in a subtle grid */}
          <div className="grid grid-cols-2 gap-3 order-2 md:order-1">
            {HIJAB_COLORS.map((color, idx) => (
              <div
                key={color.slug}
                className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white/50"
                style={{
                  transform: `translateY(${idx % 2 === 0 ? '0' : '20px'})`,
                }}
              >
                <Image
                  src={color.imageUrl}
                  alt={color.altText}
                  fill
                  sizes="(max-width: 768px) 45vw, 25vw"
                  placeholder="blur"
                  blurDataURL={color.blurDataURL}
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 text-[10px] tracking-widest text-white/90 font-medium uppercase drop-shadow">
                  {color.name}
                </div>
              </div>
            ))}
          </div>

          {/* Right — editorial copy */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="h-px w-8 bg-[#B8956A]/40" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8956A] font-medium">
                Édition d'Été 2026
              </span>
              <div className="h-px w-8 bg-[#B8956A]/40 md:hidden" />
            </div>

            <h2 className="font-serif text-[32px] sm:text-[42px] font-light leading-[1.15] text-[#2A2A2A] mb-6">
              Un hijab d'été,<br />
              <em className="italic text-[#B8956A]">offert.</em>
            </h2>

            <p className="font-serif italic text-[16px] text-[#666] leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Avec chaque burkini de la collection, un hijab assorti — pensé
              pour prolonger l'esprit de nos silhouettes d'été.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              <Link
                href="/collections/burkini"
                className="inline-flex items-center gap-2 bg-[#2A2A2A] text-white px-8 py-4 rounded-lg text-[13px] tracking-[0.15em] uppercase font-medium hover:bg-black transition-all group"
              >
                Découvrir la collection
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-[11px] italic text-neutral-500 font-serif">
                Jusqu'au 31 août
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
