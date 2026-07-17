'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HijabColor } from '@/data/hijab-gift';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  color: HijabColor;
  colors: HijabColor[];
  onSelectColor: (slug: string) => void;
};

export function HijabLightbox({ isOpen, onClose, color, colors, onSelectColor }: Props) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const idx = colors.findIndex(c => c.slug === color.slug);
        const prev = colors[(idx - 1 + colors.length) % colors.length];
        onSelectColor(prev.slug);
      }
      if (e.key === 'ArrowRight') {
        const idx = colors.findIndex(c => c.slug === color.slug);
        const next = colors[(idx + 1) % colors.length];
        onSelectColor(next.slug);
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, color, colors, onSelectColor]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo agrandie : ${color.name}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="fixed top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/90 hover:text-white transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>

      {/* Previous arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const idx = colors.findIndex(c => c.slug === color.slug);
          const prev = colors[(idx - 1 + colors.length) % colors.length];
          onSelectColor(prev.slug);
        }}
        aria-label="Couleur précédente"
        className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const idx = colors.findIndex(c => c.slug === color.slug);
          const next = colors[(idx + 1) % colors.length];
          onSelectColor(next.slug);
        }}
        aria-label="Couleur suivante"
        className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative w-full max-w-[520px] mx-auto p-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative aspect-[4/5] rounded-lg overflow-hidden bg-neutral-900 cursor-${zoomed ? 'zoom-out' : 'zoom-in'} transition-transform duration-500`}
          style={{ transform: zoomed ? 'scale(1.3)' : 'scale(1)' }}
          onClick={() => setZoomed(z => !z)}
          role="button"
          aria-label={zoomed ? 'Réduire' : 'Agrandir'}
        >
          <Image
            src={color.imageUrl}
            alt={color.altText}
            fill
            sizes="(max-width: 640px) 100vw, 520px"
            quality={90}
            priority
            placeholder="blur"
            blurDataURL={color.blurDataURL}
            className="object-cover"
          />
        </div>

        {/* Caption + swatch strip below image */}
        <div className="mt-6 text-center">
          <p className="font-serif text-[22px] font-light text-white">
            {color.name}
          </p>
          <p className="mt-1 font-serif italic text-[13px] text-white/70">
            {color.note}
          </p>

          {/* Color swatch navigation */}
          <div className="mt-6 flex justify-center gap-3">
            {colors.map(c => (
              <button
                key={c.slug}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectColor(c.slug);
                }}
                aria-label={`Voir ${c.name}`}
                className={`
                  w-10 h-10 rounded-full transition-all duration-200
                  ${c.slug === color.slug
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                    : 'ring-1 ring-white/30 hover:ring-white/60 hover:scale-105'
                  }
                `}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 200ms ease-out; }
        .animate-scaleIn { animation: scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1); }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn, .animate-scaleIn { animation: none; }
        }
      `}</style>
    </div>
  );
}
