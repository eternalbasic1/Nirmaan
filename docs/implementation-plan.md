# NIRMAAN // MONO implementation

Approved scope: independent RevisedWeb app, Home, Product Detail, Site Dashboard, shared header/footer/technical cards, and functioning shopping interactions. Existing Web remains intact.

Use Next.js Pages Router to preserve requested pages/Home.tsx, pages/ProductDetail.tsx, pages/SiteDashboard.tsx paths. Public routes /, /products/[slug], /dashboard; capitalised component routes redirect. Local mockData.js, React Context with localStorage, Tailwind 4, Lucide, Space Grotesk and Inter from Google Fonts self-hosted for reliable builds. Use existing pinned dependencies, Webpack bundler.

User's exact four-color palette takes precedence over tinted export tokens. No UI rounded corners, gradients or shadows. Only product/material imagery retains color; persona, site and fleet context images render monochrome. Sharp rectangular selections and clear keyboard focus.

Tasks: scaffold dependencies/assets/theme; shared layout/cart/state; independent PDP/dashboard; Home/carousel/quote/project-estimator; catalog and route integration; lint/typecheck/unit/HTTP tests/build; desktop/mobile browser verification.

Page ownership: main agent shared components/Home/integration; PDP agent pages/ProductDetail.tsx; dashboard agent pages/SiteDashboard.tsx. Both use shared immutable mockData, calculators, context interfaces. No agent edits shared files concurrently.

Engineering estimators are transparent planning approximations, not structural design. Sample prices, dispatch, invoices and tracking remain marked demo. No external orders, calls, messages or payments are submitted.
