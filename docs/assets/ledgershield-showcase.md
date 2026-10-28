# LedgerShield portfolio refresh

Reviewed 28 October 2026 against [05775801307e8092ffcdb411cc021c36789ec959](https://github.com/manikantbindass/ledgershield-ai/tree/05775801307e8092ffcdb411cc021c36789ec959).

## Identity and availability

The current README identifies LedgerShield as the former AutoLedgerAI project. The existing `autoledger` portfolio record and `/projects/autoledger` URL are retained and refreshed rather than creating a duplicate project. The GitHub link now uses `manikantbindass/ledgershield-ai`. The project total remains 17.

The GitHub releases collection was empty and the repository homepage was unset at review. Deployment documentation states that no automated public deployment exists. Accordingly `live` is null and there is no fabricated release/download field. Resources link to real local setup instructions, architecture, validation, matched comparison JSON, raw CSV, and CI.

[Workflow 40725570353](https://github.com/manikantbindass/ledgershield-ai/actions/runs/40725570353) completed successfully for the reviewed source commit. The repository reports 123 backend and 30 frontend tests, plus archive/API/subprocess and native/container checks. These are source-project results; they were not rerun as portfolio tests.

## Scope

The canonical runtime uses Ed25519 integer transfers, ordered atomic ledger execution, fixed-member signed vote certificates, a seeded centralized transport simulator, explainable rules/anomaly evidence, bounded trust, and mode-aware guarded recovery. The React observatory contains ten pages connected by REST/WebSockets to the local FastAPI service.

The SQL archive preserves public research records, not a resumable live consensus state machine. Local bearer roles are not deployment identity. Real peer-to-peer replicas, formal PBFT guarantees, production security, live DQN deployment, and a public financial network are not claimed.

The published matched report contains 36 actual simulator runs. The earlier offline DQN did not outperform the no-healing baseline. Synthetic detector outcomes and simulator ticks are not real-world security accuracy or hardware latency benchmarks. Gallery copy and README preserve these limits.

## Visual assets

No application screenshots exist in the reviewed tree, and source validation explicitly records fresh dashboard screenshots as pending by user choice. Existing frontend hero artwork is not treated as an app capture.

Two original SVGs were authored directly in code:

- `public/projects/ledgershield/overview.svg`: a rounded glass shield, six validator nodes, and three implemented capability groups.
- `public/projects/ledgershield/recovery.svg`: evidence, explanation, guards, verification, and rollback, with explicit research boundaries.

Both contain visible illustration labels. `visualKind: "illustration"` ensures the project card, gallery, and dialog do not describe them as application screenshots. Source links point to reviewed architecture/recovery code. The other projects' 31 real captures remain unchanged.

`LedgerShieldGlassHero.tsx` renders the theme-aware decorative SVG in the case-study header and homepage card. Slow orbital movement, moving signed-message signals, a shield scan, and a fading/recovering validator illustrate resilience. They do not show live API telemetry. Each instance uses unique SVG IDs. Card and hero have separate pause controls, reduced-motion fallbacks, and reduced-transparency behavior.

The Portfolio README's existing top/bottom artwork gains shield motifs and moving verification signals in its established navy/lavender/teal palette. Reduced-motion rules stop the new effects. The source project's README is unchanged.

## Ordering

`lib/project-order.ts` continues to pin DSA Preparation, ChainPass, and RAG Knowledge Assistant in that order. LedgerShield becomes the newest unpinned case study. Refreshing its timestamp does not change the first three positions.

## Portfolio verification

All 13 portfolio tests passed. Targeted ESLint completed without errors, and the production Webpack build passed compilation, TypeScript, and generation of all 29 routes. Generated HTML checks confirmed 17 unique project cards, the three permanent pins followed by LedgerShield, separate animation pause controls outside links, the correct repository/resources, and the unchanged `30+` homepage repository count. The two original illustrations and both README banners were rendered to PNG and inspected. No fresh browser interaction pass is claimed.
