// ═══════════════════════════════════════════
// CONSTANTES — TIMING CINÉMATIQUE EXPERT
// Spec: LULIYANE PARIS Hero v2 — 2026-06
// ═══════════════════════════════════════════

// ── Brand DNA ───────────────────────────────
export const BRAND = {
  MATTE_BLACK: '#1A1A1A',
  GOLD: '#C5A14E',
  CREAM: '#E8D9A8',
  GOLD_DARK: '#A88838',
  GOLD_GLOW: 'rgba(197,161,78,0.35)',
  BLACK_SCRIM: 'rgba(0,0,0,0.75)',
} as const;

// ── Waterfall Offsets (seconds from t=0) ─────
// Each value = exact moment element begins its enter animation
export const WATERFALL = {
  VIDEO_FADE_IN:    0.20,  // Video opacity 0→1
  SCRIM_FADE_IN:   0.60,  // Bottom scrim appears
  WORDMARK_LINE1:  0.90,  // "LULIYANE" rises + fades
  WORDMARK_LINE2:  1.05,  // "PARIS" rises + fades (150ms stagger)
  DECO_LINE_TOP:   1.50,  // Top gold line scales in
  TAGLINE:         1.65,  // Tagline characters fade in left→right
  DECO_LINE_BOT:   2.10,  // Bottom gold line scales in
  CTA:             2.30,  // CTA fades + scales
  SCROLL_SHIMMER:  2.80,  // Scroll indicator shimmer starts
} as const;

// ── Duration per element ─────────────────────
export const DURATION = {
  VIDEO_FADE:       0.80,
  SCRIM:            0.60,
  WORDMARK:         0.90,
  DECO_LINE:        0.60,
  TAGLINE_CHAR:     0.50,  // per character (stagger 25ms between each)
  CTA:              0.50,
  LIGHT_LEAK:      12.00,  // full drift cycle
  VIGNETTE_RING:    2.40,  // shimmer pulse
} as const;

// ── Stagger ──────────────────────────────────
export const STAGGER = {
  TAGLINE_CHAR: 0.025,   // 25ms per character — "typewriter elegance"
  TITLE_CHAR:   0.04,    // 40ms per letter  
} as const;

// ── Legacy timing (keep backward compat) ────────────────────────────
export const TIMING = {
  LOADING_MIN: 1200,
  VIDEO_REVEAL_DELAY: 200,
  VIDEO_REVEAL_DURATION: 1.4,
  LINE_DELAY: 0.6,
  TITLE_LETTER_STAGGER: 0.04,
  SUBTITLE_DELAY: 0.3,
  CTA_DELAY: 0.5,
  SCROLL_DELAY: 1.2,
} as const;

// ── Easing curves (Bézier) ───────────────────
// Primary: "expo-out" — luxe deceleration, used EVERYWHERE unless noted
export const LUXURY_EASE  = [0.22, 1, 0.36, 1] as const;

// Secondary: "expo-in-out" — for draw-on decorative lines
export const DECO_EASE    = [0.65, 0, 0.35, 1] as const;

// Tertiary: "expo" — fastest curtain slide (page exit)
export const CURTAIN_EASE = [0.83, 0, 0.17, 1] as const;

// Kept for backward compatibility
export const LUXURY_SMOOTH = [0.43, 0.13, 0.23, 0.96] as const;

// ── Breathing pulse (CTA idle) ──────────────────────────────────────
export const BREATH = {
  DURATION: 3.2,
  SHADOW_OUT: '0 0 0 8px rgba(197,161,78,0)',
  SHADOW_IN:  '0 0 0 0px rgba(197,161,78,0.35)',
} as const;
