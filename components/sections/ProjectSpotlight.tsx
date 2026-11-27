"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Rotate3D } from "lucide-react";
import ProjectVisual from "@/components/ProjectVisual";
import { isProjectPinned } from "@/lib/project-order";
import { projects } from "@/lib/projects";
import styles from "./ProjectSpotlight.module.css";

const pinnedProjects = projects.filter(({ slug }) => isProjectPinned(slug));

export default function ProjectSpotlight() {
  const [selected, setSelected] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const project = pinnedProjects[selected];

  if (!project) return null;

  return (
    <section className={styles.spotlight} aria-labelledby="spotlight-heading">
      <header className={styles.header}>
        <h3 id="spotlight-heading">Pinned project spotlight</h3>
        <div className={styles.selector} role="group" aria-label="Choose a pinned project">
          {pinnedProjects.map(({ slug, title }, index) => (
            <button
              key={slug}
              type="button"
              aria-pressed={selected === index}
              onClick={() => {
                setSelected(index);
                setFlipped(false);
              }}
            >
              {title}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.details}>
          <div className={styles.perspective}>
            <div id="spotlight-details" className={styles.faces} data-flipped={flipped}>
              <div className={styles.front} aria-hidden={flipped}>
                <p className={styles.label}>{project.categories[0]}</p>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
              <div className={styles.back} aria-hidden={!flipped}>
                <p className={styles.label}>{project.title}</p>
                <h4>Architecture</h4>
                <p>{project.caseStudy.architectureSummary}</p>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              aria-controls="spotlight-details"
              aria-expanded={flipped}
              onClick={() => setFlipped((value) => !value)}
            >
              <Rotate3D size={17} aria-hidden />
              {flipped ? "Show overview" : "Show architecture"}
            </button>
            <Link href={`/projects/${project.slug}`} prefetch={false}>
              Read case study <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
        <Link
          className={styles.preview}
          key={project.slug}
          href={`/projects/${project.slug}`}
          prefetch={false}
          aria-label={`Preview ${project.title} case study`}
        >
          <ProjectVisual project={project} showStudyBreak={false} />
        </Link>
      </div>
    </section>
  );
}
