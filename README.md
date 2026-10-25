# CeraHub

A responsive building-materials buying and delivery **website prototype** for the planned CeraHub business in Telangana. CeraHub will sell to customers and issue its own invoices. Built with Next.js Pages Router, React, TypeScript and Tailwind CSS.

## Run locally

Use Node.js 24.

```sh
npm ci
npm run dev
```

Open http://localhost:3002. `npm run build` creates a production build; `npm start` serves it on port 3002.

## Buying experience

- Home explains the business, category discovery, price breakdown and delivery-area checks.
- `/materials` and `/categories/[slug]` provide search, category selection, price filtering and sorting.
- `/products/[slug]` shows the brand, buying unit, minimum quantity, sample unit price, availability and price validity. Technical information is expandable.
- The persistent cart uses quantity-based sample prices. Tax, delivery and unloading are explicitly unconfirmed; no fabricated final amount or blanket GST rate is applied.
- `/checkout` collects details for an explicitly labelled browser-local order preview. It does not place an order, reserve stock, contact suppliers or accept payment. Saving a preview keeps the cart.
- `/dashboard` is My orders. It includes a labelled, optional sample-order view for evaluating the layout, separate from previews the user creates and optional saved addresses. The sample-order switch restores the empty state when there are no user previews. Sample records are never persisted as customer orders. Users can edit/delete addresses, download a clearly labelled preview, delete previews and review current prices before adding materials again.
- `/help` explains prices, delivery, order issues, privacy and the preview's limits. Actual support contacts and trading policies are not configured or invented.
- Wallet balances, construction audits, cameras, GPS simulations, engineering calculators, testimonials and unsupported factory/batch/unloading promises have been removed from the shopping experience.

## Pricing and future integrations

`mockData.js` contains sample products. Their prices, MRP, technical details, imagery and quantity tiers are illustrative, not live supplier offers.

`ProductPricing` in `lib/types.ts` separates price confirmation, tax inclusion/rate, availability, minimum quantity and expiry. `quoteCart` in `lib/commerce.ts` requires confirmed products, known charges and confirmed serviceability before producing a final payable amount. Current sample products do not meet those conditions. Live checkout remains disabled.

`LocalPriceQuote` is separate from MRP. Comparison requires the same product, variant, unit, quantity and area, a dated unexpired quote, and matching all-charge totals. No local comparisons are supplied in this prototype, so no local savings are claimed.

Before launch, configure real Telangana service areas, agreed prices, product-specific taxes, availability, price validity, delivery/unloading terms, payment handling, CeraHub invoice generation, order records, operations updates, company/support details and actual returns/refund policies. A pincode is never treated as serviceable just because it looks like a Telangana pincode.

## Browser storage

- Existing cart key `nirmaan-mono-cart-v1` is retained for compatibility; this is an internal historical name.
- `cerahub-shopping-v1` stores user-created previews, addresses and the selected pincode on the current browser.
- Order previews capture their own line prices, charge breakdown and address. Later cart or address edits do not rewrite them.
- Data is not an authenticated account and is not shared between devices. Avoid personal information on shared browsers. The Help page can clear saved shopping data.
- If storage is blocked, the UI remains usable for the tab and warns that previews/addresses will not persist.

All customer-facing branding is CeraHub. The supplied CeraHub logo is reused in header/footer and favicon. Assets and fonts are local; source records and font licenses remain under `docs/` and `public/`. Historical design documents describe the earlier prototype and are not current service promises.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

With a server running:

```sh
npm run test:smoke
# Or: TEST_BASE_URL=https://your-preview-domain npm run test:smoke
```

The request-based smoke suite does not need installed browser binaries. Interactive QA should cover add/update/remove cart lines, price filters, unconfirmed delivery, blocked payments, preview/address persistence and deletion, immutable preview prices/addresses, reorder price review and mobile layouts.

Legacy `/Home`, `/ProductDetail` and `/SiteDashboard` URLs continue redirecting to their public routes. The separate `../Web` project is unchanged. Search indexing remains disabled until real launch.

For repeatable interactive browser checks with Google Chrome installed:

```sh
npm run test:ui
```

Set `PLAYWRIGHT_BROWSER_CHANNEL` to another installed Playwright-supported channel if needed. The request-only `test:smoke` command remains independent of browser installations.
