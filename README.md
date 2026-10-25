# Manikant Kumar — Engineering Portfolio

A Next.js 16, React, TypeScript, Tailwind, and Framer Motion portfolio with a cosmic glass interface in dark and light themes. The signature technology marquees, scroll-driven moon, typewriter, floating navigation, custom cursor, and portfolio guide are preserved.

## Run locally

Use Node.js 24 LTS and npm with the checked-in lockfile.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

For a running local server, `node scripts/smoke.mjs` validates every case study, all resume routes and PDF responses, screenshot files, metadata endpoints, API labels, and unknown-route 404s. Set `PORTFOLIO_TEST_URL` when using a port other than 3000.

## Project showcase

Six recent highlights are selected from GitHub's public `pushed_at` timestamps, captured on 25 October 2026. FlowNovaAI was added as project 16 at the owner's request; its README-only status is explicit.

| Project                            | Case study                  | Highlight        | Repository captures |
| ---------------------------------- | --------------------------- | ---------------- | ------------------: |
| AutoHealOps                        | `/projects/autohealops`     | Recent highlight |                   4 |
| FlowNovaAI                         | `/projects/flownova`        | Recent highlight |                   0 |
| DSA Preparation                    | `/projects/dsa`             | Recent highlight |                   0 |
| TraceHunt AI                       | `/projects/tracehunt`       | Recent highlight |                   3 |
| FinovaIQ                           | `/projects/finovaiq`        | Recent highlight |                   2 |
| FlowPilot                          | `/projects/flowpilot`       | Recent highlight |                   0 |
| ChainPass                          | `/projects/chainpass`       |                  |                   4 |
| LeetCode AI Sync                   | `/projects/leetcode-sync`   |                  |                   0 |
| Enterprise RAG Knowledge Assistant | `/projects/enterprise-rag`  |                  |                   0 |
| RemoteShield X                     | `/projects/remoteshield`    |                  |                   0 |
| Intramind.AI                       | `/projects/intramind`       |                  |                   0 |
| MetaRole.AI                        | `/projects/metarole`        |                  |                   0 |
| SecureRxChain                      | `/projects/securerx`        |                  |                   0 |
| SolGuard AI                        | `/projects/solguard`        |                  |                   0 |
| AutoLedger AI                      | `/projects/autoledger`      |                  |                   0 |
| AI-Adaptive Linux Scheduler        | `/projects/linux-scheduler` |                  |                   0 |

`lib/projects.json` holds editorial content, stack, implementation boundaries, pinned source links, and genuine screenshot provenance. `lib/projects.ts` defines its type. Detail routes are statically generated and support refresh/direct navigation. Tabs support arrow keys, Home, and End; the native gallery dialog supports focus containment, arrows, and Escape.

The local source audit is recorded in `docs/repository-audit.json`. Badges, decorative banners, and generic hero assets are not passed off as application screenshots. When no genuine capture is available, the UI uses a labeled source diagram. README diagrams are available where found.

## Three resumes

| Focus      | Preview               | Original PDF copy                        |
| ---------- | --------------------- | ---------------------------------------- |
| Full Stack | `/resumes/full-stack` | `/resumes/manikant-kumar-full-stack.pdf` |
| DevOps     | `/resumes/devops`     | `/resumes/manikant-kumar-devops.pdf`     |
| AI / ML    | `/resumes/ai-ml`      | `/resumes/manikant-kumar-ai-ml.pdf`      |

The supplied PDF bytes are unchanged. Their historical solved counts and CGPAs therefore remain as authored. Manikant confirmed **7.49** as the current CGPA for the website. The site uses **Vadodara, Gujarat** and **2023–2027**, consistent across the three resumes. Native embedded PDF preview depends on browser support; visible Download and Open PDF actions remain available on mobile.

## Verified statistics

- `/api/leetcode` queries the official LeetCode GraphQL endpoint and validates all difficulty counts and their sum. A missing contest rating is omitted rather than invented.
- `/api/github` uses the public GitHub REST API. Languages represent primary-language counts of non-fork public repositories, not invented byte percentages.
- Successful responses are cached server-side for six hours. Verification timestamps describe when data was actually fetched, not when a cached response was served.
- Both endpoints fall back to `lib/stats-snapshot.json` with the explicit `verified snapshot` label. No failed request is labeled live.
- The 25 October 2026 verified snapshot contains **526 solved** (136 Easy, 280 Medium, 110 Hard), contest rating **2579.723**, **250 public repositories**, and **48 followers**.
- A shared provider keeps hero metrics, the stats section, and chatbot answers consistent.

No API token is required. Public provider outages and GitHub rate limits are expected failure modes. The optional contribution calendar is supplied by ghchart and labeled independently.

## Portfolio guide and contact

The guide retains the cost-free curated-answer architecture. It does not claim to be a live LLM. Answers derive from the same project, resume, profile, and statistics data as the website; user text is rendered as React text instead of injected HTML.

The contact form validates fields and opens an email draft. It explicitly requires the visitor to send that draft in their email client; it does not claim delivery or an unimplemented backend submission.

## Existing Vercel project

Keep the existing Vercel project and domain: https://portfolio-ten-omega-4ibkho6f7u.vercel.app/

The repository remains a normal Next.js App Router project. Use `npm ci` and `npm run build`; no new secrets or environment settings are needed. PR #1 was merged into `main` with the owner's authorization on 25 October 2026 (commit `d2a213096d6f8d5e50723ea23978c331b5ef7150`). The existing Vercel GitHub integration deployed it successfully to the existing domain. All 16 project routes, three resume previews/downloads, metadata endpoints, and statistics APIs passed production smoke checks. Future updates to `main` use this same deployment workflow.

See `docs/DELIVERY.md` for validation and remaining limitations.
