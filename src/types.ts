export type CurrencyCode = 'USD' | 'CAD' | 'GBP' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  country: string;
  flag: string;
  rate: number; // vs USD base
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string; // e.g. "Midnight Black", "Matte White"
  sku?: string;
  available: boolean;
  colorHex?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  productTitle: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  category: string;
  price: number; // Base USD
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  variants?: {
    type: string; // e.g. "Color" | "Model"
    options: ProductVariant[];
  };
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export type ActivePage = 'home' | 'shop' | 'product' | 'collection' | 'about' | 'shipping' | 'faq';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling';
  searchQuery: string;
}
