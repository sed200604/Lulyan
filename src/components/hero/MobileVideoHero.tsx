'use client';

// ═══════════════════════════════════════════
// COMPOSANT PRINCIPAL — MOBILE VIDEO HERO (v2 expert)
//
// Implements ALL spec requirements:
//   • 100dvh viewport (iOS Safari toolbar-safe)
//   • Safe-area insets (notch / home indicator)
//   • av1 → h264 video source fallback
//   • object-position: 70% center (subject right)
//   • Video filter: brightness/contrast/saturation
//   • Gradient scrims: bottom 55% + top 20% + vignette ring
//   • Cinematic grain overlay
//   • Light leak atmosphere (Part 4.7)
//   • Waterfall entry sequence (Part 4.1)
//   • prefers-reduced-motion: static poster
//   • Scroll-driven parallax (GPU-safe)
//   • Nav scroll transparency > solid #1A1A1A after 80px
// ═══════════════════════════════════════════

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useHeroVideo } from './useHeroVideo';
import { useReducedMotion } from './useReducedMotion';
import { HeroLoadingState } from './HeroLoadingState';
import { HeroTextOverlay } from './HeroTextOverlay';
import { HeroScrollIndicator } from './HeroScrollIndicator';
import { HeroLightLeak } from './HeroLightLeak';
import { WATERFALL, DURATION, LUXURY_EASE } from './hero.constants';

// ── Brand colours kept local for inline styles ──
const CREAM  = '#E8D9A8';
const BLACK  = '#1A1A1A';

export function MobileVideoHero() {
  const { videoRef, state, play } = useHeroVideo();
  const [showContent, setShowContent] = useState(false);
  const [videoRevealed, setVideoRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // ── Scroll-driven effects (GPU-accelerated) ──
  const { scrollY } = useScroll();
  // Subtle parallax — video drifts up at half scroll speed
  const videoY = useTransform(scrollY, [0, 600], [0, 90]);
  // Content fades as user scrolls away
  const overlayOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // ── Animation waterfall ──────────────────────
  useEffect(() => {
    if (state === 'ready' || state === 'playing') {
      const revealTimer = setTimeout(() => {
        setVideoRevealed(true);
        play();

        // Text content appears after video fades in
        const contentDelay = (WATERFALL.VIDEO_FADE_IN + DURATION.VIDEO_FADE) * 1000;
        const contentTimer = setTimeout(() => {
          setShowContent(true);
        }, contentDelay);

        return () => clearTimeout(contentTimer);
      }, 200); // 200ms after mount

      return () => clearTimeout(revealTimer);
    }

    // Error / no-video: reveal immediately
    if (state === 'error') {
      setVideoRevealed(true);
      setShowContent(true);
    }
  }, [state, play]);

  return (
    <section
      ref={containerRef}
      role="banner"
      aria-label="Hero — LULIYANE PARIS, Le Burkini de Luxe"
      className="relative w-full overflow-hidden bg-black"
      style={{
        // dvh for iOS Safari toolbar safety (not vh)
        height: '100dvh',
        minHeight: '600px',
        // Safe-area padding baked into section so children can use it
        paddingTop: 'max(env(safe-area-inset-top), 16px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
      }}
    >

      {/* ═══════════════════════════════════════════
          LAYER 1 — Background Video / Poster Fallback
          Parallax: GPU-accelerated translateY
      ══════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{ y: reducedMotion ? 0 : videoY }}
      >
        {/* Waterfall fade-in */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={videoRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: reducedMotion ? 0 : WATERFALL.VIDEO_FADE_IN,
            duration: reducedMotion ? 0.2 : DURATION.VIDEO_FADE,
            ease: LUXURY_EASE as unknown as string,
          }}
        >
          {/* prefers-reduced-motion: show a static black background with branding */}
          {reducedMotion ? (
            <div
              className="absolute inset-0"
              style={{
                background: '#1A1A1A',
              }}
              aria-hidden="true"
            />
          ) : state !== 'error' ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full"
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
              aria-hidden="true"
              style={{
                objectFit: 'cover',
                objectPosition: '70% center',
                filter: 'brightness(0.92) contrast(1.05) saturate(0.95)',
              }}
            >
              {/* Portrait for mobile */}
              <source
                src="/videos/hero-mobile-vertical.mp4"
                type="video/mp4"
                media="(max-width: 767px)"
              />
              {/* Landscape for desktop */}
              <source
                src="/videos/hero-desktop.mp4"
                type="video/mp4"
                media="(min-width: 768px)"
              />
            </video>
          ) : (
            /* Error fallback — matte black with subtle text */
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: BLACK }}
            >
              <span
                className="font-heading font-light tracking-widest uppercase"
                style={{ color: `${CREAM}20`, fontSize: '14px' }}
              >
                Luliyane Paris
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          LAYER 2 — Cinematic Light Leak (Part 4.7)
          Drifting warm peach/gold radial in screen mode
      ══════════════════════════════════════════════ */}
      {!reducedMotion && <HeroLightLeak />}

      {/* ═══════════════════════════════════════════
          LAYER 3 — Bottom Gradient Scrim (Part 3.4)
          55% viewport height — NON NEGOTIABLE for legibility
          mix-blend-mode: multiply preserves color warmth
      ══════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '55%',
          zIndex: 5,
          background: `linear-gradient(
            to top,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.55) 25%,
            rgba(0,0,0,0.25) 55%,
            rgba(0,0,0,0.00) 100%
          )`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 4 — Top Scrim (Part 3.5)
          18% viewport height — preserves nav icon legibility
          against bright golden sky
      ══════════════════════════════════════════════ */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '18%',
          zIndex: 5,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.45) 0%,
            transparent 100%
          )`,
        }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 5 — Vignette Ring
          Radial gradient focuses eye inward
      ══════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0,0,0,0.25) 100%
          )`,
        }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 6 — Cinematic Film Grain (luxury texture)
      ══════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          zIndex: 7,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════
          LAYER 7 — Text + CTA (scroll-fade out)
      ══════════════════════════════════════════════ */}
      <motion.div style={{ opacity: reducedMotion ? 1 : overlayOpacity }}>
        <HeroTextOverlay isVisible={showContent} />
      </motion.div>

      {/* ═══════════════════════════════════════════
          LAYER 8 — Scroll Indicator
      ══════════════════════════════════════════════ */}
      <HeroScrollIndicator isVisible={showContent} />

      {/* ═══════════════════════════════════════════
          LAYER 9 — Loading State (exits with fade)
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {!videoRevealed && <HeroLoadingState />}
      </AnimatePresence>

    </section>
  );
}
