"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import TechIcon from "@/components/ui/TechIcon";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/sections/Projects";
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
        {p.id === "flownova"
          ? "Published repository status"
          : "Architecture visualization derived from inspected source"}
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
      <p className="source-note">
        Read the pinned source links below for implementation details.
      </p>
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
        className="glass case-panel"
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
            <h3>The problem</h3>
            <p>{p.problem}</p>
            <h3>The approach</h3>
            <p>{p.solution}</p>
            <h3>Who it is for</h3>
            <p>{p.users}</p>
            <h3>Scope & status</h3>
            <p>
              {p.status}. The sections here describe the inspected commit, with
              explicit boundaries for simulations and optional integrations.
            </p>
          </>
        )}
        {active === 1 && (
          <>
            <h2>How the pieces connect</h2>
            {architecture}
            {p.architectureReference && (
              <details className="repository-diagram">
                <summary>
                  Original architecture diagram from the repository README
                </summary>
                <pre>{p.architectureReference}</pre>
                <a
                  href={`${p.github}/blob/${p.sourceCommit}/README.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the original diagram ↗
                </a>
              </details>
            )}
            <h3>Architecture boundaries</h3>
            {p.challenges.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </>
        )}
        {active === 2 && (
          <>
            <h2>
              {p.id === "flownova"
                ? "Published scope"
                : "Implemented building blocks"}
            </h2>
            <ol className="feature-list">
              {p.features.map((f, i) => (
                <li key={f}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{f}</h3>
                    <p>
                      {p.id === "flownova"
                        ? "Implementation has not been published in this repository."
                        : "See the pinned source files and README for the implementation and setup requirements."}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p>{p.challenges[0]}</p>
          </>
        )}
        {active === 3 && (
          <>
            <h2>The technology behind it</h2>
            <p>
              Technologies identified in source files and dependency manifests.
              Design rationale is only stated where documented.
            </p>
            <div className="stack-grid">
              {p.tags.map((t, i) => (
                <div className="glass" key={t}>
                  <span>0{i + 1}</span>
                  <TechIcon name={t} />
                  <h3>{t}</h3>
                  <p>
                    Referenced in the inspected source or project configuration.
                  </p>
                </div>
              ))}
            </div>
            <h3>Implementation choices</h3>
            {p.technicalDetails.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
            {!p.tags.length && (
              <p>No technology stack has been published yet.</p>
            )}
          </>
        )}
        {active === 4 && (
          <>
            <h2>Inside the project</h2>
            {count ? (
              <div className="gallery-grid">
                {p.screenshots.map((s, i) => (
                  <figure key={s.src}>
                    <button
                      onClick={() => {
                        setImage(i);
                        setFullscreen(true);
                      }}
                      aria-label={`Expand ${s.caption}`}
                    >
                      <Image
                        src={s.src}
                        alt={s.caption}
                        width={1200}
                        height={760}
                        sizes="(max-width:700px) 100vw, 600px"
                        loading="lazy"
                      />
                    </button>
                    <figcaption>
                      {s.caption} ·{" "}
                      <a
                        href={s.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source ↗
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <>
                <p>
                  No genuine application screenshots were found in the inspected
                  repository. This is a source structure visualization, not a
                  fabricated UI.
                </p>
                {architecture}
              </>
            )}
          </>
        )}
        {active === 5 && (
          <>
            <h2>Engineering trade-offs & limits</h2>
            {p.challenges.map((c) => (
              <p key={c}>{c}</p>
            ))}
            <p>
              These notes describe observable implementation boundaries. No
              personal anecdotes, benchmark improvements, or security guarantees
              are inferred.
            </p>
          </>
        )}
        {active === 6 && (
          <>
            <h2>Source, status, and next steps</h2>
            <p>{p.status}</p>
            <p>{p.challenges[0]}</p>
            <p>
              Repository source reviewed at commit{" "}
              <code>{p.sourceCommit.slice(0, 12)}</code>. This review does not
              constitute end-to-end validation of the project’s external
              services.
            </p>
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
                  Demo · HTTP availability verified ↗
                </a>
              )}
            </div>
            <p>
              No measured impact, revenue, or user-count claims are supplied.
            </p>
          </>
        )}
        <aside className="evidence">
          <h3>Inspect the evidence</h3>
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
