"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { experience, certifications, personal } from "@/lib/data";
import styles from "./About.module.css";
import AboutAnimalScene from "./AboutAnimalScene";
import AboutCardScene, { type AboutSceneTheme } from "./AboutCardScene";

const experienceScenes: AboutSceneTheme[] = ["robot", "ai", "web3", "cosmic"];
const certificationScenes: AboutSceneTheme[] = ["nature", "web3", "ai", "robot"];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  },
});

const skills = [
  { label: "Backend & API Development", color: "#6366F1" },
  { label: "AI / ML Engineering", color: "#A78BFA" },
  { label: "Full Stack Development", color: "#2DD4BF" },
  { label: "Data Structures & Algorithms", color: "#F59E0B" },
  { label: "DevOps / Cloud", color: "#F43F5E" },
];

function SkillBar({
  label,
}: {
  label: string;
  color: string;
  inView: boolean;
}) {
  return (
    <div className="strength-item">
      <span aria-hidden>↗</span>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  const [animationsPaused, setAnimationsPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className={`relative section-pad overflow-hidden ${styles.section}`}
      data-animations-paused={animationsPaused}
    >
      <AboutAnimalScene paused={animationsPaused} onToggle={() => setAnimationsPaused((value) => !value)} />
      {/* Shading blends the animated scene with the glass panels. */}
      <div
        className={styles.lighting}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={`text-center mb-16 ${styles.heading}`}
        >
          <p className="section-label mb-3">Get to know me</p>
          <h2 className="section-heading text-[var(--fg)]">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — bio + skills */}
          <div className="flex flex-col gap-8">
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <div className={`${styles.panel} ${styles.bio} flex flex-col gap-4`}>
                <AboutCardScene theme="nature" />
                <div className="flex items-center gap-3">
                  <div
                    className={`${styles.avatar} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-[var(--fg)]`}
                  >
                    MK
                  </div>
                  <div>
                    <p className="font-bold text-[var(--fg)] text-lg">
                      ManikantKumar
                    </p>
                    <p className="text-[var(--muted)] text-sm">
                      {personal.degree}
                    </p>
                    <p className="text-[var(--muted)] text-xs">
                      {personal.university}
                    </p>
                  </div>
                </div>
                <p className="text-[var(--muted)] leading-relaxed text-sm">
                  I&apos;m an{" "}
                  <span className="text-[var(--accent)] font-semibold">
                    AI Augumented Full Stack Developer
                  </span>{" "}
                  pursuing B.Tech in Computer Science (Blockchain Technology) at
                  Parul University. I thrive at the intersection of AI, backend
                  systems, and distributed architectures — building products
                  that solve real engineering challenges.
                </p>
                <p className="text-[var(--muted)] leading-relaxed text-sm">
                  Experienced with{" "}
                  <span className="text-[var(--accent2)] font-semibold">
                    Python, Java, React.js, Node.js, FastAPI, and PostgreSQL
                  </span>
                  . Passionate about scalable microservices, REST APIs, RAG
                  systems, enterprise API integration, and debugging production
                  systems in cross-functional environments.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "FastAPI",
                    "Node.js",
                    "React.js",
                    "Python",
                    "Java",
                    "PostgreSQL",
                  ].map((t) => (
                    <span
                      key={t}
                      className={styles.chip}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Available badge */}
                <div className={`${styles.availability} flex items-center gap-2 text-xs font-semibold`}>
                  <span className={styles.statusDot} aria-hidden />
                  Open to work — Freelance &amp; Full-time
                </div>
              </div>
            </motion.div>

            {/* Skill bars */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <div className={`${styles.panel} flex flex-col gap-5`}>
                <AboutCardScene theme="cosmic" offset={1} />
                <p className="font-bold text-[var(--fg)] text-sm">
                  Core Strengths
                </p>
                {skills.map((s) => (
                  <SkillBar key={s.label} {...s} inView={inView} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — experience timeline + certs */}
          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <p
                id="experience"
                className={styles.groupLabel}
              >
                Experience &amp; Education
              </p>
              <div className="flex flex-col gap-4">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp(0.18 + i * 0.08)}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className={`${styles.panel} ${styles.experience} flex gap-4`}
                  >
                    <AboutCardScene theme={experienceScenes[i % experienceScenes.length]} offset={i + 2} />
                    <div
                      className={styles.timelineDot}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <p className="font-bold text-[var(--fg)] text-sm">
                          {exp.role}
                        </p>
                        <span className={styles.period}>
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-[var(--accent)] text-xs font-semibold mb-2">
                        {exp.company}
                      </p>
                      <p className="text-[var(--muted)] text-xs leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <p className={styles.groupLabel}>
                Certifications
              </p>
              <div className="grid gap-3">
                {certifications.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp(0.32 + i * 0.05)}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className={`${styles.panel} ${styles.certification} flex items-center gap-3`}
                  >
                    <AboutCardScene theme={certificationScenes[i % certificationScenes.length]} offset={i + 6} />
                    <span className={styles.award}><Award size={20} aria-hidden /></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--fg)] text-sm font-semibold">
                        {c.title}
                      </p>
                      <p className="text-[var(--muted)] text-xs">
                        {c.issuer} ·{" "}
                        {(c as { issuer: string; date?: string; year?: number })
                          .date ??
                          (
                            c as {
                              issuer: string;
                              date?: string;
                              year?: number;
                            }
                          ).year}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
