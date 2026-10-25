import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { EMPTY_SHOP, restoreShop, type ShopState } from "@/lib/commerce";
import type { Address, OrderPreview } from "@/lib/types";
const KEY = "cerahub-shopping-v1";
let state = EMPTY_SHOP;
let initialized = false;
const listeners = new Set<() => void>();
function update(next: ShopState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    state = { ...next, storageWarning: true };
  }
  listeners.forEach((fn) => fn());
}
function subscribe(fn: () => void) {
  listeners.add(fn);
  if (!initialized) {
    initialized = true;
    try {
      state = restoreShop(localStorage.getItem(KEY));
    } catch {
      state = { ...EMPTY_SHOP, storageWarning: true };
    }
    fn();
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) {
      state = restoreShop(e.newValue);
      listeners.forEach((f) => f());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}
interface ShopContext extends ShopState {
  setPincode: (pin: string) => void;
  saveAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  savePreview: (order: OrderPreview) => void;
  deletePreview: (id: string) => void;
  clearSavedData: () => boolean;
}
const Context = createContext<ShopContext | null>(null);
export function ShopProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY_SHOP,
  );
  return (
    <Context.Provider
      value={{
        ...current,
        clearSavedData: () => {
          let saved = true;
          try {
            localStorage.removeItem(KEY);
          } catch {
            saved = false;
          }
          state = { ...EMPTY_SHOP, storageWarning: !saved };
          listeners.forEach((fn) => fn());
          return saved;
        },
        setPincode: (pincode) => update({ ...state, pincode }),
        saveAddress: (address) =>
          update({
            ...state,
            addresses: [
              ...state.addresses.filter((a) => a.id !== address.id),
              address,
            ],
          }),
        deleteAddress: (id) =>
          update({
            ...state,
            addresses: state.addresses.filter((a) => a.id !== id),
          }),
        savePreview: (order) =>
          update({ ...state, orders: [order, ...state.orders] }),
        deletePreview: (id) =>
          update({ ...state, orders: state.orders.filter((o) => o.id !== id) }),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useShop() {
  const context = useContext(Context);
  if (!context) throw Error("ShopProvider required");
  return context;
}
