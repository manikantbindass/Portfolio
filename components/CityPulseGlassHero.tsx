"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./CityPulseGlassHero.module.css";

const buildings = [
  { col: 0, row: 0, height: 54 }, { col: 2, row: 0, height: 76 },
  { col: 3, row: 1, height: 46 }, { col: 1, row: 1, height: 102 },
  { col: 0, row: 2, height: 68 }, { col: 2, row: 2, height: 58 },
  { col: 1, row: 3, height: 39 }, { col: 3, row: 3, height: 74 },
];
const routes = ["M116 302 358 423", "M212 254 454 375", "M116 350 358 229", "M212 398 454 277"];

export function CityPulseAnimation({ preview = false }: { preview?: boolean }) {
  const id = useId().replaceAll(":", "");
  return (
    <div className={preview ? styles.previewScene : `${frame.scene} ${styles.scene}`} aria-hidden="true">
      <svg viewBox="0 0 620 620" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-glass`} x1="160" y1="130" x2="450" y2="490" gradientUnits="userSpaceOnUse"><stop stopColor="var(--accent2)" stopOpacity=".18" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".035" /></linearGradient>
          <linearGradient id={`${id}-edge`}><stop stopColor="var(--accent2)" stopOpacity=".55" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".65" /></linearGradient>
          <radialGradient id={`${id}-light`}><stop stopColor="var(--teal)" stopOpacity=".13" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="310" cy="310" r="280" fill={`url(#${id}-light)`} />
        <g className={styles.orbit}><ellipse cx="310" cy="327" rx="260" ry="196" stroke="var(--accent2)" strokeOpacity=".13" strokeDasharray="2 15" /><circle cx="570" cy="327" r="4" fill="var(--teal)" opacity=".6" /></g>
        <path d="m310 205 242 121-242 121L68 326Z" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".25" />
        <path d="m68 326 242 121 242-121v14L310 461 68 340Z" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".1" />
        <g stroke="var(--accent2)" strokeOpacity=".14">{[0, 1, 2, 3, 4].map(i => <g key={i}><path d={`M${116 + i * 48} ${302 - i * 24} ${358 + i * 48} ${423 - i * 24}`} /><path d={`M${116 + i * 48} ${350 + i * 24} ${358 + i * 48} ${229 + i * 24}`} /></g>)}</g>
        <g className={styles.flow} stroke="var(--teal)" strokeWidth="1.7">{routes.map((route, i) => <path key={route} pathLength="100" d={route} style={{ animationDelay: `${-i * 1.7}s` }} />)}</g>
        {buildings.map((building, i) => {
          const x = 310 + (building.col - building.row) * 48;
          const y = 240 + (building.col + building.row) * 24;
          const h = building.height;
          return <g key={i} transform={`translate(${x} ${y})`}>
            <path d={`M-23-11 0 0v-${h}l-23-11Z`} fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".35" />
            <path d={`M0 0 23-11v-${h}L0-${h}Z`} fill="var(--accent)" fillOpacity=".06" stroke="var(--teal)" strokeOpacity=".25" />
            <path d={`m-23 ${-h - 11} 23-11 23 11-23 11Z`} fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} />
            <g className={styles.windows} style={{ animationDelay: `${-i * .6}s` }} stroke="var(--teal)" strokeWidth="1.5" strokeOpacity=".5">{[0, 1, 2].map(n => <path key={n} d={`M7 ${-h + 11 + n * 10}l9-4`} />)}</g>
          </g>;
        })}
        {[{ x: 213, y: 369 }, { x: 406, y: 345 }, { x: 310, y: 417 }].map((point, i) => <g key={i} transform={`translate(${point.x} ${point.y})`}><g className={styles.pulse} style={{ animationDelay: `${-i * 1.8}s` }}><ellipse rx="17" ry="8" fill="var(--teal)" fillOpacity=".07" stroke="var(--teal)" strokeOpacity=".35" /></g><circle r="3" fill="var(--teal)" /></g>)}
        <g transform="translate(357 125)"><g className={styles.panel}><rect width="143" height="66" rx="21" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".3" /><path d="m18 40 17-10 17 5 16-16 17 7 15-11 24 6" stroke="var(--teal)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 51h106" stroke="var(--accent2)" strokeOpacity=".15" /></g></g>
        <g transform="translate(227 502)"><rect width="166" height="38" rx="19" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".25" /><circle className={styles.windows} cx="19" cy="19" r="3" fill="var(--teal)" /><text x="33" y="23" fill="var(--accent2)" fontFamily="monospace" fontSize="9" letterSpacing="1">EVIDENCE → DECISION</text></g>
      </svg>
    </div>
  );
}

export default function CityPulseGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <section className={frame.panel} aria-labelledby="citypulse-project-heading" data-paused={paused}>
      <CityPulseAnimation />
      <div className={frame.sheen} aria-hidden="true" />
      <div className={frame.content}>{children}</div>
      <button className={frame.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play CityPulse animation" : "Pause CityPulse animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}<span>City in motion</span>
      </button>
    </section>
  );
}
