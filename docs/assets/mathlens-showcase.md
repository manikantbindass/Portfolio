# MathLens portfolio integration

Reviewed 28 October 2026 against [d74730e1a552bcfa2a4b009342c991fded8bb05f](https://github.com/manikantbindass/mathlens/tree/d74730e1a552bcfa2a4b009342c991fded8bb05f).

The [live web alpha](https://mathlens-wine.vercel.app) returned HTTP 200. `/api/v1/health` reported `0.2.0-alpha.1`; `/api/v1/auth/config` reported `configured:false`. A public calculation request for `x^2 - 4*x + 3`, operation `solve`, returned `x = 1, 3`. No account was created or provider configuration changed.

## Published distribution

[Release v0.2.0-alpha.1](https://github.com/manikantbindass/mathlens/releases/tag/v0.2.0-alpha.1) is explicitly a prerelease. Its assets include the unsigned Windows installer, Linux AppImage, debug-signed Android test APK, 20-slide PDF/PowerPoint, Node web-runtime archive, checksums, and CI smoke records. [Native release workflow 40572776386](https://github.com/manikantbindass/mathlens/actions/runs/40572776386) completed successfully. Packages were not installed or executed during the portfolio update.

The native clients require internet and the hosted workspace. No offline computation, auto-updater, store distribution, production signing, or iOS binary is claimed. Supabase requires owner configuration. Older README/architecture sections contain superseded native/algorithm statements; the published release, current implementation, distribution update, and refinement inventory establish the current scope.

## Artwork provenance

No application screenshots are committed in the reviewed MathLens tree. Opening the hosted app through the browser tool timed out. No new rendered application or responsive interaction verification is claimed.

Two original SVG illustrations were created directly in code for this portfolio:

- `public/projects/mathlens/overview.svg`: a mathematical project cover with a quadratic loss curve and source-confirmed capability groups.
- `public/projects/mathlens/methods.svg`: a bounded request-to-result diagram and explicit gradient-descent example.

Both contain a visible illustration label. The project carries `visualKind: "illustration"`; card, gallery, and image-dialog labels distinguish them from genuine application captures. Their source links lead to the pinned implementation rather than an invented screenshot. The existing 31 real captures across seven other projects remain unchanged.

## Glass animation

`MathLensGlassHero.tsx` provides the shared live SVG for the rounded project hero and homepage preview. It depicts a translucent mathematical lens, contour curves, a floating matrix and formula, and a point descending on `L(θ)=θ²`. Coordinates follow `θₜ₊₁=.8θₜ`, starting at 4, equivalent to a learning rate of 0.1. The illustration is educational decoration, not a live API response or benchmark.

The detail hero and homepage card each have an independent pause button outside navigation links. Per-instance SVG IDs prevent gradient collisions. Theme tokens match the portfolio; compact layouts lower background prominence. Reduced motion disables animation and retains a static point. Reduced transparency removes decorative backgrounds.

The Portfolio README header/footer retain their existing navy, lavender, and teal glass composition, with a compact animated loss-curve motif added at each end. They use local SVG assets with a reduced-motion fallback and no external animation service. The MathLens source repository README was not modified.
