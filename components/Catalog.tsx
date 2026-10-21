import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { products, categories } from "@/mockData";
import { ProductCard } from "./ProductCard";
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
  const title =
    categories.find((c) => c.id === category)?.name ||
    "ALL STRUCTURAL MATERIALS";
  return (
    <>
      <Head>
        <title>{title} | MaterialHub</title>
        <meta
          name="description"
          content="Browse sample site-ready architectural and construction materials."
        />
      </Head>
      <div className="shell py-7">
        <nav
          aria-label="Breadcrumb"
          className="technical-label mb-6 flex gap-3 text-[9px]"
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Material catalog</span>
        </nav>
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              VERIFIED MATERIALS / TRANSPARENT BUYING UNITS
            </p>
            <h1 className="section-title">
              {query ? `RESULTS FOR “${query}”` : title}
            </h1>
          </div>
          <span className="technical-label">{filtered.length} materials</span>
        </div>
        <div className="hide-scrollbar mb-7 flex gap-2 overflow-x-auto">
          <Link
            className={`badge whitespace-nowrap px-3 py-2 ${!category ? "border-black bg-black text-white" : "bg-white"}`}
            href="/materials"
          >
            All materials
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.id}`}
              className={`badge whitespace-nowrap px-3 py-2 ${category === c.id ? "border-black bg-black text-white" : "bg-white hover:border-black"}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-5 border border-line bg-plate p-4">
          <label className="technical-label flex items-center gap-3">
            MAX BASIC PRICE
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              aria-label="Maximum basic price"
              className="w-32"
            />
            <span>₹{max.toLocaleString("en-IN")}</span>
          </label>
          <label className="technical-label flex items-center gap-3">
            SORT BY
            <select
              aria-label="Sort materials"
              className="border border-black bg-white px-3 py-2 text-[10px]"
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
              <ProductCard key={p.id} product={p} />
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
