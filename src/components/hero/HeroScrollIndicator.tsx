'use client';

// ═══════════════════════════════════════════
// COMPOSANT — SCROLL INDICATOR (v2 expert)
// Implements:
//   • 1px × 40px gold shimmer line (Part 3.6, 4.5)
//   • "FAITES DÉFILER" label in French
//   • prefers-reduced-motion: static gold line
// ═══════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { WATERFALL, LUXURY_EASE, BRAND } from './hero.constants';
import { useReducedMotion } from './useReducedMotion';

export function HeroScrollIndicator({ isVisible }: { isVisible: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: reducedMotion ? 0 : WATERFALL.SCROLL_SHIMMER,
            duration: 0.8,
            ease: LUXURY_EASE as unknown as string,
          }}
          aria-hidden="true"
        >
          {/* ── Shimmer line container ── */}
          <div
            style={{
              position: 'relative',
              width: '1px',
              height: '40px',
              overflow: 'hidden',
            }}
          >
            {/* Static gold line base */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to bottom, transparent, ${BRAND.GOLD}60, transparent)`,
              }}
            />

            {/* Animated shimmer sweep (skipped if reduced motion) */}
            {!reducedMotion && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '100%',
                  background: `linear-gradient(to bottom, transparent 0%, ${BRAND.GOLD} 50%, transparent 100%)`,
                }}
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2.4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              />
            )}
          </div>

          {/* ── French scroll label ── */}
          <p
            className="font-body font-light uppercase"
            style={{
              marginTop: '8px',
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: BRAND.CREAM,
              opacity: 0.6,
              whiteSpace: 'nowrap',
            }}
          >
            FAITES DÉFILER
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
