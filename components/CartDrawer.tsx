import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/mockData";
import { money, unitPrice } from "@/lib/calculations";
import { displayName } from "@/lib/commerce";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
import { PricingSummary } from "./PricingSummary";
export function CartDrawer() {
  const cart = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (cart.isOpen && !dialog?.open) dialog?.showModal();
    else if (!cart.isOpen && dialog?.open) dialog.close();
    const previous = document.body.style.overflow;
    if (cart.isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [cart.isOpen]);
  return (
    <dialog
      ref={ref}
      onCancel={cart.closeCart}
      onClose={cart.closeCart}
      aria-label="Your cart"
      className="dialog-backdrop dialog-panel cart-panel"
    >
      <div className="cart-layout">
        <div className="cart-heading">
          <div>
            <p className="commerce-eyebrow">Your shopping list</p>
            <h2>Your cart ({cart.count})</h2>
          </div>
          <button
            type="button"
            onClick={cart.closeCart}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>
        <div className="cart-items">
          {!cart.items.length ? (
            <div className="empty-state">
              <ShoppingBag size={30} />
              <h3>Your cart is empty</h3>
              <p>Add the materials you need to start your list.</p>
              <Link
                className="button"
                href="/materials"
                onClick={cart.closeCart}
              >
                Shop materials <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            cart.items.map((line) => {
              const p = products.find((p) => p.id === line.productId)!;
              return (
                <div className="cart-item" key={line.key}>
                  <div className="cart-item-image">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="muted-copy">{p.brand}</p>
                    <Link href={`/products/${p.slug}`} onClick={cart.closeCart}>
                      {displayName(p.name)}
                    </Link>
                    <p className="muted-copy">
                      {p.id === "jk-cement"
                        ? `${line.variant || "50kg"} bag`
                        : p.unit}{" "}
                      · Sample unit price{" "}
                      {money(unitPrice(p, line.quantity, line.variant))}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${p.name}`}
                    onClick={() => cart.removeItem(line.key)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="cart-item-bottom">
                    <QuantityStepper
                      className="w-32"
                      label={`${p.name} cart quantity`}
                      value={line.quantity}
                      onChange={(n) => cart.updateQuantity(line.key, n)}
                    />
                    <strong>
                      {money(
                        unitPrice(p, line.quantity, line.variant) *
                          line.quantity,
                      )}
                    </strong>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart.items.length > 0 && (
          <div className="cart-bottom">
            <PricingSummary quote={cart.totals} />
            <Link
              className="button w-full"
              href="/checkout"
              onClick={cart.closeCart}
            >
              Review order <ArrowRight size={15} />
            </Link>
            <p className="muted-copy text-center mt-3">
              Website preview. No payment or order is sent.
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
