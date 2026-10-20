import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { products } from "@/mockData";
import { money, unitPrice } from "@/lib/calculations";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
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
      aria-label="Your material indent"
      className="dialog-backdrop dialog-panel fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-dvh w-full max-w-[520px] border-l-2 border-black bg-white p-0 text-black"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-black px-5 py-5">
          <div>
            <p className="eyebrow">PROCUREMENT SHEET / LOCAL CART</p>
            <h2 className="font-display text-xl font-bold uppercase">
              Your material indent ({cart.count})
            </h2>
          </div>
          <button
            type="button"
            onClick={cart.closeCart}
            aria-label="Close cart"
            className="p-2 hover:bg-plate"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {cart.items.length === 0 ? (
            <div className="border border-line bg-plate px-5 py-12 text-center">
              <ShoppingEmpty />
              <h3 className="mt-4 font-display text-lg font-bold uppercase">
                Your site starts here.
              </h3>
              <p className="my-4 text-sm">
                Add your first material to prepare an indent.
              </p>
              <Link
                href="/materials"
                onClick={cart.closeCart}
                className="button"
              >
                Explore materials <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            cart.items.map((line) => {
              const p = products.find((p) => p.id === line.productId)!;
              return (
                <div key={line.key} className="mb-4 border border-line p-3">
                  <div className="flex gap-3">
                    <div className="relative h-24 w-24 shrink-0 bg-plate">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="96px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="technical-label text-[8px]">{p.brand}</p>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={cart.closeCart}
                        className="font-display text-xs font-bold leading-5"
                      >
                        {p.name}
                      </Link>
                      <p className="mt-1 text-[10px]">
                        {p.id === "jk-cement" ? line.variant : p.unit} ·{" "}
                        {line.offloading === "manual"
                          ? "Manual lifting"
                          : "Ground floor offload"}
                      </p>
                      <p className="mt-2 text-xs">
                        Unit:{" "}
                        <strong className="figure-price">
                          {money(unitPrice(p, line.quantity, line.variant))}
                        </strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.removeItem(line.key)}
                      aria-label={`Remove ${p.name}`}
                      className="self-start p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3">
                    <QuantityStepper
                      className="w-32"
                      label={`${p.name} cart quantity`}
                      value={line.quantity}
                      onChange={(q) => cart.updateQuantity(line.key, q)}
                    />
                    <div className="text-right">
                      <p className="technical-label text-[8px]">
                        LINE SUBTOTAL
                      </p>
                      <strong className="figure-price text-lg">
                        {money(
                          (unitPrice(p, line.quantity, line.variant) +
                            (line.offloading === "manual" ? 10 : 0)) *
                            line.quantity,
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart.items.length > 0 && (
          <div className="border-t-2 border-black bg-plate p-5">
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt>Basic materials</dt>
                <dd className="figure-price">
                  {money(cart.totals.basePaise / 100)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Manual lifting</dt>
                <dd className="figure-price">
                  {money(cart.totals.handlingPaise / 100)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Sample GST (18%)</dt>
                <dd className="figure-price">
                  {money(cart.totals.gstPaise / 100)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-black pt-3 font-display text-lg font-bold">
                <dt>ESTIMATED TOTAL</dt>
                <dd>{money(cart.totals.totalPaise / 100)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              onClick={cart.closeCart}
              className="button mt-4 w-full"
            >
              Proceed to demo checkout <ArrowRight size={15} />
            </Link>
            <p className="mt-3 flex items-center justify-center gap-2 text-[9px]">
              <ShieldCheck size={12} />
              Sample prices · No payment is processed
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
function ShoppingEmpty() {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center border border-black font-display text-2xl">
      0
    </div>
  );
}
