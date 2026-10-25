"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./DsaCatScene.module.css";

export default function DsaCatScene() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className={styles.scene} data-paused={paused} aria-hidden="true">
        <div className={styles.halo} />
        <div className={styles.floor} />
        <div className={styles.cat} />
        <div className={styles.ballTrack}><div className={styles.ball} /></div>
      </div>
      <button
        type="button"
        className={styles.control}
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play cat animation" : "Pause cat animation"}
        aria-pressed={paused}
      >
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
        <span>{paused ? "Play scene" : "Pause scene"}</span>
      </button>
    </>
  );
}
