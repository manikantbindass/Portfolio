"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import styles from "./About.module.css";

const motionSprite = "/about/animals-motion.webp";

export default function AboutAnimalScene({ paused, onToggle }: {
  paused: boolean;
  onToggle: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const nearby = useInView(stageRef, { margin: "240px" });
  const reduceMotion = useReducedMotion();
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    if (!nearby || reduceMotion || framesReady) return;

    let active = true;
    const sprite = new window.Image();
    sprite.src = motionSprite;
    void sprite.decode().then(() => {
      if (active) setFramesReady(true);
    }).catch(() => {
      // The still image remains visible if the animation cannot be loaded.
    });

    return () => { active = false; };
  }, [nearby, reduceMotion, framesReady]);

  return (
    <>
      <div className={styles.animalBackdrop} aria-hidden="true" data-paused={paused}>
        <div className={styles.animalStage} ref={stageRef} data-nearby={nearby}>
          <div className={styles.glassFloor} />
          <div className={styles.animals} data-frames-ready={framesReady} />
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
