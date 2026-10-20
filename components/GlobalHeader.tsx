import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  MapPin,
  Headphones,
  ReceiptText,
  HardHat,
  Search,
  Wallet,
  ShoppingBag,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import { categories, products } from "@/mockData";
import { useCart } from "./CartProvider";
import { InfoDialog } from "./InfoDialog";
export function Brand() {
  return (
    <Link
      href="/"
      aria-label="NIRMAAN MONO home"
      className="whitespace-nowrap font-display text-[20px] font-bold tracking-[-1px] lg:text-[22px]"
    >
      NIRMAAN <span className="mx-0.5 font-normal">//</span> MONO
    </Link>
  );
}
export function GlobalHeader() {
  const router = useRouter();
  const { count, openCart } = useCart();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("");
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
    <header className="sticky top-0 z-40 bg-white">
      <div className="black-surface border-b border-black bg-black text-white">
        <div className="shell flex min-h-8 items-center justify-between gap-4 py-1 font-display text-[9px] uppercase tracking-[0.04em]">
          <span className="flex items-center gap-2">
            <MapPin size={12} />
            DELIVERY PINCODE: BENGALURU 560001
            <span className="hidden border-l border-white pl-4 lg:inline">
              SAME-DAY MILL DISPATCH
            </span>
          </span>
          <div className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-1">
              <Headphones size={12} />
              24/7 HELPLINE: 1800-419-7000
            </span>
            <InfoDialog
              title="GST invoice portal"
              label={
                <>
                  <ReceiptText size={12} />
                  GST INVOICE PORTAL
                </>
              }
              className="inline-flex items-center gap-1 text-[9px] uppercase"
            >
              <p>
                Invoices in this prototype are sample documents. View a sample
                invoice or audit sheet from your{" "}
                <Link href="/dashboard" className="underline">
                  site dashboard
                </Link>
                . No tax filings are submitted.
              </p>
            </InfoDialog>
            <Link
              href="/dashboard"
              className="hidden items-center gap-1 xl:flex"
            >
              <HardHat size={12} />
              CONTRACTOR DESK
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-line">
        <div className="shell flex flex-wrap items-center gap-x-5 gap-y-4 py-4 lg:flex-nowrap">
          <Brand />
          <span className="badge hidden shrink-0 xl:inline-flex">
            B2C ARCHITECTURAL
          </span>
          <div
            className="relative order-last w-full lg:order-none lg:min-w-0 lg:flex-1"
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
            }}
          >
            <form
              role="search"
              className="flex h-10 border border-line"
              onSubmit={(e) => {
                e.preventDefault();
                setFocused(false);
                void router.push({
                  pathname: "/materials",
                  query: {
                    ...(query ? { q: query } : {}),
                    ...(division ? { category: division } : {}),
                  },
                });
              }}
            >
              <select
                aria-label="Search division"
                className="hidden max-w-28 border-r border-line bg-plate px-2 font-display text-[9px] uppercase md:block"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              >
                <option value="">ALL DIVISIONS</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <Search size={16} className="ml-3 shrink-0 self-center" />
              <input
                name="q"
                type="search"
                aria-label="Search structural materials"
                placeholder="Search structural materials, grades & brands"
                className="min-w-0 flex-1 bg-white px-2 text-xs outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setFocused(false);
                }}
              />
              <button
                className="border-l border-black bg-black px-4 font-display text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black"
                type="submit"
              >
                Lookup
              </button>
            </form>
            {focused && suggestions.length > 0 && (
              <div className="absolute inset-x-0 top-full z-50 border border-black bg-white">
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
              className="hidden items-center gap-2 border border-line bg-plate px-3 py-2 sm:flex"
            >
              <Wallet size={15} />
              <span>
                <span className="technical-label block text-[8px]">
                  CREDIT POOL
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
              className="relative flex min-h-10 items-center gap-2 border border-line px-3"
            >
              <ShoppingBag size={17} />
              <span className="technical-label hidden sm:inline">CART</span>
              <span className="absolute -right-1 -top-2 min-w-4 border border-black bg-black px-1 text-center font-display text-[9px] text-white">
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
      <nav aria-label="Material divisions" className="border-b border-black">
        <div className="shell hide-scrollbar flex min-h-11 items-stretch gap-5 overflow-x-auto font-display text-[10px] font-semibold uppercase tracking-[0.04em]">
          <Link
            href="/"
            className={`flex shrink-0 items-center border-b-2 py-3 ${router.pathname === "/" || router.pathname === "/Home" ? "border-black" : "border-white hover:border-black"}`}
          >
            Home
          </Link>
          {[
            ["CEMENT & CONCRETE", "/categories/cement-steel"],
            ["STEEL & TMT", "/materials?q=rebar"],
            ["SAND & AGGREGATES", "/materials?q=sand"],
            ["WATERPROOFING", "/categories/waterproofing"],
            ["PLUMBING & PIPES", "/categories/pipes"],
            ["ELECTRICAL", "/categories/electrical"],
            ["TILES & BATH", "/categories/bathware"],
            ["PAINT & PUTTY", "/categories/paint"],
          ].map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={`flex shrink-0 items-center border-b-2 py-3 ${router.asPath === href ? "border-black" : "border-white hover:border-black"}`}
            >
              {name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className={`ml-auto flex shrink-0 items-center border-b-2 py-3 ${router.pathname === "/dashboard" ? "border-black" : "border-white hover:border-black"}`}
          >
            My orders <ArrowUpRight size={12} className="ml-1" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
