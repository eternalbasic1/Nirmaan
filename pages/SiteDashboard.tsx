import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Headset,
  MapPin,
  Maximize2,
  MessageSquare,
  Navigation,
  Phone,
  Plus,
  Receipt,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { TechnicalCard } from "@/components/TechnicalCard";
import { dashboard, dashboardStats, manifestItems } from "@/mockData";
import { money } from "@/lib/calculations";

type DialogType =
  | "driver"
  | "otp"
  | "audit"
  | "site"
  | "invoice-cement"
  | "invoice-wire"
  | "history"
  | "share"
  | "camera"
  | "engineer"
  | "credit"
  | null;
const checks = [
  [
    "Cover blocks placed (20mm)",
    "Verified by Site Supervisor Muniswamy at 11:30 AM",
  ],
  [
    "Electrical conduits & fan boxes tied",
    "24 drop points secured with binding wire",
  ],
  [
    "Needle vibrator operational check",
    "Test crank with backup generator before RMC arrives",
  ],
];
const orders = [
  {
    id: "ND-84920",
    status: "Delivered yesterday",
    name: "UltraTech Super Weather Plus Cement",
    detail: "15 bags · 750 kg",
    note: "Canter KA-04-E-1011 · Signed by Contractor Muniswamy",
    image: "/images/dashboard-03.webp",
    price: 5625,
    productId: "ultratech",
    quantity: 15,
  },
  {
    id: "ND-81042",
    status: "Delivered 3 days ago",
    name: "Polycab FRLS Conduits & Wires",
    detail: "Electrical site lot",
    note: "Dispatch Express · BIS Certificate #ISI-CM/L-8219",
    image: "/images/dashboard-04.webp",
    price: 14200,
    productId: "polycab",
    quantity: 1,
  },
];

