'use client';

// ═══════════════════════════════════════════
// COMPOSANT — LIGHT LEAK ATMOSPHERE (v2)
// Implements Part 4.7 — cinematic drifting
// warm light leak / lens flare overlay
// ═══════════════════════════════════════════

import { motion } from 'framer-motion';

export function HeroLightLeak() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute z-[4] pointer-events-none"
      style={{
        // Top-right placement
        top: '-5%',
        right: '-10%',
        width: '40%',
        height: '40%',
        // Warm peach/gold radial gradient — fades to transparent
        background: `radial-gradient(ellipse at center,
          rgba(255, 220, 150, 0.45) 0%,
          rgba(197, 161, 78, 0.25) 35%,
          transparent 70%
        )`,
        mixBlendMode: 'screen',
        borderRadius: '50%',
      }}
      animate={{
        x: ['20px', '-40px', '20px'],
        y: ['-20px', '30px', '-20px'],
        scale: [1.0, 1.1, 1.0],
        opacity: [0.4, 0.55, 0.4],
      }}
      transition={{
        duration: 12,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
}
