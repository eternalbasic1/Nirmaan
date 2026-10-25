import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { money, unitPrice } from "@/lib/calculations";
import { displayName, minimumQuantity } from "@/lib/commerce";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
export function ProductCard({
  product,
}: {
  product: Product;
  presentation?: "technical" | "marketplace";
}) {
  const [quantity, setQuantity] = useState(minimumQuantity(product));
  const { addItem } = useCart();
  const confirmed = product.pricing?.status === "confirmed";
  return (
    <article className="market-product flex min-w-0 flex-col bg-white p-3 md:p-4">
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="market-product-image relative block aspect-[1.5]"
      >
        <Image
          src={
            product.id === "jk-cement" ? "/images/home-13.webp" : product.image
          }
          alt={product.name}
          fill
          sizes="(max-width:640px) 90vw,(max-width:1024px) 45vw,300px"
          className="object-contain p-2"
        />
        <span className="badge-black absolute left-2 top-2 text-[8px]">
          {confirmed ? "Check price details" : "Sample price"}
        </span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="muted-copy mb-1">{product.brand}</p>
        <Link
          href={`/products/${product.slug}`}
          className="market-product-name"
        >
          {displayName(product.name)}
        </Link>
        <p className="muted-copy mb-4">
          {product.unit}
          {minimumQuantity(product) > 1
            ? ` · Minimum ${minimumQuantity(product)}`
            : ""}
        </p>
        <div className="mt-auto border-t border-line pt-3">
          <div className="mb-1 flex flex-wrap items-baseline gap-2">
            <strong className="figure-price text-[22px]">
              {money(unitPrice(product, quantity))}
            </strong>
            <span className="text-xs">/ {product.unit}</span>
          </div>
          <p className="muted-copy mb-3">
            {product.pricing?.taxIncluded === true
              ? "Tax included"
              : "Tax not confirmed"}{" "}
            · Delivery extra, to be confirmed
          </p>
          <div className="grid grid-cols-[minmax(90px,0.9fr)_1fr] gap-2">
            <QuantityStepper
              value={quantity}
              onChange={(n) =>
                setQuantity(Math.max(minimumQuantity(product), n))
              }
              label={`${product.name} quantity`}
            />
            <button
              type="button"
              className="button px-2"
              onClick={() => addItem(product.id, quantity)}
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