export default function SiteDashboard() {
  const { addItem, openCart } = useCart();
  const [readiness, setReadiness] = useState([true, true, false]);
  const [area, setArea] = useState(1200);
  const [site, setSite] = useState(dashboard.site);
  const [siteDraft, setSiteDraft] = useState(dashboard.site);
  const [modal, setModal] = useState<DialogType>(null);
  const [camera, setCamera] = useState(2);
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [credit, setCredit] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const complete = readiness.filter(Boolean).length;
  const cement = Math.round(area * 0.08);
  const steel = Number((area * 0.003).toFixed(1));
  const sand = Math.round(area * 0.567);
  const rods = Math.ceil((steel * 1000) / 10.66);
  const sandBags = Math.ceil((sand * 0.0283168 * 1600) / 1000);

  useEffect(() => {
    const element = dialog.current;
    if (modal && element && !element.open) element.showModal();
    if (!modal && element?.open) element.close();
  }, [modal]);

  const show = (type: DialogType) => {
    setOtpMessage("");
    setModal(type);
  };
  const addEstimate = () => {
    addItem("jk-cement", cement);
    addItem("tata-steel", rods);
    addItem("m-sand", sandBags);
  };
  const selectedOrder = modal === "invoice-wire" ? orders[1] : orders[0];
  const modalTitle =
    modal === "driver"
      ? "Driver contact card"
      : modal === "otp"
        ? "Gate arrival verification"
        : modal === "audit"
          ? "Site quality audit"
          : modal === "site"
            ? "New site indent"
            : modal?.startsWith("invoice")
              ? "GST invoice preview"
              : modal === "history"
                ? "Order history"
                : modal === "camera"
                  ? `Site camera #0${camera}`
                  : modal === "share"
                    ? "Share arrival summary"
                    : modal === "credit"
                      ? "Site credit reserve"
                      : "Civil technical helpline";

  return (
    <>
      <Head>
        <title>My Site Dashboard | Nirmaan Mono</title>
        <meta
          name="description"
          content="Your site command center. Track material deliveries, review quality checks and prepare your next material indent."
        />
      </Head>
      <main className="site-dashboard shell">
        <header className="dashboard-heading">
          <div>
            <p className="eyebrow telemetry">
              <span /> Active site telemetry // Demo session
            </p>
            <h1>Namaste, Vineeth!</h1>
            <div className="site-description">
              <span>
                <MapPin size={14} /> {site}
              </span>
              <span className="phase">Phase: {dashboard.phase}</span>
            </div>
            <p className="technical-label rera">
              Structural RERA ID: PRM/KA/RERA/1251/310
            </p>
          </div>
          <div className="heading-actions">
            <button
              className="button-outline"
              onClick={() => {
                setSiteDraft(site);
                show("site");
              }}
            >
              <Plus size={15} /> New site indent
            </button>
            <button className="button" onClick={() => show("audit")}>
              <ClipboardCheck size={15} /> Audit report
            </button>
          </div>
        </header>

        <div className="stats-grid">
          <TechnicalCard className="dashboard-stat">
            <div className="stat-top">
              <span className="technical-label">Site credit reserve</span>
              <Wallet size={19} />
            </div>
            <p className="stat-value">{dashboardStats[0].value}</p>
            <div className="stat-bottom">
              <span>100% usable on current indents</span>
              <button onClick={() => show("credit")}>Use on order</button>
            </div>
          </TechnicalCard>
          <TechnicalCard className="dashboard-stat">
            <div className="stat-top">
              <span className="technical-label">
                Inbound transit <b className="priority">Priority 1</b>
              </span>
              <Truck size={20} />
            </div>
            <p className="stat-value transit-value">
              {dashboardStats[1].value}
            </p>
            <div className="stat-bottom">
              <span>Tata 407 (KA-01-MJ-4029)</span>
              <span className="technical-label">5.2 km away</span>
            </div>
            <p className="arrival">
              <span>◷</span> Projected gate arrival:{" "}
              <strong>2:45 PM Today</strong>
            </p>
          </TechnicalCard>
          <TechnicalCard className="dashboard-stat">
            <div className="stat-top">
              <span className="technical-label">Quality audit pass</span>
              <ClipboardCheck size={20} />
            </div>
            <p className="stat-value">{complete}/3 Verified</p>
            <div className="readiness-track">
              <span style={{ width: `${(complete / 3) * 100}%` }} />
            </div>
            <div className="stat-bottom">
              <span>
                {complete === 3
                  ? "All pre-pour checks complete"
                  : `${3 - complete} pre-pour check${complete === 2 ? "" : "s"} pending`}
              </span>
              <span className="technical-label">Pour: 3:30 PM</span>
            </div>
          </TechnicalCard>
        </div>

        <div className="dashboard-columns">
          <div className="main-column">
            <section className="consignment module">
              <div className="module-heading">
                <div className="section-name">
                  <span className="index">01</span>
                  <div>
                    <div className="title-line">
                      <h2>Consignment #{dashboard.consignment}</h2>
                      <span className="tag">Active dispatch</span>
                    </div>
                    <p>
                      Roof Slab Structural Pour Package · Scheduled for 2:45 PM
                    </p>
                  </div>
                </div>
                <span className="technical-label certificate">
                  Weighbridge cert: <b>WB-BLR-8924</b>
                </span>
              </div>
              <div className="driver-row">
                <span className="driver-initials">RK</span>
                <div className="driver-info">
                  <strong>{dashboard.driver}</strong>
                  <span className="tag">Heavy fleet master</span>
                  <p>
                    Tata 407 (KA-01-MJ-4029) <span>·</span>{" "}
                    <Navigation size={12} /> 32 km/h in transit
                  </p>
                </div>
                <div className="driver-actions">
                  <button
                    className="button-outline"
                    onClick={() => show("driver")}
                  >
                    <Phone size={13} /> Call driver
                  </button>
                  <button className="button" onClick={() => show("otp")}>
                    <ScanLine size={14} /> Gate OTP
                  </button>
                </div>
              </div>
              <ol className="transit-stages">
                {[
                  ["Batch confirmed", "10:15 AM · Peenya Yard"],
                  ["Loaded & weighed", "1:30 PM · 3,240 kg Net"],
                  ["On the way", "5.2 km away · Ring Road"],
                  ["Offloading ready", "Est. 2:45 PM Gate Drop"],
                ].map(([label, detail], i) => (
                  <li
                    key={label}
                    className={i < 3 ? "stage-complete" : ""}
                    aria-current={i === 2 ? "step" : undefined}
                  >
                    <div className="stage-line">
                      {i === 2 && <span>A</span>}
                    </div>
                    <strong>
                      {i + 1}. {label}
                    </strong>
                    <p>{detail}</p>
                  </li>
                ))}
              </ol>
              <div className="map-panel">
                <div className="map-header technical-label">
                  <span>
                    <Navigation size={13} /> Real-time transit corridor
                  </span>
                  <span>Demo route · Updated 3 mins ago</span>
                </div>
                <div className="route-map blueprint-grid">
                  <svg
                    viewBox="0 0 800 210"
                    role="img"
                    aria-label="Schematic delivery route from Peenya Hub to Plot 84. Truck is at Outer Ring Road Junction, 5.2 kilometres from site."
                  >
                    <path
                      d="M78 128 C190 129 235 65 400 78"
                      stroke="black"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      d="M400 78 C530 70 605 135 728 127"
                      stroke="#E4E4E7"
                      strokeWidth="3"
                      strokeDasharray="7 8"
                      fill="none"
                    />
                    <rect x="367" y="51" width="39" height="36" fill="black" />
                    <g fill="white">
                      <rect x="376" y="62" width="12" height="9" />
                      <path d="M389 65h6l4 5v4h-10z" />
                      <circle cx="381" cy="76" r="3" />
                      <circle cx="393" cy="76" r="3" />
                    </g>
                    <rect x="326" y="96" width="121" height="47" fill="black" />
                    <text
                      x="386"
                      y="113"
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="700"
                    >
                      TATA 407 · 32 KM/H
                    </text>
                    <text
                      x="386"
                      y="131"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                    >
                      Outer Ring Rd Junction
                    </text>
                    <g fill="white">
                      <rect x="18" y="106" width="125" height="72" />
                      <rect x="657" y="106" width="125" height="72" />
                    </g>
                    <g fill="black" textAnchor="middle">
                      <text x="80" y="120" fontSize="18">
                        ▥
                      </text>
                      <text
                        x="80"
                        y="143"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="1"
                      >
                        PEENYA HUB
                      </text>
                      <text x="80" y="163" fontSize="10">
                        Dispatched 1:30 PM
                      </text>
                      <text x="720" y="120" fontSize="18">
                        ▥
                      </text>
                      <text
                        x="720"
                        y="143"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="1"
                      >
                        PLOT #84 SITE
                      </text>
                      <text x="720" y="163" fontSize="10">
                        Gate Supervisor Ready
                      </text>
                    </g>
                  </svg>
                </div>
                <div className="map-footer">
                  <span>GPS telemetry unit: SAT-IND-994</span>
                  <span>
                    Offloading: Unassisted mechanical drop (labour onsite)
                  </span>
                </div>
              </div>
              <div className="manifest-heading technical-label">
                <strong>Consignment manifest (3 line items)</strong>
                <span>Verified BIS batch 2025/KA</span>
              </div>
              <div className="manifest-grid">
                {manifestItems.map((item, i) => (
                  <article className="manifest-card" key={item.productId}>
                    <div className="manifest-photo">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 700px) 85vw, (max-width: 1050px) 29vw, 20vw"
                      />
                      <span className="photo-tag">{item.badge}</span>
                    </div>
                    <div className="manifest-copy">
                      <p className="technical-label">
                        {
                          [
                            "JK Super Cement",
                            "Robosand quarry direct",
                            "Dr. Fixit Pidilite",
                          ][i]
                        }
                      </p>
                      <h3>{item.name}</h3>
                      <div>
                        <strong>{item.quantity}</strong>
                        <span>{money(item.price)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="manifest-footer">
                <span>
                  <ShieldCheck size={18} /> All 3 products covered by 100%
                  authentic manufacturer replacement warranty
                </span>
                <div>
                  <button className="text-link" onClick={() => show("share")}>
                    <MessageSquare size={14} /> Share ETA
                  </button>
                  <button className="button" onClick={() => show("otp")}>
                    <ScanLine size={16} /> Verify OTP on arrival
                  </button>
                </div>
              </div>
            </section>

            <section className="recent-orders module">
              <div className="module-heading">
                <div className="section-name">
                  <span className="index light">02</span>
                  <h2>Recent fulfilled orders & invoices</h2>
                </div>
                <button className="text-link" onClick={() => show("history")}>
                  View all past orders <ArrowRight size={13} />
                </button>
              </div>
              {orders.map((order, i) => (
                <article className="order-row" key={order.id}>
                  <div className="order-photo">
                    <Image
                      src={order.image}
                      alt={order.name}
                      fill
                      sizes="70px"
                    />
                  </div>
                  <div className="order-copy">
                    <div className="order-meta">
                      <strong>#{order.id}</strong>
                      <span className="tag">{order.status}</span>
                    </div>
                    <h3>
                      {order.name} <span>({order.detail})</span>
                    </h3>
                    <p>{order.note}</p>
                  </div>
                  <div className="order-actions">
                    <strong className="order-price">
                      {money(order.price)}.00
                    </strong>
                    <div>
                      <button
                        className="small-button"
                        onClick={() =>
                          show(i === 0 ? "invoice-cement" : "invoice-wire")
                        }
                      >
                        <Receipt size={12} /> GST invoice
                      </button>
                      <button
                        className="small-button dark"
                        onClick={() => addItem(order.productId, order.quantity)}
                      >
                        <RotateCcw size={12} /> Re-order
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>

          <aside className="side-column">
            <section className="camera-widget module">
              <div className="camera-title technical-label">
                <strong>
                  <span className="recording-dot" /> Site cam #0{camera} //
                  1080p
                </strong>
                <span>{camera === 2 ? "Roof slab feed" : "Gate preview"}</span>
              </div>
              <button
                className="camera-image"
                onClick={() => show("camera")}
                aria-label="Expand simulated site camera"
              >
                <Image
                  src={dashboard.camera}
                  alt="Residential construction site roof slab, simulated surveillance preview"
                  fill
                  sizes="(max-width: 700px) 90vw, 32vw"
                  className="context-photo"
                />
                <span className="camera-hud top">
                  CAM-0{camera}:{" "}
                  {camera === 2 ? "SLAB-SHUTTERING" : "GATE PREVIEW"}{" "}
                  [SIMULATED]
                </span>
                <span className="camera-expand">
                  <Maximize2 size={18} /> Expand preview
                </span>
                <span className="camera-hud bottom">
                  FPS: 30 · LAT: 12.9248° N
                </span>
              </button>
              <div className="camera-footer">
                <span>Simulated feed · Local reference image</span>
                <button onClick={() => setCamera(camera === 2 ? 1 : 2)}>
                  Switch to Cam #0{camera === 2 ? 1 : 2}
                </button>
              </div>
            </section>
            <section className="checklist module">
              <div className="widget-heading">
                <div>
                  <h2>Casting readiness protocol</h2>
                  <p>Mandatory pre-pour checks before 3:30 PM</p>
                </div>
                <strong className="check-count" aria-live="polite">
                  {complete}/3
                </strong>
              </div>
              <div className="checks">
                {checks.map(([label, description], index) => (
                  <label key={label} htmlFor={`readiness-${index}`}>
                    <input
                      type="checkbox"
                      id={`readiness-${index}`}
                      aria-label={label}
                      checked={readiness[index]}
                      onChange={() =>
                        setReadiness(
                          readiness.map((value, i) =>
                            i === index ? !value : value,
                          ),
                        )
                      }
                    />
                    <span>
                      <strong>{label}</strong>
                      <span>{description}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="signoff">
                <span>Engineer sign-off:</span>
                <strong>
                  Er. K. Natarajan (
                  {complete === 3 ? "Ready for review" : "Pending checks"})
                </strong>
              </div>
            </section>
            <section className="estimator module">
              <div className="widget-heading">
                <div>
                  <h2>Material quick estimator</h2>
                  <p>Calculate raw requirement for your next phase</p>
                </div>
              </div>
              <div className="estimator-mode">
                <span>Slab casting</span>
                <span>Planning estimate</span>
              </div>
              <label className="area-label technical-label" htmlFor="site-area">
                <span>Built-up surface area:</span>
                <strong>{area.toLocaleString("en-IN")} sq.ft</strong>
              </label>
              <input
                id="site-area"
                className="area-slider"
                type="range"
                min="300"
                max="4000"
                step="50"
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
              />
              <div className="range-labels">
                <span>300 sq.ft</span>
                <span>2,000 sq.ft</span>
                <span>4,000 sq.ft</span>
              </div>
              <dl className="estimate-results" aria-live="polite">
                <div>
                  <dt>Cement bags (50kg):</dt>
                  <dd>{cement} bags</dd>
                </div>
                <div>
                  <dt>Rebar steel (Fe 550D):</dt>
                  <dd>{steel.toFixed(1)} metric tons</dd>
                </div>
                <div>
                  <dt>Manufactured sand:</dt>
                  <dd>{sand} CFT</dd>
                </div>
              </dl>
              <button className="button estimate-button" onClick={addEstimate}>
                Order this bill of material <ArrowRight size={14} />
              </button>
              <p className="estimate-note">
                Cart: {cement} bags · {rods} steel rods · {sandBags} × 1 MT sand
                bags. Rod: 10.66 kg; sand: assumed 1,600 kg/m³. Engineer
                approval required before use.
              </p>
            </section>
            <section className="helpline">
              <div className="helpline-heading">
                <Headset size={27} />
                <div>
                  <h2>Civil technical helpline</h2>
                  <p>
                    Connect with our senior civil engineers for slump issues,
                    cube testing, or concrete mix design.
                  </p>
                </div>
              </div>
              <button
                className="button-outline"
                onClick={() => show("engineer")}
              >
                <Phone size={14} /> Call 1800-NIRMAAN (Free)
              </button>
              <button className="button" onClick={() => show("engineer")}>
                <MessageSquare size={14} /> WhatsApp duty engineer
              </button>
            </section>
          </aside>
        </div>
      </main>
      <dialog
        ref={dialog}
        className="dashboard-dialog"
        onCancel={() => setModal(null)}
        onClose={() => setModal(null)}
        aria-labelledby="dashboard-dialog-title"
      >
        <div className="dialog-heading">
          <div>
            <p className="technical-label">Nirmaan // Mono · Local demo</p>
            <h2 id="dashboard-dialog-title">{modalTitle}</h2>
          </div>
          <button
            className="dialog-close"
            onClick={() => setModal(null)}
            aria-label="Close dialog"
          >
            <X size={22} />
          </button>
        </div>
        {modal === "site" ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSite(siteDraft.trim());
              setModal(null);
            }}
          >
            <p>
              Create your site label for this session. Delivery scheduling is a
              demo.
            </p>
            <label className="dialog-field">
              Site address
              <input
                className="mono-input"
                value={siteDraft}
                onChange={(event) => setSiteDraft(event.target.value)}
                required
                minLength={8}
                maxLength={180}
              />
            </label>
            <button className="button" type="submit">
              Save site indent <Check size={15} />
            </button>
          </form>
        ) : modal === "otp" ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOtpMessage(
                otp === "924184"
                  ? "Demo delivery verified. Gate clearance recorded for this session."
                  : "Use the demo code 924184 to verify this arrival.",
              );
            }}
          >
            <p>
              Consignment #{dashboard.consignment} · {dashboard.driver}
            </p>
            <p>
              This is a local arrival simulation. Demo gate code:{" "}
              <strong>924184</strong>.
            </p>
            <label className="dialog-field">
              Six-digit gate OTP
              <input
                className="mono-input"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, ""))
                }
                required
              />
            </label>
            <button className="button" type="submit">
              Verify arrival
            </button>
            <p role="status">{otpMessage}</p>
          </form>
        ) : modal === "audit" ? (
          <div>
            <p>Roof slab pre-pour audit · {complete} of 3 checks completed.</p>
            {checks.map(([label], index) => (
              <p className="audit-line" key={label}>
                <span>{readiness[index] ? "✓" : "□"}</span> {label}{" "}
                <b>{readiness[index] ? "Verified" : "Pending"}</b>
              </p>
            ))}
            <p>
              Engineer: Er. K. Natarajan. This local demo report is not a
              construction sign-off.
            </p>
          </div>
        ) : modal?.startsWith("invoice") ? (
          <div>
            <p className="invoice-demo">DEMO PREVIEW · NOT A TAX INVOICE</p>
            <h3>Order #{selectedOrder.id}</h3>
            <p>
              {selectedOrder.name} · {selectedOrder.detail}
            </p>
            <p>Delivery: {site}</p>
            <div className="invoice-total">
              <span>Recorded order total</span>
              <strong>{money(selectedOrder.price)}</strong>
            </div>
            <p>
              Tax breakdown and a valid GST invoice require a live order
              integration.
            </p>
          </div>
        ) : modal === "camera" ? (
          <div>
            <div className="expanded-camera">
              <Image
                src={dashboard.camera}
                alt="Expanded simulated site surveillance preview"
                width={1000}
                height={650}
                className="context-photo"
              />
            </div>
            <p>
              CAM-0{camera} · Simulated preview from a local reference image.
              FPS 30 / LAT 12.9248° N are illustrative telemetry.
            </p>
          </div>
        ) : modal === "history" ? (
          <div>
            <p>All locally available fulfilled orders.</p>
            {orders.map((order) => (
              <div className="history-line" key={order.id}>
                <span>
                  <strong>#{order.id}</strong>
                  <br />
                  {order.name}
                </span>
                <button
                  className="button-outline"
                  onClick={() => {
                    setModal(null);
                    addItem(order.productId, order.quantity);
                  }}
                >
                  Re-order
                </button>
              </div>
            ))}
          </div>
        ) : modal === "driver" ? (
          <div>
            <h3>{dashboard.driver}</h3>
            <p>Heavy fleet master · {dashboard.truck}</p>
            <p>
              Projected gate arrival: {dashboard.arrival}. Current position:
              Outer Ring Road Junction.
            </p>
            <p>
              Demo contact card. Calling becomes available when a dispatch
              service is connected.
            </p>
          </div>
        ) : modal === "share" ? (
          <div>
            <p>Local share preview · No message is sent.</p>
            <div className="share-preview">
              Consignment #{dashboard.consignment}
              <br />
              {dashboard.truck}
              <br />
              Arrival: {dashboard.arrival}
              <br />
              Destination: {site}
              <br />
              Please keep site labour ready for offloading.
            </div>
          </div>
        ) : modal === "credit" ? (
          <div>
            <h3>Available reserve: ₹500.00</h3>
            <p>
              Credit is a demonstration balance and will not change cart totals.
            </p>
            <button
              className="button"
              onClick={() => {
                setCredit(true);
                setModal(null);
                openCart();
              }}
            >
              {credit ? "Review order" : "Mark credit for next order"}
            </button>
          </div>
        ) : (
          <div>
            <h3>Duty engineer · Er. K. Natarajan</h3>
            <p>
              Support topics: concrete mix design, slump checks, cube testing
              and material selection.
            </p>
            <p>
              This is a local demo contact card. No call or WhatsApp message has
              been sent.
            </p>
          </div>
        )}
      </dialog>
      <style jsx>{`
        .site-dashboard,
        .dashboard-dialog {
          font-family: var(--font-inter), Arial, sans-serif;
        }
        h1,
        h2,
        h3,
        .stat-value,
        .order-price,
        .check-count,
        .estimate-results dd {
          font-family: var(--font-space), Arial, sans-serif;
        }
        .site-dashboard {
          padding-top: 38px;
          padding-bottom: 64px;
        }
        .dashboard-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          padding-bottom: 22px;
          border-bottom: 1px solid #e4e4e7;
        }
        .telemetry {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 0 0 9px;
          font-size: 9px;
          letter-spacing: 1.4px;
        }
        .telemetry span,
        .recording-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #000;
        }
        h1 {
          font-size: 36px;
          line-height: 1.15;
          letter-spacing: -1.5px;
          font-weight: 700;
          margin: 0 0 12px;
        }
        .site-description {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          font-size: 11px;
        }
        .site-description > span:first-child {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .phase,
        .tag {
          background: #f4f4f5;
          padding: 4px 7px;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 0.7px;
          white-space: nowrap;
        }
        .rera {
          font-size: 9px;
          margin-top: 8px;
          color: #000000;
        }
        .heading-actions,
        .driver-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .heading-actions :global(button) {
          min-height: 45px;
          padding: 10px 17px;
          font-size: 10px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin: 26px 0 35px;
        }
        .stats-grid :global(.dashboard-stat) {
          padding: 23px 25px;
          min-height: 164px;
          border: 0;
          background: #f4f4f5;
        }
        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .stat-top > span {
          font-size: 9px;
        }
        .stat-value {
          font-size: 31px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -1px;
          margin: 9px 0 23px;
        }
        .transit-value {
          font-size: 23px;
          margin-bottom: 22px;
        }
        .priority {
          background: #000;
          color: #fff;
          padding: 4px;
          margin-left: 5px;
          font-size: 9px;
        }
        .stat-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 11px;
        }
        .stat-bottom .technical-label {
          font-size: 8px;
        }
        .stat-bottom button {
          background: #000;
          color: white;
          border: 0;
          padding: 7px 10px;
          font-size: 9px;
          text-transform: uppercase;
          font-weight: 700;
        }
        .arrival {
          font-size: 11px;
          margin-top: 8px;
        }
        .arrival > span {
          margin-right: 5px;
        }
        .readiness-track {
          height: 5px;
          background: #e4e4e7;
          margin: -5px 0 12px;
        }
        .readiness-track span {
          display: block;
          height: 100%;
          background: #000;
          transition: width 0.2s;
        }
        .dashboard-columns {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(310px, 1fr);
          gap: 25px;
          align-items: start;
        }
        .main-column,
        .side-column {
          display: flex;
          flex-direction: column;
          gap: 25px;
          min-width: 0;
        }
        .module {
          background: #fff;
          border: 1px solid #f4f4f5;
          padding: 24px;
          min-width: 0;
        }
        .module-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e4e4e7;
        }
        .section-name {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .index {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          color: #fff;
          width: 30px;
          height: 32px;
          font-size: 12px;
          flex-shrink: 0;
        }
        .index.light {
          background: #f4f4f5;
          color: #000;
        }
        h2 {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.35px;
          text-transform: uppercase;
          line-height: 1.4;
          margin: 0;
        }
        .title-line {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
        }
        .module-heading p {
          font-size: 11px;
          color: #000000;
          margin: 3px 0 0;
        }
        .certificate {
          font-size: 8px;
          white-space: nowrap;
          color: #000000;
        }
        .certificate b {
          color: #000;
        }
        .driver-row {
          display: flex;
          gap: 15px;
          align-items: center;
          background: #f4f4f5;
          margin-top: 16px;
          padding: 17px;
        }
        .driver-initials {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 47px;
          height: 48px;
          background: #fff;
          font-weight: 700;
          flex-shrink: 0;
        }
        .driver-info {
          flex: 1;
          min-width: 0;
          font-size: 12px;
        }
        .driver-info .tag {
          margin-left: 7px;
          font-size: 8px;
          background: #e4e4e7;
        }
        .driver-info p {
          display: flex;
          gap: 6px;
          align-items: center;
          font-size: 10px;
          margin: 8px 0 0;
          flex-wrap: wrap;
        }
        .driver-actions :global(button) {
          font-size: 9px;
          padding: 10px;
          gap: 5px;
          min-height: 35px;
        }
        .transit-stages {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 31px 0;
        }
        .stage-line {
          height: 5px;
          background: #e4e4e7;
          margin-bottom: 9px;
          position: relative;
        }
        .stage-complete .stage-line {
          background: #000;
        }
        .stage-line > span {
          position: absolute;
          right: 0;
          top: -6px;
          color: #fff;
          background: #000;
          font-size: 10px;
          padding: 1px 3px;
        }
        .transit-stages strong {
          display: block;
          text-transform: uppercase;
          font-size: 8px;
          letter-spacing: 0.8px;
          font-weight: 600;
        }
        .transit-stages p {
          font-size: 10px;
          color: #000000;
          margin: 7px 0 0;
        }
        .transit-stages li[aria-current] p {
          color: #000;
          font-weight: 600;
        }
        .map-panel {
          background: #f4f4f5;
          padding: 15px;
        }
        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 8px;
          margin-bottom: 11px;
        }
        .map-header > span:first-child {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .map-header > span:last-child {
          color: #000000;
        }
        .route-map {
          background-color: #fff;
          background-image:
            linear-gradient(#e4e4e7 1px, transparent 1px),
            linear-gradient(90deg, #e4e4e7 1px, transparent 1px);
          background-size: 23px 23px;
        }
        .route-map svg {
          display: block;
          width: 100%;
          min-height: 160px;
        }
        .map-footer {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: #000000;
          padding-top: 14px;
          gap: 12px;
        }
        .manifest-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 9px;
          font-size: 9px;
          margin: 24px 0 10px;
        }
        .manifest-heading > span {
          font-size: 8px;
          color: #000000;
        }
        .manifest-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 9px;
        }
        .manifest-card {
          background: #f4f4f5;
          padding: 7px;
          min-width: 0;
        }
        .manifest-photo {
          position: relative;
          aspect-ratio: 1.75;
        }
        .manifest-photo :global(img) {
          object-fit: cover;
        }
        .photo-tag {
          position: absolute;
          left: 7px;
          top: 7px;
          font-size: 8px;
          background: #000;
          color: #fff;
          padding: 5px;
        }
        .manifest-copy .technical-label {
          font-size: 8px;
          color: #000000;
          margin: 10px 0 5px;
          letter-spacing: 0.8px;
        }
        .manifest-copy h3 {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          margin: 0 0 10px;
          min-height: 36px;
        }
        .manifest-copy > div {
          display: flex;
          justify-content: space-between;
          gap: 4px;
          font-size: 9px;
        }
        .manifest-copy > div > span {
          color: #000000;
        }
        .manifest-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid #e4e4e7;
          padding-top: 16px;
          margin-top: 16px;
        }
        .manifest-footer > span {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 290px;
          font-size: 10px;
          color: #000000;
        }
        .manifest-footer > span :global(svg) {
          flex-shrink: 0;
        }
        .manifest-footer > div {
          display: flex;
          align-items: center;
          gap: 13px;
        }
        .manifest-footer :global(button) {
          font-size: 8px;
          padding: 10px;
          white-space: nowrap;
        }
        .recent-orders {
          padding-top: 25px;
        }
        .recent-orders .module-heading .text-link {
          font-size: 8px;
          white-space: nowrap;
        }
        .order-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 25px 0;
          border-bottom: 1px solid #e4e4e7;
        }
        .order-row:last-child {
          border-bottom: 0;
          padding-bottom: 7px;
        }
        .order-photo {
          position: relative;
          width: 57px;
          height: 62px;
          flex-shrink: 0;
        }
        .order-photo :global(img) {
          object-fit: cover;
        }
        .order-copy {
          flex: 1;
          min-width: 0;
        }
        .order-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          align-items: center;
          font-size: 10px;
        }
        .order-meta .tag {
          font-size: 7px;
          letter-spacing: 0;
        }
        .order-copy h3 {
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
          margin: 8px 0;
        }
        .order-copy p {
          font-size: 10px;
          color: #000000;
          margin: 0;
          line-height: 1.6;
        }
        .order-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }
        .order-price {
          font-size: 17px;
          letter-spacing: -0.6px;
        }
        .order-actions > div {
          display: flex;
          gap: 5px;
        }
        .small-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border: 0;
          background: #f4f4f5;
          padding: 7px 8px;
          text-transform: uppercase;
          font-size: 8px;
          font-weight: 600;
        }
        .small-button.dark {
          color: #fff;
          background: #000;
        }
        .camera-widget {
          padding: 16px;
        }
        .camera-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 7px;
          margin: 0 0 12px;
          font-size: 8px;
        }
        .camera-title strong {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }
        .camera-title > span {
          color: #000000;
          font-size: 7px;
        }
        .camera-image {
          position: relative;
          width: 100%;
          aspect-ratio: 1.77;
          display: block;
          padding: 0;
          border: 0;
          overflow: hidden;
        }
        .camera-image :global(img) {
          object-fit: cover;
          filter: grayscale(1);
        }
        .camera-hud {
          position: absolute;
          background: #000;
          color: #fff;
          padding: 5px;
          font:
            8px var(--font-inter),
            Arial,
            sans-serif;
        }
        .camera-hud.top {
          top: 10px;
          left: 8px;
        }
        .camera-hud.bottom {
          bottom: 9px;
          right: 8px;
        }
        .camera-expand {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: #000000;
          color: #fff;
          opacity: 0;
          font-size: 11px;
          transition: opacity 0.15s;
        }
        .camera-image:hover .camera-expand,
        .camera-image:focus-visible .camera-expand {
          opacity: 1;
        }
        .camera-footer {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 9px;
          margin-top: 13px;
          color: #000000;
        }
        .camera-footer button {
          border: 0;
          background: none;
          padding: 0;
          color: #000;
          font-size: 9px;
        }
        .widget-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .widget-heading h2,
        .helpline h2 {
          font-size: 11px;
          letter-spacing: 0.4px;
        }
        .widget-heading p {
          font-size: 10px;
          color: #000000;
          margin: 7px 0 0;
          line-height: 1.6;
        }
        .check-count {
          font-size: 19px;
        }
        .checklist .widget-heading {
          border-bottom: 1px solid #e4e4e7;
          padding-bottom: 15px;
        }
        .checks {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 16px 0;
        }
        .checks label {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 12px 9px;
          background: #f4f4f5;
          cursor: pointer;
        }
        .checks input {
          accent-color: #000;
          width: 15px;
          height: 15px;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .checks label > span {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .checks strong {
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          line-height: 1.5;
        }
        .checks label > span > span {
          color: #000000;
          font-size: 10px;
          line-height: 1.65;
        }
        .signoff {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          background: #f4f4f5;
          padding: 11px 8px;
          font-size: 8px;
          text-transform: uppercase;
        }
        .signoff strong {
          text-align: right;
          font-size: 8px;
        }
        .estimator-mode {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 18px 0 20px;
          background: #f4f4f5;
          padding: 4px;
          text-transform: uppercase;
          font-size: 8px;
          letter-spacing: 0.8px;
        }
        .estimator-mode > span:first-child {
          padding: 7px 16px;
          background: #000;
          color: #fff;
        }
        .estimator-mode > span:last-child {
          padding-right: 8px;
          color: #000000;
        }
        .area-label {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 8px;
        }
        .area-label > span {
          color: #000000;
        }
        .area-slider {
          width: 100%;
          accent-color: #000;
          height: 5px;
          margin: 18px 0 12px;
          cursor: pointer;
        }
        .range-labels {
          display: flex;
          justify-content: space-between;
          font:
            8px var(--font-inter),
            Arial,
            sans-serif;
          color: #000000;
        }
        .estimate-results {
          background: #f4f4f5;
          padding: 5px 10px;
          margin: 21px 0 15px;
          font-size: 10px;
        }
        .estimate-results > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 12px 0;
          border-bottom: 1px solid #e4e4e7;
        }
        .estimate-results > div:last-child {
          border: 0;
        }
        .estimate-results dd {
          margin: 0;
          font-weight: 700;
          text-align: right;
        }
        .estimate-button {
          width: 100%;
          font-size: 9px;
          padding: 12px 7px;
        }
        .estimate-note {
          font-size: 9px;
          color: #000000;
          line-height: 1.6;
          margin: 12px 0 0;
        }
        .helpline {
          background: #f4f4f5;
          padding: 25px;
        }
        .helpline-heading {
          display: flex;
          gap: 13px;
          align-items: flex-start;
        }
        .helpline-heading :global(svg) {
          flex-shrink: 0;
          margin-top: 3px;
        }
        .helpline p {
          font-size: 11px;
          line-height: 1.7;
          margin: 9px 0 18px;
          color: #000000;
        }
        .helpline :global(button) {
          width: 100%;
          font-size: 9px;
          margin-top: 7px;
          padding: 12px;
        }
        .dashboard-dialog {
          margin: auto;
          width: min(620px, calc(100vw - 32px));
          max-height: 85vh;
          padding: 28px;
          border: 1px solid #000;
          background: white;
          color: #000;
        }
        .dashboard-dialog::backdrop {
          background: rgb(0 0 0 / 40%);
        }
        .dialog-heading {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: flex-start;
          border-bottom: 1px solid #e4e4e7;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .dialog-heading .technical-label {
          margin: 0 0 8px;
          font-size: 9px;
        }
        .dialog-heading h2 {
          font-size: 21px;
        }
        .dialog-close {
          display: flex;
          padding: 5px;
          border: 1px solid #e4e4e7;
          background: white;
        }
        .dashboard-dialog p {
          font-size: 13px;
          line-height: 1.7;
          margin: 13px 0;
        }
        .dialog-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 12px;
          margin: 22px 0;
        }
        .dialog-field input {
          width: 100%;
          padding: 12px;
        }
        .audit-line {
          display: flex;
          gap: 9px;
          padding: 13px 0;
          border-bottom: 1px solid #e4e4e7;
        }
        .audit-line b {
          margin-left: auto;
          font-size: 11px;
        }
        .invoice-demo {
          padding: 12px;
          background: #f4f4f5;
          font-weight: bold;
          font-size: 10px !important;
          letter-spacing: 1px;
        }
        .invoice-total,
        .history-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 0;
          border-block: 1px solid #e4e4e7;
          font-size: 13px;
        }
        .expanded-camera :global(img) {
          width: 100%;
          height: auto;
          filter: grayscale(1);
        }
        .share-preview {
          padding: 20px;
          background: #f4f4f5;
          font-size: 13px;
          line-height: 2;
        }
        button {
          cursor: pointer;
        }
        button:hover {
          outline: 1px solid #000000;
          outline-offset: 2px;
        }
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid #000;
          outline-offset: 3px;
        }
        @media (min-width: 1500px) {
          .site-dashboard {
            max-width: 1440px;
          }
        }
        @media (max-width: 1150px) {
          .certificate {
            display: none;
          }
          .driver-row {
            flex-wrap: wrap;
          }
          .driver-actions {
            margin-left: auto;
          }
          .manifest-footer {
            align-items: flex-start;
            flex-direction: column;
          }
          .order-row {
            flex-wrap: wrap;
          }
          .order-actions {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-left: 71px;
          }
          .heading-actions :global(button) {
            padding: 10px;
            font-size: 9px;
          }
          .stat-bottom {
            font-size: 10px;
          }
          .stats-grid :global(.dashboard-stat) {
            padding: 20px;
          }
        }
        @media (max-width: 900px) {
          .dashboard-columns {
            grid-template-columns: minmax(0, 1fr);
          }
          .side-column {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
          }
          .dashboard-heading {
            flex-wrap: wrap;
          }
          .stats-grid {
            gap: 12px;
          }
          .stats-grid :global(.dashboard-stat) {
            padding: 17px;
          }
          .stat-value {
            font-size: 27px;
          }
          .transit-value {
            font-size: 20px;
          }
          .priority {
            display: none;
          }
          .stat-bottom {
            flex-wrap: wrap;
          }
          .module {
            padding: 22px;
          }
          .camera-widget {
            padding: 16px;
          }
        }
        @media (max-width: 600px) {
          .site-dashboard {
            padding-top: 25px;
            padding-bottom: 35px;
          }
          h1 {
            font-size: 31px;
          }
          .site-description {
            gap: 10px;
            font-size: 10px;
          }
          .phase {
            white-space: normal;
            font-size: 8px;
          }
          .heading-actions {
            width: 100%;
          }
          .heading-actions :global(button) {
            flex: 1;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
            margin: 20px 0;
          }
          .stats-grid :global(.dashboard-stat) {
            padding: 18px 20px;
            min-height: 0;
          }
          .stat-value {
            font-size: 28px;
            margin: 7px 0 14px;
          }
          .transit-value {
            font-size: 24px;
          }
          .readiness-track {
            margin: 0 0 10px;
          }
          .side-column {
            display: flex;
          }
          .module,
          .helpline {
            padding: 17px;
          }
          .dashboard-columns,
          .main-column,
          .side-column {
            gap: 18px;
          }
          .title-line {
            gap: 6px;
          }
          h2 {
            font-size: 13px;
          }
          .module-heading {
            gap: 9px;
            align-items: flex-start;
          }
          .module-heading p {
            font-size: 10px;
          }
          .index {
            width: 25px;
            height: 28px;
          }
          .driver-row {
            padding: 12px;
            gap: 10px;
          }
          .driver-info .tag {
            display: block;
            width: max-content;
            margin: 5px 0 0;
          }
          .driver-info p {
            font-size: 9px;
          }
          .driver-actions {
            width: 100%;
            margin-top: 5px;
          }
          .driver-actions :global(button) {
            flex: 1;
          }
          .transit-stages {
            gap: 5px;
            margin: 24px 0;
          }
          .transit-stages strong {
            font-size: 7px;
            letter-spacing: 0.1px;
            line-height: 1.6;
          }
          .transit-stages p {
            font-size: 8px;
            line-height: 1.5;
          }
          .map-panel {
            padding: 10px;
          }
          .map-header {
            font-size: 7px;
          }
          .map-header > span:last-child {
            display: none;
          }
          .map-footer {
            flex-direction: column;
            font-size: 8px;
            gap: 5px;
            padding-top: 10px;
          }
          .route-map svg {
            min-height: 135px;
          }
          .manifest-heading > span {
            display: none;
          }
          .manifest-grid {
            grid-template-columns: 1fr;
          }
          .manifest-card {
            display: grid;
            grid-template-columns: 110px 1fr;
            gap: 10px;
          }
          .manifest-photo {
            aspect-ratio: 1;
          }
          .manifest-copy h3 {
            font-size: 13px;
            min-height: 0;
          }
          .manifest-copy > div {
            font-size: 10px;
            flex-wrap: wrap;
          }
          .manifest-footer > div {
            width: 100%;
            justify-content: space-between;
            gap: 5px;
          }
          .manifest-footer :global(button) {
            padding: 10px 6px;
          }
          .recent-orders .module-heading {
            flex-wrap: wrap;
          }
          .recent-orders .module-heading .text-link {
            margin-left: 35px;
          }
          .order-row {
            gap: 10px;
            padding: 20px 0;
          }
          .order-copy h3 {
            font-size: 11px;
          }
          .order-copy p {
            font-size: 9px;
          }
          .order-photo {
            width: 50px;
            height: 56px;
          }
          .order-actions {
            padding-left: 0;
          }
          .order-price {
            font-size: 16px;
          }
          .small-button {
            padding: 8px;
          }
          .camera-title {
            font-size: 9px;
          }
          .camera-hud {
            font-size: 9px;
          }
          .camera-footer {
            font-size: 9px;
          }
          .widget-heading h2,
          .helpline h2 {
            font-size: 12px;
          }
          .checks strong {
            font-size: 9px;
          }
          .checks label > span > span {
            font-size: 11px;
          }
          .checks label {
            padding: 13px;
          }
          .estimate-results {
            font-size: 12px;
          }
          .dashboard-dialog {
            margin: auto;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
