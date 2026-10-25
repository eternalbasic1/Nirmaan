# Catalog navigation cleanup

Goal: remove repeated category navigation and expose products sooner.

Scope: RevisedWeb header and shared category/search catalog. Keep existing logo,
wallet, cart, catalog routes, product data and checkout behavior.

- Replace the global category strip with Home, Shop materials and My orders.
- Remove the search division selector so search has one clear input.
- Replace catalog breadcrumbs, eyebrow and category tabs with one page heading,
  category selector, price popover, result count and sort control.
- Preserve q when changing category; support direct category links and back/forward.
- Reuse marketplace product cards and typography; keep controls usable on mobile.
- Verify current routes, navigation, filtering, sorting, no-result recovery,
  keyboard controls and desktop/mobile overflow.
