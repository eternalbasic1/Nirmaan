import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { products } from "@/mockData";
import { money, unitPrice } from "@/lib/calculations";
export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const [reference, setReference] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [pin, setPin] = useState("560001");
  const [error, setError] = useState("");
  return (
    <>
      <Head>
        <title>Demo procurement checkout | NIRMAAN // MONO</title>
      </Head>
      <div className="shell py-10">
        <p className="eyebrow">LOCAL PROCUREMENT DEMONSTRATION</p>
        <h1 className="section-title mb-8">
          {reference ? "Material indent prepared" : "Review your site indent"}
        </h1>
        {reference ? (
          <div className="max-w-2xl border-2 border-black p-8">
            <Check size={32} />
            <h2 className="mt-5 font-display text-xl font-bold">{reference}</h2>
            <p className="my-4 text-sm leading-7">
              Your sample indent totals {money(confirmedTotal)}. This
              confirmation exists only in this page session. No order was
              placed, no personal details were transmitted, and no payment was
              processed.
            </p>
            <Link href="/dashboard" className="button">
              Open site dashboard <ArrowRight size={15} />
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="border border-line bg-plate p-8">
            <p className="mb-5 text-sm">
              Add materials to your cart before preparing an indent.
            </p>
            <Link href="/materials" className="button">
              Browse materials
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <form
              className="border border-black p-5 md:p-7"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^560\d{3}$/.test(pin)) {
                  setError("This demo supports Bengaluru 560xxx pincodes.");
                  return;
                }
                setConfirmedTotal(totals.totalPaise / 100);
                setReference(`DEMO-ND-${Date.now().toString().slice(-6)}`);
                clearCart();
              }}
            >
              <h2 className="technical-label mb-5">SITE DELIVERY DETAILS</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs">
                  Site contact name
                  <input
                    required
                    name="contact"
                    className="mono-input mt-2"
                    autoComplete="name"
                  />
                </label>
                <label className="text-xs">
                  Phone number
                  <input
                    required
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="mono-input mt-2"
                    autoComplete="tel-national"
                  />
                </label>
                <label className="text-xs sm:col-span-2">
                  Site address
                  <input
                    required
                    name="address"
                    className="mono-input mt-2"
                    autoComplete="street-address"
                  />
                </label>
                <label className="text-xs">
                  Delivery pincode
                  <input
                    required
                    name="pincode"
                    value={pin}
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    className="mono-input mt-2"
                    autoComplete="postal-code"
                  />
                </label>
                <label className="text-xs">
                  GSTIN (optional)
                  <input
                    name="gstin"
                    className="mono-input mt-2"
                    placeholder="Business GSTIN"
                  />
                </label>
              </div>
              <div className="mt-6 border border-line bg-plate p-4 text-xs leading-6">
                Demonstration only. These form fields stay in this browser and
                are discarded when you leave. Checkout does not contact
                suppliers or payment providers.
              </div>
              {error && (
                <p
                  role="alert"
                  className="my-4 border border-black p-3 text-xs"
                >
                  {error}
                </p>
              )}
              <button type="submit" className="button mt-5 w-full">
                Prepare demo indent <ArrowRight size={15} />
              </button>
            </form>
            <section className="self-start border border-black p-5 md:p-7">
              <h2 className="technical-label mb-5">
                ORDER SUMMARY / SAMPLE GST
              </h2>
              {items.map((i) => {
                const p = products.find((p) => p.id === i.productId)!;
                return (
                  <div
                    key={i.key}
                    className="flex justify-between gap-5 border-b border-line py-3 text-xs"
                  >
                    <div>
                      <strong className="font-display">
                        {p.id === "jk-cement"
                          ? p.name.replace(
                              "50KG",
                              (i.variant || "50kg").toUpperCase(),
                            )
                          : p.name}
                      </strong>
                      <p className="mt-1">
                        {i.quantity} ×{" "}
                        {money(unitPrice(p, i.quantity, i.variant))} /{" "}
                        {p.id === "jk-cement"
                          ? `${i.variant || "50kg"} bag`
                          : p.unit}
                      </p>
                      <p className="mt-1">
                        {i.offloading === "manual"
                          ? "Manual lifting (+₹10/unit)"
                          : "Ground-floor offloading included"}
                      </p>
                    </div>
                    <strong className="figure-price whitespace-nowrap">
                      {money(unitPrice(p, i.quantity, i.variant) * i.quantity)}
                    </strong>
                  </div>
                );
              })}
              <dl className="mt-5 space-y-3 text-xs">
                <div className="flex justify-between">
                  <dt>Basic price</dt>
                  <dd>{money(totals.basePaise / 100)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Manual lifting</dt>
                  <dd>{money(totals.handlingPaise / 100)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Sample GST (18%)</dt>
                  <dd>{money(totals.gstPaise / 100)}</dd>
                </div>
                <div className="flex justify-between border-t border-black pt-4 font-display text-xl font-bold">
                  <dt>TOTAL</dt>
                  <dd>{money(totals.totalPaise / 100)}</dd>
                </div>
              </dl>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
