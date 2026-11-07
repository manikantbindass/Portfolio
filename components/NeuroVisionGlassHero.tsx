"use client";
import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./NeuroVisionGlassHero.module.css";

export function NeuroVisionAnimation({ preview = false }: { preview?: boolean }) {
  const id = useId().replaceAll(":", "");
  return <div className={preview ? styles.previewScene : `${frame.scene} ${styles.scene}`} aria-hidden="true">
    <svg viewBox="0 0 620 620" fill="none" focusable="false">
      <defs>
        <linearGradient id={`${id}-glass`}><stop stopColor="var(--accent2)" stopOpacity=".2" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".04" /></linearGradient>
        <radialGradient id={`${id}-glow`}><stop stopColor="var(--teal)" stopOpacity=".14" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
        <clipPath id={`${id}-scan`}><rect x="170" y="156" width="280" height="320" rx="45" /></clipPath>
      </defs>
      <circle cx="310" cy="310" r="280" fill={`url(#${id}-glow)`} />
      <g className={styles.orbit}><circle cx="310" cy="310" r="240" stroke="var(--accent2)" strokeOpacity=".18" strokeDasharray="2 15" /><circle cx="550" cy="310" r="4" fill="var(--teal)" /></g>
      {[-1, 0, 1].map((n,i)=><g key={n} transform={`translate(${n*46} ${n*20})`}><g className={styles.slice} style={{animationDelay:`${-i*3}s`}}>
        <rect x="170" y="156" width="280" height="320" rx="45" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".3" />
        <path d="M303 203c-42-23-94 15-91 67-29 48-5 109 43 111 8 38 43 54 48 18Zm14 0c42-23 94 15 91 67 29 48 5 109-43 111-8 38-43 54-48 18Z" fill={`url(#${id}-glass)`} stroke={i===1?"var(--teal)":"var(--accent2)"} strokeOpacity=".45" />
        <path d="M244 261q48-40 59 22m-65 24q41-20 65 24m74-70q-48-40-60 22m66 24q-41-20-66 24" stroke="var(--accent2)" strokeOpacity=".25" />
        {i===1&&<><ellipse cx="348" cy="322" rx="23" ry="32" fill="var(--teal)" fillOpacity=".12" stroke="var(--teal)" strokeOpacity=".5" /><path d="M310 174v282M188 314h244" stroke="var(--teal)" strokeOpacity=".2" strokeDasharray="3 8" /></>}
      </g></g>)}
      <g clipPath={`url(#${id}-scan)`}><path className={styles.scan} d="M165 174H455" stroke="var(--teal)" strokeWidth="2" strokeOpacity=".55" /></g>
      <g transform="translate(353 113)"><rect width="139" height="48" rx="20" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".3" /><path d="m15 29 15-10 14 6 15-13 18 13 17-7 26 5" stroke="var(--teal)" strokeWidth="1.5" /></g>
      <g transform="translate(226 521)"><rect width="168" height="36" rx="18" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".2" /><circle cx="18" cy="18" r="3" fill="var(--teal)" /><text x="32" y="22" fontFamily="monospace" fontSize="9" fill="var(--accent2)" letterSpacing="1">RESEARCH IN FOCUS</text></g>
    </svg>
  </div>;
}

export default function NeuroVisionGlassHero({children}:{children:ReactNode}) {
  const [paused,setPaused]=useState(false);
  return <section className={frame.panel} aria-labelledby="neurovision-project-heading" data-paused={paused}>
    <NeuroVisionAnimation /><div className={frame.sheen} aria-hidden="true" /><div className={frame.content}>{children}</div>
    <button className={frame.motionControl} type="button" onClick={()=>setPaused(v=>!v)} aria-pressed={paused} aria-label={paused?"Play NeuroVision animation":"Pause NeuroVision animation"}>{paused?<Play size={13} aria-hidden />:<Pause size={13} aria-hidden />}<span>Imaging in motion</span></button>
  </section>;
}
