# MaterialHub

An independent frontend rebuild of the supplied Architectural Monochrome design export. The previous `../Web` application remains separate.

## Run

Use Node.js 24 LTS or a compatible supported release.

```sh
cd /Users/kancharakuntlavineethreddy/Developer/Project/Inventory/RevisedWeb
npm ci
npm run dev
```

Open http://localhost:3002. The former storefront can continue running on port 3000.

```sh
npm run lint
npm run typecheck
npm test
npm run test:smoke  # requires the running app on port 3002
npm run build
npm start          # serves the production build on port 3002
```

## Main routes

- `/` — three-persona carousel, pricing check, ten categories, essentials and project estimator.
- `/products/jk-super-cement-50kg` — gallery, tier pricing, bag variants, offloading and slab calculator.
- `/dashboard` — contractor telemetry, schematic tracking, manifest, checklist and estimator.
- `/materials` and `/categories/[slug]` — local catalog with search, sort and price filtering.
- `/checkout` — local demonstration only. No payments or external orders.

The requested component filenames inside `pages/` are preserved. Their capitalised framework routes redirect to the public routes above.

## Architecture

```text
RevisedWeb/
  components/
    GlobalHeader.tsx
    GlobalFooter.tsx
    TechnicalCard.tsx
    ProductCard.tsx
    QuantityStepper.tsx
    CartProvider.tsx
    CartDrawer.tsx
    InfoDialog.tsx
    Catalog.tsx
  pages/
    Home.tsx
    ProductDetail.tsx
    SiteDashboard.tsx
    _app.tsx
    _document.tsx
    index.tsx
    dashboard.tsx
    materials.tsx
    checkout.tsx
    products/[slug].tsx
    categories/[slug].tsx
  lib/
    types.ts
    calculations.ts
  styles/globals.css
  mockData.js
  public/images/
  public/fonts/
  tests/
  docs/
```

Next.js Pages Router, React, TypeScript, Tailwind CSS 4 and Lucide. Space Grotesk (400–700) was downloaded from Google Fonts and is self-hosted with `next/font/local`; Inter is also self-hosted. This removes font-network dependencies from production builds. Font licenses are included.

## Design decisions

The user's strict palette takes priority over the tinted tokens and colored indicators in the export: UI uses black, white, `#F4F4F5` and `#E4E4E7`, with brick-orange `#B84A2B` reserved for “Hub” in the MaterialHub wordmark. Corners are square, elevation is border-based, and there are no soft shadows. Persona/site/fleet context photos render monochrome; product and material photography retains its original colors. The schematic grid uses structural lines, not decorative gradients.

All 38 supplied HTML image references are imported as optimized local WebP assets. Their original URLs and descriptions are recorded in `docs/reference-assets.json`. No remote images are required at runtime. The original design document is retained in `docs/DESIGN.md`.

## Demo behavior

- React Context exposes the cart; validated entries persist under `nirmaan-mono-cart-v1` in localStorage. Same-variant lines merge; offloading choices stay separate.
- Tier prices change with quantity. JK 25kg variants use their own prices. Manual lifting adds ₹10 per unit. Totals use integer paise and sample 18% GST.
- Maximum single-line quantity is 9,999. Oversized project estimates can be exported as a text BOQ; ordering is disabled instead of silently reducing quantities.
- The slab calculator uses an M20 nominal 1:1.5:3 mix, dry factor 1.54, cement density 1,440 kg/m³ and 5% allowance. The home project estimator uses separate whole-project planning factors. Dashboard estimates state their assumptions. These are preliminary planning tools, not structural designs.
- Carousel advances every four seconds, pauses on hover/focus, has explicit controls and respects reduced motion.
- Checklists, camera selection, site labels, mock gate OTP, invoice sheets, and estimator controls are local interactions. Maps and camera feeds are simulated. No communications are sent.
- Checkout form fields stay on the current page. Demo submission clears the local cart and displays a sample reference; nothing is transmitted or charged.
- Indexing is disabled for this prototype. Configure a real domain, metadata, legal documents, live rates and verified supplier records before publication.

Next.js 16 currently emits identically named development and production Pages Router validator aliases. `tsconfig.json` excludes only the duplicate development validator; production route validation and all application source typechecks remain enabled.
