'use client';

// ═══════════════════════════════════════════
// COMPOSANT — HERO TEXT OVERLAY (v2 expert)
// Implements:
//   • Waterfall entry animation (Part 4.1)
//   • Two-line wordmark logotype (Part 3.1)
//   • Tagline with gold containment ring (Part 3.2)
//   • CTA with brand-gold-fill horizontal sweep (Part 3.3, 4.3, 4.4)
//   • prefers-reduced-motion graceful fallback
// ═══════════════════════════════════════════

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useReducedMotion } from './useReducedMotion';
import {
  WATERFALL, DURATION, STAGGER,
  LUXURY_EASE, DECO_EASE,
  BRAND,
} from './hero.constants';

// ── Tagline text (split for character stagger) ──
const TAGLINE = "L'ÉLÉGANCE AQUATIQUE";
const taglineChars = TAGLINE.split('');

// ── Gold horizontal decorative line ─────────────
function GoldLine({
  delay,
  reducedMotion,
}: {
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="mx-auto"
      style={{
        height: '1px',
        background: `linear-gradient(to right, transparent, ${BRAND.GOLD}, transparent)`,
        width: 32,
        opacity: 0.7,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 0.7 }}
      transition={{
        delay: reducedMotion ? 0 : delay,
        duration: reducedMotion ? 0.2 : DURATION.DECO_LINE,
        ease: DECO_EASE as unknown as string,
      }}
    />
  );
}

