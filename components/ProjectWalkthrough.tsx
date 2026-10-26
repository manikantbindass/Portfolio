"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import styles from "./ProjectWalkthrough.module.css";

export default function ProjectWalkthrough({ capture }: { capture: NonNullable<Project["walkthrough"]> }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={styles.capture}>
      <div className={styles.toolbar}>
        <span>From the running application</span>
        <button type="button" onClick={() => setPlaying(value => !value)} aria-pressed={playing}>
          {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
          {playing ? "Pause walkthrough" : "Play workflow walkthrough"}
        </button>
      </div>
      <Image src={playing ? capture.src : capture.poster} alt="Workflow authoring, publishing, execution, and recorded results" width={1440} height={1000} unoptimized={playing} sizes="(max-width: 700px) 100vw, 1100px" />
      <figcaption>{capture.caption} <a href={capture.source} target="_blank" rel="noopener noreferrer">Original walkthrough <ArrowUpRight size={12} aria-hidden /></a></figcaption>
    </figure>
  );
}
