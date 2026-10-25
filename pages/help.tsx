import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { useCart } from "@/components/CartProvider";
export default function Help() {
  const router = useRouter();
  const shop = useShop();
  const cart = useCart();
  const [clearStatus, setClearStatus] = useState("");
  const order =
    typeof router.query.order === "string"
      ? shop.orders.find((o) => o.id === router.query.order)
      : undefined;
  return (
    <>
      <Head>
        <title>Help, delivery and prices | CeraHub</title>
      </Head>
      <div className="market-home shell commerce-page help-page">
        <div className="commerce-page-heading">
          <p className="commerce-eyebrow">Clear answers, before you buy</p>
          <h1>How can we help?</h1>
          <p>
            Understand prices, delivery and what to do if there is a problem.
          </p>
        </div>
        <div className="notice">
          This website is a preview. Live orders, payments and customer support
          are not open yet. Contact details and final policies will be published
          before launch.
        </div>
        {order && (
          <div className="soft-panel">
            <h2>About your saved preview</h2>
            <p>
              {order.id} is not a placed order. No payment was taken or delivery
              booked.
            </p>
            <Link className="simple-link" href="/dashboard">
              Back to My orders <ArrowRight size={14} />
            </Link>
          </div>
        )}
        <nav className="help-topics" aria-label="Help topics">
          {[
            ["pricing", "Prices"],
            ["delivery", "Delivery"],
            ["returns", "Order issues"],
            ["contact", "Contact"],
            ["privacy", "Privacy"],
            ["terms", "Terms"],
          ].map(([id, name]) => (
            <a key={id} href={`#${id}`}>
              {name}
            </a>
          ))}
        </nav>
        <section id="pricing">
          <h2>How our prices work</h2>
          <p>
            CeraHub negotiates with suppliers and sells materials to customers.
            Your order will be invoiced by CeraHub.
          </p>
          <p>
            A confirmed order total includes the materials, applicable tax,
            delivery and any agreed unloading charge. An unknown charge is not
            the same as a free service.
          </p>
          <p>
            Current product prices are samples, not supplier-confirmed offers.
            Stock and price validity are not yet published.
          </p>
          <h3>What does “saving” mean?</h3>
          <p>
            MRP is the manufacturer’s listed maximum retail price. It is not
            evidence of what a local shop charges.
          </p>
          <p>
            We will show local savings only when we have a dated quote for the
            same brand, grade, pack size, quantity and location, with matching
            tax, delivery and unloading terms. If that evidence is missing or
            out of date, no local savings will be claimed.
          </p>
          <p>
            Bulk prices depend on quantity. Your cart should always show the
            rate that applies to the quantity you choose.
          </p>
        </section>
        <section id="delivery">
          <h2>Delivery and unloading</h2>
          <p>
            We are preparing to serve customers in Telangana. Specific delivery
            areas, charges, minimum order quantities and delivery dates have not
            yet been confirmed.
          </p>
          <p>
            Checking or saving a pincode does not book a delivery. We do not
            currently promise statewide coverage, free delivery, cranes or
            lifting materials to upper floors.
          </p>
          <p>
            Before a real order is paid, you will need to agree on the delivery
            address, expected delivery date, vehicle access and unloading
            arrangement.
          </p>
        </section>
        <section id="returns">
          <h2>Problems with an order</h2>
          <p>For a future live order, help should be available for:</p>
          <ul>
            <li>Damaged goods or the wrong product</li>
            <li>Missing items or a quantity mismatch</li>
            <li>A delayed or missed delivery</li>
            <li>Cancellation and refund questions</li>
          </ul>
          <p>
            Keep your order number, invoice, delivery details and relevant
            photos. Product-specific cancellation, return and refund terms will
            be published before purchases open. This preview does not promise
            unrestricted returns or manufacturer replacement.
          </p>
          <p>
            No payment is taken in this preview, so saving or deleting a preview
            does not trigger a refund.
          </p>
        </section>
        <section id="contact">
          <h2>Contact CeraHub</h2>
          <p>
            Support phone, WhatsApp, email and business details have not been
            configured yet. We do not display invented contact numbers or send
            messages from this preview.
          </p>
          <p>
            CeraHub will be the customer’s point of contact for orders and
            delivery. We do not offer construction audits, site monitoring or
            structural engineering services.
          </p>
        </section>
        <section id="privacy">
          <h2>Your information in this preview</h2>
          <p>
            Your cart, chosen pincode, saved addresses and order previews are
            stored on this browser only. They are not an online account and are
            not shared between devices. Personal details are not sent to a
            supplier or payment provider.
          </p>
          <p>
            Deleting a saved address does not remove its copy from an existing
            order preview. Delete that preview separately, or clear all saved
            information below. Avoid saving details on shared devices.
          </p>
          <button
            className="button-outline"
            onClick={() => {
              const shopCleared = shop.clearSavedData();
              const cartCleared = cart.clearCart();
              setClearStatus(shopCleared && cartCleared ? "cleared" : "failed");
            }}
          >
            Clear saved cart, addresses and previews
          </button>
          {clearStatus && (
            <p role={clearStatus === "failed" ? "alert" : "status"}>
              {clearStatus === "cleared"
                ? "Saved shopping information has been cleared from this browser."
                : "Cleared for this tab only. Browser storage could not be changed, so older saved information may remain. Remove this site's stored data in your browser settings before using a shared device."}
            </p>
          )}
        </section>
        <section id="terms">
          <h2>About this website preview</h2>
          <p>
            This is a demonstration of the planned shopping experience. Prices,
            product details and specifications require supplier confirmation.
            Saving an order preview does not create an order, reserve stock,
            confirm a price or book a delivery.
          </p>
          <p>
            Real purchasing terms, company details, tax information, payment
            options and delivery and refund policies must be published before
            live ordering opens. No construction supervision or engineering
            approval is included.
          </p>
        </section>
      </div>
    </>
  );
}
