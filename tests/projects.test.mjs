import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const projects = JSON.parse(
  fs.readFileSync(new URL("../lib/projects.json", import.meta.url), "utf8"),
);
test("every project has substantive case-study sections with pinned source references", () => {
  assert.equal(projects.length, 16);
  for (const p of projects) {
    const s = p.caseStudy;
    const sources = new Set(p.evidence.map((e) => e.path));
    assert(s.architectureSummary.length > 120, p.slug + " architecture");
    assert(
      s.features.length >= 3 &&
        s.technologies.length >= 3 &&
        s.decisions.length >= 2 &&
        s.outcomes.length >= 2,
      p.slug + " missing section",
    );
    assert(
      s.workflow.length >= 3 && s.setup.length > 70,
      p.slug + " workflow/setup",
    );
    for (const entry of [...s.features, ...s.decisions, ...s.outcomes]) {
      assert(
        (entry.description + (entry.tradeoff ?? "")).length > 70,
        p.slug + " thin detail",
      );
      assert(sources.has(entry.source), p.slug + " unpinned detail source");
    }
    for (const tech of s.technologies) {
      assert(tech.description.length > 30, p.slug + " technology role");
      if (tech.source) assert(sources.has(tech.source));
      assert(!/Referenced in the inspected/.test(tech.description));
    }
    for (const source of p.evidence)
      assert(
        source.url.includes("/blob/" + p.sourceCommit + "/"),
        p.slug + " stale commit reference",
      );
  }
});

test("NeuroMap release links and captures preserve its local research scope", () => {
  const p = projects.find(p => p.slug === "neuromap");
  assert(p);
  assert.equal(p.live, null);
  assert.equal(p.release.version, "0.1.1");
  assert.equal(p.release.url, "https://github.com/manikantbindass/NeuroMap.AI/releases/tag/v0.1.1");
  assert.equal(p.screenshots.length, 5);
  for (const capture of p.screenshots) {
    assert(fs.existsSync(new URL("../public" + capture.src, import.meta.url)));
    assert(capture.source.includes("/blob/" + p.sourceCommit + "/"));
  }
  assert(p.resources.some(r => r.url.endsWith(".apk")));
  assert(p.resources.some(r => r.url.endsWith(".exe")));
  assert(!p.resources.some(r => r.url.endsWith(".ipa")));
  assert(p.challenges.some(text => text.includes("synthetic tabular")));
  assert(p.challenges.some(text => text.includes("No hosted public deployment")));
});
test("project-specific explanations are not shared placeholder paragraphs", () => {
  const text = projects.flatMap((p) =>
    p.caseStudy.features.map((f) => f.description),
  );
  assert.equal(new Set(text).size, text.length);
  const renderer = fs.readFileSync(
    new URL("../components/ProjectDetails.tsx", import.meta.url),
    "utf8",
  );
  for (const filler of [
    "Implementation has not been published in this repository.",
    "Referenced in the inspected source or project configuration.",
    "See the pinned source files and README for the implementation",
  ])
    assert(!renderer.includes(filler));
});
test("FlowNova describes its hosted implementation with real captures and runtime boundaries", () => {
  const p = projects.find((p) => p.id === "flownova");
  assert.equal(p.contentStage, "source");
  assert.equal(p.live, "https://flownova-ai.vercel.app");
  assert.equal(p.screenshots.length, 9);
  assert(p.caseStudy.technologies.every(t => t.stage === "source" && t.source));
  for (const capture of [...p.screenshots, p.walkthrough]) {
    assert(fs.existsSync(new URL("../public" + capture.src, import.meta.url)));
    assert(capture.source.includes("/blob/" + p.sourceCommit + "/"));
  }
  assert(p.challenges.some(text => text.includes("browser-scoped")));
  assert(p.challenges.some(text => text.includes("server configuration")));
  assert(p.resources.some(link => link.label.includes("PDF")));
  assert(p.resources.some(link => link.url.endsWith("/releases/latest")));
});
