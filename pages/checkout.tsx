import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useShop } from "@/components/ShopProvider";
import { AddressForm, blankAddress } from "@/components/AddressForm";
import { PricingSummary } from "@/components/PricingSummary";
import { products } from "@/mockData";
import { money, unitPrice } from "@/lib/calculations";
import { createOrderPreview, displayName, checkDelivery } from "@/lib/commerce";
export default function Checkout() {
  const cart = useCart();
  const shop = useShop();
  const [reference, setReference] = useState("");
  const [selected, setSelected] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const address = shop.addresses.find((a) => a.id === selected) || {
    ...blankAddress,
    pincode: shop.pincode,
  };
  return (
    <>
      <Head>
        <title>Review your order | CeraHub</title>
      </Head>
      <div className="market-home shell commerce-page">
        <div className="commerce-page-heading">
          <p className="commerce-eyebrow">Check every detail</p>
          <h1>Review your order</h1>
          <p>
            Sold by CeraHub. Your full price and delivery must be confirmed
            before a real purchase.
          </p>
        </div>
        {reference ? (
          <section className="soft-panel confirmation-panel">
            <Check size={28} />
            <h2>Order preview saved</h2>
            <p>{reference}</p>
            <p>
              This is your own saved preview, not a placed order. No payment was
              taken, and nothing was sent to a supplier. Your cart has been
              kept.
            </p>
            <Link className="button" href="/dashboard">
              View in My orders <ArrowRight size={15} />
            </Link>
            {shop.storageWarning && (
              <p role="alert">
                Browser storage is unavailable. This preview will be lost when
                you close this tab.
              </p>
            )}
          </section>
        ) : !cart.items.length ? (
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Add materials before reviewing an order.</p>
            <Link className="button" href="/materials">
              Shop materials
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <section className="soft-panel">
              <h2>Delivery details</h2>
              <p className="muted-copy">
                Used only for your browser-local preview. No details are sent to
                CeraHub.
              </p>
              {shop.addresses.length > 0 && (
                <label className="saved-address-picker">
                  Use a saved address
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option value="">Enter a new address</option>
                    {shop.addresses.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} · {a.pincode}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <AddressForm
                key={selected || `new-${shop.pincode}`}
                initial={address}
                submitLabel="Save order preview"
                onSave={(a) => {
                  if (saveAddress) shop.saveAddress(a);
                  shop.setPincode(a.pincode);
                  const order = createOrderPreview(cart.items, products, a);
                  shop.savePreview(order);
                  setReference(order.id);
                }}
              >
                <div className="notice">
                  {shop.pincode
                    ? checkDelivery(shop.pincode).message
                    : "Delivery areas, charges and dates have not yet been confirmed. Entering an address does not confirm serviceability."}
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  Save this address on this browser
                </label>
                <p className="muted-copy">
                  Saving a preview stores the address with it on this browser.
                  Avoid saving personal details on a shared device.
                </p>
              </AddressForm>
            </section>
            <aside className="soft-panel checkout-summary">
              <h2>Order summary</h2>
              {cart.items.map((line) => {
                const p = products.find((p) => p.id === line.productId)!;
                return (
                  <div className="checkout-line" key={line.key}>
                    <div>
                      <strong>{displayName(p.name)}</strong>
                      <p>
                        {line.quantity} ×{" "}
                        {money(unitPrice(p, line.quantity, line.variant))} /{" "}
                        {p.id === "jk-cement"
                          ? `${line.variant || "50kg"} bag`
                          : p.unit}
                      </p>
                    </div>
                    <strong>
                      {money(
                        unitPrice(p, line.quantity, line.variant) *
                          line.quantity,
                      )}
                    </strong>
                  </div>
                );
              })}
              <PricingSummary quote={cart.totals} />
              <button className="button w-full" disabled type="button">
                Place order — not available in preview
              </button>
              <p className="muted-copy mt-3">
                Payments and live orders will open only after stock, prices, all
                charges and delivery are connected. No UPI, card or cash payment
                is collected here.
              </p>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
