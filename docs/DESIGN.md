---
name: Architectural Monochrome
colors:
  surface: "#fbf8fc"
  surface-dim: "#dcd9dd"
  surface-bright: "#fbf8fc"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f2f7"
  surface-container: "#f0edf1"
  surface-container-high: "#eae7eb"
  surface-container-highest: "#e4e1e6"
  on-surface: "#1b1b1e"
  on-surface-variant: "#4c4546"
  inverse-surface: "#303033"
  inverse-on-surface: "#f3f0f4"
  outline: "#7e7576"
  outline-variant: "#cfc4c5"
  surface-tint: "#5e5e5e"
  primary: "#000000"
  on-primary: "#ffffff"
  primary-container: "#1b1b1b"
  on-primary-container: "#848484"
  inverse-primary: "#c6c6c6"
  secondary: "#5d5e66"
  on-secondary: "#ffffff"
  secondary-container: "#e3e1ec"
  on-secondary-container: "#63646c"
  tertiary: "#000000"
  on-tertiary: "#ffffff"
  tertiary-container: "#1b1b1b"
  on-tertiary-container: "#848484"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e2e2e2"
  primary-fixed-dim: "#c6c6c6"
  on-primary-fixed: "#1b1b1b"
  on-primary-fixed-variant: "#474747"
  secondary-fixed: "#e3e1ec"
  secondary-fixed-dim: "#c6c5cf"
  on-secondary-fixed: "#1a1b22"
  on-secondary-fixed-variant: "#46464e"
  tertiary-fixed: "#e2e2e2"
  tertiary-fixed-dim: "#c6c6c6"
  on-tertiary-fixed: "#1b1b1b"
  on-tertiary-fixed-variant: "#474747"
  background: "#fbf8fc"
  on-background: "#1b1b1e"
  surface-variant: "#e4e1e6"
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 18px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: "700"
    lineHeight: 14px
    letterSpacing: 0.08em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system is engineered for the heavy construction and home-building ecosystem in India. It serves a multifaceted user base: individual home builders (homeowners), independent contractors, civil engineers, and trade procurement specialists. Procurement in construction is notoriously fraught with counterfeits, opaque pricing, and technical ambiguity. The interface counters this by embodying the raw precision, structural discipline, and structural permanence of architectural blueprints and industrial engineering documents.

The style blends architectural brutalism with modern Swiss utility. The interface acts as a stark, disciplined physical scaffold. It refuses decorative brand tints, non-standard gradients, or colorful interface chrome. Instead, the UI frame relies on strict monochromatic contrast: deepest charcoal-black (`#000000`), clinical architectural whites (`#FFFFFF`), neutral zinc structural fills (`#F4F4F5`), and hairline structural borders (`#E4E4E7`).

By enforcing an uncompromising black-and-white chrome, the design system turns the interface into an immaculate gallery frame. This allows real-world construction materials—such as the recognizable sunshine yellow and red of JK Super Cement, the vibrant industrial yellow of UltraTech, Dr. Fixit waterproofing blues, rich terracotta clay bricks, and cold ribbed steel TMT rebar—to retain 100% of their authentic, uncompromised real-life color spectrum. Users achieve immediate brand verification and physical product trust without visual noise from competitive UI accents.

## Colors

The interface operates strictly in light mode by default to replicate physical technical blueprints, specification sheets, and site bills of quantities (BOQ).

### Monochromatic Palette Architecture

- **Canvas Base (`#FFFFFF`)**: Pure clinical white. Serves as the clean foundational ground for all viewport surfaces, primary sheet panels, and packaging presentation backdrops.
- **Surface Muted / Plate (`#F4F4F5`)**: Zinc architectural tint. Used for secondary containers, table zebra stripes, spec-sheet backgrounds, and recessed input wells.
- **Structural Lines / Hairlines (`#E4E4E7`)**: Neutral light zinc border. Used for technical grid demarcation, row dividers, and modular framing.
- **High-Contrast Secondary Border (`#18181B`)**: Heavy structural line. Applied to active states, focused elements, and high-impact bounding boxes.
- **Primary Text & Solitary Fill (`#000000`)**: Absolute solid black. Reserved for primary typography, actionable call-to-action blocks, structural status indicators, and high-contrast badges.
- **Technical Secondary (`#71717A`)**: Mid-tone technical zinc for measurement scales, unit labels (e.g., `₹/sq.ft`, `MT`, `bags`), BIS certification specs, and metadata.

### Strict Product Imagery Exemption Rule

UI chrome, badges, buttons, banners, and icons must never use brand tints or decorative multi-colors. However, **product photography, manufacturer packaging assets, technical diagrams, and material preview thumbnails must strictly retain their full, unedited, true-to-life colors**. Authentic brand identification (e.g., UltraTech yellow, Pidilite deep blue, Asian Paints multi-color swatches, raw red brick earth, and slate-gray aggregate) must never be desaturated, washed out, or filtered.

## Typography

The typographic strategy pairs **Space Grotesk** (display, section headlines, prices, technical measurements, and structural badges) with **Inter** (narrative copy, technical documentation, specifications, and data dense tables).

### Typographic Roles

- **Space Grotesk** brings mechanical structure and industrial engineering precision. It is used strictly for titles, monetary figures (`₹12,450 / MT`), specifications (`IS 1786:2008`, `Fe 550D`), and uppercase navigation tags.
- **Inter** ensures crystal-clear legibility at compact body sizes, providing maximum readability in delivery address forms, technical compliance notes, GST breakdowns, and logistics tracking logs.

