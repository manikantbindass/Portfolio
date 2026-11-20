"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import frame from "./RagGlassHero.module.css";
import styles from "./RemoteShieldGlassHero.module.css";

export function RemoteShieldAnimation({ preview = false }: { preview?: boolean }) {
  const id = useId().replaceAll(":", "");
  return (
    <div className={preview ? styles.previewScene : `${frame.scene} ${styles.scene}`} aria-hidden="true">
      <svg viewBox={preview ? "0 0 620 110" : "0 0 620 620"} fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-glass`} x2=".8" y2="1"><stop stopColor="var(--accent2)" stopOpacity=".2" /><stop offset="1" stopColor="var(--teal)" stopOpacity=".04" /></linearGradient>
          <radialGradient id={`${id}-glow`}><stop stopColor="var(--teal)" stopOpacity=".15" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
        </defs>
        {preview ? <>
          <path d="M28 30H260Q280 30 280 50H410M28 80H260Q280 80 280 60H410" stroke="var(--accent2)" strokeOpacity=".22" />
          <path className={styles.controlFlow} pathLength="100" d="M28 30H260Q280 30 280 50H410" stroke="var(--accent2)" strokeWidth="2" />
          <path className={styles.trafficFlow} pathLength="100" d="M28 80H260Q280 80 280 60H410" stroke="var(--teal)" strokeWidth="2" />
          <g transform="translate(425 19)"><path d="m0 0 28 10v20q0 22-28 38-28-16-28-38V10Z" fill={`url(#${id}-glass)`} stroke="var(--teal)" strokeOpacity=".6" /><path className={styles.check} d="m-12 29 9 9 17-20" stroke="var(--teal)" strokeWidth="2" /></g>
          <g fill="var(--muted)" fontFamily="monospace" fontSize="10" letterSpacing="1"><text x="35" y="22">POLICY</text><text x="35" y="102">TRAFFIC</text><text x="477" y="59">IN MOTION</text></g>
        </> : <>
          <circle cx="310" cy="310" r="290" fill={`url(#${id}-glow)`} />
          <g className={styles.orbit}><ellipse cx="310" cy="310" rx="263" ry="220" stroke="var(--accent2)" strokeOpacity=".18" strokeDasharray="2 14" /><circle cx="573" cy="310" r="4" fill="var(--teal)" /></g>
          <g className={styles.browser}>
            <rect x="82" y="164" width="360" height="246" rx="30" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".4" />
            <path d="M82 215H442" stroke="var(--accent2)" strokeOpacity=".22" />
            {[108,123,138].map(x=><circle key={x} cx={x} cy="190" r="3" fill="var(--accent2)" fillOpacity=".7" />)}
            <rect x="165" y="181" width="230" height="18" rx="9" fill="var(--accent2)" fillOpacity=".08" />
            <path d="M108 243h88m-88 20h62M108 285h48m-48 20h62m-62 20h41" stroke="var(--accent2)" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
            <rect x="215" y="241" width="199" height="137" rx="19" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".2" />
            <path d="M235 267h62m-62 21h42m-42 63h152" stroke="var(--teal)" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
            <path className={styles.controlFlow} pathLength="100" d="M235 351h152" stroke="var(--teal)" strokeWidth="2" />
          </g>
          <g className={styles.phone}>
            <rect x="435" y="292" width="97" height="174" rx="25" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".5" />
            <path d="M468 309h30m-34 139h40" stroke="var(--accent2)" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
            <rect x="450" y="328" width="67" height="93" rx="13" fill={`url(#${id}-glass)`} />
            <path d="M465 349h35m-35 13h23m-23 35h35" stroke="var(--teal)" strokeOpacity=".35" strokeWidth="2" />
          </g>
          <path d="M124 421v56q0 20 20 20h139m57 0h139q20 0 20-20" stroke="var(--accent2)" strokeOpacity=".23" />
          <path className={styles.trafficFlow} pathLength="100" d="M124 421v56q0 20 20 20h139m57 0h139q20 0 20-20" stroke="var(--teal)" strokeWidth="2" />
          <g transform="translate(333 323)"><g className={styles.shield}>
            <path d="m0-70 62 23V0q0 51-62 89C-62 51-62 0-62 0v-47Z" fill={`url(#${id}-glass)`} stroke="var(--teal)" strokeOpacity=".65" strokeWidth="1.5" />
            <path d="m0-52 47 18V0q0 38-47 68C-47 38-47 0-47 0v-34Z" stroke="var(--accent2)" strokeOpacity=".3" />
            <rect x="-22" y="-5" width="44" height="36" rx="12" stroke="var(--teal)" strokeOpacity=".7" />
            <path d="M-12-5v-11a12 12 0 0 1 24 0v11" stroke="var(--teal)" strokeOpacity=".7" />
            <circle className={styles.check} cy="12" r="3" fill="var(--teal)" />
          </g></g>
          <rect x="283" y="476" width="57" height="42" rx="15" fill={`url(#${id}-glass)`} stroke="var(--accent2)" strokeOpacity=".4" />
          <path d="m300 498 8 7 15-18" stroke="var(--teal)" strokeWidth="2" />
          <g fill="var(--accent2)" fontFamily="monospace" fontSize="10" letterSpacing="2"><text x="115" y="146">MANAGED ACCESS</text><text x="210" y="554">DISTINCT PATHS. CLEAR CONTROL.</text></g>
        </>}
      </svg>
    </div>
  );
}

export default function RemoteShieldGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return <section className={frame.panel} aria-labelledby="remoteshield-project-heading" data-paused={paused}>
    <RemoteShieldAnimation /><div className={frame.sheen} aria-hidden="true" /><div className={frame.content}>{children}</div>
    <button className={frame.motionControl} type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={paused} aria-label={paused ? "Play RemoteShield animation" : "Pause RemoteShield animation"}>{paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}<span>Access in motion</span></button>
  </section>;
}
