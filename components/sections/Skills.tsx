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

// ── Icon map: skill name → cdn.simpleicons.org URL ──────────────────────────
const ICON_MAP: Record<string, string> = {
  // Frontend
  "Next.js":        "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "React":          "https://cdn.simpleicons.org/react/61DAFB",
  "TypeScript":     "https://cdn.simpleicons.org/typescript/3178C6",
  "TailwindCSS":    "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "Framer Motion":  "https://cdn.simpleicons.org/framer/ffffff",
  // Backend
  "Node.js":        "https://cdn.simpleicons.org/nodedotjs/339933",
  "Python":         "https://cdn.simpleicons.org/python/3776AB",
  "PostgreSQL":     "https://cdn.simpleicons.org/postgresql/4169E1",
  "MongoDB":        "https://cdn.simpleicons.org/mongodb/47A248",
  "Supabase":       "https://cdn.simpleicons.org/supabase/3ECF8E",
  // AI / ML
  "LangChain":      "https://cdn.simpleicons.org/langchain/ffffff",
  "OpenAI":         "https://cdn.simpleicons.org/openai/ffffff",
  "Gemini":         "https://cdn.simpleicons.org/googlegemini/8E75B2",
  "Pinecone":       "https://cdn.simpleicons.org/pinecone/ffffff",
  "PyTorch":        "https://cdn.simpleicons.org/pytorch/EE4C2C",
  // Blockchain
  "Solidity":       "https://cdn.simpleicons.org/solidity/ffffff",
  "Ethereum":       "https://cdn.simpleicons.org/ethereum/ffffff",
  "Web3.js":        "https://cdn.simpleicons.org/web3dotjs/F16822",
  "IPFS":           "https://cdn.simpleicons.org/ipfs/65C2CB",
  "Hardhat":        "https://cdn.simpleicons.org/hardhat/FFF100",
  // DevOps
  "Docker":         "https://cdn.simpleicons.org/docker/2496ED",
  "AWS":            "https://cdn.simpleicons.org/amazonwebservices/FF9900",
  "Vercel":         "https://cdn.simpleicons.org/vercel/ffffff",
  "Git":            "https://cdn.simpleicons.org/git/F05032",
  "CI/CD":          "https://cdn.simpleicons.org/githubactions/2088FF",
};

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
          {items.map((s, i) => {
            const iconUrl = ICON_MAP[s.name];
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="glass rounded-2xl p-5 border border-white/7 flex flex-col gap-3 items-center text-center group cursor-default"
                style={{ borderColor: `${cat.color}20` }}
              >
                {/* Icon container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `${cat.color}12`,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {/* Glow pulse on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(circle at center, ${cat.color}35 0%, transparent 70%)` }}
                  />

                  {iconUrl ? (
                    <motion.img
                      src={iconUrl}
                      alt={`${s.name} logo`}
                      width={30}
                      height={30}
                      draggable={false}
                      className="relative z-10 select-none"
                      style={{ width: 30, height: 30, objectFit: "contain" }}
                      whileHover={{ rotate: [0, -12, 12, -6, 6, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <span className="font-black text-xl relative z-10" style={{ color: cat.color }}>
                      {s.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                <p className="font-semibold text-white text-sm">{s.name}</p>

                <div className="w-full progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: inView ? `${s.level}%` : "0%",
                      background: `linear-gradient(90deg,${cat.color}88,${cat.color})`,
                    }}
                  />
                </div>

                <p className="text-xs font-mono" style={{ color: cat.color }}>{s.level}%</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
