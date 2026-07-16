// ═══════════════════════════════════════════════════════════
// ROUTES — Source unique de vérité — LULIYANE RIVIERA
// ═══════════════════════════════════════════════════════════

export const ROUTES = {
  HOME: '/',

  // ─── Collection unique ───────────────────────────────────
  COLLECTION: '/collection/luliyane-riviera',

  // ─── Produits ────────────────────────────────────────────
  PRODUCTS: '/products',
  PRODUCT: (slug: string) => `/products/${slug}`,

  // ─── Contenu ─────────────────────────────────────────────
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',

  // ─── Compte & Panier ────────────────────────────────────
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_CONFIRMATION: '/checkout/confirmation',
  ACCOUNT: '/account',
  ACCOUNT_LOGIN: '/login',
  ACCOUNT_REGISTER: '/register',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_WISHLIST: '/account/wishlist',

  // ─── Légal ───────────────────────────────────────────────
  CGV: '/cgv',
  MENTIONS_LEGALES: '/mentions-legales',
  CONFIDENTIALITE: '/confidentialite',
  COOKIES: '/cookies',
} as const;

// ═══════════════════════════════════════════════════════════
// PRODUCT SLUGS — source unique (14 pièces, 1 collection)
// ═══════════════════════════════════════════════════════════

export const PRODUCT_SLUGS = [
  'burkini-riviera-noir',
  'burkini-mediterranee-bleu',
  'burkini-performance-aqua',
  'burkini-prestige-or-noir',
  'burkini-cote-azur-blanc',
  'burkini-slim-fit-anthracite',
  'burkini-aquagym-pro',
  'burkini-sunset-collection',
  'burkini-pois-elegance-noir',
  'burkini-tropical-bleu-bolero',
  'burkini-tropical-rose-bolero',
  'burkini-ikat-caramel',
  'burkini-ikat-charbon',
  'burkini-kimono-blanc-ethnique',
] as const;

// ═══════════════════════════════════════════════════════════
// SITE CONFIG
// ═══════════════════════════════════════════════════════════

export const SITE_REVIEW_COUNT = 524;
export const SITE_RATING = 4.9;

export const SITE_CONFIG = {
  name: 'LULIYANE PARIS',
  tagline: "L'Élégance Aquatique",
  collectionName: 'LULIYANE RIVIERA',
  collectionTagline: 'La Riviera, Réinventée',
  description: 'Burkini élégant conçu à Paris. Qualité premium, séchage rapide, protection solaire. Collection exclusive LULIYANE RIVIERA.',
  url: 'https://luliyane.paris',
  email: 'admin@luliyan-paris.com',
  phone: '+33 7 66 67 64 29',
  address: 'Paris, France',
  social: {
    instagram: 'https://instagram.com/luliyane.paris',
    tiktok: 'https://tiktok.com/@luliyane.paris',
    facebook: 'https://facebook.com/luliyane.paris',
    pinterest: 'https://pinterest.com/luliyane.paris',
  },
  whatsapp: '+33766676429',
  freeShippingThreshold: 0,
  currency: 'EUR',
  locale: 'fr-FR',
} as const;

// ═══════════════════════════════════════════════════════════
// NAVIGATION — Luxe = peu de liens
// Philosophie Jacquemus/Bottega : UN lien vers la mode.
// ═══════════════════════════════════════════════════════════

export const NAVIGATION = [
  { label: 'La Collection', href: ROUTES.COLLECTION },
  { label: 'Notre Histoire', href: ROUTES.ABOUT },
  { label: 'Le Journal', href: ROUTES.BLOG },
] as const;

// ═══════════════════════════════════════════════════════════
// NAVIGATION SECONDAIRE — Menu mobile complet
// ═══════════════════════════════════════════════════════════

export const SECONDARY_NAV = [
  { label: 'FAQ', href: ROUTES.FAQ },
  { label: 'Contact', href: ROUTES.CONTACT },
] as const;

// ═══════════════════════════════════════════════════════════
// FOOTER LINKS — Restructuré sans sous-catégories
// ═══════════════════════════════════════════════════════════

export const FOOTER_LINKS = {
  boutique: [
    { label: 'LULIYANE RIVIERA', href: ROUTES.COLLECTION },
  ],
  maison: [
    { label: 'Notre Histoire', href: ROUTES.ABOUT },
    { label: 'Le Journal', href: ROUTES.BLOG },
    { label: 'FAQ', href: ROUTES.FAQ },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],
  legal: [
    { label: 'CGV', href: ROUTES.CGV },
    { label: 'Mentions Légales', href: ROUTES.MENTIONS_LEGALES },
    { label: 'Confidentialité', href: ROUTES.CONFIDENTIALITE },
    { label: 'Cookies', href: ROUTES.COOKIES },
  ],
} as const;

// ═══════════════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════════════

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/luliyane.paris' },
  { label: 'TikTok', href: 'https://tiktok.com/@luliyane.paris' },
  { label: 'Facebook', href: 'https://facebook.com/luliyane.paris' },
  { label: 'Pinterest', href: 'https://pinterest.com/luliyane.paris' },
] as const;

// ═══════════════════════════════════════════════════════════
// FILTER OPTIONS — Remplacent les anciennes catégories
// ═══════════════════════════════════════════════════════════

export const FILTER_STYLES = [
  { value: 'all', label: 'Toutes les pièces' },
  { value: 'integral', label: 'Intégral' },
  { value: '2-pieces', label: '2 Pièces' },
  { value: 'sport', label: 'Sport' },
  { value: 'prestige', label: 'Prestige' },
] as const;

export const FILTER_COLORS = [
  { value: 'all', label: 'Toutes les couleurs' },
  { value: 'noir', label: 'Noir' },
  { value: 'bleu', label: 'Bleu' },
  { value: 'blanc', label: 'Blanc' },
  { value: 'or', label: 'Or' },
  { value: 'anthracite', label: 'Anthracite' },
  { value: 'rose', label: 'Rose' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'charbon', label: 'Charbon' },
] as const;

export const FILTER_SORT = [
  { value: 'featured', label: 'Nos coups de cœur' },
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
] as const;

// ═══════════════════════════════════════════════════════════
// IMAGE SIZES — pour next/image sizes prop
// ═══════════════════════════════════════════════════════════

export const IMAGE_SIZES = {
  hero: '100vw',
  categoryCard: '(max-width: 767px) 80vw, 33vw',
  productCard: '(max-width: 767px) 50vw, 25vw',
  productGallery: '(max-width: 767px) 100vw, 55vw',
  blogThumbnail: '(max-width: 767px) 100vw, 33vw',
  cartThumbnail: '80px',
  relatedProduct: '(max-width: 767px) 70vw, 25vw',
} as const;
