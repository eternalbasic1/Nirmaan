import { unitPrice } from "./calculations";
import type {
  Address,
  CartLine,
  LocalPriceQuote,
  OrderPreview,
  Product,
  QuoteSummary,
} from "./types";

export const PROTOTYPE_NOTE =
  "Website preview · Sample prices · No payments or live orders";
export const displayName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .replace(/\b(Cpvc|Pvc|Gi|Bwp|Ppc|Opc|Frls|Isi|Bis)\b/g, (c) =>
      c.toUpperCase(),
    );
export const minimumQuantity = (p: Product) =>
  Math.max(1, Math.floor(p.pricing?.minimumQuantity || 1));
export function checkDelivery(pin: string) {
  if (!/^[1-9]\d{5}$/.test(pin))
    return {
      status: "invalid",
      message: "Enter a valid six-digit pincode.",
    } as const;
  return {
    status: "unconfirmed",
    message: `Delivery to ${pin} is not yet confirmed. Delivery areas and charges will be published before ordering opens.`,
  } as const;
}
export function quoteCart(
  items: CartLine[],
  products: Product[],
  charges: {
    deliveryPaise: number | null;
    unloadingPaise: number | null;
    serviceabilityConfirmed: boolean;
  } = {
    deliveryPaise: null,
    unloadingPaise: null,
    serviceabilityConfirmed: false,
  },
  now = new Date(),
): QuoteSummary {
  let materialsPaise = 0,
    tax = 0;
  let taxKnown = items.length > 0,
    confirmed = items.length > 0;
  for (const line of items) {
    const p = products.find((p) => p.id === line.productId);
    if (!p) {
      confirmed = false;
      taxKnown = false;
      continue;
    }
    const amount =
      Math.round(unitPrice(p, line.quantity, line.variant) * 100) *
      line.quantity;
    materialsPaise += amount;
    const pricing = p.pricing;
    if (pricing?.taxIncluded === true) tax += 0;
    else if (
      pricing?.taxIncluded === false &&
      pricing.taxRatePercent !== null &&
      Number.isFinite(pricing.taxRatePercent) &&
      pricing.taxRatePercent >= 0
    )
      tax += Math.round((amount * pricing.taxRatePercent) / 100);
    else taxKnown = false;
    if (
      !pricing ||
      pricing.status !== "confirmed" ||
      pricing.availability !== "available" ||
      !pricing.validUntil ||
      !(Date.parse(pricing.validUntil) >= now.getTime()) ||
      line.quantity < minimumQuantity(p)
    )
      confirmed = false;
  }
  const validCharge = (n: number | null) =>
    n !== null && Number.isSafeInteger(n) && n >= 0;
  const readyToPay =
    confirmed &&
    taxKnown &&
    charges.serviceabilityConfirmed &&
    validCharge(charges.deliveryPaise) &&
    validCharge(charges.unloadingPaise);
  return {
    materialsPaise,
    taxPaise: taxKnown ? tax : null,
    deliveryPaise: validCharge(charges.deliveryPaise)
      ? charges.deliveryPaise
      : null,
    unloadingPaise: validCharge(charges.unloadingPaise)
      ? charges.unloadingPaise
      : null,
    payablePaise: readyToPay
      ? materialsPaise + tax + charges.deliveryPaise! + charges.unloadingPaise!
      : null,
    readyToPay,
  };
}
export function compareLocalQuote(
  totalPaise: number | null,
  reference: LocalPriceQuote | undefined | null,
  context: Pick<
    LocalPriceQuote,
    "productId" | "quantity" | "variant" | "unit" | "area"
  >,
  now = new Date(),
) {
  if (
    totalPaise === null ||
    !Number.isSafeInteger(totalPaise) ||
    totalPaise < 0 ||
    !reference ||
    !Number.isSafeInteger(reference.totalPaise) ||
    reference.totalPaise < 0 ||
    !reference.includesAllCharges ||
    !reference.area.trim() ||
    !(Date.parse(reference.recordedAt) <= now.getTime()) ||
    !(Date.parse(reference.validUntil) >= now.getTime())
  )
    return null;
  if (
    (Object.keys(context) as (keyof typeof context)[]).some(
      (key) => context[key] !== reference[key],
    )
  )
    return null;
  return Math.max(0, reference.totalPaise - totalPaise);
}
export function createOrderPreview(
  items: CartLine[],
  products: Product[],
  address: Address,
): OrderPreview {
  return {
    id: `PREVIEW-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "preview",
    address: { ...address },
    lines: items.flatMap((line) => {
      const p = products.find((p) => p.id === line.productId);
      return p
        ? [
            {
              productId: p.id,
              name: p.name,
              unit:
                p.id === "jk-cement" ? `${line.variant || "50kg"} bag` : p.unit,
              variant: line.variant || "50kg",
              quantity: line.quantity,
              unitPricePaise: Math.round(
                unitPrice(p, line.quantity, line.variant) * 100,
              ),
            },
          ]
        : [];
    }),
    summary: { ...quoteCart(items, products) },
  };
}
export interface ShopState {
  orders: OrderPreview[];
  addresses: Address[];
  pincode: string;
  storageWarning: boolean;
}
export const EMPTY_SHOP: ShopState = {
  orders: [],
  addresses: [],
  pincode: "",
  storageWarning: false,
};
const record = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;
export function isAddress(v: unknown): v is Address {
  return (
    record(v) &&
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    v.name.trim().length >= 2 &&
    typeof v.phone === "string" &&
    /^\d{10}$/.test(v.phone) &&
    typeof v.address === "string" &&
    v.address.trim().length >= 5 &&
    typeof v.pincode === "string" &&
    /^[1-9]\d{5}$/.test(v.pincode) &&
    typeof v.gstin === "string"
  );
}
function isOrder(v: unknown): v is OrderPreview {
  if (
    !record(v) ||
    typeof v.id !== "string" ||
    !v.id.startsWith("PREVIEW-") ||
    v.status !== "preview" ||
    typeof v.createdAt !== "string" ||
    !Number.isFinite(Date.parse(v.createdAt)) ||
    !isAddress(v.address) ||
    !Array.isArray(v.lines) ||
    v.lines.length === 0 ||
    !record(v.summary)
  )
    return false;
  const q = v.summary;
  const amount = (n: unknown) =>
    n === null || (typeof n === "number" && Number.isSafeInteger(n) && n >= 0);
  return (
    typeof q.materialsPaise === "number" &&
    amount(q.materialsPaise) &&
    [q.taxPaise, q.deliveryPaise, q.unloadingPaise, q.payablePaise].every(
      amount,
    ) &&
    typeof q.readyToPay === "boolean" &&
    v.lines.every(
      (l) =>
        record(l) &&
        ["productId", "name", "unit", "variant"].every(
          (k) => typeof l[k] === "string",
        ) &&
        typeof l.quantity === "number" &&
        Number.isInteger(l.quantity) &&
        l.quantity > 0 &&
        l.quantity <= 9999 &&
        typeof l.unitPricePaise === "number" &&
        Number.isSafeInteger(l.unitPricePaise) &&
        l.unitPricePaise >= 0,
    )
  );
}
export function restoreShop(raw: string | null): ShopState {
  try {
    const value: unknown = JSON.parse(raw || "null");
    if (!record(value)) return EMPTY_SHOP;
    return {
      orders: Array.isArray(value.orders) ? value.orders.filter(isOrder) : [],
      addresses: Array.isArray(value.addresses)
        ? value.addresses.filter(isAddress)
        : [],
      pincode:
        typeof value.pincode === "string" && /^[1-9]\d{5}$/.test(value.pincode)
          ? value.pincode
          : "",
      storageWarning: false,
    };
  } catch {
    return EMPTY_SHOP;
  }
}
