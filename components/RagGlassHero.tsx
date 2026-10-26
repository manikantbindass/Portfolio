"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./RagGlassHero.module.css";

export default function RagGlassHero({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const id = useId().replaceAll(":", "");
  const glass = `${id}-glass`;
  const glow = `${id}-glow`;

  return (
    <section className={styles.panel} aria-labelledby="rag-project-heading" data-paused={paused}>
      <div className={styles.scene} aria-hidden="true">
        <svg viewBox="0 0 620 620" fill="none" focusable="false">
          <defs>
            <linearGradient id={glass} x1="170" y1="100" x2="430" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent2)" stopOpacity=".22" />
              <stop offset="1" stopColor="var(--teal)" stopOpacity=".035" />
            </linearGradient>
            <radialGradient id={glow}>
              <stop stopColor="var(--accent)" stopOpacity=".24" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="310" cy="310" r="300" fill={`url(#${glow})`} />
          <g className={styles.orbit}>
            <ellipse cx="310" cy="310" rx="234" ry="182" transform="rotate(-32 310 310)" />
            <ellipse cx="310" cy="310" rx="234" ry="182" transform="rotate(38 310 310)" />
            <circle cx="310" cy="310" r="217" strokeDasharray="2 13" />
            <circle cx="106" cy="236" r="5" fill="var(--teal)" stroke="none" />
            <circle cx="500" cy="420" r="4" fill="var(--accent2)" stroke="none" />
          </g>
          <g className={styles.connections}>
            <path d="M151 187Q210 235 310 310Q415 365 483 454" />
            <path d="M474 172Q419 253 310 310Q218 356 132 435" />
            <path d="M310 94V526" />
          </g>
          <g className={styles.signals}>
            <path d="M151 187Q210 235 310 310Q415 365 483 454" />
            <path d="M474 172Q419 253 310 310Q218 356 132 435" />
            <path d="M310 94V526" />
          </g>
          <g className={styles.core} stroke="var(--accent2)" strokeWidth="1.5" strokeLinejoin="round">
            <path d="m310 234 96 48v100l-96 48-96-48V282Z" fill={`url(#${glass})`} />
            <path d="m214 282 96 49 96-49m-96 49v99" opacity=".45" />
            <path d="m251 270 59-30 59 30-59 30Zm0 18 59 30 59-30m-118 18 59 30 59-30" strokeWidth="2.5" />
            <circle cx="310" cy="373" r="6" fill="var(--teal)" stroke="none" />
          </g>
          {[
            { x: 101, y: 134, delay: "0s" },
            { x: 429, y: 117, delay: "-3s" },
            { x: 81, y: 395, delay: "-6s" },
            { x: 437, y: 411, delay: "-9s" },
          ].map(({ x, y, delay }) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className={styles.document} style={{ animationDelay: delay }}>
                <rect width="84" height="103" rx="17" fill={`url(#${glass})`} stroke="var(--accent2)" strokeOpacity=".45" />
                <path d="M21 27h26l14 14v34H21Z" stroke="var(--accent2)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M47 27v14h14M30 51h22M30 60h22M30 69h13" stroke="var(--accent2)" strokeOpacity=".65" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          ))}
          <ellipse className={styles.floor} cx="310" cy="540" rx="145" ry="16" fill={`url(#${glow})`} />
        </svg>
      </div>
      <div className={styles.sheen} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
      <button className={styles.motionControl} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play knowledge network animation" : "Pause knowledge network animation"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
        <span>Knowledge in motion</span>
      </button>
    </section>
  );
}
