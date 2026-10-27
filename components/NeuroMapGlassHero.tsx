"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./NeuroMapGlassHero.module.css";

const points = Array.from({ length: 154 }, (_, index) => {
  const side = index < 77 ? -1 : 1;
  const i = index % 77;
  const y = 1 - 2 * (i + .5) / 77;
  const radius = Math.sqrt(1 - y * y);
  const angle = i * 2.399963;
  return { x: 310 + side * 65 + Math.cos(angle) * radius * 78, y: 289 + y * 142, radius: 1.3 + (Math.sin(angle) + 1) * .8, delay: `${-(index % 13) * .4}s` };
});
const paths = [
  "M198 232Q256 179 310 246T427 232",
  "M183 291Q251 355 309 287T438 301",
  "M208 357Q268 298 310 350T415 359",
  "M235 176Q290 223 310 292T386 409",
  "M384 171Q332 227 310 292T236 411",
];

export default function NeuroMapGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const id = useId().replaceAll(":", "");
  return (
    <section className={frame.panel} aria-labelledby="neuromap-project-heading" data-paused={paused}>
      <div className={`${frame.scene} ${styles.scene}`} aria-hidden="true">
        <svg viewBox="0 0 620 620" fill="none" focusable="false">
          <defs>
            <radialGradient id={`${id}-glow`}><stop stopColor="var(--teal)" stopOpacity=".18" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
            <linearGradient id={`${id}-glass`} x1="160" y1="120" x2="440" y2="470" gradientUnits="userSpaceOnUse"><stop stopColor="var(--accent2)" stopOpacity=".2" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".035" /></linearGradient>
            <linearGradient id={`${id}-scan`}><stop stopColor="var(--teal)" stopOpacity="0" /><stop offset=".5" stopColor="var(--teal)" stopOpacity=".5" /><stop offset="1" stopColor="var(--teal)" stopOpacity="0" /></linearGradient>
            <clipPath id={`${id}-bounds`}><rect x="115" y="110" width="390" height="355" rx="60" /></clipPath>
          </defs>
          <circle cx="310" cy="295" r="290" fill={`url(#${id}-glow)`} />
          <g className={styles.rings} stroke="var(--accent2)" strokeOpacity=".17"><ellipse cx="310" cy="295" rx="239" ry="222" /><ellipse cx="310" cy="295" rx="257" ry="239" strokeDasharray="2 15" /></g>
          <g className={styles.volume}>
            <path d="M302 154C270 114 211 139 197 175c-45 8-62 51-44 87-26 35-6 85 21 94-6 45 39 75 72 62 22 26 48 13 56-4Z" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".4" />
            <path d="M318 154c32-40 91-15 105 21 45 8 62 51 44 87 26 35 6 85-21 94 6 45-39 75-72 62-22 26-48 13-56-4Z" fill={`url(#${id}-glass)`} stroke="var(--teal)" strokeOpacity=".4" />
            <g className={styles.connections} stroke="var(--accent2)" strokeOpacity=".3">{paths.map(path => <path key={path} d={path} />)}</g>
            <g className={styles.signals} stroke="var(--teal)" strokeWidth="2">{paths.map((path, index) => <path key={path} d={path} style={{ animationDelay: `${-index * 1.2}s` }} />)}</g>
            {points.map((point, index) => <circle className={styles.point} key={index} cx={point.x} cy={point.y} r={point.radius} fill={index % 3 ? "var(--teal)" : "var(--accent2)"} style={{ animationDelay: point.delay }} />)}
            <path d="M310 437v36m-9-6 9 9 9-9" stroke="var(--accent2)" strokeOpacity=".4" />
          </g>
          <g clipPath={`url(#${id}-bounds)`}>
            <g className={styles.scan}><path d="m124 170 186-35 186 35-186 35Z" fill={`url(#${id}-scan)`} /><path d="m124 170 186 35 186-35" stroke={`url(#${id}-scan)`} strokeWidth="1.5" /></g>
          </g>
          <g transform="translate(227 484)"><rect width="166" height="54" rx="18" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".3" /><path d="M250 499v20m10-28v28m10-13v13" transform="translate(-227 -484)" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" /><path d="M60 20h80M60 32h51" stroke="var(--accent2)" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" /></g>
        </svg>
      </div>
      <div className={frame.sheen} aria-hidden="true" />
      <div className={frame.content}>{children}</div>
      <button className={frame.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play neural map animation" : "Pause neural map animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}<span>Neural map in motion</span>
      </button>
    </section>
  );
}
