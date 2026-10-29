# CityPulse portfolio integration

Reviewed 30 October 2026 against [2385ea7a3c6f9349c9c9ee67a56ace5f279fa992](https://github.com/manikantbindass/CityPulse/tree/2385ea7a3c6f9349c9c9ee67a56ace5f279fa992).

## Availability and evidence

The repository homepage was unset and the GitHub releases collection was empty at review. The current README identifies a working local development application, with no public deployment. Accordingly `live` is null and no release/download badge is fabricated. The manual image-packaging workflow is not a published GitHub release or deployed cloud environment.

CI [40922823492](https://github.com/manikantbindass/CityPulse/actions/runs/40922823492), Security [40922823713](https://github.com/manikantbindass/CityPulse/actions/runs/40922823713), and Platform [40922823562](https://github.com/manikantbindass/CityPulse/actions/runs/40922823562) all completed successfully for the reviewed revision. The README records revision-specific source tests and later workflow evidence; those checks are distinct from this portfolio's tests.

The PDF and PowerPoint are real source documents, explicitly identified in the current README as earlier drafts. Portfolio links retain that label. Current Markdown and implementation take precedence over superseded architecture and identity statements in older documents.

## Scope

The implemented workspace connects Next.js/React, a Spring Boot modular API, PostgreSQL/PostGIS, Redis-backed session/authorization infrastructure, and FastAPI forecasting/evidence/SciPy decision services. LP/MILP decisions use explicit stocks, units, lanes, budgets, and coverage constraints. They do not dispatch resources or infer road routes. PulseAI uses tenant-authorized read-only evidence and approved statement IDs; it does not execute generated SQL or invent facts for absent records.

Development captures and reproducible forecasting/decision benchmarks use labeled synthetic data. Forecast metrics and heuristic opportunity scores are not real-city accuracy, causal findings, or guaranteed returns. Local Solidity attestations establish digest integrity rather than source truth. Real provider/IdP/cloud rollout and production validation remain separate work.

## Image provenance

Six files were copied without editing from `docs/assets/` at the reviewed SHA into `public/projects/citypulse/`:

- `readme-dashboard.png`: actual local dashboard, synthetic development mode; the original loading/chart state remains visible.
- `readme-decision.png`: actual local Next → FastAPI → SciPy calculation on synthetic retail data; unsaved result, no dispatch.
- `readme-verification.png`: actual empty/loading backend-evidence and no-chain-connection state, preserved as captured.
- `pulseai-desktop.png`: actual initial local analyst view before analytical records are retrieved.
- `pulseai-mobile.png`: actual initial local mobile analyst view with context controls.
- `model-comparison.png`: actual repository-generated synthetic evaluation figure, not an application screenshot.

The first three captures have dimensions 1440×1000 and are recorded in the source [capture manifest](https://github.com/manikantbindass/CityPulse/blob/2385ea7a3c6f9349c9c9ee67a56ace5f279fa992/docs/assets/readme-provenance.json). Their expected SHA256 values are:

| File | SHA256 |
|---|---|
| readme-dashboard.png | 3ec1a063919d52f3058262480b8403d6c22e217cba164370652cdf2947609a4b |
| readme-decision.png | 27ca2707dbd23daf63be78a6c5afd26b017cad5cf56eb384de75c07c35627c00 |
| readme-verification.png | ae5d060ea162ba0a097e04a5c1dda995891659a618abbd223514eac22a9d2944 |

The gallery captions distinguish samples, unavailable states, local computation, and the research figure. The portfolio now includes 37 repository images across eight projects, plus the existing separately labeled MathLens and LedgerShield illustrations.

## Motion and ordering

`CityPulseGlassHero.tsx` adds a decorative isometric glass city to the rounded case-study header and homepage preview. Moving street signals, soft map pulses, lit windows, and a floating chart illustrate evidence flowing into decisions; they are not live city telemetry. Unique per-instance SVG IDs avoid gradient collisions. Both instances have independent pause controls outside navigation links; reduced motion stops animation, and reduced transparency removes the decorative background.

The Portfolio README's existing top and bottom glass artwork gains small skyline and data-signal motifs in the established navy/lavender/teal palette. New motion has reduced-motion fallbacks. The CityPulse source repository README is unchanged.

The shared `lib/project-order.ts` keeps DSA Preparation, ChainPass, and RAG Knowledge Assistant in positions 1–3. CityPulse is the newest unpinned project and raises the project total to 18. The homepage's `30+` public-repository display is preserved.

## Portfolio validation

All 14 portfolio tests passed. Targeted ESLint and the production Webpack build passed, including TypeScript and generation of all 30 routes. Generated HTML checks confirmed 18 unique project cards, the three permanent pins followed by CityPulse, separate pause controls outside navigation links, source capture/report data, the sitemap entry, and the unchanged `30+` repository display. The first three screenshot hashes match the recorded source manifest. Copied images, both refreshed README banners, and a static render of the actual generated city SVG were inspected. No fresh browser interaction pass is claimed.
