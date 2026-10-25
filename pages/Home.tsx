import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  PackageCheck,
  BadgeCheck,
  Forklift,
  Timer,
  ReceiptText,
  Ruler,
  Download,
  ShoppingCart,
} from "lucide-react";
import { categories, products, heroSlides } from "@/mockData";
import { estimateProject } from "@/lib/calculations";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";

function PersonaCarousel() {
  const [index, setIndex] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (
      !autoplay ||
      focused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      3000,
    );
    return () => window.clearInterval(id);
  }, [autoplay, focused, index]);
  const slide = heroSlides[index];
  return (
    <section
      className="market-hero"
      aria-label="Building stories"
      aria-roledescription="carousel"
      onFocusCapture={(e) => {
        if (e.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="grid items-center gap-7 lg:min-h-[460px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-12"
        aria-live={autoplay && !focused ? "off" : "polite"}
      >
        <div className="flex flex-col justify-center py-4 lg:py-8">
          <span className="market-persona mb-5 flex w-fit items-center gap-2 text-sm font-medium">
            <span className="h-1.5 w-1.5 bg-black" />
            {
              [
                "For rural & village builders",
                "For urban homeowners",
                "For architectural estates & villas",
              ][index]
            }
          </span>
          <h1 className="market-hero-title max-w-xl font-display text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[48px] xl:text-[56px]">
            {
              [
                "Build your first home with confidence.",
                "Your build, without the supply headaches.",
                "Premium materials. Planned deliveries.",
              ][index]
            }
          </h1>
          <blockquote className="mb-7 mt-5 max-w-lg">
            <p className="text-sm leading-7 md:text-base">“{slide.quote}”</p>
            <footer className="mt-3 text-sm">— {slide.author}</footer>
          </blockquote>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={slide.href} className="button">
              {
                [
                  "Shop building materials",
                  "Calculate material needs",
                  "Source your next project",
                ][index]
              }
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/materials" className="text-link min-h-11">
              Browse all materials <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="market-hero-photo relative aspect-[1.35] w-full min-w-0 overflow-hidden">
          <Image
            src={slide.image}
            alt={`${slide.tag.toLowerCase()} reviewing their home construction project`}
            fill
            preload={index === 1}
            sizes="(max-width:1023px) 100vw,50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="market-carousel-controls mt-4 flex items-center justify-center py-1">
        <div
          className="flex items-center"
          role="group"
          aria-label="Choose a banner"
        >
          {heroSlides.map((s, i) => (
            <button
              type="button"
              key={s.tag}
              aria-pressed={i === index}
              aria-label={`Show banner ${i + 1} of ${heroSlides.length}`}
              onClick={() => setIndex(i)}
              className="market-carousel-dot flex h-11 w-11 items-center justify-center"
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setAutoplay(!autoplay)}
          className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:border focus:border-black focus:bg-white focus:px-4 focus:py-2"
        >
          {autoplay ? "Pause carousel" : "Play carousel"}
        </button>
      </div>
    </section>
  );
}
function ProjectEstimator() {
  const [area, setArea] = useState(1200);
  const [floors, setFloors] = useState(2);
  const [grade, setGrade] = useState("M20");
  const { addItem } = useCart();
  const estimates = estimateProject(
    area,
    floors,
    grade === "M25" ? 1.12 : grade === "M15" ? 0.9 : 1,
  );
  const estimateRods = Math.ceil((estimates.steel * 1000) / 10.66);
  const estimateSandTonnes = Math.ceil(estimates.sand * 0.0283168 * 1.6);
  const canOrder = [estimates.cement, estimateRods, estimateSandTonnes].every(
    (q) => q > 0 && q <= 9999,
  );
  const addEstimate = () => {
    if (!canOrder) return;
    addItem("jk-cement", estimates.cement);
    addItem("tata-steel", estimateRods);
    addItem("m-sand", estimateSandTonnes);
  };
  const download = () => {
    const content = `MaterialHub — SAMPLE BILL OF QUANTITIES\nArea: ${area} sq.ft\nFloors: ${floors}\nGrade: ${grade}\nCement: ${estimates.cement} × 50kg bags\nRebar: ${estimates.steel} MT\nM-sand: ${estimates.sand} CFT\n\nWhole-project planning coefficients only. Validate quantities with your site engineer. No live quote or invoice.`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "materialhub-sample-boq.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section
      id="estimator"
      className="market-estimator mt-16 scroll-mt-40 border-t border-line pt-10"
    >
      <p className="eyebrow flex items-center gap-2">
        <Ruler size={13} />
        Project planning
      </p>
      <h2 className="section-title text-2xl md:text-3xl">
        Calculate your project quantities
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6">
        Enter your site specifications to prepare a preliminary bill of
        materials for your next phase.
      </p>
      <div className="mt-7 grid gap-7 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className="technical-label mb-2 block">
              Plot area (sq. ft.)
            </span>
            <input
              aria-label="Project area in square feet"
              type="number"
              min={100}
              max={100000}
              value={area}
              onChange={(e) =>
                setArea(Math.max(0, Math.min(100000, Number(e.target.value))))
              }
              className="mono-input figure-price bg-plate text-lg"
            />
          </label>
          <label className="block">
            <span className="technical-label mb-2 block">Number of floors</span>
            <select
              aria-label="Number of floors"
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="mono-input"
            >
              <option value={1}>Ground floor / 1 floor</option>
              <option value={2}>G + 1 (Duplex Home / 2 Floors)</option>
              <option value={3}>G + 2 / 3 Floors</option>
              <option value={4}>G + 3 / 4 Floors</option>
            </select>
          </label>
          <fieldset>
            <legend className="technical-label mb-2">Concrete grade</legend>
            <div className="grid grid-cols-3 gap-2">
              {["M20", "M25", "M15"].map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={grade === g}
                  onClick={() => setGrade(g)}
                  className={`border px-3 py-3 text-sm font-semibold ${grade === g ? "border-black bg-black text-white" : "border-line bg-white text-black hover:border-black"}`}
                >
                  {g} (
                  {g === "M20" ? "Standard" : g === "M25" ? "Heavy" : "PCC"})
                </button>
              ))}
            </div>
          </fieldset>
          <p className="text-sm leading-5">
            Whole-project planning factors include foundations and site works.
            For a slab-only mix estimate, use the cement product calculator.
            Confirm structural quantities with your engineer.
          </p>
        </div>
        <div className="market-estimate-summary bg-plate p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <h3 className="technical-label">Your estimated materials</h3>
            <span className="badge-black text-sm">Planning estimate</span>
          </div>
          {[
            {
              name: "PPC 53 Grade Cement",
              detail: "UltraTech / JK Super standard 50kg bags",
              value: `${estimates.cement.toLocaleString("en-IN")} bags`,
            },
            {
              name: "Fe 550D Rebars (TMT)",
              detail: "Tata Tiscon / Jindal Panther",
              value: `${estimates.steel.toFixed(2)} MT`,
            },
            {
              name: "Manufactured Sand (M-Sand)",
              detail: "Triple-washed Zone II aggregate",
              value: `${estimates.sand.toLocaleString("en-IN")} cu.ft`,
            },
          ].map((r) => (
            <div
              key={r.name}
              className="flex flex-wrap justify-between gap-3 border-b border-line py-5"
            >
              <div>
                <h4 className="text-sm font-semibold">{r.name}</h4>
                <p className="mt-1 text-sm">{r.detail}</p>
              </div>
              <strong className="figure-price whitespace-nowrap text-base">
                {r.value}
              </strong>
            </div>
          ))}
          {!canOrder && estimates.cement > 0 && (
            <p
              role="status"
              className="mt-4 border border-black p-3 text-sm leading-5"
            >
              This project exceeds the demo limit of 9,999 units per material.
              Download the complete BOQ sheet for a bulk procurement review;
              quantities have not been reduced.
            </p>
          )}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="button flex-1"
              disabled={!canOrder}
              onClick={addEstimate}
            >
              <ShoppingCart size={13} />
              Add estimate to cart
            </button>
            <button
              type="button"
              className="button-outline px-3"
              onClick={download}
            >
              <Download size={13} />
              BOQ sheet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <Head>
        <title>MaterialHub — Architectural Materials</title>
        <meta
          name="description"
          content="Architectural-grade construction materials. Verified mill batches, transparent tier pricing and site-first procurement."
        />
        <link rel="canonical" href="https://nirmaan.houseofdarmoji.com/" />
      </Head>
      <div className="market-home shell pb-4 pt-7 md:pt-10">
        <PersonaCarousel />
        <section
          aria-label="Procurement assurances"
          className="market-assurances my-12 grid gap-7 md:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              icon: BadgeCheck,
              title: "Direct suppliers",
              text: "Sourced directly from certified mother plants with authentic BIS test certificates.",
            },
            {
              icon: Forklift,
              title: "Mechanical unloading",
              text: "Hydra crane hoisted inside your plot boundary. Ground floor offloading included.",
            },
            {
              icon: Timer,
              title: "Fresh batches",
              text: "Fresh factory batches and clear dispatch records for every site indent.",
            },
            {
              icon: ReceiptText,
              title: "GST invoicing",
              text: "Itemised digital invoices with sample GST breakdowns for clear procurement.",
            },
          ].map((t) => (
            <div key={t.title} className="flex gap-3">
              <t.icon size={21} className="shrink-0" strokeWidth={1.5} />
              <div>
                <h2 className="text-sm font-semibold">{t.title}</h2>
                <p className="mt-2 text-sm leading-5">{t.text}</p>
              </div>
            </div>
          ))}
        </section>
        <section id="categories" className="scroll-mt-44">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Materials for every stage</p>
              <h2 className="section-title">Shop by category</h2>
            </div>
            <Link href="/materials" className="text-link">
              View all materials <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.id}`}
                className="market-category group min-w-0 bg-plate p-4"
              >
                <div className="relative aspect-[1.7]">
                  <Image
                    src={c.image}
                    alt={
                      c.id === "pipes"
                        ? "CPVC, PVC & GI"
                        : c.name.charAt(0) + c.name.slice(1).toLowerCase()
                    }
                    fill
                    sizes="(max-width:640px) 45vw,(max-width:1024px) 30vw,250px"
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="mt-3 text-center text-sm font-semibold">
                  {c.id === "pipes"
                    ? "CPVC, PVC & GI"
                    : c.name.charAt(0) + c.name.slice(1).toLowerCase()}
                </h3>
                <p className="mb-2 mt-1 text-center text-sm leading-4">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-12">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Build your order</p>
              <h2 className="section-title">Site essentials</h2>
            </div>
            <p className="text-sm">Sample prices · Bengaluru</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} presentation="marketplace" />
            ))}
          </div>
        </section>
        <ProjectEstimator />
        <p className="technical-label mt-5 flex items-center gap-2 text-sm">
          <PackageCheck size={12} />
          Frontend demo · Sample stock and pricing · No live mill connection
        </p>
      </div>
    </>
  );
}
