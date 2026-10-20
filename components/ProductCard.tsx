import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { money, unitPrice } from "@/lib/calculations";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(
    product.id === "jk-cement" ? 50 : product.id === "ultratech" ? 40 : 1,
  );
  const { addItem } = useCart();
  return (
    <article className="flex min-w-0 flex-col border border-black bg-white p-3 md:p-4">
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[1.5] border border-line bg-plate"
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
          {product.badge}
        </span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="technical-label mb-1 text-[8px]">
          {product.brand} · {product.grade}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-[13px] font-bold uppercase leading-5 hover:underline"
        >
          {product.name}
        </Link>
        <p className="mb-4 mt-2 text-[11px] leading-5">{product.description}</p>
        <div className="mt-auto border-t border-line pt-3">
          <div className="mb-3 flex flex-wrap items-baseline gap-2">
            <strong className="figure-price text-[22px]">
              {money(unitPrice(product, quantity))}
            </strong>
            <del className="figure-price text-[10px]">{money(product.mrp)}</del>
            <span className="text-[10px]">/ {product.unit}</span>
          </div>
          <div className="grid grid-cols-[minmax(90px,0.9fr)_1fr] gap-2">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
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
