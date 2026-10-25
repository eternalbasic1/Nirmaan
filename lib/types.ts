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
  pricing?: ProductPricing;
  localComparison?: LocalPriceQuote;
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

export interface ProductPricing {
  status: "sample" | "confirmed";
  taxIncluded: boolean | null;
  taxRatePercent: number | null;
  validUntil: string | null;
  minimumQuantity: number;
  availability: "unconfirmed" | "available" | "unavailable";
}
export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  gstin: string;
}
export interface QuoteSummary {
  materialsPaise: number;
  taxPaise: number | null;
  deliveryPaise: number | null;
  unloadingPaise: number | null;
  payablePaise: number | null;
  readyToPay: boolean;
}
export interface OrderPreview {
  id: string;
  createdAt: string;
  status: "preview";
  address: Address;
  lines: {
    productId: string;
    name: string;
    unit: string;
    variant: string;
    quantity: number;
    unitPricePaise: number;
  }[];
  summary: QuoteSummary;
}
export interface LocalPriceQuote {
  productId: string;
  quantity: number;
  variant: string;
  unit: string;
  area: string;
  totalPaise: number;
  recordedAt: string;
  validUntil: string;
  includesAllCharges: true;
}
