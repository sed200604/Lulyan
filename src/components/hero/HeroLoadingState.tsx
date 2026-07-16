'use client';

import { motion } from 'framer-motion';
import { LUXURY_EASE, BRAND } from './hero.constants';

// ═══════════════════════════════════════════
// SOUS-COMPOSANT — LOADING LUXE (v2)
// No external image dependency — pure CSS/SVG
// ═══════════════════════════════════════════

export function HeroLoadingState() {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: LUXURY_EASE as unknown as string }}
    >
      {/* Text logotype instead of missing image */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="font-heading font-light tracking-[0.42em] text-white/40"
          style={{ fontSize: 'clamp(18px, 5vw, 28px)', lineHeight: 1.05 }}
        >
          LULIYANE
        </p>
        <p
          className="font-heading font-light tracking-[0.42em] text-white/40"
          style={{ fontSize: 'clamp(18px, 5vw, 28px)', lineHeight: 1.05, marginTop: '2px' }}
        >
          PARIS
        </p>
      </motion.div>

      {/* Shimmer bars */}
      <div className="flex flex-col items-center gap-2">
        {[80, 60, 40].map((width, i) => (
          <motion.div
            key={i}
            className="h-[1px]"
            style={{
              width,
              background: `linear-gradient(to right, transparent, ${BRAND.GOLD}66, transparent)`,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: LUXURY_EASE as unknown as string }}
          />
        ))}
      </div>
    </motion.div>
  );
}
