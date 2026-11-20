# RemoteShield X portfolio refresh

Reviewed 20 November 2026, main `c79bce044737bad8020ea1122417b07f29c3f847` in [RdPBrowser](https://github.com/manikantbindass/RdPBrowser). This updates the existing `remoteshield` entry and route. Project count stays 20; DSA Preparation, ChainPass and RAG remain the fixed first three. The latest unpinned entry is RemoteShield. Six recent highlights remain.

The [source-only release](https://github.com/manikantbindass/RdPBrowser/releases/tag/source-2.5.0-2026-11-20) pins the same main SHA and contains no production installer assets. Its notes link the passing preview attempt 2 at application SHA `218d8e2637ffdccec4b35226d1842ade8cc4b48c`; subsequent main changes are documentation. Preview binaries have reserved test origins, GitHub sign-in/retention limits and a disposable Android signer. The source quality run 44674520821 has 13 successful jobs including the required quality gate. Older README and audit snapshots record previous failing security checks; these are not restated as current failures. Signed distribution, physical Android, live provider handoff, and per-platform packet acceptance remain pending. No hosted application URL is supplied; the repository homepage points to GitHub itself.

Four captures copied unchanged from `assets/readme/`:

| File | Git blob SHA | Context |
| --- | --- | --- |
| desktop-browser.png | `6a22eecefe217254daaa85be4dd0970aafe20771` | Archived Windows debug app at ae49ba4; illustrative infrastructure labels |
| admin-dashboard.png | `fe18785bc81a657ee6dc3b6d5ba04778d6a2128a` | Real Express/PostgreSQL console with disposable seeded records |
| device-management.png | `b5b5539ba15cdc208985453788cd1522d373a22b` | Real lab device enrollment inventory |
| policy-management.png | `6f7a97458cc538e7dbb6e3f947206cca3da24cf6` | Real API-created, assigned and revised lab policy |

Repository [capture ledger](https://github.com/manikantbindass/RdPBrowser/blob/c79bce044737bad8020ea1122417b07f29c3f847/assets/readme/SCREENSHOTS.md). Android browsing is not illustrated with a fabricated capture. This brings source image coverage to 49 images across eleven projects. The committed PDF report and PowerPoint briefing are linked directly; their dated evidence remains separate from current CI.

`RemoteShieldGlassHero.tsx` supplies conceptual, code-native browser/mobile/shield artwork, distinct moving paths and independent pause controls. The card displays the real desktop interface above a compact animated strip; the header keeps the rounded frosted glass format and existing colors. Motion respects reduced-motion preferences; the glass header respects reduced transparency. SVG IDs are unique and controls remain outside navigation anchors. This animation illustrates component boundaries, not packet-level verification. Portfolio README header/footer gain matching browser/lock motion. The source repository is unchanged.

Validation: 17 project/statistics tests and targeted ESLint passed. Static HTML checks confirm the existing 20 routes, fixed pins followed by RemoteShield, actual UI image, separate card/header pause controls, source-only release, report/briefing links and `30+` hero. Dark/light SVG and README banner renders were inspected. Browser QA at the default viewport verified header pause state, Gallery contents, homepage search, card pause/resume, and dark/light card appearance. The initial build completed generation but stopped for a Next.js security upgrade notice; the same build was retried as directed by the tool.
The retry completed successfully and generated all 32 static pages. Next.js 16.4.3 continues to recommend a security upgrade; dependencies were not changed in this content/design update.
