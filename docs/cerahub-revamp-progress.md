# CeraHub business-alignment implementation

Approved plan: user-provided CeraHub business alignment, 25 October 2026.

- Work in the existing clean revamp-25-10-2026 branch and local preview folder.
- UI prototype only: no live payments, supplier integrations, real invoices or fabricated orders.
- Unknown taxes, delivery, unloading, serviceability and expiry remain unknown, never zero/free.
- Preserve product/category URLs and legacy cart storage; normalize old offloading assumptions.
- User-created order previews and addresses may persist on this browser, with explicit disclosure.
- Tasks: commercial model/tests; shared buying UI; homepage/product/cart/checkout;
  orders/addresses/help/footer; browser QA/build/review.

## Implemented

- Commercial model: unconfirmed charges stay null; no blanket GST; valid matched local quotes are separate from MRP; preview snapshots copy prices and addresses.
- Shared UI: CeraHub branding, wallet hidden, neutral account label, pricing breakdown and persistent delivery pincode.
- Rebuilt homepage, product page, cart, checkout, orders/addresses dashboard, footer and help page. Existing URLs retained.
- Only customer-created browser-local previews and addresses persist; payment/invoice/live delivery are unavailable, not simulated.
- Old cart quantities preserved and obsolete unloading variants merged without promising that service.
- Fresh reviewer found a failed-storage-deletion success message; fixed with explicit persistence result and tested failure guidance. Reviewer confirmed no remaining important issues in the fixes.

## Verification

- Unit tests cover unconfirmed charges, confirmed per-product tax arithmetic, expiry, comparison evidence, snapshots, corrupted storage and old cart migration.
- Route smoke tests cover core pages, all product/category routes, assets, aliases and 404s.
- Repeatable Chrome suite covers saved preview/address editing, persistence, reorder review, blocked payment, privacy deletion failures and responsive pages.
- Visual QA covers desktop/mobile home, product, catalog, orders, checkout and help; no horizontal overflow at 320, 390, 768 or 1440 pixels.
- Production build is checked in an isolated temporary copy so the running local development preview is not disturbed.

## Launch boundary

No live backend, supplier/stock service, delivery-area list, tax setup, payment provider, customer support channel or final trading policies were supplied. Those remain explicit launch prerequisites; this change does not pretend to implement them.

Final results: lint, TypeScript, formatting and diff whitespace checks passed;
12 unit tests, 3 interactive Chrome tests and 4 route smoke tests passed.
The optimized production build generated 36 pages successfully. All route smoke
tests also passed against that isolated production server; the temporary server
was then stopped. No deployment or Git push was performed.
