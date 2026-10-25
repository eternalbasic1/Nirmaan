import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/mockData";
import { ProductCard } from "./ProductCard";
function categoryLabel(name: string) {
  return name === "CPVC, PVC & GI"
    ? name
    : name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}
export function Catalog({
  initialCategory = "",
}: {
  initialCategory?: string;
}) {
  const router = useRouter();
  const category =
    initialCategory ||
    (typeof router.query.category === "string" ? router.query.category : "");
  const query = typeof router.query.q === "string" ? router.query.q : "";
  const [sort, setSort] = useState("recommended");
  const [max, setMax] = useState(10000);
  const filtered = products
    .filter(
      (p) =>
        (!category || p.category === category) &&
        (!query ||
          (p.name + " " + p.brand + " " + p.description)
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        p.price <= max,
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : 0,
    );
  const selectedCategory = categories.find((c) => c.id === category);
  const title = selectedCategory
    ? categoryLabel(selectedCategory.name)
    : "All materials";
  function closePriceFilter(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      const details = event.currentTarget.closest("details");
      if (details) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    }
  }
  return (
    <>
      <Head>
        <title>{title} | MaterialHub</title>
        <meta
          name="description"
          content="Browse sample site-ready architectural and construction materials."
        />
      </Head>
      <div className="market-home catalog-page shell py-7 md:py-10">
        <div className="catalog-heading">
          <div>
            <h1>{query ? `Results for “${query}”` : title}</h1>
            <p>
              {selectedCategory?.description ||
                "Materials for every stage of your build."}
            </p>
          </div>
          <span className="catalog-count" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "material" : "materials"}
          </span>
        </div>
        <div className="catalog-toolbar">
          <label className="catalog-category-control">
            <span className="sr-only">Category</span>
            <select
              aria-label="Browse categories"
              value={category}
              onChange={(e) => {
                const pathname = e.target.value
                  ? `/categories/${e.target.value}`
                  : "/materials";
                void router.push({
                  pathname,
                  query: query ? { q: query } : {},
                });
              }}
            >
              <option value="">All materials</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {categoryLabel(c.name)}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
          <details className="catalog-price-filter">
            <summary onKeyDown={closePriceFilter}>
              <SlidersHorizontal size={15} aria-hidden="true" />
              {max < 10000 ? `Up to ₹${max.toLocaleString("en-IN")}` : "Price"}
              <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div className="catalog-price-panel">
              <label htmlFor="catalog-max-price">Maximum basic price</label>
              <output htmlFor="catalog-max-price">
                ₹{max.toLocaleString("en-IN")}
              </output>
              <input
                id="catalog-max-price"
                type="range"
                min={100}
                max={10000}
                step={100}
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                onKeyDown={closePriceFilter}
                aria-label="Maximum basic price"
              />
              <button
                type="button"
                onClick={() => setMax(10000)}
                onKeyDown={closePriceFilter}
              >
                Reset price
              </button>
            </div>
          </details>
          <label className="catalog-sort-control">
            <span>Sort by</span>
            <select
              aria-label="Sort materials"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        {filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} presentation="marketplace" />
            ))}
          </div>
        ) : (
          <div className="border border-black py-16 text-center">
            <h2 className="section-title">No materials match this search</h2>
            <p className="my-4 text-sm">
              Try a different material, category, or maximum price.
            </p>
            <Link
              href="/materials"
              className="button"
              onClick={() => setMax(10000)}
            >
              View all materials <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
