import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Search,
  Wallet,
  ShoppingBag,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import { products } from "@/mockData";
import { useCart } from "./CartProvider";
import { Brand } from "./Brand";
export function GlobalHeader() {
  const router = useRouter();
  const { count, openCart } = useCart();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const suggestions =
    query.trim().length > 1
      ? products
          .filter((p) =>
            (p.name + " " + p.brand)
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
          .slice(0, 4)
      : [];
  return (
    <header className="market-header sticky top-0 z-40 bg-white">
      <div className="border-b border-line">
        <div className="shell flex flex-wrap items-center gap-x-5 gap-y-4 py-4 lg:flex-nowrap">
          <Brand />
          <div
            className="relative order-last w-full lg:order-none lg:min-w-0 lg:flex-1"
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
            }}
          >
            <form
              role="search"
              className="market-search flex min-h-12 items-center gap-1 p-1"
              onSubmit={(e) => {
                e.preventDefault();
                setFocused(false);
                void router.push({
                  pathname: "/materials",
                  query: {
                    ...(query ? { q: query } : {}),
                  },
                });
              }}
            >
              <Search size={16} className="ml-3 shrink-0 self-center" />
              <input
                name="q"
                type="search"
                aria-label="Search structural materials"
                placeholder="Search materials, brands & grades"
                className="min-h-10 min-w-0 flex-1 bg-transparent px-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setFocused(false);
                }}
              />
              <button
                className="market-search-button min-h-10 bg-black px-3 text-sm font-semibold text-white hover:bg-white hover:text-black sm:px-4"
                type="submit"
              >
                Search
              </button>
            </form>
            {focused && suggestions.length > 0 && (
              <div className="market-suggestions absolute inset-x-0 top-full z-50 mt-2 border border-line bg-white">
                {suggestions.map((p) => (
                  <Link
                    href={`/products/${p.slug}`}
                    key={p.id}
                    className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-xs hover:bg-plate"
                    onClick={() => {
                      setFocused(false);
                      setQuery("");
                    }}
                  >
                    {p.name}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-4 lg:ml-0">
            <Link
              href="/dashboard"
              className="market-credit hidden items-center gap-2 px-2 py-2 sm:flex"
            >
              <Wallet size={15} />
              <span>
                <span className="technical-label block text-[8px]">
                  Cera Wallet
                </span>
                <span className="figure-price block text-xs font-semibold">
                  ₹500.00
                </span>
              </span>
            </Link>
            <button
              type="button"
              aria-label={`Open cart, ${count} items`}
              onClick={openCart}
              className="market-cart relative flex min-h-11 items-center gap-2 px-3"
            >
              <ShoppingBag size={17} />
              <span className="technical-label hidden sm:inline">Cart</span>
              <span className="market-count absolute -right-1 -top-1 min-w-5 bg-black px-1 text-center text-xs leading-5 text-white">
                {count}
              </span>
            </button>
            <Link
              href="/dashboard"
              aria-label="Your site dashboard"
              className="flex items-center gap-2"
            >
              <span className="hidden font-display text-[10px] font-semibold xl:block">
                Namaste, Vineeth
              </span>
              <UserRound size={22} />
            </Link>
          </div>
        </div>
      </div>
      <nav aria-label="Main navigation" className="border-b border-line">
        <div className="shell flex min-h-11 items-stretch gap-6 text-sm font-medium">
          {[
            {
              label: "Home",
              href: "/",
              active: router.pathname === "/" || router.pathname === "/Home",
            },
            {
              label: "Shop materials",
              href: "/materials",
              active:
                router.pathname === "/materials" ||
                router.pathname.startsWith("/categories/") ||
                router.pathname.startsWith("/products/"),
            },
          ].map(({ label, href, active }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center border-b-2 py-3 ${active ? "border-black" : "border-transparent hover:border-black"}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            aria-current={router.pathname === "/dashboard" ? "page" : undefined}
            className={`ml-auto flex shrink-0 items-center border-b-2 py-3 ${router.pathname === "/dashboard" ? "border-black" : "border-transparent hover:border-black"}`}
          >
            My orders <ArrowUpRight size={12} className="ml-1" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
