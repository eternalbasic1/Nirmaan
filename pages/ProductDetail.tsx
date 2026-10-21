import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  BadgeCheck,
  Bookmark,
  Building2,
  Factory,
  Hourglass,
  Layers3,
  Play,
  ShoppingCart,
  Truck,
  X,
  ArrowDownToLine,
  Clock3,
} from "lucide-react";
import { products } from "@/mockData";
import type { Product } from "@/lib/types";
import {
  money,
  unitPrice,
  slabBags,
  normalizeQuantity,
} from "@/lib/calculations";
import { useCart } from "@/components/CartProvider";
import { QuantityStepper } from "@/components/QuantityStepper";
import { TechnicalCard } from "@/components/TechnicalCard";

const cementMetrics = [
  {
    icon: ArrowDownToLine,
    label: "Compressive resistance",
    title: "53 Grade Equivalent",
    description:
      "Tested at 28-day cure to exceed 53 MPa per IS 1489 Part 1 blended protocols.",
    foot: "58.4 MPa certified",
  },
  {
    icon: Hourglass,
    label: "Workability window",
    title: "30m Init / 600m Fin",
    description:
      "Extended initial setting allows zero-cold-joint transit and optimal finishing across large pours.",
    foot: "Optimal hydration rate",
  },
  {
    icon: Clock3,
    label: "Guaranteed vitality",
    title: "< 12 Days Old",
    description:
      "Shipped directly from the manufacturing silo. Fresh mill stock, protected from atmospheric moisture.",
    foot: "Active silo guarantee",
  },
  {
    icon: Building2,
    label: "Structural application",
    title: "Roof Slabs & Footings",
    description:
      "Heavy foundation rafts, reinforced structural columns, retaining walls, and waterproof roof slabs.",
    foot: "RCC structural approved",
  },
];
const galleryLabels = [
  "Front pack",
  "QR batch seal",
  "Slab casting",
  "Fleet transit",
];
export default function ProductDetail({
  product = {
    ...products[0],
    specifications: Object.fromEntries(
      Object.entries(products[0].specifications).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      ),
    ),
  },
}: {
  product?: Product;
}) {
  return <ProductDetailContent key={product.id} product={product} />;
}
function ProductDetailContent({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const isCement = product.id.includes("cement");
  const isJK = product.id === "jk-cement";
  const [quantity, setQuantity] = useState(10);
  const [variant, setVariant] = useState("50kg");
  const [offloading, setOffloading] = useState<"ground" | "manual">("ground");
  const [selectedImage, setSelectedImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pincode, setPincode] = useState("560001");
  const [deliveryPin, setDeliveryPin] = useState("560001");
  const [pinMessage, setPinMessage] = useState("");
  const [area, setArea] = useState("1200");
  const [thickness, setThickness] = useState(5);
  const [applied, setApplied] = useState(false);
  const [dialog, setDialog] = useState<"guide" | "certificate" | null>(null);
  const gallery = (
    product.gallery.length ? product.gallery : [product.image]
  ).slice(0, 4);
  const price = unitPrice(product, quantity, variant);
  const total = quantity * (price + (offloading === "manual" ? 10 : 0));
  const bagWeight = variant === "25kg" ? 25 : 50;
  const bags = slabBags(Number(area), thickness, bagWeight);
  const tiers = [...product.tiers].sort((a, b) => a.min - b.min);
  const activeTier = tiers.reduce(
    (active, tier, i) => (quantity >= tier.min ? i : active),
    0,
  );
  const metrics = isJK
    ? cementMetrics
    : Object.entries(product.specifications)
        .slice(0, 4)
        .map(([label, title]) => ({
          icon: Layers3,
          label,
          title,
          description: product.description,
          foot: "Manufacturer specification",
        }));
  const bundle = ["jk-cement", "sand", "trowel"].map((id) =>
    products.find((p) => p.id === id)!,
  );
  const bundleTotal = bundle.reduce((sum, item) => sum + item.price, 0);
  const mrp = isJK && variant === "25kg" ? 219 : product.mrp;
  function addToOrder() {
    addItem(product.id, normalizeQuantity(quantity), { variant, offloading });
  }
  function checkPincode(event: FormEvent) {
    event.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pincode)) {
      setPinMessage("Enter a valid 6-digit Indian pincode.");
      return;
    }
    if (!pincode.startsWith("560")) {
      setPinMessage(
        "This demo serves Bengaluru pincodes beginning with 560. Try 560001.",
      );
      return;
    }
    setDeliveryPin(pincode);
    setPinOpen(false);
    setPinMessage("");
  }
  return (
    <>
      <Head>
        <title>{product.name} | MaterialHub</title>
        <meta
          name="description"
          content={`${product.description} Compare bulk pricing and estimate your site requirements with MaterialHub.`}
        />
      </Head>
      <div className="shell py-3">
        <nav
          aria-label="Breadcrumb"
          className="technical-label flex flex-wrap gap-2 text-[9px]"
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/categories/${product.category}`}>
            {isCement
              ? "Cement & Concrete"
              : product.category.replaceAll("-", " & ")}
          </Link>
          <span>/</span>
          <span>
            {product.name}
            {isJK ? " (PPC Blended)" : ""}
          </span>
        </nav>
      </div>
      <section className="shell pb-5 pt-2" aria-label="Product details">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <div className="relative flex min-h-[390px] flex-col bg-plate p-5 md:min-h-[580px] md:p-6 lg:min-h-[590px]">
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  <span className="badge-black">
                    BIS {product.specifications.Standard || "Verified"}
                  </span>
                  <span className="badge">
                    {isJK ? "Fresh batch #JK-BLR-094" : product.grade}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={
                    saved ? "Remove from saved materials" : "Save material"
                  }
                  aria-pressed={saved}
                  onClick={() => setSaved(!saved)}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center border border-line ${saved ? "bg-black text-white" : "bg-white"}`}
                >
                  <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="relative mx-auto my-8 aspect-[1.5] w-[78%] flex-1">
                <Image
                  src={gallery[selectedImage]}
                  alt={
                    selectedImage === 0
                      ? product.name
                      : `${product.name} — ${galleryLabels[selectedImage]}`
                  }
                  fill
                  preload
                  sizes="(max-width: 1023px) 75vw, 38vw"
                  className={`object-contain ${isCement && selectedImage >= 2 ? "context-photo" : ""}`}
                />
              </div>
              <div className="technical-label flex flex-wrap justify-between gap-3 text-[9px]">
                <span>
                  ● &nbsp;{" "}
                  {isJK
                    ? "Factory mill packaged: 6 days ago"
                    : "Direct manufacturer supply"}
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => setDialog("certificate")}
                >
                  <BadgeCheck size={14} /> Audit mill test certificate
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {gallery.map((src, index) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setSelectedImage(index)}
                  aria-pressed={selectedImage === index}
                  aria-label={`View ${galleryLabels[index]}`}
                  className={`min-w-0 border bg-plate p-1.5 text-left ${selectedImage === index ? "border-black outline outline-1 outline-black" : "border-line"}`}
                >
                  <div className="relative aspect-square bg-white">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 23vw, 12vw"
                      className={`object-cover ${isCement && index >= 2 ? "context-photo" : ""}`}
                    />
                  </div>
                  <span className="technical-label mt-2 block truncate text-[8px]">
                    0{index + 1}. {galleryLabels[index]}
                  </span>
                </button>
              ))}
            </div>
            {isCement && (
              <button
                type="button"
                onClick={() => setDialog("guide")}
                className="mt-4 flex w-full items-center gap-3 bg-plate p-4 text-left"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-black text-white">
                  <Play size={16} />
                </span>
                <span className="flex-1">
                  <span className="technical-label block">
                    Watch 2-min cement-to-sand mix guide
                  </span>
                  <span className="mt-0.5 block text-[11px]">
                    Recommended M20 & M25 mix ratios with river sand and
                    aggregates.
                  </span>
                </span>
                <span className="technical-label hidden bg-white px-3 py-2 text-[9px] sm:block">
                  Play guide
                </span>
              </button>
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5 lg:pt-4">
            <div>
              <div className="mb-2 flex flex-wrap gap-1">
                <span className="badge">{product.grade}</span>
                <span className="badge">
                  {isCement ? "High early strength" : product.brand}
                </span>
                {isJK && <span className="badge">Bagged &lt;10 days ago</span>}
              </div>
              <h1 className="font-display text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.035em] xl:text-[32px]">
                {product.name}
              </h1>
              <p className="mt-2 text-[12px] leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-plate p-3">
              <div className="flex items-center gap-2">
                <BadgeCheck size={20} className="shrink-0" />
                <div>
                  <span className="technical-label block text-[8px]">
                    Origin assurance
                  </span>
                  <strong className="technical-label text-[10px]">
                    100% genuine ISI mark
                  </strong>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Factory size={20} className="shrink-0" />
                <div>
                  <span className="technical-label block text-[8px]">
                    Batch sampling
                  </span>
                  <strong className="technical-label text-[10px]">
                    Verified mill batch
                  </strong>
                </div>
              </div>
            </div>
            <div className="bg-plate p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="figure-price text-[38px] font-bold leading-none tracking-tight">
                  {money(price)}
                </span>
                <span className="text-xs">
                  / {isJK ? `${variant} bag` : product.unit}
                </span>
                <span className="ml-1 text-[10px] line-through">
                  MRP {money(mrp)}
                </span>
                <span className="badge-black ml-auto text-[8px]">
                  {Math.max(0, Math.round((1 - price / mrp) * 100))}% off
                </span>
              </div>
              <div className="mt-4 bg-white p-2">
                <p className="technical-label mb-2 text-[8px]">
                  Transparent tiered volume pricing
                </p>
                <div className="space-y-1">
                  {tiers.map((tier, index) => (
                    <div
                      key={tier.min}
                      className={`flex items-center justify-between gap-2 px-1.5 py-1.5 font-display text-[9px] tracking-wide ${index === activeTier ? "bg-black font-bold text-white" : "bg-white"}`}
                    >
                      <span>
                        {tier.min}
                        {tiers[index + 1]
                          ? `–${tiers[index + 1].min - 1}`
                          : "+"}{" "}
                        {isCement ? "Bags" : "Units"}{" "}
                        <span className="hidden xl:inline">
                          (
                          {[
                            "Retail / Repairs",
                            "House Slab Casting",
                            "Full Heavy Truckload",
                          ][index] || "Bulk supply"}
                          )
                        </span>
                      </span>
                      <span className="whitespace-nowrap">
                        {money(unitPrice(product, tier.min, variant))} /{" "}
                        {isCement ? "bag" : "unit"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-plate p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Truck size={19} />
                  <div>
                    <span className="technical-label block text-[8px]">
                      Dispatch to: Bengaluru {deliveryPin}
                    </span>
                    <span className="font-display text-[11px] font-semibold">
                      Sample slot: Tomorrow 8:00 AM
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="technical-label text-[9px] underline"
                  onClick={() => {
                    setPinOpen(!pinOpen);
                    setPinMessage("");
                  }}
                >
                  Change
                </button>
              </div>
              {pinOpen && (
                <form onSubmit={checkPincode} className="mt-3">
                  <label
                    htmlFor="delivery-pin"
                    className="technical-label block pb-1"
                  >
                    Delivery pincode
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="delivery-pin"
                      className="mono-input"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) =>
                        setPincode(e.target.value.replace(/\D/g, ""))
                      }
                    />
                    <button className="button" type="submit">
                      Check
                    </button>
                  </div>
                  <p role="status" className="mt-2 text-xs">
                    {pinMessage || "Local delivery availability preview."}
                  </p>
                </form>
              )}
            </div>
            {isJK && (
              <fieldset>
                <legend className="technical-label mb-1.5 text-[9px]">
                  Select bag specification
                </legend>
                <div className="grid grid-cols-2 gap-1">
                  {["50kg", "25kg"].map((weight) => (
                    <button
                      key={weight}
                      type="button"
                      aria-pressed={variant === weight}
                      onClick={() => {
                        setVariant(weight);
                        setApplied(false);
                      }}
                      className={`p-3 text-left ${variant === weight ? "bg-black text-white" : "bg-plate"}`}
                    >
                      <span className="technical-label block text-[12px]">
                        {weight} Bag
                      </span>
                      <span className="technical-label block text-[9px]">
                        {weight === "50kg"
                          ? "Structural standard"
                          : "Patchwork & plaster"}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            <fieldset>
              <legend className="technical-label mb-1.5 text-[9px]">
                Site offloading preference
              </legend>
              <div className="space-y-1">
                {(
                  [
                    [
                      "ground",
                      "Ground floor / driveway stack",
                      "Free included",
                    ],
                    [
                      "manual",
                      "1st / 2nd floor manual lifting",
                      `+₹10 / ${isCement ? "bag" : "unit"}`,
                    ],
                  ] as const
                ).map(([value, label, fee]) => (
                  <label
                    key={value}
                    className="flex items-center justify-between gap-2 bg-plate px-2 py-2.5"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`offloading-${product.id}`}
                        checked={offloading === value}
                        onChange={() => setOffloading(value)}
                      />
                      <span className="technical-label text-[9px]">
                        {label}
                      </span>
                    </span>
                    <span className="technical-label whitespace-nowrap text-[8px]">
                      {fee}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div id="product-order" className="scroll-mt-48">
              <div className="flex gap-2">
                <QuantityStepper
                  value={quantity}
                  onChange={(n) => {
                    setQuantity(normalizeQuantity(n));
                    setApplied(false);
                  }}
                  label="Order quantity"
                  className="w-[130px] shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-1 bg-plate px-3 py-2">
                  <span className="technical-label text-[8px]">
                    Estimated total
                  </span>
                  <span
                    aria-live="polite"
                    className="figure-price text-xl font-bold"
                  >
                    {money(total)}
                  </span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1">
                <button type="button" onClick={addToOrder} className="button">
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToOrder();
                    openCart();
                  }}
                  className="button-outline bg-plate px-2"
                >
                  Buy now (UPI / COD)
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-[8px] uppercase leading-relaxed">
                <span>
                  Direct manufacturer
                  <br />
                  mill stock
                </span>
                <span>
                  Zero counterfeit
                  <br />
                  guarantee
                </span>
                <span>
                  Input tax credit (GST)
                  <br />
                  eligible
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isCement && (
        <section
          className="bg-plate py-10 md:py-12"
          aria-labelledby="calculator-heading"
        >
          <div className="shell">
            <div className="mx-auto max-w-[1000px] bg-white p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-[9px]">Civil structural tool</p>
                  <h2 id="calculator-heading" className="section-title">
                    Concrete slab bag calculator
                  </h2>
                </div>
                <span className="badge">Standard M20 grade (1 : 1.5 : 3)</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1.15fr]">
                <label>
                  <span className="technical-label mb-1 block text-[9px]">
                    Roof / floor area (sq.ft)
                  </span>
                  <span className="flex h-12 items-center bg-plate px-3">
                    <input
                      type="number"
                      min={1}
                      max={10000000}
                      value={area}
                      onChange={(e) => {
                        setArea(e.target.value);
                        setApplied(false);
                      }}
                      className="w-full min-w-0 bg-transparent font-display text-lg font-semibold"
                    />
                    <span className="technical-label text-[8px]">SQ.FT</span>
                  </span>
                </label>
                <label>
                  <span className="technical-label mb-1 block text-[9px]">
                    Casting thickness
                  </span>
                  <select
                    className="h-12 w-full bg-plate px-3 font-display text-[10px] font-semibold uppercase"
                    value={thickness}
                    onChange={(e) => {
                      setThickness(Number(e.target.value));
                      setApplied(false);
                    }}
                  >
                    <option value={4}>4.0 inches (Sunshade / shed)</option>
                    <option value={5}>5.0 inches (Standard residential)</option>
                    <option value={6}>6.0 inches (Heavy commercial)</option>
                  </select>
                </label>
                <div className="flex items-center justify-between gap-2 self-end bg-plate p-2">
                  <div aria-live="polite">
                    <span className="technical-label block text-[8px]">
                      Recommended requirement
                    </span>
                    <strong className="figure-price text-base">
                      {bags} Bags ({bagWeight}kg)
                    </strong>
                  </div>
                  <button
                    type="button"
                    className="button min-h-9 px-2 py-2 text-[8px]"
                    disabled={bags < 1 || bags > 9999}
                    onClick={() => {
                      setQuantity(normalizeQuantity(bags));
                      setApplied(true);
                      document.getElementById("product-order")?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                  >
                    {applied ? "Applied ✓" : "Apply to order"}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed">
                *M20 nominal mix estimate including 5% allowance for pumping,
                compaction, and edge formwork. Confirm quantities with your
                structural engineer.
                {bags > 9999
                  ? " For quantities above 9,999 bags, contact the contractor desk."
                  : ""}
              </p>
            </div>
          </div>
        </section>
      )}
      <section
        className="shell py-10 md:py-12"
        aria-labelledby="metrics-heading"
      >
        <div className="mb-6 text-center">
          <p className="eyebrow text-[9px]">
            {isCement ? "Laboratory compliance" : "Technical documentation"}
          </p>
          <h2
            id="metrics-heading"
            className="section-title text-[26px] md:text-[30px]"
          >
            Essential engineering metrics
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, label, title, description, foot }) => (
            <TechnicalCard
              key={label}
              className="flex min-h-[245px] flex-col justify-between border-0"
            >
              <div>
                <Icon size={25} strokeWidth={1.7} />
                <p className="technical-label mb-2 mt-4 text-[8px]">{label}</p>
                <h3 className="font-display text-[16px] font-semibold uppercase leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-[11px] leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="technical-label mt-5 bg-white p-2 text-right text-[8px]">
                {foot}
              </div>
            </TechnicalCard>
          ))}
        </div>
      </section>
      <section
        className="bg-plate py-10 md:py-12"
        aria-labelledby="bundle-heading"
      >
        <div className="shell">
          <div className="bg-white p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-[9px]">Recommended civil synergy</p>
                <h2 id="bundle-heading" className="section-title">
                  Frequently bought together
                </h2>
              </div>
              <span className="badge-black">Essential casting setup</span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <div className="grid grid-cols-3 gap-3 lg:col-span-8">
                {bundle.map((item, index) => (
                  <div key={item.id} className="relative min-w-0 bg-plate p-2">
                    <Link href={`/products/${item.slug}`}>
                      <div className="relative aspect-square bg-white">
                        <Image
                          src={`/images/pdp-0${index + 5}.webp`}
                          alt={item.name}
                          fill
                          sizes="(max-width: 1023px) 28vw, 20vw"
                          className="object-contain"
                        />
                      </div>
                      <div className="pt-3">
                        <p className="technical-label text-[8px]">
                          Item 0{index + 1}
                        </p>
                        <h3 className="technical-label mt-1 text-[10px]">
                          {item.name}
                        </h3>
                        <p className="figure-price mt-1 text-xs font-semibold">
                          {money(item.price)}
                        </p>
                      </div>
                    </Link>
                    {index < 2 && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-2.5 top-1/2 z-10 font-display text-base"
                      >
                        +
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between bg-plate p-4 lg:col-span-4">
                <div>
                  <p className="technical-label text-[9px]">
                    Combined package total
                  </p>
                  <p className="figure-price mt-2 text-[30px] font-bold">
                    {money(bundleTotal)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed">
                    Essential casting setup. Includes 1 bag PPC cement, 1 metric
                    ton screened river sand, and a professional finishing
                    trowel.
                  </p>
                </div>
                <button
                  type="button"
                  className="button mt-6 w-full"
                  onClick={() => {
                    bundle.forEach((item) => addItem(item.id, 1));
                    openCart();
                  }}
                >
                  <ShoppingCart size={16} /> Add all 3 to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {dialog && (
        <dialog
          ref={(node) => {
            if (node && !node.open) node.showModal();
          }}
          onCancel={() => setDialog(null)}
          aria-labelledby="pdp-dialog-title"
          className="panel fixed inset-0 m-auto max-h-[85vh] w-[calc(100%_-_2rem)] max-w-xl overflow-auto p-6 backdrop:bg-black/40"
        >
          <button
            type="button"
            aria-label="Close guide"
            className="absolute right-4 top-4 p-1"
            onClick={() => setDialog(null)}
          >
            <X size={20} />
          </button>
          <p className="eyebrow">
            {dialog === "guide"
              ? "Site execution guide"
              : "Material documentation"}
          </p>
          <h2 id="pdp-dialog-title" className="section-title pr-6">
            {dialog === "guide"
              ? "Concrete mixing field notes"
              : "Mill batch details"}
          </h2>
          {dialog === "guide" ? (
            <div className="mt-5 space-y-4 text-sm leading-relaxed">
              <p>
                <strong>01 / Measure.</strong> M20 nominal mix uses 1 part
                cement, 1.5 parts clean sand, and 3 parts graded coarse
                aggregate by volume.
              </p>
              <p>
                <strong>02 / Mix.</strong> Dry mix until uniform. Add measured
                water gradually to the engineer-approved water–cement ratio.
              </p>
              <p>
                <strong>03 / Place & cure.</strong> Compact promptly, protect
                the surface, and maintain the specified wet curing schedule.
              </p>
              <p className="bg-plate p-3 text-xs">
                For M25 concrete, use the project engineer’s approved design
                mix. This local demo includes a written guide.
              </p>
            </div>
          ) : (
            <div className="mt-5 text-sm leading-relaxed">
              <p>
                {product.name} · {product.brand}
              </p>
              <dl className="mt-3 divide-y divide-line">
                {Object.entries(product.specifications).map(
                  ([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 py-3"
                    >
                      <dt>{label}</dt>
                      <dd className="text-right font-semibold">{value}</dd>
                    </div>
                  ),
                )}
              </dl>
              <p className="mt-4 bg-plate p-3 text-xs">
                Sample catalog documentation. An actual manufacturer certificate
                is supplied with a confirmed order.
              </p>
            </div>
          )}
        </dialog>
      )}
    </>
  );
}
