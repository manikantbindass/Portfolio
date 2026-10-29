"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import { projects, projectCategories } from "@/lib/projects";
import { isProjectPinned, pinnedProjectSlugs } from "@/lib/project-order";
import { ArrowUpRight, Search, SlidersHorizontal, X, Pause, Play } from "lucide-react";
import DsaChaseScene from "@/components/DsaChaseScene";
import dsaStyles from "@/components/DsaChaseScene.module.css";
import mathStyles from "@/components/MathLensGlassHero.module.css";
import ledgerStyles from "@/components/LedgerShieldGlassHero.module.css";
import cityStyles from "@/components/CityPulseGlassHero.module.css";

export default function Projects() {
  const [category, setCategory] = useState("All Projects");
  const [query, setQuery] = useState("");
  const [mathPaused, setMathPaused] = useState(false);
  const [ledgerPaused, setLedgerPaused] = useState(false);
  const [cityPaused, setCityPaused] = useState(false);
  const filtered = projects.filter(
    (p) =>
      (category === "All Projects" || p.categories.includes(category)) &&
      `${p.title} ${p.description} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section id="projects" className="section-pad">
      <div className="content-width">
        <div className="projects-heading">
          <div>
            <p className="section-label">Selected engineering work</p>
            <h2 className="section-heading">
              Ideas, made <span className="gradient-text">tangible.</span>
            </h2>
          </div>
          <p>
            {projects.length} repositories. {pinnedProjectSlugs.length} pinned projects.
            <br />
            Explore the decisions behind the code.
          </p>
        </div>
        <div className="project-toolbar">
          <div
            className="filter-list"
            role="group"
            aria-label="Filter projects"
          >
            <span className="filter-label"><SlidersHorizontal size={14} aria-hidden /> Browse</span>
            {projectCategories.map((c) => (
              <button
                aria-pressed={c === category}
                key={c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="project-search">
            <Search size={16} aria-hidden />
            <label className="sr-only" htmlFor="project-search-field">Search projects</label>
            <input
              id="project-search-field"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or technologies…"
              type="search"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear project search"><X size={14} aria-hidden /></button>
            )}
          </div>
        </div>
        <p className="results-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"} ·
          Pinned projects first · More projects by latest update
        </p>
        <div className="project-grid">
          {filtered.map((p, i) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.4,
                delay: Math.min((i % 3) * 0.06, 0.12),
              }}
              className={`project-card glass card-hover${p.slug === "dsa" ? ` ${dsaStyles.card}` : p.slug === "mathlens" ? ` ${mathStyles.card}` : p.slug === "autoledger" ? ` ${ledgerStyles.card}` : p.slug === "citypulse" ? ` ${cityStyles.card}` : ""}`}
              data-paused={p.slug === "mathlens" ? mathPaused : p.slug === "autoledger" ? ledgerPaused : p.slug === "citypulse" ? cityPaused : undefined}
              key={p.id}
            >
              {p.slug === "dsa" && <DsaChaseScene />}
              <Link
                className="work-preview"
                href={`/projects/${p.slug}`}
                aria-label={`Explore ${p.title} case study`}
              >
                <ProjectVisual project={p} />
                <span className="work-number" aria-hidden>{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                <span className="work-preview-action" aria-hidden><ArrowUpRight size={18} /></span>
              </Link>
              {p.slug === "mathlens" && <button type="button" className={mathStyles.cardControl} onClick={() => setMathPaused(value => !value)} aria-pressed={mathPaused} aria-label={mathPaused ? "Play MathLens card animation" : "Pause MathLens card animation"}>{mathPaused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}</button>}
              {p.slug === "autoledger" && <button type="button" className={ledgerStyles.cardControl} onClick={() => setLedgerPaused(value => !value)} aria-pressed={ledgerPaused} aria-label={ledgerPaused ? "Play LedgerShield card animation" : "Pause LedgerShield card animation"}>{ledgerPaused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}</button>}
              {p.slug === "citypulse" && <button type="button" className={cityStyles.cardControl} onClick={() => setCityPaused(value => !value)} aria-pressed={cityPaused} aria-label={cityPaused ? "Play CityPulse card animation" : "Pause CityPulse card animation"}>{cityPaused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}</button>}
              <div className="project-card-body">
                <div className="eyebrow-row">
                  <span>{p.categories[0]}</span>
                  {(isProjectPinned(p.slug) || p.featured) && (
                    <span className="featured-label">{isProjectPinned(p.slug) ? "PINNED PROJECT" : "RECENT HIGHLIGHT"}</span>
                  )}
                </div>
                <h3>
                  <Link href={`/projects/${p.slug}`}>
                    {p.title} <span>↗</span>
                  </Link>
                </h3>
                <p>{p.description}</p>
                <div className="tag-list">
                  {p.tags.length ? (
                    p.tags.slice(0, 4).map((t) => <span key={t}>{t}</span>)
                  ) : (
                    <span>Project brief · planned workflow</span>
                  )}
                </div>
                <div className="project-links">
                  <Link href={`/projects/${p.slug}`}>Explore Case Study →</Link>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} GitHub repository`}
                  >
                    GitHub ↗
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      Demo ↗
                    </a>
                  )}
                  {p.release && (
                    <a href={p.release.url} target="_blank" rel="noopener noreferrer">Downloads ↗</a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {!filtered.length && (
          <p className="empty-state">
            No matching projects. Try another technology or clear the filter.
            <button className="button" type="button" onClick={() => { setCategory("All Projects"); setQuery(""); }}>Show all projects <ArrowUpRight size={14} aria-hidden /></button>
          </p>
        )}
      </div>
    </section>
  );
}
