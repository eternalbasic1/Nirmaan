import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { products, categories } from "@/mockData";
import type { Product } from "@/lib/types";
import { money, unitPrice } from "@/lib/calculations";
import {
  displayName,
  minimumQuantity,
  quoteCart,
  compareLocalQuote,
} from "@/lib/commerce";
import { useCart } from "@/components/CartProvider";
import { useShop } from "@/components/ShopProvider";
import { QuantityStepper } from "@/components/QuantityStepper";
import { DeliveryCheck } from "@/components/DeliveryCheck";
import { PricingSummary } from "@/components/PricingSummary";
export default function ProductDetail({
  product = products[0] as Product,
}: {
  product?: Product;
}) {
  return <ProductContent key={product.id} product={product} />;
}
function ProductContent({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(minimumQuantity(product));
  const [image, setImage] = useState(product.image);
  const { addItem } = useCart();
  const { pincode } = useShop();
  const quote = quoteCart(
    [{ key: product.id, productId: product.id, quantity, variant: "50kg" }],
    products,
  );
  const savings = compareLocalQuote(
    quote.payablePaise,
    product.localComparison,
    {
      productId: product.id,
      quantity,
      unit: product.unit,
      variant: "50kg",
      area: pincode,
    },
  );
  const gallery = [...new Set([product.image, ...product.gallery])].slice(0, 4);
  const category = categories.find((c) => c.id === product.category);
  return (
    <>
      <Head>
        <title>{product.name} | CeraHub</title>
        <meta
          name="description"
          content={`View ${displayName(product.name)}, pack size, sample price and delivery information on CeraHub.`}
        />
      </Head>
      <div className="market-home shell commerce-product">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link href="/materials">Shop materials</Link>
          <span>/</span>
          <Link href={`/categories/${product.category}`}>
            {displayName(category?.name || "Materials")}
          </Link>
        </nav>
        <div className="product-buying-grid">
          <section aria-label="Product images">
            <div className="product-main-image">
              <Image
                src={image}
                alt={product.name}
                fill
                sizes="(max-width:768px) 100vw,50vw"
                className="object-contain p-6"
                priority
              />
            </div>
            <div className="product-thumbnails">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={image === src}
                  onClick={() => setImage(src)}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </section>
          <section className="product-buying-info">
            <p className="commerce-eyebrow">{product.brand}</p>
            <h1>{displayName(product.name)}</h1>
            <p className="muted-copy">Sold by CeraHub · {product.unit}</p>
            <div className="product-price">
              <strong>{money(unitPrice(product, quantity))}</strong>
              <span>/ {product.unit}</span>
            </div>
            <p className="muted-copy">
              Sample selling price.{" "}
              {product.pricing?.taxIncluded === true
                ? "Tax included."
                : "Tax has not been confirmed."}
            </p>
            {product.mrp > 0 && (
              <p className="muted-copy">
                Sample MRP: {money(product.mrp)}. MRP is not a local-shop price
                comparison.
              </p>
            )}
            {product.tiers.length > 1 && (
              <details className="quantity-prices">
                <summary>Prices by quantity (sample)</summary>
                <dl>
                  {[...product.tiers]
                    .sort((a, b) => a.min - b.min)
                    .map((tier) => (
                      <div key={tier.min}>
                        <dt>{tier.min}+ units</dt>
                        <dd>
                          {money(unitPrice(product, tier.min))} / {product.unit}
                        </dd>
                      </div>
                    ))}
                </dl>
                <p className="muted-copy">
                  The rate changes with your selected quantity. These sample
                  rates do not confirm stock or a final delivered price.
                </p>
              </details>
            )}
            <div className="product-facts">
              <div>
                <span>Grade / type</span>
                <strong>
                  {/quality checked|certified|verified/i.test(product.grade)
                    ? "To be confirmed"
                    : product.grade}
                </strong>
              </div>
              <div>
                <span>Buying unit</span>
                <strong>{product.unit}</strong>
              </div>
              <div>
                <span>Minimum order</span>
                <strong>
                  {product.pricing
                    ? `${minimumQuantity(product)} ${minimumQuantity(product) === 1 ? "unit" : "units"}`
                    : "Not confirmed"}
                </strong>
              </div>
              <div>
                <span>Availability</span>
                <strong>
                  {product.pricing?.availability === "available"
                    ? "Available"
                    : product.pricing?.availability === "unavailable"
                      ? "Unavailable"
                      : "Not confirmed"}
                </strong>
              </div>
              <div>
                <span>Price valid until</span>
                <strong>
                  {product.pricing?.validUntil
                    ? new Date(product.pricing.validUntil).toLocaleDateString(
                        "en-IN",
                      )
                    : "Not yet published"}
                </strong>
              </div>
            </div>
            <div className="product-add-row">
              <QuantityStepper
                value={quantity}
                onChange={(n) =>
                  setQuantity(Math.max(minimumQuantity(product), n))
                }
                label="Order quantity"
              />
              <button
                className="button"
                onClick={() => addItem(product.id, quantity)}
                disabled={product.pricing?.availability === "unavailable"}
              >
                Add to cart <ArrowRight size={15} />
              </button>
            </div>
            <PricingSummary quote={quote} />
            {savings !== null && product.localComparison ? (
              <div className="notice">
                Compared with a delivered local quote from{" "}
                {product.localComparison.area}, recorded{" "}
                {product.localComparison.recordedAt}, valid until{" "}
                {product.localComparison.validUntil}, for the same pack and
                quantity. Savings: {money(savings / 100)}.
              </div>
            ) : (
              <p className="muted-copy">
                No verified delivered local quote is available for comparison.
                We do not claim local savings without one.
              </p>
            )}
            <Link className="simple-link" href="/help#pricing">
              How we explain prices <ArrowRight size={14} />
            </Link>
          </section>
        </div>
        <DeliveryCheck />
        <details className="specification-details">
          <summary>
            Product specifications <span>View details</span>
          </summary>
          <p className="muted-copy">
            Sample catalog information. Manufacturer details and supporting
            documents must be confirmed before purchase. CeraHub does not
            provide structural design or engineering approval.
          </p>
          <dl>
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </details>
        <section className="support-strip">
          <div>
            <h2>Questions about this material?</h2>
            <p>Find help with buying units, delivery and order issues.</p>
          </div>
          <Link className="button-outline" href="/help">
            Get help
          </Link>
        </section>
      </div>
    </>
  );
}
