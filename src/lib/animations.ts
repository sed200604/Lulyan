export const animations = {
  // === EASINGS ===
  easings: {
    luxurySmooth: [0.25, 0.1, 0.25, 1.0],       // Default — silk smooth
    luxuryOut:    [0.16, 1, 0.3, 1],              // Dramatic deceleration
    luxuryIn:     [0.7, 0, 0.84, 0],              // Elegant entry
    elastic:      [0.68, -0.55, 0.265, 1.55],     // Subtle bounce (badges only)
    sharp:        [0.4, 0, 0.2, 1],               // Quick, decisive
  },

  // === FADE & REVEAL ===
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  fadeUpSlow: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  // === STAGGER CONTAINERS ===
  staggerContainer: {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },

  staggerFast: {
    animate: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  },

  // === SCALE ===
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  // === HERO SPECIFIC ===
  heroTitle: {
    initial: { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
    animate: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },

  heroSubtitle: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
  },

  heroCTA: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.9 },
  },

  // === IMAGE EFFECTS ===
  imageReveal: {
    initial: { clipPath: 'inset(0 0 100% 0)' },
    animate: { clipPath: 'inset(0 0 0% 0)' },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },

  imageZoom: {
    initial: { scale: 1.15 },
    animate: { scale: 1 },
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  parallaxSlow: {
    style: { y: 'calc(var(--scroll-progress) * -30px)' },
  },

  // === PRODUCT CARD ===
  productCardHover: {
    whileHover: { y: -8 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  productImageHover: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  // === DRAWER / MODAL ===
  drawerRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit:    { x: '100%' },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  modalOverlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
    transition: { duration: 0.3 },
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.96, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit:    { opacity: 0, scale: 0.96, y: 10 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  // === NAVIGATION ===
  navSlideDown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  // === LINE ANIMATIONS (luxury detail) ===
  lineExpand: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },

  // === COUNTER / NUMBER ===
  countUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },

  // === PAGE TRANSITIONS ===
  pageEnter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // === MAGNETIC BUTTON (luxury interaction) ===
  magneticHover: {
    // Implement as a custom hook — button subtly follows cursor within 20px radius
    maxDistance: 20,
    spring: { stiffness: 150, damping: 15 },
  },
};
