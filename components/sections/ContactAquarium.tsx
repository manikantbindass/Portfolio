"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./ContactAquarium.module.css";

const bubbles = [12, 28, 43, 60, 73, 86, 94];

export default function ContactAquarium() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className={styles.aquarium} data-aquarium data-paused={paused} aria-hidden="true">
        <div className={styles.frame} />
        <div className={`${styles.frame} ${styles.nextFrame}`} />
        <div className={styles.rays} />
        <div className={styles.bubbles}>
          {bubbles.map((left, index) => (
            <span key={left} style={{ left: `${left}%`, width: 4 + (index % 3) * 3, height: 4 + (index % 3) * 3, animationDelay: `${-index * 1.7}s`, animationDuration: `${9 + index}s` }} />
          ))}
        </div>
      </div>
      <button type="button" className={styles.toggle} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play aquarium animation" : "Pause aquarium animation"} aria-pressed={paused}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
        <span>{paused ? "Play aquarium" : "Pause aquarium"}</span>
      </button>
    </>
  );
}
