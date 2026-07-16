'use client';

// ═══════════════════════════════════════════
// COMPOSANT — PAGE EXIT TRANSITION (v2)
// Implements Part 4.8 — "curtain reveal" when
// CTA is tapped:
//   Step 1 → CTA fills gold (handled in HeroTextOverlay)
//   Step 2 → Black overlay slides up 0→100% (300–700ms)
//   Step 3 → Gold horizontal line draws across center (700–900ms)
//   Step 4 → Navigate to /collection/burkini
// Usage: wrap around child router push
// ═══════════════════════════════════════════

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BRAND, DECO_EASE } from './hero.constants';

interface PageExitTransitionProps {
  href: string;
  children: (triggerExit: () => void) => React.ReactNode;
}

export function PageExitTransition({ href, children }: PageExitTransitionProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<'idle' | 'covering' | 'line' | 'done'>('idle');

  const triggerExit = useCallback(() => {
    if (phase !== 'idle') return;

    // Step 2: black curtain slides up
    setPhase('covering');

    setTimeout(() => {
      // Step 3: gold line draws
      setPhase('line');
    }, 400);

    setTimeout(() => {
      // Step 4: navigate
      router.push(href);
    }, 900);
  }, [phase, href, router]);

  return (
    <>
      {children(triggerExit)}

      {/* Curtain overlay */}
      <AnimatePresence>
        {(phase === 'covering' || phase === 'line' || phase === 'done') && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
            style={{ background: BRAND.MATTE_BLACK }}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.4,
              ease: DECO_EASE as unknown as string,
            }}
          >
            {/* Gold line across center of curtain */}
            <AnimatePresence>
              {(phase === 'line' || phase === 'done') && (
                <motion.div
                  style={{
                    height: '1px',
                    background: BRAND.GOLD,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '50%',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: DECO_EASE as unknown as string,
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
