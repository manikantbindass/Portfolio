"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./DsaChaseScene.module.css";

export default function DsaChaseScene() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className={styles.scene} data-paused={paused} aria-hidden="true">
        <div className={styles.ambience} />
        <div className={styles.stage}>
          <div className={styles.floor} />
          <div className={styles.chase}>
            <div className={styles.sprite} />
            <div className={`${styles.sprite} ${styles.next}`} />
          </div>
          <div className={styles.reflection} />
        </div>
        <div className={styles.mist} />
      </div>
      <button type="button" className={styles.control} aria-label={paused ? "Play DSA animal chase animation" : "Pause DSA animal chase animation"} aria-pressed={paused} onClick={() => setPaused(value => !value)} title={paused ? "Play animal scene" : "Pause animal scene"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
      </button>
    </>
  );
}
