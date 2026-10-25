"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./About.module.css";

export default function AboutAnimalScene() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className={styles.animalBackdrop} aria-hidden="true" data-paused={paused}>
        <div className={styles.animalStage}>
          <div className={styles.glassFloor} />
          <div className={styles.animals} />
        </div>
      </div>
      <button
        type="button"
        className={styles.sceneControl}
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play About animal animation" : "Pause About animal animation"}
        aria-pressed={paused}
      >
        {paused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
        {paused ? "Play scene" : "Pause scene"}
      </button>
    </>
  );
}
