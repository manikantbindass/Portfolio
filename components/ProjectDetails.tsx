"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ProjectTechnologyStack from "@/components/ProjectTechnologyStack";
import type { Project } from "@/lib/projects";
import ProjectVisual from "@/components/ProjectVisual";
const tabs = [
  "Overview",
  "Architecture",
  "Features",
  "Technology Stack",
  "Gallery",
  "Engineering Challenges",
  "Results and Links",
];
export default function ProjectDetails({ project: p }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [image, setImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const count = p.screenshots.length;
  const study = p.caseStudy;
  const concept = p.contentStage === "concept";
  const sourceLink = (path?: string) =>
    path ? (
      <a
        className="detail-source"
        href={`${p.github}/blob/${p.sourceCommit}/${path}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {concept ? "Project brief" : "View source"} ↗ <span>{path}</span>
      </a>
    ) : null;
  useEffect(() => {
    if (fullscreen) {
      priorFocus.current = document.activeElement as HTMLElement;
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
      priorFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);
  function tabKey(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  }
  const architecture = (
    <figure className="architecture-figure">
      <figcaption>
        {concept ? "Proposed workflow architecture" : "System workflow"}
      </figcaption>
      <div>
        {p.architecture.map((node, i) => (
          <div key={node}>
            <span>0{i + 1}</span>
            <p>{node}</p>
            {i < p.architecture.length - 1 && <b aria-hidden>↓</b>}
          </div>
        ))}
      </div>
    </figure>
  );
  return (
    <>
      <div className="case-visual">
        <ProjectVisual project={p} priority />
      </div>
      <div
        className="case-tabs"
        role="tablist"
        aria-label="Project case study sections"
      >
        {tabs.map((name, i) => (
          <button
            key={name}
            role="tab"
            id={`tab-${i}`}
            aria-controls={`panel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => tabKey(e, i)}
          >
            {name}
          </button>
        ))}
      </div>
      <section
        className={`glass case-panel${active === 3 ? " case-panel--technology" : ""}`}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        {active === 0 && (
          <>
            <p className="section-label">01 / Overview</p>
            <h2>{p.subtitle}</h2>
            <p>{p.description}</p>
            <div className="case-context-grid">
              <article>
                <h3>The problem</h3>
                <p>{p.problem}</p>
              </article>
              <article>
                <h3>The approach</h3>
                <p>{p.solution}</p>
              </article>
            </div>
            <h3>Who it is for</h3>
            <p>{p.users}</p>
            <h3>{concept ? "Proposed user journey" : "A typical workflow"}</h3>
            <ol className="workflow-list">
              {study.workflow.map((step, i) => (
                <li key={step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <div className="project-scope">
              <span className="scope-label">Project status</span>
              <p>{p.status}</p>
              {concept && (
                <p>
                  The public repository is a project brief. The design and
                  technology suggestions in this case study are explicitly
                  proposed.
                </p>
              )}
            </div>
          </>
        )}
        {active === 1 && (
          <>
            <p className="section-label">02 / Architecture</p>
            <h2>
              {concept
                ? "A proposed execution model"
                : "How the pieces connect"}
            </h2>
            <p>{study.architectureSummary}</p>
            {architecture}
            <h3>{concept ? "Design notes" : "Implementation details"}</h3>
            {p.technicalDetails.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
            <h3>Source modules</h3>
            <div className="module-links">
              {p.evidence
                .filter((e) => !e.path.toLowerCase().endsWith("readme.md"))
                .map((e) => (
                  <div key={e.path}>{sourceLink(e.path)}</div>
                ))}
            </div>
            {p.architectureReference && (
              <details className="repository-diagram">
                <summary>Repository README architecture reference</summary>
                <p className="source-note">
                  The original diagram describes the repository’s design. The
                  implementation details above explain which parts are connected
                  in the reviewed code.
                </p>
                <pre>{p.architectureReference}</pre>
                {sourceLink("README.md")}
              </details>
            )}
          </>
        )}
        {active === 2 && (
          <>
            <p className="section-label">03 / Features</p>
            <h2>
              {concept
                ? "Planned product capabilities"
                : "What the project does"}
            </h2>
            {concept && (
              <p>
                These are proposed milestones for the published workflow-builder
                idea.
              </p>
            )}
            <ol className="feature-list">
              {study.features.map((feature, i) => (
                <li key={feature.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    {sourceLink(feature.source)}
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
        {active === 3 && (
          <ProjectTechnologyStack technologies={study.technologies} concept={concept} githubUrl={p.github} sourceCommit={p.sourceCommit} />
        )}
        {active === 4 && (
          <>
            <p className="section-label">05 / Gallery</p>
            <h2>
              {count
                ? "Inside the application"
                : concept
                  ? "Workflow design study"
                  : "Architecture & source explorer"}
            </h2>
            {count ? (
              <>
                <p>
                  Application captures committed in the repository. Captions
                  identify demo data where shown.
                </p>
                <div className="gallery-grid">
                  {p.screenshots.map((shot, i) => (
                    <figure key={shot.src}>
                      <button
                        onClick={() => {
                          setImage(i);
                          setFullscreen(true);
                        }}
                        aria-label={`Expand ${shot.caption}`}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.caption}
                          width={1200}
                          height={760}
                          sizes="(max-width:700px) 100vw, 600px"
                          loading="lazy"
                        />
                      </button>
                      <figcaption>
                        {shot.caption} ·{" "}
                        <a
                          href={shot.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Original capture ↗
                        </a>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>
                  {concept
                    ? "The brief has no application capture. This visual outlines a proposed build direction."
                    : "Explore the project through its system workflow and source modules. Application screenshots are not available in the reviewed repository."}
                </p>
                {architecture}
                <div className="gallery-source-grid">
                  {study.features.slice(0, 4).map((feature) => (
                    <article className="glass" key={feature.title}>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                      {sourceLink(feature.source)}
                    </article>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {active === 5 && (
          <>
            <p className="section-label">06 / Engineering Challenges</p>
            <h2>Decisions & trade-offs</h2>
            <div className="decision-list">
              {study.decisions.map((decision) => (
                <article key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.description}</p>
                  <div className="decision-tradeoff">
                    <span>Trade-off</span>
                    <p>{decision.tradeoff}</p>
                  </div>
                  {sourceLink(decision.source)}
                </article>
              ))}
            </div>
          </>
        )}
        {active === 6 && (
          <>
            <p className="section-label">07 / Results and Links</p>
            <h2>
              {concept
                ? "Project brief & next milestones"
                : "Deliverables & running the project"}
            </h2>
            {study.outcomes.map((outcome) => (
              <article className="case-outcome" key={outcome.title}>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
                {sourceLink(outcome.source)}
              </article>
            ))}
            <h3>
              {study.commands.length
                ? "Start locally"
                : "Explore the repository"}
            </h3>
            <p>{study.setup}</p>
            {study.commands.length > 0 && (
              <pre className="setup-commands">
                <code>{study.commands.join("\n")}</code>
              </pre>
            )}
            <div className="resume-actions">
              <a
                className="button primary"
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository ↗
              </a>
              {p.live && (
                <a
                  className="button"
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open demo ↗
                </a>
              )}
            </div>
            <p className="source-note">
              Source snapshot{" "}
              <a
                href={`${p.github}/tree/${p.sourceCommit}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.sourceCommit.slice(0, 12)} ↗
              </a>{" "}
              · Reviewed {p.verifiedAt.slice(0, 10)}. Setup instructions
              describe the repository; external services were not deployed as
              part of this portfolio update.
            </p>
          </>
        )}
        <aside className="evidence">
          <h3>Project references</h3>
          {p.evidence.map((e) => (
            <a
              key={e.path}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {e.path} ↗
            </a>
          ))}
        </aside>
      </section>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        onCancel={() => setFullscreen(false)}
        onClose={() => setFullscreen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setImage((i) => (i + 1) % count);
          if (e.key === "ArrowLeft") setImage((i) => (i + count - 1) % count);
        }}
        aria-label={`${p.title} screenshot gallery`}
      >
        {count > 0 && (
          <>
            <div className="lightbox-actions">
              <button
                className="button"
                onClick={() => setImage((i) => (i + count - 1) % count)}
              >
                ← Previous
              </button>
              <span>
                {image + 1} / {count}
              </span>
              <button
                className="button"
                onClick={() => setImage((i) => (i + 1) % count)}
              >
                Next →
              </button>
              <button
                className="button"
                autoFocus
                onClick={() => setFullscreen(false)}
              >
                Close ×
              </button>
            </div>
            <Image
              src={p.screenshots[image].src}
              alt={p.screenshots[image].caption}
              width={1800}
              height={1100}
              sizes="95vw"
            />
            <p>{p.screenshots[image].caption}</p>
          </>
        )}
      </dialog>
    </>
  );
}
