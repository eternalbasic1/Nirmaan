export interface PricingTier {
  min: number;
  price: number;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  price: number;
  mrp: number;
  image: string;
  gallery: string[];
  badge: string;
  grade: string;
  description: string;
  tiers: PricingTier[];
  specifications: Record<string, string>;
}
export interface CartOptions {
  variant?: string;
  offloading?: "ground" | "manual";
}
export interface CartLine extends CartOptions {
  key: string;
  productId: string;
  quantity: number;
}
