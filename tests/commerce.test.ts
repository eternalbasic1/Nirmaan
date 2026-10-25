import { describe, expect, it } from "vitest";
import { products } from "../mockData";
import {
  quoteCart,
  compareLocalQuote,
  createOrderPreview,
  restoreShop,
  checkDelivery,
} from "../lib/commerce";
import type { CartLine } from "../lib/types";
const items: CartLine[] = [
  {
    key: "jk-cement:50kg:ground",
    productId: "jk-cement",
    quantity: 2,
    variant: "50kg",
    offloading: "ground",
  },
];
describe("honest buying information", () => {
  it("keeps unknown charges unknown and does not manufacture a payable total", () => {
    const q = quoteCart(items, products);
    expect(q.materialsPaise).toBe(70000);
    expect(q.taxPaise).toBeNull();
    expect(q.deliveryPaise).toBeNull();
    expect(q.unloadingPaise).toBeNull();
    expect(q.payablePaise).toBeNull();
    expect(q.readyToPay).toBe(false);
  });
  it("uses product-specific tax data and only enables a complete confirmed quote", () => {
    const product = {
      ...products[0],
      pricing: {
        status: "confirmed" as const,
        taxIncluded: false,
        taxRatePercent: 5,
        validUntil: "2026-10-30",
        minimumQuantity: 1,
        availability: "available" as const,
      },
    };
    const quote = quoteCart(
      items,
      [product],
      {
        deliveryPaise: 10000,
        unloadingPaise: 2000,
        serviceabilityConfirmed: true,
      },
      new Date("2026-10-25"),
    );
    expect(quote.taxPaise).toBe(3500);
    expect(quote.payablePaise).toBe(85500);
    expect(quote.readyToPay).toBe(true);
    expect(
      quoteCart(
        items,
        [product],
        {
          deliveryPaise: 10000,
          unloadingPaise: 2000,
          serviceabilityConfirmed: true,
        },
        new Date("2026-11-01"),
      ).payablePaise,
    ).toBeNull();
  });
  it("never treats MRP as evidence of local savings", () => {
    expect(
      compareLocalQuote(null, null, {
        productId: "jk-cement",
        quantity: 2,
        unit: "50kg bag",
        area: "test",
        variant: "50kg",
      }),
    ).toBeNull();
  });
  it("only compares matching, dated, delivered quotes", () => {
    const context = {
      productId: "jk-cement",
      quantity: 2,
      unit: "50kg bag",
      area: "test",
      variant: "50kg",
    };
    const reference = {
      ...context,
      totalPaise: 100000,
      recordedAt: "2026-10-24",
      validUntil: "2026-10-30",
      includesAllCharges: true as const,
    };
    expect(
      compareLocalQuote(90000, reference, context, new Date("2026-10-25")),
    ).toBe(10000);
    expect(
      compareLocalQuote(
        90000,
        reference,
        { ...context, quantity: 3 },
        new Date("2026-10-25"),
      ),
    ).toBeNull();
    expect(
      compareLocalQuote(90000, reference, context, new Date("2026-11-01")),
    ).toBeNull();
  });
  it("does not infer serviceability from a Telangana-looking pincode", () => {
    expect(checkDelivery("500001").status).toBe("unconfirmed");
    expect(checkDelivery("560001").status).toBe("unconfirmed");
    expect(checkDelivery("abc").status).toBe("invalid");
  });
  it("saves an immutable price snapshot without pretending an order was placed", () => {
    const address = {
      id: "a",
      name: "Customer",
      phone: "9876543210",
      address: "House 1, Example street",
      pincode: "500001",
      gstin: "",
    };
    const order = createOrderPreview(items, products, address);
    expect(order.status).toBe("preview");
    expect(order.summary.payablePaise).toBeNull();
    expect(order.lines[0].unitPricePaise).toBe(35000);
    const oldPrice = products[0].tiers[0].price;
    products[0].tiers[0].price = 999;
    expect(order.lines[0].unitPricePaise).toBe(35000);
    products[0].tiers[0].price = oldPrice;
  });
  it("restores only validated local data and safely handles corrupt storage", () => {
    expect(restoreShop("broken").orders).toEqual([]);
    expect(
      restoreShop(
        JSON.stringify({
          orders: [{ id: "fake", status: "paid" }],
          addresses: [{ id: "a" }],
        }),
      ).orders,
    ).toEqual([]);
    expect(
      restoreShop(JSON.stringify({ addresses: [{ id: "a" }] })).addresses,
    ).toEqual([]);
  });
});
