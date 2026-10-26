"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./FlowNovaGlassHero.module.css";

const nodes = [
  { x: 272, y: 65, kind: "trigger", delay: "0s" },
  { x: 272, y: 218, kind: "branch", delay: "-2s" },
  { x: 111, y: 373, kind: "map", delay: "-4s" },
  { x: 431, y: 373, kind: "map", delay: "-6s" },
];

export default function FlowNovaGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const id = useId().replaceAll(":", "");
  return (
    <section className={frame.panel} aria-labelledby="flownova-project-heading" data-paused={paused}>
      <div className={`${frame.scene} ${styles.scene}`} aria-hidden="true">
        <svg viewBox="0 0 620 620" fill="none" focusable="false">
          <defs>
            <linearGradient id={`${id}-glass`} x1="80" y1="70" x2="500" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent2)" stopOpacity=".25" />
              <stop offset="1" stopColor="var(--teal)" stopOpacity=".045" />
            </linearGradient>
            <radialGradient id={`${id}-glow`}>
              <stop stopColor="var(--accent)" stopOpacity=".26" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--accent2)" fillOpacity=".16" /></pattern>
          </defs>
          <circle cx="310" cy="310" r="300" fill={`url(#${id}-glow)`} />
          <rect x="55" y="36" width="510" height="530" rx="48" fill={`url(#${id}-dots)`} />
          <g className={styles.rings}><ellipse cx="310" cy="310" rx="249" ry="248" /><ellipse cx="310" cy="310" rx="235" ry="234" strokeDasharray="2 16" /></g>
          <g className={styles.tracks}>
            <path d="M310 143V218" />
            <path d="M310 296V317Q310 338 289 338H170Q149 338 149 359V373" />
            <path d="M310 296V317Q310 338 331 338H450Q469 338 469 359V373" />
            <path d="M149 451V487Q149 508 170 508H245" />
            <path d="M469 451V487Q469 508 448 508H375" />
          </g>
          <g className={styles.packets}>
            <path d="M310 143V218" />
            <path d="M310 296V317Q310 338 289 338H170Q149 338 149 359V373" />
            <path d="M310 296V317Q310 338 331 338H450Q469 338 469 359V373" />
            <path d="M149 451V487Q149 508 170 508H245" />
            <path d="M469 451V487Q469 508 448 508H375" />
          </g>
          {nodes.map(({ x, y, kind, delay }) => (
            <g key={kind + x} transform={`translate(${x} ${y})`}>
              <g className={styles.node} style={{ animationDelay: delay }}>
                <rect x="-8" y="-8" width="92" height="94" rx="27" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".16" />
                <rect width="76" height="78" rx="22" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".55" />
                <path d="M13 2H62" stroke="var(--fg)" strokeOpacity=".22" strokeLinecap="round" />
                <g stroke={kind === "trigger" ? "var(--teal)" : "var(--accent2)"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  {kind === "trigger" ? <path d="m30 24 22 15-22 15Z" /> : kind === "branch" ? <><path d="M38 22v17m0 0L24 54m14-15 14 15" /><circle cx="38" cy="21" r="3" /></> : <path d="m26 28-10 11 10 11m24-22 10 11-10 11m-8-27-8 32" />}
                </g>
                <circle cx="38" cy="78" r="3.5" fill="var(--bg2)" stroke="var(--accent2)" />
              </g>
            </g>
          ))}
          <g className={styles.result}>
            <rect x="245" y="477" width="130" height="62" rx="21" fill={`url(#${id}-glass)`} stroke="var(--teal)" strokeOpacity=".5" />
            <path d="m269 509 7 7 12-15" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M304 501h45m-45 13h30" stroke="var(--accent2)" strokeWidth="3" strokeLinecap="round" strokeOpacity=".5" />
          </g>
        </svg>
      </div>
      <div className={frame.sheen} aria-hidden="true" />
      <div className={frame.content}>{children}</div>
      <button className={frame.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play workflow constellation animation" : "Pause workflow constellation animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
        <span>Workflow constellation</span>
      </button>
    </section>
  );
}