// ── Reduced-motion fallback render ──────────────
function StaticTextBlock() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[120px] px-6">
      <div className="text-center">
        {/* Two-line wordmark */}
        <h1
          className="font-heading font-light text-white"
          style={{
            fontSize: 'clamp(28px, 7vw, 44px)',
            letterSpacing: '0.42em',
            lineHeight: 1.05,
            textShadow: '0 2px 24px rgba(0,0,0,0.35)',
          }}
        >
          <span className="block">LULIYANE</span>
          <span className="block" style={{ marginTop: '4px' }}>PARIS</span>
        </h1>

        {/* Top deco line */}
        <div
          aria-hidden="true"
          className="mx-auto mt-4"
          style={{ height: '1px', width: 32, background: `linear-gradient(to right, transparent, ${BRAND.GOLD}, transparent)`, opacity: 0.7 }}
        />

        {/* Tagline */}
        <p
          className="font-body font-light uppercase"
          style={{
            marginTop: '10px',
            fontSize: 'clamp(11px, 2.8vw, 14px)',
            letterSpacing: '0.6em',
            color: BRAND.CREAM,
            opacity: 0.88,
          }}
        >
          {TAGLINE}
        </p>

        {/* Bottom deco line */}
        <div
          aria-hidden="true"
          className="mx-auto mt-2"
          style={{ height: '1px', width: 32, background: `linear-gradient(to right, transparent, ${BRAND.GOLD}, transparent)`, opacity: 0.7 }}
        />

        {/* CTA */}
        <div style={{ marginTop: '32px' }}>
          <Link
            href="/collections/burkini-glamour"
            role="button"
            aria-label="Découvrir notre collection burkini"
            className="inline-flex items-center justify-center font-body font-normal uppercase"
            style={{
              minHeight: '52px',
              padding: '0 36px',
              width: 'min(80vw, 320px)',
              border: `1px solid ${BRAND.GOLD}`,
              background: 'rgba(26,26,26,0.35)',
              backdropFilter: 'blur(8px)',
              color: BRAND.CREAM,
              fontSize: '13px',
              letterSpacing: '0.24em',
              borderRadius: '0',
            }}
          >
            DÉCOUVRIR LE BURKINI
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main animated text overlay ───────────────────
export function HeroTextOverlay({ isVisible }: { isVisible: boolean }) {
  const reducedMotion = useReducedMotion();
  const [ctaHovered, setCtaHovered] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);
  const [ctaLoading, setCtaLoading] = useState(false);

  if (reducedMotion) return <StaticTextBlock />;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[14%] px-6">
          <div
            className="flex flex-col items-center text-center"
            style={{ maxWidth: '88vw' }}
          >
            {/* ── Wordmark — Two lines (logotype treatment) ── */}
            <h1
              className="font-heading font-light text-white"
              style={{
                fontSize: 'clamp(28px, 7vw, 44px)',
                letterSpacing: '0.42em',
                lineHeight: 1.05,
                textShadow: '0 2px 24px rgba(0,0,0,0.35)',
              }}
            >
              {/* Screen-reader gets full text at once */}
              <span className="sr-only">LULIYANE PARIS</span>

              {/* Visual: line 1 "LULIYANE" */}
              <motion.span
                className="block"
                aria-hidden="true"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: WATERFALL.WORDMARK_LINE1,
                  duration: DURATION.WORDMARK,
                  ease: LUXURY_EASE as unknown as string,
                }}
              >
                LULIYANE
              </motion.span>

              {/* Visual: line 2 "PARIS" — 150ms after line 1 */}
              <motion.span
                className="block"
                aria-hidden="true"
                style={{ marginTop: '4px' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: WATERFALL.WORDMARK_LINE2,
                  duration: DURATION.WORDMARK,
                  ease: LUXURY_EASE as unknown as string,
                }}
              >
                PARIS
              </motion.span>
            </h1>

            {/* ── Top gold containment line ── */}
            <div style={{ marginTop: '20px' }}>
              <GoldLine delay={WATERFALL.DECO_LINE_TOP} reducedMotion={false} />
            </div>

            {/* ── Tagline — character stagger ── */}
            <motion.p
              className="font-body font-light uppercase"
              style={{
                marginTop: '10px',
                fontSize: 'clamp(11px, 2.8vw, 14px)',
                letterSpacing: '0.6em',
                color: BRAND.CREAM,
                opacity: 0.88,
              }}
              aria-label={TAGLINE}
            >
              <span aria-hidden="true">
                {taglineChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: WATERFALL.TAGLINE + i * STAGGER.TAGLINE_CHAR,
                      duration: DURATION.TAGLINE_CHAR,
                      ease: LUXURY_EASE as unknown as string,
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.p>

            {/* ── Bottom gold containment line ── */}
            <div style={{ marginTop: '10px' }}>
              <GoldLine delay={WATERFALL.DECO_LINE_BOT} reducedMotion={false} />
            </div>

            {/* ── CTA Button ── */}
            <motion.div
              style={{ marginTop: '32px' }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: WATERFALL.CTA,
                duration: DURATION.CTA,
                ease: LUXURY_EASE as unknown as string,
              }}
            >
              <Link
                href="/collections/burkini-glamour"
                role="button"
                aria-label="Découvrir notre collection burkini"
                className="relative inline-flex items-center justify-center font-body font-normal uppercase overflow-hidden"
                style={{
                  minHeight: '52px',
                  padding: '0 36px',
                  width: 'min(80vw, 320px)',
                  border: `1px solid ${BRAND.GOLD}`,
                  background: ctaActive
                    ? BRAND.GOLD_DARK
                    : 'rgba(26,26,26,0.35)',
                  backdropFilter: 'blur(8px)',
                  color: ctaHovered || ctaActive ? BRAND.MATTE_BLACK : BRAND.CREAM,
                  fontSize: '13px',
                  letterSpacing: '0.24em',
                  borderRadius: '0',
                  boxShadow: ctaHovered
                    ? `0 8px 32px ${BRAND.GOLD_GLOW}`
                    : '0 4px 24px rgba(0,0,0,0.25)',
                  transform: ctaActive ? 'scale(0.98)' : ctaHovered ? 'scale(1.02)' : 'scale(1)',
                  transition:
                    'background 380ms cubic-bezier(0.22,1,0.36,1), color 200ms ease, transform 120ms ease, box-shadow 320ms ease',
                  pointerEvents: ctaLoading ? 'none' : 'auto',
                  opacity: ctaLoading ? 0.7 : 1,
                  // Idle breathing pulse via animation name injected below
                  animation: ctaHovered ? 'none' : 'ctaBreathe 3.2s ease-in-out infinite',
                }}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => { setCtaHovered(false); setCtaActive(false); }}
                onMouseDown={() => setCtaActive(true)}
                onMouseUp={() => setCtaActive(false)}
                onTouchStart={() => setCtaActive(true)}
                onTouchEnd={() => setCtaActive(false)}
                onClick={() => setCtaLoading(true)}
              >
                {/* Gold horizontal sweep pseudo-element (via motion span) */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: BRAND.GOLD,
                    transformOrigin: ctaHovered ? 'left center' : 'right center',
                    zIndex: 0,
                  }}
                  animate={{ scaleX: ctaHovered ? 1 : 0 }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* Button content */}
                <span className="relative z-10" style={{ color: ctaHovered ? BRAND.MATTE_BLACK : BRAND.CREAM, transition: 'color 200ms ease 120ms' }}>
                  {ctaLoading ? (
                    /* 3-dot gold loader */
                    <span className="flex items-center gap-1.5">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="block rounded-full"
                          style={{ width: 5, height: 5, background: BRAND.GOLD }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, delay, repeat: Infinity }}
                        />
                      ))}
                    </span>
                  ) : (
                    'DÉCOUVRIR LE BURKINI'
                  )}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
