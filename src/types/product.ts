export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  category: ProductCategory;
  tags: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  fabric: string;
  uvProtection?: string;
  careInstructions: string[];
  inStock: boolean;
  stockQuantity: number;
  isNew: boolean;
  isBestseller?: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  
  // Master PDP specific fields
  pillars?: string[];
  composition?: string;
  care?: string;
  shipping?: string;
  returns?: string;
  modelFit?: string;
  ratingDistribution?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  complementaryProductIds?: string[];
  similarProductIds?: string[];
  
  // Gift offer logic
  isGiftEligible?: boolean;
  isGiftOnly?: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isVideo?: boolean;
  role?: 'front' | 'back' | 'fabric' | 'movement' | 'lifestyle' | 'flat-lay';
}

export interface ProductSize {
  label: string;   // 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  value: string;
  inStock: boolean;
  measurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    length?: string;
  };
}

export interface ProductColor {
  name: string;
  value: string;    // hex color
  slug: string;
  image?: string;   // swatch image URL
}

export type ProductCategory =
  | 'burkini-glamour'
  | 'burkini-pareo'
  | 'burkini-sport-chic'
  | 'nouveautes'
  | 'riviera';

export type ProductTag =
  | 'nouveau'
  | 'best-seller'
  | 'edition-limitee'
  | 'upf-50'
  | 'chlore-resistant'
  | 'sechage-rapide'
  | 'grande-taille'
  | 'collection-riviera';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  isSpecial?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  
  // Gift logic
  isGift?: boolean;
  linkedToItemId?: string;
  originalValue?: number;
}
