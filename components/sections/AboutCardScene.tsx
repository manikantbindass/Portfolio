import type { CSSProperties } from "react";
import styles from "./AboutCardScene.module.css";

export type AboutSceneTheme = "nature" | "cosmic" | "ai" | "web3" | "robot";

const motes = [
  [18, 46, 1.2], [56, 132, 1.6], [89, 69, 1], [125, 153, 1.3],
  [166, 32, 1.5], [205, 112, 1], [239, 57, 1.7], [284, 142, 1.2],
];

export default function AboutCardScene({ theme, offset = 0 }: {
  theme: AboutSceneTheme;
  offset?: number;
}) {
  return (
    <div
      className={`${styles.scene} ${styles[theme]}`}
      style={{ "--scene-delay": `${-(offset % 8) * 0.5}s` } as CSSProperties}
      data-about-scene={theme}
      aria-hidden="true"
    >
      <div className={styles.haze} />
      <div className={styles.artwork}>
        <div className={styles.frame} />
        <div className={`${styles.frame} ${styles.nextFrame}`} />
      </div>
      <svg className={styles.motes} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
        {motes.map(([cx, cy, r], index) => (
          <circle key={index} cx={cx} cy={cy} r={r} style={{ animationDelay: `${-index * 0.7}s` }} />
        ))}
      </svg>
      <div className={styles.reflection} />
    </div>
  );
}
