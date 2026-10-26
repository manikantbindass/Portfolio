"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./DsaChaseScene.module.css";

const animals = ["husky", "retriever", "blackCat", "persianCat"] as const;

export default function DsaChaseScene() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className={styles.scene} data-paused={paused} data-gait-frames="16" aria-hidden="true">
        <div className={styles.ambience} />
        <div className={styles.stage}>
          <div className={styles.floor} />
          {animals.map(animal => (
            <div className={`${styles.runner} ${styles[animal]}`} key={animal} data-animal={animal}>
              <div className={styles.animal}>
                <div className={styles.shadow} />
                <div className={styles.sprite} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mist} />
      </div>
      <button type="button" className={styles.control} aria-label={paused ? "Play DSA animal chase animation" : "Pause DSA animal chase animation"} aria-pressed={paused} onClick={() => setPaused(value => !value)} title={paused ? "Play animal scene" : "Pause animal scene"}>
        {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
      </button>
    </>
  );
}
