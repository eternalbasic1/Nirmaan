import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";
import { InfoDialog } from "./InfoDialog";
export function GlobalFooter() {
  const home = useRouter().pathname === "/";
  const groups = [
    {
      title: "MATERIAL SECTORS",
      links: [
        ["Structural Cement (OPC/PPC)", "/categories/cement-steel"],
        ["Fe 550D Ribbed Rebar", "/products/tata-tiscon-550d-rebar-12mm"],
        ["Robo Sand & M-Sand", "/products/triple-washed-plastering-m-sand"],
        ["Crystalline Waterproofing", "/categories/waterproofing"],
        ["CPVC Industrial Conduits", "/categories/pipes"],
      ],
    },
    {
      title: "SITE LOGISTICS",
      links: [
        ["Heavy Hydraulic Fleet Transit", "/dashboard"],
        ["Bulk Metric Offloading Rules", "/products/jk-super-cement-50kg"],
        ["Live Weighbridge Verification", "/dashboard"],
        ["Crane Unloading Requests", "/dashboard"],
        ["Storage & Weatherproofing SOP", "/dashboard"],
      ],
    },
  ];
  return (
    <footer
      className={`mt-16 border-t border-black ${home ? "market-footer bg-white text-black" : "bg-white text-black"}`}
    >
      <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight"
          >
            NIRMAAN // MONO
          </Link>
          <p className="mt-4 text-xs leading-6">
            {home
              ? "Building materials, clear pricing and coordinated site deliveries. Plan your next order with NIRMAAN."
              : "Architectural grade raw materials infrastructure. Monochromatic structural procurement for builders, structural consultants, and verified civil contractors."}
          </p>
          <p className="technical-label mt-4 text-[8px]">
            REG: BLR-KA-560001 · DEMO PLATFORM
          </p>
        </div>
        {groups.map((g) => (
          <div
            key={
              home
                ? g.title.charAt(0) + g.title.slice(1).toLowerCase()
                : g.title
            }
          >
            <h2 className="technical-label mb-3 border-b border-line pb-2">
              {home
                ? g.title.charAt(0) + g.title.slice(1).toLowerCase()
                : g.title}
            </h2>
            <ul className="space-y-2.5">
              {g.links.map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-xs leading-5 hover:underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="technical-label mb-3 border-b border-line pb-2">
            {home ? "Commercial trust" : "COMMERCIAL TRUST"}
          </h2>
          <ul className="space-y-3">
            {[
              "BIS Certification Matrix",
              "Direct Manufacturer Mill Test",
              "Zero Counterfeit Guarantee",
              "Input Tax Credit (GST) Compliance",
              "Escrow Contract Settlement",
            ].map((t) => (
              <li key={t}>
                <InfoDialog
                  title={t}
                  label={t}
                  className="text-left text-xs leading-5 hover:underline"
                >
                  <p>
                    This is a frontend demonstration of {t.toLowerCase()}.
                    Certifications, guarantees, tax credits and escrow
                    arrangements require verification and a connected supplier
                    service before live use.
                  </p>
                  <Link href="/dashboard" className="text-link mt-4">
                    View sample audit <ArrowUpRight size={12} />
                  </Link>
                </InfoDialog>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="technical-label mb-3 border-b border-line pb-2">
            {home ? "Help & support" : "ASSISTANCE HOTLINE"}
          </h2>
          <p className="text-xs leading-6">
            Central Procurement Command
            <br />
            +91 (80) 4920-8000
          </p>
          <p className="mt-3 text-xs leading-6">
            Dispatch Dispatcher:
            <br />
            dispatch@nirmaanmono.com
          </p>
          <Link
            href="/dashboard"
            className="badge mt-4 border-black bg-white text-black"
          >
            SITE AUDIT: ACTIVE
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-wrap justify-between gap-4 py-6 font-display text-[9px] uppercase tracking-[0.06em]">
          <span>
            © 2026 NIRMAAN MONO · FRONTEND PROTOTYPE · SAMPLE PRICES & GST
          </span>
          <div className="flex flex-wrap gap-5">
            {["Privacy protocol", "Terms of supply", "Quality disclosures"].map(
              (t) => (
                <InfoDialog
                  title={t}
                  label={t}
                  key={t}
                  className="text-[9px] uppercase hover:underline"
                >
                  <p>
                    This prototype stores your cart in this browser only. No
                    personal details, orders, tax documents, payments, or
                    communications are sent to an external service.
                  </p>
                </InfoDialog>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
