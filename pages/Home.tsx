import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Truck,
  MapPin,
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
import { estimateProject, money } from "@/lib/calculations";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";

function PersonaCarousel() {
  const [index, setIndex] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (
      !autoplay ||
      hover ||
      focused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, [autoplay, hover, focused, index]);
  const slide = heroSlides[index];
  return (
    <section
      className="black-surface border border-black bg-black text-white"
      aria-label="Building stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="grid lg:min-h-[495px] lg:grid-cols-[1.03fr_1fr]"
        aria-live={autoplay && !hover && !focused ? "off" : "polite"}
      >
        <div className="flex flex-col justify-center p-6 md:p-9 lg:p-10">
          <span className="mb-5 flex w-fit items-center gap-2 border border-white px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.06em]">
            <span className="h-1.5 w-1.5 bg-white" />
            {slide.eyebrow}
          </span>
          <h1 className="max-w-xl font-display text-[30px] font-bold uppercase leading-[1.04] tracking-[-0.03em] md:text-[38px] xl:text-[43px]">
            {slide.title}
          </h1>
          <blockquote className="mb-6 mt-5 max-w-lg border-l-2 border-white pl-4">
            <p className="text-xs italic leading-6 md:text-sm">
              “{slide.quote}”
            </p>
            <footer className="mt-2 font-display text-[10px]">
              — {slide.author}
            </footer>
          </blockquote>
          <div className="flex flex-col gap-2 sm:items-start">
            <Link
              href={slide.href}
              className="inline-flex min-h-11 items-center justify-center gap-3 border border-white bg-white px-5 py-3 font-display text-[10px] font-bold uppercase tracking-[0.04em] text-black hover:bg-black hover:text-white"
            >
              {slide.action}
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/materials"
              className="inline-flex min-h-10 items-center justify-center gap-3 border border-white px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.04em] hover:bg-white hover:text-black"
            >
              Explore structural materials <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <div className="relative min-h-64 border-t border-white lg:border-l lg:border-t-0">
          <Image
            src={slide.image}
            alt={`${slide.tag.toLowerCase()} reviewing their home construction project`}
            fill
            preload={index === 1}
            sizes="(max-width:1023px) 100vw,50vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 right-4 border border-white bg-black px-3 py-2 font-display text-[9px] font-semibold uppercase tracking-wider">
            VERIFIED MATERIALS. REAL FOUNDATIONS.
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white px-4 py-3">
        <div className="hide-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            aria-label="Previous building story"
            onClick={() => setIndex((index + 2) % 3)}
            className="shrink-0 border border-white p-1.5 hover:bg-white hover:text-black"
          >
            <ChevronLeft size={13} />
          </button>
          {heroSlides.map((s, i) => (
            <button
              type="button"
              key={s.tag}
              aria-pressed={i === index}
              aria-label={`Show ${s.tag} story`}
              onClick={() => setIndex(i)}
              className={`shrink-0 border border-white px-2 py-1.5 font-display text-[9px] font-semibold uppercase tracking-wide ${i === index ? "bg-white text-black" : "bg-black text-white hover:bg-white hover:text-black"}`}
            >
              0{i + 1}. {s.tag}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next building story"
            onClick={() => setIndex((index + 1) % 3)}
            className="shrink-0 border border-white p-1.5 hover:bg-white hover:text-black"
          >
            <ChevronRight size={13} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setAutoplay(!autoplay)}
          aria-label={autoplay ? "Pause carousel" : "Play carousel"}
          className="flex items-center gap-3 font-display text-[9px] uppercase tracking-wide"
        >
          {autoplay ? <Pause size={12} /> : <Play size={12} />}AUTO-ROTATING
          (4S)
          <span className="hidden h-1 w-16 bg-white sm:block" />
        </button>
      </div>
    </section>
  );
}
function PricingCheck() {
  const [pin, setPin] = useState("560001");
  const [material, setMaterial] = useState(products[0].id);
  const [message, setMessage] = useState("");
  const p = products.find((p) => p.id === material)!;
  return (
    <section
      className="mt-4 border border-black p-4"
      aria-label="Live mill gate pricing check"
    >
      <form
        className="grid gap-4 xl:grid-cols-[1fr_1.3fr]"
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(
            !/^\d{6}$/.test(pin)
              ? "Enter a valid six-digit Indian pincode."
              : !pin.startsWith("560")
                ? "This demo currently quotes Bengaluru 560xxx pincodes only."
                : `SAMPLE QUOTE: ${money(p.price)} / ${p.unit}. Dispatch available to ${pin}. Final GST and handling shown in cart.`,
          );
        }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-black text-white">
            <Truck size={19} />
          </span>
          <div>
            <h2 className="technical-label">Live mill gate pricing check</h2>
            <p className="mt-1 text-[10px]">
              Direct wholesale rates from sample authorised mother hubs.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[0.8fr_1.2fr_auto]">
          <label className="flex h-11 items-center gap-2 border border-line px-3">
            <MapPin size={14} />
            <input
              aria-label="Quote delivery pincode"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="min-w-0 w-full font-display text-xs"
            />
          </label>
          <select
            className="mono-input font-display text-[11px]"
            aria-label="Quote material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            {products.slice(0, 4).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({money(p.price)})
              </option>
            ))}
          </select>
          <button className="button" type="submit">
            Get quote <ArrowRight size={13} />
          </button>
        </div>
      </form>
      {message && (
        <output
          className="mt-3 block border-t border-line pt-3 font-display text-xs"
          aria-live="polite"
        >
          {message}
        </output>
      )}
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
    const content = `NIRMAAN // MONO — SAMPLE BILL OF QUANTITIES\nArea: ${area} sq.ft\nFloors: ${floors}\nGrade: ${grade}\nCement: ${estimates.cement} × 50kg bags\nRebar: ${estimates.steel} MT\nM-sand: ${estimates.sand} CFT\n\nWhole-project planning coefficients only. Validate quantities with your site engineer. No live quote or invoice.`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "nirmaan-sample-boq.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section
      id="estimator"
      className="mt-14 scroll-mt-40 border-2 border-black p-5 md:p-8"
    >
      <p className="eyebrow flex items-center gap-2">
        <Ruler size={13} />
        CIVIL ENGINEERING ESTIMATOR / PROJECT PLANNING
      </p>
      <h2 className="section-title text-2xl md:text-3xl">
        Calculate your project quantities
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-6">
        Enter your site specifications to prepare a preliminary bill of
        materials for your next phase.
      </p>
      <div className="mt-7 grid gap-7 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className="technical-label mb-2 block">
              1. SLAB OR PLOT AREA (SQ. FT.)
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
            <span className="technical-label mb-2 block">
              2. NUMBER OF FLOORS
            </span>
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
            <legend className="technical-label mb-2">3. CONCRETE GRADE</legend>
            <div className="grid grid-cols-3 gap-2">
              {["M20", "M25", "M15"].map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={grade === g}
                  onClick={() => setGrade(g)}
                  className={`border px-3 py-3 font-display text-[10px] font-semibold ${grade === g ? "border-black bg-black text-white" : "border-line bg-white text-black hover:border-black"}`}
                >
                  {g} (
                  {g === "M20" ? "STANDARD" : g === "M25" ? "HEAVY" : "PCC"})
                </button>
              ))}
            </div>
          </fieldset>
          <p className="text-[10px] leading-5">
            Whole-project planning factors include foundations and site works.
            For a slab-only mix estimate, use the cement product calculator.
            Confirm structural quantities with your engineer.
          </p>
        </div>
        <div className="border border-black bg-plate p-5">
          <div className="flex items-center justify-between gap-4 border-b border-black pb-4">
            <h3 className="technical-label">
              ESTIMATED BILL OF QUANTITIES (BOQ)
            </h3>
            <span className="badge-black text-[8px]">PLANNING ESTIMATE</span>
          </div>
          {[
            {
              name: "PPC 53 Grade Cement",
              detail: "UltraTech / JK Super standard 50kg bags",
              value: `${estimates.cement.toLocaleString("en-IN")} BAGS`,
            },
            {
              name: "Fe 550D Rebars (TMT)",
              detail: "Tata Tiscon / Jindal Panther",
              value: `${estimates.steel.toFixed(2)} TONS`,
            },
            {
              name: "Manufactured Sand (M-Sand)",
              detail: "Triple-washed Zone II aggregate",
              value: `${estimates.sand.toLocaleString("en-IN")} CU.FT`,
            },
          ].map((r) => (
            <div
              key={r.name}
              className="flex justify-between gap-4 border-b border-line py-5"
            >
              <div>
                <h4 className="font-display text-xs font-semibold">{r.name}</h4>
                <p className="mt-1 text-[10px]">{r.detail}</p>
              </div>
              <strong className="figure-price whitespace-nowrap text-base">
                {r.value}
              </strong>
            </div>
          ))}
          {!canOrder && estimates.cement > 0 && (
            <p
              role="status"
              className="mt-4 border border-black p-3 text-xs leading-5"
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
        <title>NIRMAAN // MONO — Architectural Materials</title>
        <meta
          name="description"
          content="Architectural-grade construction materials. Verified mill batches, transparent tier pricing and site-first procurement."
        />
        <link rel="canonical" href="https://nirmaanmono.example/" />
      </Head>
      <div className="shell pb-4 pt-6">
        <PersonaCarousel />
        <PricingCheck />
        <section
          aria-label="Procurement assurances"
          className="my-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              icon: BadgeCheck,
              title: "DIRECT SUPPLIER NETWORK",
              text: "Sourced directly from certified mother plants with authentic BIS test certificates.",
            },
            {
              icon: Forklift,
              title: "FREE MECHANICAL UNLOADING",
              text: "Hydra crane hoisted inside your plot boundary. Ground floor offloading included.",
            },
            {
              icon: Timer,
              title: "FRESH BATCH GUARANTEE",
              text: "Fresh factory batches and clear dispatch records for every site indent.",
            },
            {
              icon: ReceiptText,
              title: "100% GST INVOICED",
              text: "Itemised digital invoices with sample GST breakdowns for clear procurement.",
            },
          ].map((t) => (
            <div key={t.title} className="flex gap-3 border border-black p-4">
              <t.icon size={21} className="shrink-0" strokeWidth={1.5} />
              <div>
                <h2 className="technical-label text-[9px]">{t.title}</h2>
                <p className="mt-2 text-[10px] leading-5">{t.text}</p>
              </div>
            </div>
          ))}
        </section>
        <section id="categories" className="scroll-mt-44">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPLETE MATERIAL CATALOG</p>
              <h2 className="section-title">Shop by structural category</h2>
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
                className="group min-w-0 border border-line p-2 hover:border-black"
              >
                <div className="relative aspect-[1.7] border border-line bg-plate">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:640px) 45vw,(max-width:1024px) 30vw,250px"
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="mt-3 text-center font-display text-[10px] font-semibold uppercase tracking-wide">
                  {c.name}
                </h3>
                <p className="mb-2 mt-1 text-center text-[9px] leading-4">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-12">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DISPATCH READY COMMODITIES</p>
              <h2 className="section-title">Trending structural essentials</h2>
            </div>
            <div className="flex gap-2">
              <span className="badge-black">WHOLESALE ACTIVE</span>
              <span className="badge border-black bg-white">
                Bengaluru Zone 04
              </span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <ProjectEstimator />
        <p className="technical-label mt-5 flex items-center gap-2 text-[8px]">
          <PackageCheck size={12} />
          FRONTEND DEMO · SAMPLE STOCK, ASSURANCES AND PRICING · NO LIVE MILL
          CONNECTION
        </p>
      </div>
    </>
  );
}
