"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills, marqueeItems } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: "easeOut" as const } },
});

const CATS = [
  { key: "frontend",   label: "Frontend",   color: "#6366F1" },
  { key: "backend",    label: "Backend",    color: "#A78BFA" },
  { key: "aiml",       label: "AI / ML",    color: "#2DD4BF" },
  { key: "blockchain", label: "Blockchain", color: "#F59E0B" },
  { key: "devops",     label: "DevOps",     color: "#F43F5E" },
] as const;

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<keyof typeof skills>("frontend");

  const cat = CATS.find(c => c.key === active)!;
  const items = skills[active];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: "#050A18" }}
    >
      <div className="aurora-blob w-[450px] h-[450px] bg-[#2DD4BF] opacity-[0.06] absolute -bottom-10 -left-20 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center mb-12">
          <p className="section-label mb-3">Technology Stack</p>
          <h2 className="section-heading text-white">
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
        </motion.div>

        {/* Marquee rows */}
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"} className="mb-12 flex flex-col gap-3">
          <div className="marquee-wrap">
            <div className="marquee-inner">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="glass border border-white/7 px-4 py-2 rounded-full text-xs font-semibold text-white/60 whitespace-nowrap flex-shrink-0">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="marquee-wrap">
            <div className="marquee-inner-rev">
              {[...marqueeItems.slice().reverse(), ...marqueeItems.slice().reverse()].map((item, i) => (
                <span key={i} className="glass border border-white/7 px-4 py-2 rounded-full text-xs font-semibold text-white/40 whitespace-nowrap flex-shrink-0">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? "show" : "hidden"} className="flex flex-wrap gap-2 justify-center mb-10">
          {CATS.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              data-magnetic
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 border ${
                active === c.key
                  ? "text-white border-transparent"
                  : "glass border-white/8 text-white/50 hover:text-white/80"
              }`}
              style={active === c.key ? { background: `linear-gradient(135deg,${c.color}cc,${c.color}88)`, boxShadow: `0 4px 16px ${c.color}40` } : {}}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Skill cards grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {items.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="glass rounded-2xl p-5 border border-white/7 card-hover flex flex-col gap-3 items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, color: cat.color }}>
                {s.name.slice(0, 2)}
              </div>
              <p className="font-semibold text-white text-sm">{s.name}</p>
              <div className="w-full progress-track">
                <div
                  className="progress-fill"
                  style={{ width: inView ? `${s.level}%` : "0%", background: `linear-gradient(90deg,${cat.color}88,${cat.color})` }}
                />
              </div>
              <p className="text-xs font-mono text-white/40">{s.level}%</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
