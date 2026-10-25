import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, ReceiptText, Truck } from "lucide-react";
import { categories, products } from "@/mockData";
import { ProductCard } from "@/components/ProductCard";
import { DeliveryCheck } from "@/components/DeliveryCheck";
import { displayName } from "@/lib/commerce";
export default function Home() {
  return (
    <>
      <Head>
        <title>CeraHub — Building materials. Clear prices.</title>
        <meta
          name="description"
          content="Compare building materials, understand your full cost and plan delivery with CeraHub. Website preview with sample prices."
        />
      </Head>
      <div className="market-home shell pb-4 pt-7 md:pt-10">
        <section className="commerce-hero">
          <div>
            <p className="commerce-eyebrow">
              A clearer way to buy building materials
            </p>
            <h1>
              Building materials.
              <br />
              Clear prices.
              <br />
              <span>Delivered to your doorstep.</span>
            </h1>
            <p>
              We negotiate with established suppliers so you can compare prices,
              see the full cost and order with confidence.
            </p>
            <div className="action-row">
              <Link className="button" href="/materials">
                Shop materials <ArrowRight size={16} />
              </Link>
              <a className="simple-link" href="#pricing">
                How pricing works <ArrowRight size={15} />
              </a>
            </div>
            <p className="hero-note">
              Starting in Telangana. Delivery areas and confirmed prices will be
              published before ordering opens.
            </p>
          </div>
          <div className="commerce-hero-photo">
            <Image
              src="/images/hero-urban-original.webp"
              alt="Homeowners planning their house at a building site"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            <span>For the home you are building.</span>
          </div>
        </section>
        <DeliveryCheck />
        <section className="commerce-section" id="categories">
          <div className="commerce-section-heading">
            <div>
              <p className="commerce-eyebrow">Find what you need</p>
              <h2>Shop by category</h2>
            </div>
            <Link className="simple-link" href="/materials">
              View all materials <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.id}`}
                className="market-category group min-w-0 bg-plate p-4"
              >
                <div className="relative aspect-[1.7]">
                  <Image
                    src={c.image}
                    alt={displayName(c.name)}
                    fill
                    sizes="(max-width:640px) 45vw,250px"
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="mt-3 text-center text-sm font-semibold">
                  {displayName(c.name)}
                </h3>
                <p className="mb-2 mt-1 text-center text-xs leading-5">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section className="commerce-section">
          <div className="commerce-section-heading">
            <div>
              <p className="commerce-eyebrow">Start your list</p>
              <h2>Popular materials</h2>
            </div>
            <p className="muted-copy">
              Sample unit prices · Final charges unconfirmed
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} presentation="marketplace" />
            ))}
          </div>
        </section>
        <section className="commerce-section pricing-explainer" id="pricing">
          <div>
            <p className="commerce-eyebrow">Know what you are paying</p>
            <h2>
              One clear total.
              <br />
              Every charge explained.
            </h2>
            <p>
              Before a real purchase, you will see the material price,
              applicable tax, delivery and any agreed unloading charge together.
              No charge should come as a surprise.
            </p>
            <Link className="simple-link" href="/help#pricing">
              Understand our prices <ArrowRight size={15} />
            </Link>
          </div>
          <div className="price-explainer-list">
            {[
              [
                "01",
                "Materials",
                "The price for your chosen brand, pack size and quantity.",
              ],
              [
                "02",
                "Tax",
                "The applicable tax, with a clear indication of whether it is included.",
              ],
              [
                "03",
                "Delivery & unloading",
                "Charges for your location and the agreed delivery arrangement.",
              ],
              [
                "04",
                "Your final total",
                "Confirmed before payment. Unconfirmed charges are never shown as free.",
              ],
            ].map(([n, title, text]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="commerce-section">
          <div className="commerce-section-heading">
            <div>
              <p className="commerce-eyebrow">A simple buying journey</p>
              <h2>From your list to your doorstep</h2>
            </div>
          </div>
          <div className="steps-grid">
            {[
              [
                Package,
                "Choose materials",
                "Choose the brand, size and quantity you need.",
              ],
              [
                ReceiptText,
                "Confirm your total",
                "Check availability, every charge and the delivery date before paying.",
              ],
              [
                Truck,
                "Get delivery",
                "Follow order updates and contact us if you need help.",
              ],
            ].map(([Icon, title, text]) => {
              const Symbol = Icon as typeof Package;
              return (
                <div className="soft-panel" key={String(title)}>
                  <Symbol size={23} strokeWidth={1.5} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="support-strip">
          <div>
            <h2>Need help with your order?</h2>
            <p>
              Find help with product choices, delivery questions and order
              issues.
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
