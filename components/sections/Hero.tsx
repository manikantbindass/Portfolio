"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";
import { usePortfolioStats } from "@/components/StatsProvider";
import { projects } from "@/lib/projects";
import { Download, ArrowRight, Sparkles, Braces, Network } from "lucide-react";

const ROLES = [
  "AI Augmented Full Stack Developer",
  "Blockchain Developer",
  "Backend and DevSecOps",
];

function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const reduced = useReducedMotion();
  const [state, setState] = useState({ word: 0, char: 0, deleting: false });
  useEffect(() => {
    if (reduced) return;
    const current = words[state.word];
    const done = !state.deleting && state.char === current.length;
    const timer = setTimeout(
      () => {
        setState((s) => {
          if (!s.deleting && s.char === current.length)
            return { ...s, deleting: true };
          if (s.deleting && s.char === 0)
            return {
              word: (s.word + 1) % words.length,
              char: 0,
              deleting: false,
            };
          return { ...s, char: s.char + (s.deleting ? -1 : 1) };
        });
      },
      done ? pause : state.deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timer);
  }, [state, words, speed, pause, reduced]);
  return reduced ? words[0] : words[state.word].slice(0, state.char);
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const role = useTypewriter(ROLES);
  const { lc } = usePortfolioStats();
  const quickStats = [
    { label: "Projects showcased", value: String(projects.length), color: "var(--accent)" },
    { label: "LeetCode solved", value: lc.total, color: "var(--accent2)" },
    { label: "Public repositories", value: "30+", color: "var(--teal)" },
  ];

  return (
    <section
      id="hero"
      className={styles.hero}
    >
      <motion.div
        className={styles.portrait}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/profile-hero-cutout.webp"
          alt="Manikant Kumar"
          fill
          loading="eager"
          fetchPriority="high"
          className={styles.portraitImage}
          sizes="(max-width: 900px) 100vw, 70vw"
        />
      </motion.div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.layout}>
        {/* ── LEFT: Text ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className={`${styles.copy} flex flex-col items-start gap-5`}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className={`${styles.availability} inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-[var(--muted)]`}>
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse-soft" />
              Available for freelance &amp; full-time
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp}>
            <p className="section-label mb-2">Hello, I&apos;m</p>
            <h1
              id="hero-heading"
              className={`${styles.name} font-bold leading-none tracking-tight text-[var(--fg)]`}
            >
              Manikant <span className="gradient-text">Kumar</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={fadeUp} className={`${styles.role} flex items-center`}>
            <span className="font-mono text-base sm:text-lg font-semibold text-[var(--accent2)]">
              {role}
              <span className="inline-block w-0.5 h-5 bg-[#A78BFA] ml-1 animate-blink align-middle" />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-[var(--muted)] leading-relaxed max-w-lg"
            style={{ fontSize: "1.05rem" }}
          >
            I build AI-powered applications, thoughtful backend systems, and
            useful web experiences. Explore the code, architecture, and
            decisions behind my work.
          </motion.p>

          <motion.ul variants={fadeUp} className={styles.focusAreas} aria-label="Engineering focus">
            <li><Sparkles size={14} aria-hidden /> Applied AI</li>
            <li><Braces size={14} aria-hidden /> Full Stack</li>
            <li><Network size={14} aria-hidden /> Web3</li>
          </motion.ul>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              data-magnetic
              className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)] px-6 py-3 rounded-2xl transition-all"
              style={{
                background: "linear-gradient(135deg,#6366F1,#A78BFA)",
                boxShadow: "0 6px 24px rgba(99,102,241,0.4)",
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects <ArrowRight size={15} />
            </motion.a>
            <motion.a
              href="#resumes"
              data-magnetic
              className="flex items-center gap-2 text-sm font-semibold text-[var(--fg)] px-6 py-3 rounded-2xl glass border border-white/10"
              whileHover={{
                scale: 1.04,
                y: -2,
                borderColor: "rgba(99,102,241,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={15} /> View Resumes
            </motion.a>
            <motion.a
              href="#contact"
              data-magnetic
              className="flex items-center gap-2 text-sm font-semibold text-[var(--teal)] px-6 py-3 rounded-2xl border border-[#2DD4BF]/25"
              whileHover={{
                scale: 1.04,
                y: -2,
                borderColor: "rgba(45,212,191,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={fadeUp}
            className={styles.quickStats}
          >
            {quickStats.map((s) => (
              <div
                key={s.label}
                className={styles.quickStat}
              >
                <span
                  className="font-bold text-xl text-[var(--fg)]"
                  style={{ color: s.color }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] text-[var(--muted)] font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
          <a href="#stats" className={styles.statsSource}>{lc.source} · Data sources &amp; verification <ArrowRight size={11} aria-hidden /></a>
          <motion.button
            variants={fadeUp}
            onClick={() => window.dispatchEvent(new CustomEvent("openChatbot"))}
            className={`${styles.assistant} glass`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={15} aria-hidden />
            Ask my assistant
            <ArrowRight size={14} aria-hidden />
          </motion.button>

        </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
