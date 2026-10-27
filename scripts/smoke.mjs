import fs from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.PORTFOLIO_TEST_URL ?? "http://localhost:3000";
const projects = JSON.parse(await fs.readFile("lib/projects.json", "utf8"));
assert.equal(projects.length, 17);
assert.equal(projects.filter((p) => p.featured).length, 6);
assert.equal(new Set(projects.map((p) => p.slug)).size, 17);
const routes = [
  "/",
  "/robots.txt",
  "/sitemap.xml",
  "/opengraph-image",
  ...projects.map((p) => `/projects/${p.slug}`),
  ...["full-stack", "devops", "ai-ml"].map((s) => `/resumes/${s}`),
];
for (const path of routes) {
  const r = await fetch(base + path);
  assert.equal(r.status, 200, path);
  if (path.startsWith("/projects/")) {
    const text = await r.text();
    assert(text.includes('role="tablist"'), path + " missing tabs");
    assert(
      text.includes("Engineering case study"),
      path + " missing case study",
    );
  }
  console.log("PASS", path);
}
for (const file of [
  "manikant-kumar-full-stack.pdf",
  "manikant-kumar-devops.pdf",
  "manikant-kumar-ai-ml.pdf",
]) {
  const r = await fetch(`${base}/resumes/${file}`);
  assert.equal(r.status, 200, file);
  assert(r.headers.get("content-type").includes("application/pdf"));
  assert.equal(
    Buffer.from(await r.arrayBuffer())
      .subarray(0, 5)
      .toString(),
    "%PDF-",
  );
  console.log("PASS PDF", file);
}
for (const p of projects)
  for (const s of p.screenshots) {
    assert((await fs.stat("public" + s.src)).size > 1000, s.src);
  }
for (const api of ["leetcode", "github"]) {
  const r = await fetch(`${base}/api/${api}`);
  assert.equal(r.status, 200);
  const data = await r.json();
  assert(["verified snapshot", "cached API response"].includes(data.source));
  assert(!Number.isNaN(Date.parse(data.verifiedAt)));
  if (api === "leetcode") {
    assert.equal(data.total, data.easy + data.medium + data.hard);
    assert(data.total >= 0);
  } else assert(data.repos >= 0);
  console.log("PASS API", api, data.source);
}
assert.equal((await fetch(base + "/projects/not-a-real-project")).status, 404);
assert.equal((await fetch(base + "/resumes/not-a-real-resume")).status, 404);
console.log(
  "All route, PDF, asset, metadata, API and missing-route checks passed.",
);
