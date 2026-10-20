import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products } from "@/mockData";
import { cartTotals, normalizeQuantity, restoreCart } from "@/lib/calculations";
import type { CartLine, CartOptions } from "@/lib/types";
const KEY = "nirmaan-mono-cart-v1";
const EMPTY: CartLine[] = [];
let snapshot: CartLine[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();
function persist(items: CartLine[]) {
  snapshot = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* Shopping remains available when storage is disabled. */
  }
  listeners.forEach((fn) => fn());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!initialized) {
    initialized = true;
    try {
      snapshot = restoreCart(localStorage.getItem(KEY), products);
    } catch {
      snapshot = EMPTY;
    }
    listener();
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) {
      snapshot = restoreCart(event.newValue, products);
      listeners.forEach((fn) => fn());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;
type CartContextValue = {
  items: CartLine[];
  isOpen: boolean;
  count: number;
  totals: ReturnType<typeof cartTotals>;
  addItem: (
    productId: string,
    quantity?: number,
    options?: CartOptions,
  ) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const totals = cartTotals(items, products);
  const addItem = (
    productId: string,
    quantity = 1,
    options: CartOptions = {},
  ) => {
    if (!products.some((p) => p.id === productId)) return;
    const variant = options.variant || "50kg",
      offloading = options.offloading || "ground";
    const key = `${productId}:${variant}:${offloading}`;
    const existing = snapshot.find((i) => i.key === key);
    persist(
      existing
        ? snapshot.map((i) =>
            i.key === key
              ? {
                  ...i,
                  quantity: normalizeQuantity(
                    i.quantity + normalizeQuantity(quantity),
                  ),
                }
              : i,
          )
        : [
            ...snapshot,
            {
              key,
              productId,
              quantity: normalizeQuantity(quantity),
              variant,
              offloading,
            },
          ],
    );
    setIsOpen(true);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totals,
        count: totals.count,
        addItem,
        updateQuantity: (key, quantity) =>
          persist(
            snapshot.map((i) =>
              i.key === key
                ? { ...i, quantity: normalizeQuantity(quantity) }
                : i,
            ),
          ),
        removeItem: (key) => persist(snapshot.filter((i) => i.key !== key)),
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        clearCart: () => persist([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is required");
  return context;
}
