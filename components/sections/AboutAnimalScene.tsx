"use client";

import { Pause, Play } from "lucide-react";
import styles from "./About.module.css";

export default function AboutAnimalScene({ paused, onToggle }: {
  paused: boolean;
  onToggle: () => void;
}) {
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
        onClick={onToggle}
        aria-label={paused ? "Play About animations" : "Pause About animations"}
        aria-pressed={paused}
      >
        {paused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
        {paused ? "Play scene" : "Pause scene"}
      </button>
    </>
  );
}
