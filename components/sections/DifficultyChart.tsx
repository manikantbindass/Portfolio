"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import type { LCStats } from "@/components/StatsProvider";
import styles from "./DifficultyChart.module.css";

const difficulties = [
  { key: "easy", label: "Easy", color: "var(--teal)" },
  { key: "medium", label: "Medium", color: "var(--gold)" },
  { key: "hard", label: "Hard", color: "var(--rose)" },
] as const;

type Difficulty = (typeof difficulties)[number]["key"];

export default function DifficultyChart({ stats }: { stats: LCStats }) {
  const [selected, setSelected] = useState<Difficulty | null>(null);
  const chartRef = useRef<HTMLElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.35 });
  const { total } = stats;
  const hasSolved = total > 0;
  const easyEnd = hasSolved ? (stats.easy / total) * 100 : 0;
  const mediumEnd = hasSolved ? ((stats.easy + stats.medium) / total) * 100 : 0;
  const current = difficulties.find(({ key }) => key === selected);
  const count = current ? stats[current.key] : total;
  const share = hasSolved ? Math.round((count / total) * 100) : 0;
  const ringStyle = {
    "--easy-end": `${easyEnd}%`,
    "--medium-end": `${mediumEnd}%`,
    ...Object.fromEntries(difficulties.map(({ key, color }) => [
      `--chart-${key}`,
      !selected || selected === key ? color : `color-mix(in srgb, ${color} 28%, var(--bg2))`,
    ])),
  } as CSSProperties;

  return (
    <article ref={chartRef} className={styles.chart} aria-labelledby="difficulty-chart-title">
      <div className={styles.donut}>
        <div
          className={styles.ring}
          data-visible={isInView}
          data-empty={!hasSolved}
          style={ringStyle}
          aria-hidden="true"
        />
        <div className={styles.center} aria-live="polite">
          <span>{current ? `${share}%` : count}</span>
          <span>{current ? `${current.label} · ${count} solved` : "problems solved"}</span>
        </div>
      </div>

      <div className={styles.summary}>
        <h3 id="difficulty-chart-title">LeetCode by difficulty</h3>
        <p>Select a difficulty to see its share of solved problems.</p>
        <div className={styles.legend} role="group" aria-label="Highlight a difficulty">
          {difficulties.map(({ key, label, color }) => (
            <button
              key={key}
              type="button"
              aria-pressed={selected === key}
              onClick={() => setSelected((value) => value === key ? null : key)}
            >
              <span className={styles.dot} style={{ background: color }} aria-hidden="true" />
              <span>{label}</span>
              <strong>{stats[key]}</strong>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
