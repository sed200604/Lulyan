'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Media = {
  type: 'image' | 'video';
  src: string;
  posterSrc?: string;  // for video
  alt: string;
  blurDataURL?: string;
};

type Props = { media: Media[]; productName: string };

export function ProductGallery({ media, productName }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIdx(idx);
  };

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' });
    setActiveIdx(idx);
  };

  return (
    <div className="w-full">
      {/* Main slider — swipe on mobile, click on desktop */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full aspect-[4/5] overflow-x-auto snap-x snap-mandatory flex scrollbar-none bg-neutral-50"
        style={{ scrollBehavior: 'smooth' }}
      >
        {media.map((m, i) => (
          <div key={i} className="min-w-full h-full snap-center relative">
            {m.type === 'image' ? (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full cursor-zoom-in"
                aria-label={`Voir ${m.alt} en grand`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 60vw"
                  priority={i === 0}          // LCP image only
                  placeholder={m.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={m.blurDataURL}
                  quality={85}
                  className="object-cover"
                />
              </button>
            ) : (
              <video
                src={m.src}
                poster={m.posterSrc}
                muted
                loop
                playsInline
                autoPlay={i === activeIdx}
                controls
                className="w-full h-full object-cover"
                aria-label={m.alt}
              />
            )}

            {/* Media badge (in-water / macro / video) */}
            {m.type === 'video' && (
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase font-medium">
                ▶ Vidéo
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress dots + counter */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex gap-1.5">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Voir photo ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === activeIdx ? 'w-6 bg-[#2A2A2A]' : 'w-1.5 bg-neutral-300'
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] tabular-nums text-neutral-500">
          {activeIdx + 1} / {media.length}
        </p>
      </div>

      {/* Thumbnail strip — desktop only */}
      <div className="hidden lg:grid grid-cols-6 gap-2 mt-4">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Voir ${m.alt}`}
            aria-current={i === activeIdx}
            className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
              i === activeIdx ? 'border-[#B8956A]' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={m.type === 'video' ? (m.posterSrc ?? '') : m.src}
              alt={m.alt}
              fill
              sizes="120px"
              className="object-cover"
            />
            {m.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M6 4l10 6-10 6z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}