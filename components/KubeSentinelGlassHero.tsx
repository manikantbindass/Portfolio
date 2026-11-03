"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./KubeSentinelGlassHero.module.css";

const pods = [{ x: 163, y: 190 }, { x: 457, y: 190 }, { x: 120, y: 354 }, { x: 500, y: 354 }, { x: 211, y: 480 }, { x: 409, y: 480 }];

export function KubeSentinelAnimation({ preview = false }: { preview?: boolean }) {
  const id = useId().replaceAll(":", "");
  return (
    <div className={preview ? styles.previewScene : `${frame.scene} ${styles.scene}`} aria-hidden="true">
      <svg viewBox="0 0 620 620" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-glass`} x1="130" y1="110" x2="490" y2="490" gradientUnits="userSpaceOnUse"><stop stopColor="var(--accent2)" stopOpacity=".2" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".035" /></linearGradient>
          <linearGradient id={`${id}-edge`}><stop stopColor="var(--accent2)" stopOpacity=".6" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".6" /></linearGradient>
          <radialGradient id={`${id}-light`}><stop stopColor="var(--teal)" stopOpacity=".13" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="310" cy="310" r="285" fill={`url(#${id}-light)`} />
        <g className={styles.orbit}><circle cx="310" cy="310" r="242" stroke="var(--accent2)" strokeOpacity=".15" strokeDasharray="2 15" /><circle cx="552" cy="310" r="4" fill="var(--teal)" opacity=".6" /></g>
        <g stroke="var(--accent2)" strokeOpacity=".2">{pods.map((pod, i) => <path key={i} d={`M${pod.x} ${pod.y}Q310 ${pod.y < 300 ? 228 : 402} 310 310`} />)}</g>
        <g className={styles.signals} stroke="var(--teal)" strokeWidth="1.6">{pods.map((pod, i) => <path key={i} pathLength="100" d={`M${pod.x} ${pod.y}Q310 ${pod.y < 300 ? 228 : 402} 310 310`} style={{ animationDelay: `${-i}s` }} />)}</g>
        <g className={styles.fabric}>
          {[0, 1, 2].map(i => <path key={i} d={`m310 ${340 + i * 25} 126 64-126 64-126-64Z`} fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity={.25 - i * .05} />)}
          <ellipse className={styles.scan} cx="310" cy="387" rx="103" ry="43" stroke="var(--teal)" strokeOpacity=".3" strokeDasharray="3 9" />
        </g>
        <g className={styles.core}>
          <path d="m310 216 74 43-74 43-74-43Z" fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} strokeWidth="1.5" />
          <path d="m236 259 74 43v85l-74-43Z" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".45" />
          <path d="m310 302 74-43v85l-74 43Z" fill="var(--teal)" fillOpacity=".045" stroke="var(--teal)" strokeOpacity=".4" />
          <path d="M310 216v86m-74-43 148 85m0-85-148 85" stroke="var(--accent2)" strokeOpacity=".13" />
          <path d="m258 301 15 9m-15 8 30 17m43-8 25-15m-25 32 15-9" stroke="var(--teal)" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="310" cy="259" r="4" fill="var(--teal)" />
        </g>
        {pods.map((pod, i) => <g key={i} transform={`translate(${pod.x} ${pod.y})`}><g className={styles.pod} style={{ animationDelay: `${-i * 1.8}s` }}>
          <rect x="-30" y="-29" width="60" height="58" rx="19" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".35" />
          <path d="m0-15 14 8v16L0 17-14 9V-7Zm0 0v16m-14-8L0 1l14-8M0 1v16" stroke={i % 2 ? "var(--teal)" : "var(--accent2)"} strokeOpacity=".65" strokeWidth="1.2" strokeLinejoin="round" />
          <circle className={styles.beacon} cx="20" cy="-20" r="2.5" fill="var(--teal)" style={{ animationDelay: `${-i * .8}s` }} />
        </g></g>)}
        <g transform="translate(229 112)"><rect width="162" height="36" rx="18" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".2" /><circle className={styles.beacon} cx="18" cy="18" r="3" fill="var(--teal)" /><text x="32" y="22" fill="var(--accent2)" fontFamily="monospace" fontSize="9" letterSpacing="1">EVIDENCE → POLICY</text></g>
      </svg>
    </div>
  );
}

export default function KubeSentinelGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <section className={frame.panel} aria-labelledby="kubesentinel-project-heading" data-paused={paused}>
      <KubeSentinelAnimation />
      <div className={frame.sheen} aria-hidden="true" />
      <div className={frame.content}>{children}</div>
      <button className={frame.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play KubeSentinel animation" : "Pause KubeSentinel animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}<span>Cluster in motion</span>
      </button>
    </section>
  );
}
