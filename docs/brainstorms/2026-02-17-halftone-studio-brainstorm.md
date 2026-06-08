---
date: 2026-02-17
topic: halftone-studio
---

# Float Halftone Studio — Design Tool for Dot-Grid Logo System

## What We're Building

A custom, interactive design tool for generating halftone dot-grid logo marks for Float. The tool takes a typeface and text as input, renders it to a grayscale density mask, overlays a configurable dot grid, and maps density values to dot radii — producing a halftone mark where the letterform emerges from modulated dot sizes within a bounded rectangular grid.

The tool is purpose-built because existing halftone tools target photographic post-processing, not logo-quality vector output from clean letterforms. They produce raster output, offer limited parameter control, and cannot export print-ready SVG.

### V1 Scope (Core Tool)

- Real-time parameter panel with sliders for all key variables
- Canvas 2D preview rendering (batched circle paths)
- Clean SVG export (one `<circle>` per dot)
- Typeface switching via font file upload or system font selection
- Both rectangular and hexagonal grid types

### Deferred to Later Phases

- Wave animation (sine-wave radius modulation for "floating" effect)
- Animated SVG/web export
- Preset saving/loading
- Color options (V1 is monochrome only)

## Why This Approach

### Vite + React in the Monorepo

The tool lives at `packages/halftone-studio` inside the existing `float-vibe-foundry` pnpm monorepo. It uses Vite + React instead of Next.js because:

- The tool is 100% client-side — no SSR, no routing, no API layer
- Vite provides faster HMR and lighter dev experience for a Canvas-heavy app
- React is required to consume the shared `@float-vibe-foundry/design-system` components
- pnpm workspaces are build-tool agnostic — Vite packages coexist alongside Next.js packages with no friction

### Canvas 2D Rendering Pipeline

The rendering pipeline uses Canvas 2D with batched paths because:

- Handles 15K+ circles at 60fps — more than sufficient for a logo grid
- Simplest implementation (~200 lines of core logic)
- The pipeline is renderer-agnostic: mask generation, grid sampling, and SVG export are decoupled from the preview renderer, so upgrading to WebGL later is non-disruptive

### The Pipeline

1. **Font → Mask:** Render text to an off-screen canvas using `fillText()`, apply `filter: blur()` for configurable feathering
2. **Grid Generation:** Lay a uniform rectangular or hexagonal grid over the canvas, respecting pitch and rotation
3. **Density Sampling:** For each grid point, read the grayscale value from the blurred mask (0–1)
4. **Radius Mapping:** Apply a configurable curve (gamma/sigmoid/smoothstep) to map density → dot radius
5. **Preview:** Render all circles via a single batched Canvas 2D path (`beginPath` → many `arc()` calls → one `fill()`)
6. **SVG Export:** Build an SVG string with one `<circle>` element per dot, 2 decimal places of precision

## Key Decisions

- **Location:** New package `packages/halftone-studio` in the monorepo — rationale: uses shared design system, single `pnpm install`, consistent with existing structure
- **Framework:** Vite + React — rationale: 100% client-side tool, no need for Next.js features, faster dev experience
- **Renderer:** Canvas 2D with batched paths — rationale: sweet spot of simplicity and performance for V1 dot counts
- **Grid types:** Both rectangular and hexagonal, exposed as a toggle — rationale: minimal extra work, gives creative flexibility
- **V1 scope:** Core tool only (parameters + preview + SVG export) — rationale: nail the halftone generation before adding animation, presets, etc.
- **State management:** Jotai (atomic state) — rationale: each slider is an independent atom, derived atoms recompute the pipeline only when relevant inputs change

## Key Parameters (Exposed as Sliders)

| Parameter      | Description                        | Range           |
| -------------- | ---------------------------------- | --------------- |
| Grid pitch     | Distance between dot centers       | 4–40px          |
| Grid rotation  | Angle of the grid                  | 0–360°          |
| Grid type      | Rectangular or hexagonal           | Toggle          |
| Feathering     | Blur radius on the letterform mask | 0–30px          |
| Min dot radius | Radius of dots in empty areas      | 0–50% of pitch  |
| Max dot radius | Radius of dots at full density     | 20–50% of pitch |
| Gamma / curve  | Density-to-radius mapping function | 0.3–3.0         |
| Font size      | Size of the rendered letterform    | 48–400px        |
| Text           | The string to render               | Free text       |

## Component Architecture

```
App
├── FontPanel           — Font file drop zone, font family selector, text input, font size
├── GridPanel           — Pitch, rotation, grid type (rect/hex)
├── DensityPanel        — Blur radius, gamma, min/max radius
├── PreviewCanvas       — Full-width Canvas 2D element, handles render loop
├── ExportPanel         — SVG download button, dimension controls
└── useHalftoneEngine   — Core hook: font→mask→grid→dots pipeline
```

## Tech Stack

| Layer         | Choice                                               |
| ------------- | ---------------------------------------------------- |
| Build tool    | Vite 6                                               |
| UI framework  | React 19 + TypeScript                                |
| UI components | @float-vibe-foundry/design-system                    |
| State         | Jotai v2 (atomic state for sliders)                  |
| Rendering     | Canvas 2D (batched arc paths)                        |
| Font loading  | FontFace API + opentype.js for file drops            |
| SVG export    | String builder (no library needed)                   |
| CSS           | Tailwind (shared semantic tokens from design system) |

## Open Questions

- **Exact package name:** `halftone-studio`, `dot-forge`, `float-halftone`, or something else?
- **Font loading UX:** Should we ship with a curated set of bundled fonts, or rely entirely on user-uploaded fonts?
- **Preset format:** When presets are added later, should they be JSON files, URL-encodable query params, or something else?
- **Distance field upgrade:** Should we use `@mapbox/tiny-sdf` for true SDF instead of Canvas blur? (Deferred — Canvas blur is sufficient for V1)

## Reference Projects

- [svg-halftone](https://github.com/evestera/svg-halftone) — Rust/WASM, multiple grid types, SVG output
- [Halftone-Simulator](https://github.com/fjcalzado/Halftone-Simulator) — D3.js, interactive parameter controls
- [@mapbox/tiny-sdf](https://github.com/mapbox/tiny-sdf) — Signed distance field generation for fonts
- [p5.riso](https://antiboredom.github.io/p5.riso/) — p5.js halftone functions

## Next Steps

→ `/workflows:plan` for implementation details and file-by-file build plan
