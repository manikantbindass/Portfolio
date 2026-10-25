"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects, projectCategories, type Project } from "@/lib/projects";
export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const image = project.screenshots[0];
  return image ? (
    <div className="project-image">
      <Image
        src={image.src}
        alt={image.caption}
        fill
        sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 420px"
        priority={priority}
      />
      <span className="capture-label">REPOSITORY CAPTURE</span>
    </div>
  ) : (
    <div
      className="project-diagram"
      aria-label={`${project.title} source structure visualization`}
    >
      <span className="diagram-label">
        {project.id === "flownova"
          ? "CONCEPT · IMPLEMENTATION PENDING"
          : "SOURCE STRUCTURE · NOT AN APP SCREENSHOT"}
      </span>
      <span className="diagram-title">{project.title}</span>
      <div className="diagram-nodes">
        {project.architecture.slice(0, 3).map((node, i) => (
          <span key={node}>
            <small>0{i + 1}</small>
            {node}
          </span>
        ))}
      </div>
    </div>
  );
}
export default function Projects() {
  const [category, setCategory] = useState("All Projects");
  const [query, setQuery] = useState("");
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
            16 repositories. Six recent highlights.
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
          <label className="project-search">
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or technologies…"
              type="search"
            />
          </label>
        </div>
        <p className="results-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"} ·
          Recent highlights ordered by GitHub push date
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
              className="project-card glass card-hover"
              key={p.id}
            >
              <Link
                href={`/projects/${p.slug}`}
                aria-label={`Explore ${p.title} case study`}
              >
                <ProjectVisual project={p} />
              </Link>
              <div className="project-card-body">
                <div className="eyebrow-row">
                  <span>{p.categories[0]}</span>
                  {p.featured && (
                    <span className="featured-label">RECENT HIGHLIGHT</span>
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
                    <span>README only · stack not published</span>
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
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {!filtered.length && (
          <p className="empty-state">
            No matching projects. Try another technology or clear the filter.
          </p>
        )}
      </div>
    </section>
  );
}
