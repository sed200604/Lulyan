'use client';
import { useState } from 'react';
import Image from 'next/image';
import { HIJAB_COLORS, getHijabByColor } from '@/data/hijab-gift';
import { HijabLightbox } from './HijabLightbox';

type Props = {
  selectedColorSlug: string | null;
  onSelectColor: (slug: string) => void;
  recommendedColorSlug?: string;   // pre-selected based on burkini color
};

export function GiftOfferSection({ selectedColorSlug, onSelectColor, recommendedColorSlug }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const selected = selectedColorSlug ? getHijabByColor(selectedColorSlug) : null;

  return (
    <>
      <section
        className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#F9F5EC] to-[#F5F0E8] border border-[#E8DCC4]/50"
        aria-labelledby="gift-offer-title"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#B8956A]/40" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8956A] font-medium">
              ─── En Cadeau ───
            </span>
            <div className="h-px w-8 bg-[#B8956A]/40" />
          </div>
          <h3 id="gift-offer-title" className="font-serif text-[24px] sm:text-[28px] font-light text-[#2A2A2A] leading-tight">
            Un hijab d'été assorti
          </h3>
          <p className="mt-2 font-serif italic text-[14px] text-[#666]">
            Offert avec ce burkini · Valeur 25 €
          </p>
        </div>

        {/* Photo preview area */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-[220px] sm:w-[260px] aspect-[4/5] group">
            {/* All 4 images stacked — opacity swap for buttery cross-fade */}
            {HIJAB_COLORS.map(color => (
              <button
                key={color.slug}
                type="button"
                onClick={() => selectedColorSlug === color.slug && setLightboxOpen(true)}
                aria-label={selectedColorSlug === color.slug ? `Agrandir ${color.name}` : `${color.name} (non sélectionné)`}
                tabIndex={selectedColorSlug === color.slug ? 0 : -1}
                className={`
                  absolute inset-0 rounded-xl overflow-hidden bg-white/60
                  transition-opacity duration-500 ease-in-out
                  ${selectedColorSlug === color.slug ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  ${selectedColorSlug === color.slug ? 'cursor-zoom-in' : ''}
                `}
                style={{
                  boxShadow: '0 4px 24px rgba(184, 149, 106, 0.08)',
                }}
              >
                <Image
                  src={color.imageUrl}
                  alt={color.altText}
                  fill
                  sizes="(max-width: 640px) 220px, 260px"
                  placeholder="blur"
                  blurDataURL={color.blurDataURL}
                  quality={85}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Subtle zoom indicator when selected */}
                {selectedColorSlug === color.slug && (
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 3v12M3 9h12" />
                    </svg>
                  </div>
                )}
              </button>
            ))}

            {/* Placeholder shown when nothing selected */}
            {!selectedColorSlug && (
              <div className="absolute inset-0 rounded-xl bg-white/40 border-2 border-dashed border-[#B8956A]/30 flex items-center justify-center">
                <p className="text-[12px] italic text-[#B8956A] font-serif text-center px-6">
                  Choisissez une couleur<br />
                  pour découvrir votre hijab
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-4">
          {HIJAB_COLORS.map(color => {
            const isSelected = color.slug === selectedColorSlug;
            const isRecommended = color.slug === recommendedColorSlug && !isSelected;
            return (
              <button
                key={color.slug}
                type="button"
                onClick={() => onSelectColor(color.slug)}
                aria-label={`Choisir ${color.name}`}
                aria-pressed={isSelected}
                className={`
                  relative w-12 h-12 sm:w-14 sm:h-14 rounded-full
                  transition-all duration-200 ease-out
                  ${isSelected
                    ? 'ring-2 ring-[#B8956A] ring-offset-2 ring-offset-[#F9F5EC] scale-110'
                    : 'ring-1 ring-neutral-300 hover:ring-[#B8956A] hover:scale-105'
                  }
                `}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-lg drop-shadow-md">
                    ✓
                  </span>
                )}
                {isRecommended && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B8956A] flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected color name + note */}
        <div className="text-center min-h-[48px]">
          {selected ? (
            <>
              <p className="text-[14px] font-medium text-[#2A2A2A]">
                {selected.name} <span className="text-[#B8956A]">sélectionné</span>
              </p>
              <p className="text-[12px] italic text-neutral-500 font-serif mt-1">
                {selected.note} · <button onClick={() => setLightboxOpen(true)} className="text-[#B8956A] hover:underline">Voir la photo en grand</button>
              </p>
            </>
          ) : (
            <p className="text-[13px] italic text-neutral-500 font-serif">
              Choisissez la couleur de votre hijab
              {recommendedColorSlug && (
                <span className="block text-[11px] text-[#B8956A] mt-1">
                  · {getHijabByColor(recommendedColorSlug)?.name} recommandé pour ce burkini ·
                </span>
              )}
            </p>
          )}
        </div>

        {/* Fabric note */}
        <div className="mt-6 pt-6 border-t border-[#E8DCC4]/50 text-center">
          <p className="text-[11px] italic text-neutral-500 font-serif leading-relaxed">
            Voile de coton léger · 180 × 90 cm · Fabriqué avec soin
          </p>
        </div>
      </section>

      {/* Lightbox modal for zoom */}
      {selected && (
        <HijabLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          color={selected}
          colors={HIJAB_COLORS}
          onSelectColor={onSelectColor}
        />
      )}
    </>
  );
}