All technical uppercase labels must use deliberate letter-spacing (`0.04em` to `0.08em`) to mimic stamped structural stencils on raw steel and cement sacks. Numbers and pricing units always feature tabular or monospace alignments for accurate architectural estimates.

## Layout & Spacing

The layout is structured around an architectural grid matrix. Visual boundaries are formed via exposed structural lines rather than floating organic margins.

### Grid Framework

- **Desktop (12 Columns, Fluid with Maximum Width 1440px)**: 12-column layout with `1.5rem` (`24px`) gutters and `3rem` (`48px`) outer margins. Elements snap to rigorous structural modules (e.g., 3-column product cards, 8-column spec sheets, 4-column checkout order summaries).
- **Tablet (8 Columns, Fluid)**: `1rem` (`16px`) gutters with `2rem` (`32px`) margins. Side-by-side spec layouts collapse to an asymmetrical 5-3 or balanced 4-4 distribution.
- **Mobile (4 Columns, Fluid)**: `1rem` (`16px`) gutters and `1rem` (`16px`) canvas margins. Product cards transition into full-width or single-column modular blocks for rapid one-handed site auditing.

### Architectural Framing Rhythm

Every major layout component shares continuous 1px dividing lines (`#E4E4E7`). Rather than relying on floating whitespace cards, containers intersect cleanly along shared horizontal and vertical edges, creating an aesthetic similar to blueprint construction drawings and quantity surveying worksheets.

## Elevation & Depth

This design system deliberately rejects ambient colored shadows, fuzzy dropped glows, and frosted glassmorphism. Construction is grounded, heavy, and physical; UI depth must mirror this quality through **structural surface tiering and sharp high-contrast boundary offsets**.

### Elevation Hierarchy

- **Level 0 (Flat Surface / Canvas)**: `#FFFFFF` or `#F4F4F5`. Zero shadow. Structural boundaries defined by crisp 1px borders (`#E4E4E7`).
- **Level 1 (Card & Module Resting)**: Pure white `#FFFFFF` surface resting on a `#F4F4F5` platform, enclosed with a 1px border (`#E4E4E7`).
- **Level 2 (Active Focus / Architectural Elevation)**: Elements do not soften into blur. Instead, interactive hovered objects, focused inputs, or elevated summary modules acquire a solid, crisp `2px 2px 0px 0px #000000` hard shadow offset or an inner 1.5px solid black framing perimeter.
- **Level 3 (Modals, BOQ Drawers, and Technical Sheets)**: Pure `#FFFFFF` backplates framed with a 1px solid `#000000` edge, cast over a 40% solid black backing overlay (`rgba(0, 0, 0, 0.40)`).

## Shapes

The design system enforces an uncompromising **Sharp (`0px`)** corner profile.

Rounded pill corners, soft blobs, and gentle radiuses run counter to the industrial rigor of concrete, steel beams, and structural blocks. Every UI element—including primary buttons, text inputs, technical badges, product photo containers, and dropdown sheets—terminates in crisp, orthogonal 90-degree right angles.

This strict angular discipline enhances the feeling of structural reliability, engineered strength, and functional utility, reflecting the raw materials being purchased.

## Components

### Buttons

- **Primary CTA**: Solid black (`#000000`) background, crisp pure white (`#FFFFFF`) text in Space Grotesk Bold, 0px border radius. Hover state: `#18181B` with subtle inset border. Active state: `#27272A`. Never use colored CTA buttons.
- **Secondary / Technical Action**: Pure white (`#FFFFFF`) background, 1px solid `#000000` border, `#000000` typography. Hover state: Inverted to solid `#000000` with white text.
- **Tertiary / Utility**: Transparent background, underline or paired with a monospaced directional arrow (`→`), `#000000` label.

### Product & Material Cards

- Card containers use a `#FFFFFF` fill with an explicit 1px `#E4E4E7` border.
- The top image container holds the raw, unedited manufacturer product packaging (e.g., bright yellow UltraTech Cement or green Supreme PVC pipe) placed on an ultra-clean, clinical neutral canvas (`#F4F4F5` or `#FFFFFF`).
- The bottom container is separated by a 1px hairline border, housing the brand name in uppercase Space Grotesk (`10px`), item description in Inter (`14px`), and bulk metric tier pricing (`₹385 / 50kg Bag`) in bold Space Grotesk.

### Chips & Badges

- Specifications (e.g., `53 GRADE OPC`, `FE 550D`, `BIS CERTIFIED`, `IN STOCK`): Sharp rectangles (`0px` radius), 1px solid `#000000` or `#E4E4E7`, `#000000` typography on `#FFFFFF` or `#F4F4F5`. No decorative pastel backgrounds.

### Form Inputs & Quantity Selectors

- Text fields use a 1px solid `#E4E4E7` frame with sharp corners, stepping to a 1.5px `#000000` frame upon focus. Inner backgrounds remain `#FFFFFF`.
- Measurement stepper controls (Tons, Bags, Square Metres, Metric Bundles) utilize connected monolithic segmented boxes: `[-] [ 120 MT ] [+]` encased in a continuous 1px solid `#000000` grid frame.

### Checkboxes & Radio Controls

- Checkboxes are rigid 16x16px squares with 0px corner radiuses and a 1.5px `#000000` border. Active states are filled solid `#000000` with a stark white geometric tick.
- Radio buttons retain a classic concentric ring structure with a solid `#000000` inner center square or circle.

### Tables & Specification Grids

- BOQ (Bill of Quantities) tables feature compact, clean 1px hairline borders (`#E4E4E7`) with alternating `#FFFFFF` and `#F4F4F5` rows. Table headers use Space Grotesk uppercase labels with `#000000` text on a `#F4F4F5` plate.
