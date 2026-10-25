"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, FileSearch, Layers3, Network } from "lucide-react";
import { projects } from "@/lib/projects";
import styles from "./BuildStudio.module.css";

const tracks = [
  { slug: "enterprise-rag", label: "Document intelligence", Icon: FileSearch, featureByStep: [0, 0, 1, 1] },
  { slug: "tracehunt", label: "Service observability", Icon: Braces, featureByStep: [0, 1, 2, 3] },
  { slug: "chainpass", label: "Web3 ticketing", Icon: Network, featureByStep: [0, 0, 1, 3] },
] as const;

export default function BuildStudio() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const track = tracks[active];
  const project = projects.find((item) => item.slug === track.slug)!;
  const feature = project.caseStudy.features[track.featureByStep[step]];

  function selectTrack(index: number) {
    setActive(index);
    setStep(0);
  }

  return (
    <section id="build" className={`section-pad ${styles.section}`} aria-labelledby="build-heading">
      <div className="content-width">
        <div className={styles.heading}>
          <div>
            <p className="section-label">Inside the build</p>
            <h2 id="build-heading" className="section-heading">Follow the idea.<br /><span className="gradient-text">Explore the system.</span></h2>
          </div>
          <p className={styles.intro}>A closer look at how information moves through three projects. Choose a system, then follow its workflow.</p>
        </div>

        <div className={styles.tracks} role="tablist" aria-label="Explore a project workflow">
          {tracks.map(({ slug, label, Icon }, index) => (
            <button
              type="button"
              key={slug}
              role="tab"
              id={`build-tab-${index}`}
              aria-selected={active === index}
              aria-controls="build-workspace"
              tabIndex={active === index ? 0 : -1}
              onClick={() => selectTrack(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % tracks.length;
                else if (event.key === "ArrowLeft") next = (index + tracks.length - 1) % tracks.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tracks.length - 1;
                else return;
                event.preventDefault();
                selectTrack(next);
                document.getElementById(`build-tab-${next}`)?.focus();
              }}
            >
              <Icon size={16} aria-hidden />{label}
            </button>
          ))}
        </div>

        <div id="build-workspace" role="tabpanel" aria-labelledby={`build-tab-${active}`} className={`${styles.workspace} glass`} tabIndex={0}>
          <div className={styles.summary}>
            <span className={styles.kicker}><Layers3 size={14} aria-hidden /> Project walkthrough</span>
            <h3>{project.title}</h3>
            <p>{project.solution}</p>
            <div className="tag-list">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
            <Link className={styles.caseLink} href={`/projects/${project.slug}`}>Explore the full case study <ArrowUpRight size={16} aria-hidden /></Link>
          </div>

          <div className={styles.blueprint} key={project.slug}>
            <div className={styles.blueprintHeader}><span>Workflow / {String(active + 1).padStart(2, "0")}</span><span>Select a step</span></div>
            <ol className={styles.steps} aria-label={`${project.title} workflow`}>
              {project.caseStudy.workflow.map((text, index) => (
                <li key={text}>
                  <button type="button" aria-pressed={step === index} onClick={() => setStep(index)}>
                    <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <span>{text}</span>
                    <ArrowRight size={14} aria-hidden />
                  </button>
                </li>
              ))}
            </ol>
            <div className={styles.detail} aria-live="polite" aria-atomic="true">
              <span className={styles.detailLabel}>Implementation detail · {String(step + 1).padStart(2, "0")}</span>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
              <a href={`${project.github}/blob/${project.sourceCommit}/${feature.source}`} target="_blank" rel="noopener noreferrer">
                Read the source <ArrowUpRight size={13} aria-hidden /><span className="sr-only"> for {feature.title}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
