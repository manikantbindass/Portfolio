"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./MathLensGlassHero.module.css";

const samples = Array.from({ length: 12 }, (_, i) => {
  const theta = 4 * .8 ** i;
  return { x: 310 + theta * 36, y: 395 - theta * theta * 10 };
});
const contours = [-65, -30, 5, 40, 75];

export function MathLensAnimation({ preview = false }: { preview?: boolean }) {
  const id = useId().replaceAll(":", "");
  return (
      <div className={preview ? styles.previewScene : `${frame.scene} ${styles.scene}`} aria-hidden="true">
        <svg viewBox="0 0 620 620" fill="none" focusable="false">
          <defs>
            <linearGradient id={`${id}-glass`} x1="120" y1="130" x2="490" y2="480" gradientUnits="userSpaceOnUse"><stop stopColor="var(--accent2)" stopOpacity=".17" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".025" /></linearGradient>
            <radialGradient id={`${id}-light`}><stop stopColor="var(--accent)" stopOpacity=".16" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
            <linearGradient id={`${id}-curve`}><stop stopColor="var(--accent2)" /><stop offset="1" stopColor="var(--teal)" /></linearGradient>
          </defs>
          <circle cx="325" cy="315" r="285" fill={`url(#${id}-light)`} />
          <g className={styles.orbit} stroke="var(--accent2)" strokeOpacity=".2"><circle cx="310" cy="310" r="238" strokeDasharray="2 14" /><circle cx="548" cy="310" r="5" fill="var(--teal)" stroke="none" /></g>
          <circle cx="310" cy="310" r="203" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".25" />
          <ellipse cx="310" cy="469" rx="162" ry="24" fill="var(--accent)" opacity=".07" />
          <g stroke="var(--accent2)" strokeOpacity=".1">{contours.map(offset => <path key={offset} d={`M157 ${218 + offset}Q310 ${540 + offset}463 ${218 + offset}`} />)}<path d="M166 395H472M310 178V429" strokeOpacity=".3" strokeDasharray="4 7" /></g>
          <path d="M166 235Q310 555 454 235" stroke={`url(#${id}-curve)`} strokeWidth="2.5" />
          <path d={`M${samples.map(p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join("L")}`} stroke="var(--teal)" strokeOpacity=".45" strokeDasharray="3 5" />
          {samples.map((p, index) => <circle key={index} cx={p.x} cy={p.y} r="2.7" fill="var(--teal)" opacity={.2 + index * .035} />)}
          <g className={styles.particle}><circle r="17" fill="var(--teal)" opacity=".09" /><circle r="9" fill="var(--teal)" opacity=".18" /><circle r="4.5" fill="var(--teal)" /><circle cx="-1" cy="-1" r="1.3" fill="var(--fg)" /></g>
          <g transform="translate(357 141)"><g className={styles.formula}><rect width="176" height="82" rx="22" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".38" /><text x="22" y="37" fill="var(--fg)" fontSize="23" fontFamily="var(--font-mono), monospace">L(θ) = θ²</text><text x="22" y="60" fill="var(--accent2)" fontSize="10" letterSpacing="1.4">FOLLOW THE GRADIENT</text></g></g>
          <g transform="translate(132 419)"><g className={styles.matrix}><rect width="150" height="105" rx="23" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".35" /><g stroke="var(--accent2)" strokeOpacity=".6"><path d="M35 24H26v57h9m80-57h9v57h-9" /></g><g fill="var(--teal)" fontFamily="monospace" fontSize="16"><text x="46" y="45">1  0  2</text><text x="46" y="70">0  1  3</text></g></g></g>
          <g transform="translate(363 471)"><rect width="137" height="40" rx="20" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".25" /><circle className={styles.pulse} cx="20" cy="20" r="3" fill="var(--teal)" /><text x="33" y="24" fill="var(--accent2)" fontFamily="monospace" fontSize="10">η = 0.1</text></g>
        </svg>
      </div>
  );
}

export default function MathLensGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <section className={frame.panel} aria-labelledby="mathlens-project-heading" data-paused={paused}>
      <MathLensAnimation />
      <div className={frame.sheen} aria-hidden="true" />
      <div className={frame.content}>{children}</div>
      <button className={frame.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play mathematical animation" : "Pause mathematical animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}<span>Mathematics in motion</span>
      </button>
    </section>
  );
}
