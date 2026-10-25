import Image from "next/image";
import Link from "next/link";
import { Check, Truck, ArrowRight } from "lucide-react";
import { money } from "@/lib/calculations";

const sampleOrders = [
  {
    id: "SAMPLE-1024",
    status: "Out for delivery",
    delivered: false,
    window: "Example delivery window: 2–5 PM",
    materials: 19850,
    delivery: 650,
    items: [
      {
        name: "JK Super cement 50kg",
        quantity: 50,
        price: 335,
        image: "/images/home-13.webp",
      },
      {
        name: "Tata Tiscon 550D rebar 12mm",
        quantity: 5,
        price: 620,
        image: "/images/home-15.webp",
      },
    ],
  },
  {
    id: "SAMPLE-1008",
    status: "Delivered",
    delivered: true,
    window: "Example completed order",
    materials: 8600,
    delivery: 400,
    items: [
      {
        name: "Dr. Fixit Pidifin 2K 15kg",
        quantity: 4,
        price: 2150,
        image: "/images/home-16.webp",
      },
    ],
  },
];

export function SampleOrders() {
  return (
    <section className="sample-orders" aria-label="Sample orders">
      <div className="sample-orders-intro">
        <span className="status-pill">Sample orders</span>
        <p>
          Example data to show the layout. These are not real purchases or
          deliveries.
        </p>
      </div>
      {sampleOrders.map((order) => (
        <article className="sample-order-card" key={order.id}>
          <div className="sample-order-top">
            <div>
              <div className="sample-order-labels">
                <h2>{order.id}</h2>
                <span
                  className={`sample-order-status ${order.delivered ? "is-delivered" : ""}`}
                >
                  {order.delivered ? <Check size={13} /> : <Truck size={14} />}{" "}
                  {order.status}
                </span>
              </div>
              <p>{order.window}</p>
            </div>
            <div className="sample-order-total">
              <strong>{money(order.materials + order.delivery)}</strong>
              <span>Illustrative total</span>
            </div>
          </div>
          {!order.delivered && (
            <ol
              className="sample-delivery-steps"
              aria-label="Example delivery progress"
            >
              {[
                "Order placed",
                "Confirmed",
                "Out for delivery",
                "Delivered",
              ].map((step, index) => (
                <li className={index < 3 ? "is-complete" : ""} key={step}>
                  <span>{index < 2 ? <Check size={12} /> : index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          )}
          <div className="sample-order-items">
            {order.items.map((item) => (
              <div key={item.name}>
                <div className="sample-order-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × {money(item.price)} <span>(sample)</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="sample-order-bottom">
            <details>
              <summary>
                {order.delivered ? "View sample invoice" : "View sample order"}
              </summary>
              <div className="sample-order-details">
                <h3>
                  {order.delivered
                    ? "Sample invoice layout"
                    : "Example order details"}
                </h3>
                <p>
                  Illustration only. Not a placed order, payment receipt or tax
                  invoice.
                </p>
                <dl>
                  <div>
                    <dt>Materials, tax included in this example</dt>
                    <dd>{money(order.materials)}</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>{money(order.delivery)}</dd>
                  </div>
                  <div>
                    <dt>Unloading</dt>
                    <dd>Included in this example</dd>
                  </div>
                  <div>
                    <dt>Illustrative total</dt>
                    <dd>{money(order.materials + order.delivery)}</dd>
                  </div>
                </dl>
                <p>
                  Delivery address: Example home address, Telangana. No actual
                  address or delivery booking.
                </p>
                <p>
                  Actual taxes, charges and prices still require confirmation in
                  the shopping flow.
                </p>
              </div>
            </details>
            <Link
              href={
                order.delivered
                  ? "/categories/waterproofing"
                  : "/categories/cement-steel"
              }
              className="simple-link"
            >
              {order.delivered ? "Shop these materials" : "Browse materials"}
              <ArrowRight size={13} />
            </Link>
            <Link href="/help" className="simple-link">
              Get help
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
