import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const projects = JSON.parse(
  fs.readFileSync(new URL("../lib/projects.json", import.meta.url), "utf8"),
);
test("every project has substantive case-study sections with pinned source references", () => {
  assert.equal(projects.length, 15);
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
test("FlowNova proposed design remains separate from source-confirmed technology", () => {
  const p = projects.find((p) => p.id === "flownova");
  assert.equal(p.contentStage, "concept");
  assert.equal(p.tags.length, 0);
  assert(
    p.caseStudy.technologies.every((t) => t.stage === "proposed" && !t.version),
  );
  assert(p.caseStudy.architectureSummary.includes("proposed"));
  assert(!p.architecture.some((n) => /not.*published/i.test(n)));
});
