import { describe, expect, it } from "vitest";
import {
  slabBags,
  estimateProject,
  unitPrice,
  cartTotals,
  restoreCart,
} from "../lib/calculations";
import type { Product } from "../lib/types";
const product = {
  id: "jk-cement",
  price: 350,
  tiers: [
    { min: 1, price: 350 },
    { min: 50, price: 335 },
    { min: 200, price: 315 },
  ],
} as Product;
describe("material calculations", () => {
  it("crosses wholesale tier thresholds and supports the half bag variant", () => {
    expect(unitPrice(product, 49)).toBe(350);
    expect(unitPrice(product, 50)).toBe(335);
    expect(unitPrice(product, 200)).toBe(315);
    expect(unitPrice(product, 10, "25kg")).toBe(185);
  });
  it("scales slab estimates by area, depth, and bag weight", () => {
    expect(slabBags(1200, 5)).toBeGreaterThan(100);
    expect(slabBags(2400, 5)).toBeGreaterThan(slabBags(1200, 5));
    expect(slabBags(1200, 5, 25)).toBeGreaterThan(slabBags(1200, 5, 50));
    expect(slabBags(-1, 5)).toBe(0);
    expect(slabBags(Number.NaN, 5)).toBe(0);
  });
  it("returns practical whole-project estimates independently of slab mix quantities", () => {
    expect(estimateProject(1200, 2)).toEqual({
      cement: 480,
      steel: 4.2,
      sand: 1920,
    });
    expect(estimateProject(0, 2)).toEqual({ cement: 0, steel: 0, sand: 0 });
  });
  it("computes line handling and sample GST in integer paise", () => {
    const totals = cartTotals(
      [
        {
          key: "a",
          productId: "jk-cement",
          quantity: 50,
          variant: "50kg",
          offloading: "manual",
        },
      ],
      [product],
    );
    expect(totals.basePaise).toBe(1675000);
    expect(totals.handlingPaise).toBe(50000);
    expect(totals.gstPaise).toBe(310500);
    expect(totals.totalPaise).toBe(2035500);
  });
  it("rejects corrupt persistence, unknown products, and invalid quantities", () => {
    expect(restoreCart("broken", [product])).toEqual([]);
    expect(
      restoreCart(
        JSON.stringify([
          { productId: "missing", quantity: 2 },
          { productId: "jk-cement", quantity: -2 },
        ]),
        [product],
      ),
    ).toEqual([]);
    expect(
      restoreCart(
        JSON.stringify([
          {
            key: "a",
            productId: "jk-cement",
            quantity: 3,
            variant: "50kg",
            offloading: "ground",
          },
        ]),
        [product],
      )[0].quantity,
    ).toBe(3);
  });
});
