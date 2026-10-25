"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, certifications, personal } from "@/lib/data";

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: "var(--bg2)" }}
    >
      {/* Blob */}
      <div
        className="aurora-blob w-[500px] h-[500px] bg-[#A78BFA] opacity-[0.07] absolute -top-20 -right-20 pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
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
              <div className="glass rounded-3xl p-7 flex flex-col gap-4 border border-white/6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-[var(--fg)]"
                    style={{
                      background: "linear-gradient(135deg,#6366F1,#A78BFA)",
                    }}
                  >
                    MK
                  </div>
                  <div>
                    <p className="font-bold text-[var(--fg)] text-lg">
                      {personal.handle}
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
                  I&apos;m a{" "}
                  <span className="text-[var(--accent)] font-semibold">
                    Forward Deployed Engineer candidate
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
                      className="text-xs font-semibold px-3 py-1 rounded-full border border-[#6366F1]/30 text-[var(--accent)]"
                      style={{ background: "rgba(99,102,241,0.08)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Available badge */}
                <div className="flex items-center gap-2 text-xs text-[var(--teal)] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse-soft" />
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
              <div className="glass rounded-3xl p-7 border border-white/6 flex flex-col gap-5">
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
                className="font-bold text-[var(--fg)] mb-4 text-sm uppercase tracking-widest opacity-50"
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
                    className="glass rounded-2xl p-5 border border-white/6 card-hover flex gap-4"
                  >
                    <div
                      className="timeline-dot mt-1"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg,#6366F1,#A78BFA)"
                            : "linear-gradient(135deg,#2DD4BF,#6366F1)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <p className="font-bold text-[var(--fg)] text-sm">
                          {exp.role}
                        </p>
                        <span className="text-[10px] font-mono text-[var(--muted)] px-2 py-0.5 rounded-full border border-white/10">
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
              <p className="font-bold text-[var(--fg)] mb-4 text-sm uppercase tracking-widest opacity-50">
                Certifications
              </p>
              <div className="grid gap-3">
                {certifications.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp(0.32 + i * 0.05)}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="glass rounded-2xl px-4 py-3 border border-white/6 flex items-center gap-3 card-hover"
                  >
                    <span className="text-xl">{c.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--fg)] text-sm font-semibold truncate">
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
