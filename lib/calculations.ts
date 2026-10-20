import type { CartLine, Product } from "./types";
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
export const normalizeQuantity = (value: number) =>
  Number.isFinite(value) ? Math.max(1, Math.min(9999, Math.round(value))) : 1;
export function unitPrice(
  product: Product,
  quantity: number,
  variant = "50kg",
) {
  if (product.id === "jk-cement" && variant === "25kg")
    return quantity >= 200 ? 170 : quantity >= 50 ? 178 : 185;
  return (
    [...product.tiers]
      .sort((a, b) => b.min - a.min)
      .find((t) => quantity >= t.min)?.price ?? product.price
  );
}
export function slabBags(area: number, inches: number, bagWeight = 50) {
  if (
    ![area, inches, bagWeight].every(Number.isFinite) ||
    area <= 0 ||
    inches <= 0 ||
    bagWeight <= 0
  )
    return 0;
  // M20 nominal 1:1.5:3 mix, dry-volume factor 1.54, cement density 1440kg/m³, 5% allowance.
  return Math.ceil(
    (((area * (inches / 12)) / 35.3147) * 1.54 * (1 / 5.5) * 1440 * 1.05) /
      bagWeight,
  );
}
export function estimateProject(area: number, floors = 1, factor = 1) {
  if (
    ![area, floors, factor].every(Number.isFinite) ||
    area <= 0 ||
    floors <= 0
  )
    return { cement: 0, steel: 0, sand: 0 };
  return {
    cement: Math.ceil(area * floors * 0.2 * factor),
    steel: Number((area * floors * 0.00175 * factor).toFixed(2)),
    sand: Math.ceil(area * floors * 0.8 * factor),
  };
}
export function cartTotals(items: CartLine[], products: Product[]) {
  let basePaise = 0,
    handlingPaise = 0,
    count = 0;
  for (const item of items) {
    const p = products.find((p) => p.id === item.productId);
    if (!p) continue;
    basePaise +=
      Math.round(unitPrice(p, item.quantity, item.variant) * 100) *
      item.quantity;
    handlingPaise += (item.offloading === "manual" ? 1000 : 0) * item.quantity;
    count += item.quantity;
  }
  const gstPaise = Math.round((basePaise + handlingPaise) * 0.18);
  return {
    basePaise,
    handlingPaise,
    gstPaise,
    totalPaise: basePaise + handlingPaise + gstPaise,
    count,
  };
}
export function restoreCart(
  raw: string | null,
  products: Product[],
): CartLine[] {
  try {
    const data: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (i): i is CartLine =>
          !!i &&
          typeof i === "object" &&
          products.some((p) => p.id === i.productId) &&
          Number.isInteger(i.quantity) &&
          i.quantity > 0 &&
          i.quantity <= 9999 &&
          (i.variant === undefined ||
            i.variant === "50kg" ||
            i.variant === "25kg") &&
          (i.offloading === undefined ||
            i.offloading === "ground" ||
            i.offloading === "manual"),
      )
      .map((i) => ({
        ...i,
        key: `${i.productId}:${i.variant || "50kg"}:${i.offloading || "ground"}`,
      }));
  } catch {
    return [];
  }
}
