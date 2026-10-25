import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin, Package, Plus, Download } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { useCart } from "@/components/CartProvider";
import { AddressForm, blankAddress } from "@/components/AddressForm";
import { PricingSummary } from "@/components/PricingSummary";
import type { Address, OrderPreview } from "@/lib/types";
import { products } from "@/mockData";
import { money, unitPrice } from "@/lib/calculations";
import { displayName } from "@/lib/commerce";
function downloadSummary(order: OrderPreview) {
  const text = [
    "CeraHub — Order preview",
    "NOT A PLACED ORDER OR TAX INVOICE",
    order.id,
    `Saved: ${new Date(order.createdAt).toLocaleString("en-IN")}`,
    "",
    ...order.lines.map(
      (l) =>
        `${l.quantity} × ${l.name} (${l.unit}) at ${money(l.unitPricePaise / 100)} each`,
    ),
    "",
    `Sample materials subtotal: ${money(order.summary.materialsPaise / 100)}`,
    "Tax, delivery, unloading and final payable amount: not confirmed.",
    "No payment received. No delivery booked.",
  ].join("\n");
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `${order.id}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function SiteDashboard() {
  const shop = useShop();
  const cart = useCart();
  const [tab, setTab] = useState("orders");
  const [editing, setEditing] = useState<Address | null>(null);
  const [notice, setNotice] = useState("");
  const [reorder, setReorder] = useState<OrderPreview | null>(null);
  return (
    <>
      <Head>
        <title>My orders | CeraHub</title>
      </Head>
      <div className="market-home shell commerce-page orders-page">
        <div className="commerce-page-heading">
          <p className="commerce-eyebrow">Your purchases, made simple</p>
          <h1>My orders</h1>
          <p>Find order updates, invoices and delivery details in one place.</p>
        </div>
        <div className="notice">
          Website preview. No live orders or payments are connected. Only
          previews you save yourself appear here.
        </div>
        {shop.storageWarning && (
          <p className="notice" role="alert">
            Browser storage is unavailable. Changes are kept for this tab only.
          </p>
        )}
        <div className="account-tabs" role="tablist" aria-label="My account">
          <button
            role="tab"
            aria-selected={tab === "orders"}
            aria-controls="orders-panel"
            id="orders-tab"
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
          <button
            role="tab"
            aria-selected={tab === "addresses"}
            aria-controls="addresses-panel"
            id="addresses-tab"
            onClick={() => setTab("addresses")}
          >
            Saved addresses
          </button>
        </div>
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        {tab === "orders" ? (
          <section
            role="tabpanel"
            aria-labelledby="orders-tab"
            id="orders-panel"
          >
            <div className="empty-state orders-empty">
              <Package size={36} strokeWidth={1.3} />
              <h2>Your orders will appear here.</h2>
              <p>Start shopping for your building materials.</p>
              <Link className="button" href="/materials">
                Shop materials <ArrowRight size={15} />
              </Link>
              <p className="muted-copy">
                No active deliveries or past purchases yet.
              </p>
            </div>
            {shop.orders.length > 0 && (
              <section className="commerce-section">
                <div className="commerce-section-heading">
                  <h2>Your saved previews</h2>
                  <span className="muted-copy">
                    Saved on this browser · Not placed
                  </span>
                </div>
                {shop.orders.map((order) => (
                  <article className="order-preview soft-panel" key={order.id}>
                    <div className="order-preview-heading">
                      <div>
                        <span className="status-pill">Not placed</span>
                        <h3>{order.id}</h3>
                        <p className="muted-copy">
                          Saved{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                          )}{" "}
                          · No payment taken
                        </p>
                      </div>
                      <strong>
                        {money(order.summary.materialsPaise / 100)}
                        <small>Sample materials subtotal</small>
                      </strong>
                    </div>
                    <p>
                      {order.lines
                        .map((l) => `${l.quantity} × ${displayName(l.name)}`)
                        .join(" · ")}
                    </p>
                    <details className="order-details">
                      <summary>View order preview</summary>
                      <div className="order-details-body">
                        <h4>Delivery details</h4>
                        <p>
                          {order.address.name} · {order.address.phone}
                        </p>
                        <p>
                          {order.address.address} · {order.address.pincode}
                        </p>
                        <p className="muted-copy">
                          Expected delivery: not confirmed. No delivery is
                          booked.
                        </p>
                        <ul>
                          {order.lines.map((l, i) => (
                            <li key={i}>
                              {l.quantity} × {displayName(l.name)} · {l.unit} ·
                              Saved unit price {money(l.unitPricePaise / 100)}
                            </li>
                          ))}
                        </ul>
                        <PricingSummary quote={order.summary} />
                        <h4>When a real order is placed</h4>
                        <ol className="order-timeline">
                          {[
                            "Order placed",
                            "Confirmed",
                            "Out for delivery",
                            "Delivered",
                          ].map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                        <p className="muted-copy">
                          No step has started for this preview.
                        </p>
                      </div>
                    </details>
                    <div className="action-row">
                      <button
                        className="button-outline"
                        onClick={() => downloadSummary(order)}
                      >
                        <Download size={14} />
                        Download preview
                      </button>
                      <button
                        className="simple-link"
                        onClick={() => setReorder(order)}
                      >
                        Buy again — review prices
                      </button>
                      <button
                        className="simple-link"
                        disabled
                        title="A CeraHub invoice is issued only for a real order."
                      >
                        Invoice unavailable
                      </button>
                      <Link
                        className="simple-link"
                        href={`/help?order=${encodeURIComponent(order.id)}`}
                      >
                        Get help
                      </Link>
                      <button
                        className="simple-link"
                        onClick={() => {
                          shop.deletePreview(order.id);
                          setReorder(null);
                        }}
                      >
                        Delete preview
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}
            {reorder && (
              <section
                className="soft-panel"
                aria-label="Review current prices"
              >
                <h2>Check current prices before adding</h2>
                <p>
                  Prices in your saved preview stay unchanged. Your cart uses
                  current sample prices.
                </p>
                {reorder.lines.map((line, i) => {
                  const p = products.find((p) => p.id === line.productId);
                  return (
                    <p key={i}>
                      {displayName(line.name)}: saved{" "}
                      {money(line.unitPricePaise / 100)} →{" "}
                      {p && p.pricing?.availability !== "unavailable"
                        ? `${money(unitPrice(p, line.quantity, line.variant))} now (sample)`
                        : "Currently unavailable — not added"}
                    </p>
                  );
                })}
                <div className="action-row">
                  <button
                    className="button"
                    onClick={() => {
                      let count = 0;
                      for (const line of reorder.lines) {
                        const p = products.find((p) => p.id === line.productId);
                        if (p && p.pricing?.availability !== "unavailable") {
                          cart.addItem(p.id, line.quantity, {
                            variant: line.variant,
                          });
                          count++;
                        }
                      }
                      setNotice(
                        count
                          ? "Materials added at current sample prices. Tax and delivery still need confirmation."
                          : "These products are not currently available.",
                      );
                      setReorder(null);
                    }}
                  >
                    Add at current prices
                  </button>
                  <button
                    className="button-outline"
                    onClick={() => setReorder(null)}
                  >
                    Cancel
                  </button>
                </div>
              </section>
            )}
          </section>
        ) : (
          <section
            role="tabpanel"
            aria-labelledby="addresses-tab"
            id="addresses-panel"
          >
            <div className="commerce-section-heading">
              <div>
                <h2>Saved addresses</h2>
                <p className="muted-copy">
                  Stored on this browser only. An address does not confirm
                  delivery availability.
                </p>
              </div>
              <button
                className="button-outline"
                onClick={() => setEditing({ ...blankAddress })}
              >
                <Plus size={15} />
                Add address
              </button>
            </div>
            {editing && (
              <div className="soft-panel mb-6">
                <h3>{editing.id ? "Edit address" : "Add an address"}</h3>
                <AddressForm
                  key={editing.id || "new"}
                  initial={editing}
                  onSave={(a) => {
                    shop.saveAddress(a);
                    setEditing(null);
                    setNotice("Address saved on this browser.");
                  }}
                  onCancel={() => setEditing(null)}
                />
              </div>
            )}
            {!shop.addresses.length && !editing ? (
              <div className="empty-state">
                <MapPin size={28} />
                <h3>No saved addresses yet</h3>
                <p>Add an address when you are ready to plan a delivery.</p>
              </div>
            ) : (
              <div className="address-grid">
                {shop.addresses.map((a) => (
                  <article className="soft-panel" key={a.id}>
                    <h3>{a.name}</h3>
                    <p>{a.address}</p>
                    <p>
                      {a.pincode} · {a.phone}
                    </p>
                    <div className="action-row">
                      <button
                        className="simple-link"
                        onClick={() => setEditing(a)}
                      >
                        Edit address
                      </button>
                      <button
                        className="simple-link"
                        onClick={() => {
                          shop.deleteAddress(a.id);
                          if (editing?.id === a.id) setEditing(null);
                        }}
                      >
                        Delete address
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
        <section className="support-strip">
          <div>
            <h2>Need help with an order?</h2>
            <p>
              Find help with delivery, damaged goods, missing items or
              cancellations.
            </p>
          </div>
          <Link className="button-outline" href="/help">
            Get help <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </>
  );
}
