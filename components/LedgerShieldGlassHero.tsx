"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./LedgerShieldGlassHero.module.css";

const nodes = [
  { x: 310, y: 100 }, { x: 482, y: 194 }, { x: 482, y: 402 },
  { x: 310, y: 504 }, { x: 138, y: 402 }, { x: 138, y: 194 },
];

export function LedgerShieldAnimation({ preview = false }: { preview?: boolean }) {
  const id = useId().replaceAll(":", "");
  return (
    <div className={preview ? styles.previewScene : `${frame.scene} ${styles.scene}`} aria-hidden="true">
      <svg viewBox="0 0 620 620" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-glass`} x1="150" y1="120" x2="480" y2="480" gradientUnits="userSpaceOnUse"><stop stopColor="var(--accent2)" stopOpacity=".18" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".035" /></linearGradient>
          <radialGradient id={`${id}-halo`}><stop stopColor="var(--teal)" stopOpacity=".14" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-edge`}><stop stopColor="var(--accent2)" stopOpacity=".65" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".55" /></linearGradient>
          <clipPath id={`${id}-shield`}><path d="m310 187 91 36v81c0 69-39 109-91 138-52-29-91-69-91-138v-81Z" /></clipPath>
        </defs>
        <circle cx="310" cy="305" r="284" fill={`url(#${id}-halo)`} />
        <g className={styles.orbit}><circle cx="310" cy="305" r="245" stroke="var(--accent2)" strokeOpacity=".2" strokeDasharray="2 14" /><circle cx="555" cy="305" r="4" fill="var(--teal)" opacity=".7" /></g>
        <path d="M310 100 482 194V402L310 504 138 402V194Z" stroke="var(--accent2)" strokeOpacity=".18" />
        <g stroke="var(--accent2)" strokeOpacity=".18">{nodes.map(node => <path key={node.x + ':' + node.y} d={`M${node.x} ${node.y} 310 305`} />)}</g>
        <g className={styles.signals} stroke="var(--teal)" strokeWidth="1.8">{nodes.map((node, i) => <path key={i} pathLength="100" d={`M${node.x} ${node.y} 310 305`} style={{ animationDelay: `${-i * .85}s` }} />)}</g>
        <g className={styles.shield}>
          <path d="m310 171 105 42v91c0 77-46 124-105 155-59-31-105-78-105-155v-91Z" fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} strokeWidth="1.5" />
          <path d="m310 187 91 36v81c0 69-39 109-91 138-52-29-91-69-91-138v-81Z" stroke="var(--accent2)" strokeOpacity=".14" />
          <g clipPath={`url(#${id}-shield)`}><path className={styles.scan} d="M200 217H420" stroke="var(--teal)" strokeWidth="2" strokeOpacity=".45" /></g>
          <circle cx="310" cy="303" r="44" fill={`url(#${id}-glass)`} stroke="var(--teal)" strokeOpacity=".25" />
          <path d="m287 303 16 16 31-34" stroke="var(--teal)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M273 376h74m-59 13h44" stroke="var(--accent2)" strokeWidth="2" strokeOpacity=".25" strokeLinecap="round" />
        </g>
        {nodes.map((node, i) => <g key={i} transform={`translate(${node.x} ${node.y})`}><g className={i === 2 ? styles.recovering : styles.node} style={{ animationDelay: `${-i}s` }}><rect x="-28" y="-28" width="56" height="56" rx="18" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".5" /><path d="m-12-6 12-7 12 7-12 7Zm0 7 12 7 12-7m-24 8 12 7 12-7" stroke="var(--teal)" strokeOpacity=".75" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></g></g>)}
        <g transform="translate(227 545)"><rect width="166" height="36" rx="18" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".2" /><circle className={styles.node} cx="18" cy="18" r="3" fill="var(--teal)" /><text x="32" y="22" fill="var(--accent2)" fontFamily="monospace" fontSize="9" letterSpacing="1">OBSERVE · VERIFY</text></g>
      </svg>
    </div>
  );
}

export default function LedgerShieldGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <section className={frame.panel} aria-labelledby="ledgershield-project-heading" data-paused={paused}>
      <LedgerShieldAnimation />
      <div className={frame.sheen} aria-hidden="true" />
      <div className={frame.content}>{children}</div>
      <button className={frame.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play LedgerShield animation" : "Pause LedgerShield animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}<span>Resilience in motion</span>
      </button>
    </section>
  );
}
