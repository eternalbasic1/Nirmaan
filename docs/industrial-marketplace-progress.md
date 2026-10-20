# Industrial marketplace experiment

Approved scope: Home, shared header, homepage footer and homepage-only product presentation. Preserve routes, mock data, cart and calculations. No new assets or dependencies.

Implementation tasks:

1. Scoped typography, surface and control tokens; header search/navigation refresh.
2. Open hero, simpler assurances and categories, homepage product-card variant, estimator/footer refinement.
3. Browser checks at desktop/tablet/mobile, interactions and internal-page style containment; existing checks and build.

Ruling: Use a feature branch in the current checkout so the running preview reflects the requested work. The checkout was clean before work. No commits or remote operations are required.
Ruling: This is a reversible visual redesign. Validate visual requirements in the browser and retain the existing behavioral tests rather than adding tests that mirror CSS implementation.

Pre-flight: Homepage product cards share ProductCard with catalog pages; introduce an explicit presentation prop. Header is shared intentionally. Footer changes use the existing home route condition. Keep existing global zero-radius defaults intact.

## Completed

- Header search, utility text and navigation refreshed; search parameters, suggestions, cart badge and dashboard links preserved.
- Homepage hero, categories, assurances, product cards, estimator and conditional footer refreshed. Global technical defaults remain intact.
- Fixed narrow-screen overflow caused by the hero photo's aspect ratio combined with a minimum height. Verified document width equals viewport width at 1440, 768, 390 and 320 pixels.
- Browser verified all three hero selections, next/previous and pause/play; suggestion hit testing; combined search query/category navigation; quote success and unsupported postcode feedback; 49/50-bag tier changes; cart add/remove; estimator quantity updates, BOQ action, estimate-to-cart and oversized-order guard; keyboard focus.
- Product detail and dashboard retain square content controls; catalog retains descriptions and technical card styling. Cart remains unchanged. Test cart items removed after verification.
- Checks passed: ESLint, TypeScript, 5 unit tests, 4 HTTP smoke tests, Prettier and production build (35 generated pages).
- Fresh read-only reviewer: no actionable findings.
- Review screenshots: `marketplace-home-desktop.png`, `marketplace-home-mobile.png`.
