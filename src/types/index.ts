export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  name: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  isNew?: boolean;
  colors?: ProductColor[];
  sizes?: ProductSize[];
  rating?: number;
  reviewsCount?: number;
  description?: string;
  features?: string[];
  composition?: string;
  uvProtection?: string;
  care?: string;
  shipping?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  productCount: number;
}

export interface CartItem {
  id: string; // unique cart item id (product.id-size-color)
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
