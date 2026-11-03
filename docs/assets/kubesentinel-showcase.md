# KubeSentinel AI portfolio integration

Reviewed 4 November 2026 against [c10b24d50cf131db73441c6590468903db0ec332](https://github.com/manikantbindass/KubeSentinel-AI/tree/c10b24d50cf131db73441c6590468903db0ec332), branch `codex/phase-11-portfolio`, open [PR #14](https://github.com/manikantbindass/KubeSentinel-AI/pull/14).

## Source and release boundary

Main at `650ee4a` contains only README and LICENSE. The implemented application and infrastructure are in stacked, unmerged phase branches. The portfolio links to the exact reviewed implementation revision and identifies its status in the hero, overview, setup, challenges, and resources. No source-project branch was merged or changed.

The repository has no published GitHub release or public homepage/demo. Its release checklist explicitly records v1.0.0 as blocked/unpublished due to image/dependency security findings. `live` remains null and no release field is fabricated. AWS infrastructure is undeployed source, not a running environment.

Fresh workflows for the reviewed SHA showed Foundation checks, Anomaly detection, Operations dashboard, Local Kubernetes, Terraform static checks, and Safe resilience checks successful. Secure delivery checks failed. Observability acceptance and Recovery operator were still running when checked. The source validation report distinguishes local checks, historical CI, and remaining final-commit evidence. Portfolio copy does not claim an all-green source release.

## Implemented scope

The development branch includes the Next.js/FastAPI/PostgreSQL/Redis workspace, real-mode collection and isolated synthetic partition, observability ingestion, advisory detector comparisons, read-only correlation/runbook retrieval, and a Go recovery operator. Native workload UID/generation/evidence, deterministic policy, scoped RBAC, maintenance/replica/budget guards, immutable signed approval, verification, and bounded undo control actions. ML and investigation cannot directly mutate a cluster.

The reference detector evaluation is tiny and synthetic. Rules outperform comparison models. Eight lab action records are outcomes, not eight independent successful recoveries. The 900-request health benchmark excludes database/queue/cluster saturation. No calibrated incident probability, production SLO, repeated recovery improvement, AWS cost saving, or general exactly-once recovery guarantee is claimed.

## Image provenance

Seven PNGs were copied unchanged from the reviewed branch into `public/projects/kubesentinel/`:

| Local file | Source file | Meaning |
|---|---|---|
| dashboard.png | docs/portfolio/figures/dashboard-crop.png | Source-authored crop of the actual Phase 07 desktop capture, retaining the synthetic banner |
| tablet.png | docs/screenshots/phase-07/tablet.png | Actual synthetic-demo tablet workspace |
| mobile.png | docs/screenshots/phase-07/mobile.png | Actual synthetic-demo mobile workspace |
| cluster-overview.png | docs/screenshots/observability/cluster-overview.png | Actual disposable Linux kind-cluster capacity and namespace telemetry |
| namespace-workload.png | docs/screenshots/observability/namespace-workload.png | Actual local workload restarts, readiness, replicas, and OOM fault |
| incident-timeline.png | docs/screenshots/observability/incident-timeline.png | Actual durable incident counts and Loki JSON logs from the local CI cluster |
| load.png | docs/portfolio/figures/load.png | Recorded Windows loopback HTTP health trials; research figure, not an application screenshot |

The source [observability capture guide](https://github.com/manikantbindass/KubeSentinel-AI/blob/c10b24d50cf131db73441c6590468903db0ec332/docs/screenshots/observability/README.md) identifies Linux kind run 41562202925 and its source revision. These are historical local CI captures, not AWS or production. No-data panels remain unchanged.

The [portfolio build guide](https://github.com/manikantbindass/KubeSentinel-AI/blob/c10b24d50cf131db73441c6590468903db0ec332/docs/portfolio/README.md) explains the dashboard crop and evidence-derived figures. Source manifests link charts to measured inputs and explicitly list missing experiments. The portfolio now contains 44 repository images across nine projects, plus separately labeled MathLens/LedgerShield illustrations.

## Documents and visuals

Resources link to the real 25-slide editable PowerPoint, 22-page technical report, 25-page slide PDF, operations guide, validation matrix, release checklist, and implementation PR. These are documentation artifacts, not software installers or a published release.

`KubeSentinelGlassHero.tsx` supplies decorative cluster motion to the rounded case-study header and homepage card. Layered glass planes, a central cube, floating workload cubes, and moving evidence signals use existing navy/lavender/teal theme tokens. They are not live telemetry. Per-instance SVG IDs avoid gradient collisions. Independent pause buttons sit outside navigation links; reduced motion stops animation and reduced transparency hides decorative backgrounds.

The Portfolio README's top and bottom local SVGs gain cluster-cube motifs with CSS motion and reduced-motion fallbacks. Other existing city, math, and security motifs remain. The KubeSentinel source README is unchanged.

## Ordering

DSA Preparation, ChainPass, and RAG Knowledge Assistant remain pinned at 1–3 through `lib/project-order.ts`. KubeSentinel is the newest unpinned case study. The project count becomes 19; the homepage public-repository display remains `30+`.

## Portfolio verification

All 15 portfolio tests passed. Targeted ESLint and the production Webpack build passed, including TypeScript and generation of all 31 routes. Generated HTML checks confirmed 19 unique cards, the three permanent pins followed by KubeSentinel, separate animation pause controls outside links, the reviewed implementation/report/image references, unpublished status, sitemap entry, and unchanged `30+` repository display. All seven local images match their Git blob hashes at the reviewed source SHA. Source captures, both README banners, and dark/light static renders of the actual generated cluster SVG were inspected. A connector defect found during visual review was corrected and the build rerun successfully. No fresh browser motion/interaction pass is claimed.
