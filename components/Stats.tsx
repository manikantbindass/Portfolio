"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Trophy, Code2, GitBranch, Star, Zap, Award } from "lucide-react";

/* ─── Counter Hook ──────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const statCards = [
  { label: "GitHub Repos",   value: 18,  suffix: "+", icon: GitBranch, color: "#6C63FF", bg: "rgba(108,99,255,0.12)" },
  { label: "Projects Built", value: 10,  suffix: "+", icon: Code2,     color: "#38B2AC", bg: "rgba(56,178,172,0.12)"  },
  { label: "Certifications", value: 3,   suffix: "+", icon: Award,     color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
  { label: "Hackathons",     value: 5,   suffix: "+", icon: Zap,       color: "#F59E0B", bg: "rgba(245,158,11,0.12)"  },
  { label: "LeetCode Solved",value: 150, suffix: "+", icon: Star,      color: "#22D3EE", bg: "rgba(34,211,238,0.12)"  },
  { label: "Tech Stack",     value: 20,  suffix: "+", icon: Trophy,    color: "#EC4899", bg: "rgba(236,72,153,0.12)"  },
];

const contestCards = [
  {
    platform: "LeetCode",
    emoji: "🟨",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    stat: "150+ Problems",
    badge: "Solver",
    description: "Consistent problem solver covering Arrays, DP, Graphs & Trees",
    link: "https://leetcode.com/manikantbindass",
  },
  {
    platform: "HackerRank",
    emoji: "🟩",
    color: "#38B2AC",
    bg: "rgba(56,178,172,0.1)",
    border: "rgba(56,178,172,0.25)",
    stat: "5★ Python",
    badge: "5-Star",
    description: "5-star rated in Python & Problem Solving domains",
    link: "https://hackerrank.com/manikantbindass",
  },
  {
    platform: "Smart India Hackathon",
    emoji: "🇮🇳",
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.1)",
    border: "rgba(255,107,53,0.25)",
    stat: "2024",
    badge: "Participant",
    description: "Competed in India's largest hackathon with a blockchain-based solution",
    link: "#",
  },
  {
    platform: "ETHIndia",
    emoji: "⟠",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.1)",
    border: "rgba(108,99,255,0.25)",
    stat: "2024",
    badge: "Builder",
    description: "Built a DeFi protocol at India's premier Ethereum hackathon",
    link: "#",
  },
  {
    platform: "Devfolio",
    emoji: "🚀",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.25)",
    stat: "3 Hackathons",
    badge: "Active",
    description: "3 hackathons submitted — spanning Web3, AI and IoT domains",
    link: "https://devfolio.co/@manikantbindass",
  },
  {
    platform: "GitHub Contributions",
    emoji: "🐙",
    color: "#E2E8F0",
    bg: "rgba(226,232,240,0.08)",
    border: "rgba(226,232,240,0.15)",
    stat: "500+ Commits",
    badge: "Active",
    description: "Consistent open-source contributor with 18+ public repositories",
    link: "https://github.com/manikantbindass",
  },
];

/* ─── ContestCard ────────────────────────────────────────────────────── */
function ContestCard({ card, index, inView }: { card: typeof contestCards[0]; index: number; inView: boolean }) {
  return (
    <motion.a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="block p-5 rounded-2xl transition-all duration-300 group"
      style={{ background: card.bg, border: `1px solid ${card.border}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{card.emoji}</span>
          <div>
            <h4 className="font-semibold text-sm text-[#3D4852] dark:text-[#E2E8F0] leading-tight">
              {card.platform}
            </h4>
            <p className="text-xs font-bold mt-0.5" style={{ color: card.color }}>{card.stat}</p>
          </div>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
          style={{ background: `${card.color}CC` }}
        >
          {card.badge}
        </span>
      </div>
      <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
        {card.description}
      </p>
    </motion.a>
  );
}

/* ─── StatCard ───────────────────────────────────────────────────────── */
function StatCard({ item, inView }: { item: typeof statCards[0]; inView: boolean }) {
  const count = useCountUp(item.value, 1600, inView);
  const Icon = item.icon;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-6 rounded-2xl text-center transition-all duration-300"
      style={{ background: item.bg, border: `1px solid ${item.color}25` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
        style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
      >
        <Icon size={22} style={{ color: item.color }} />
      </div>
      <div
        className="font-extrabold text-3xl mb-1 tabular-nums animate-counter-glow"
        style={{ color: item.color }}
      >
        {count}{item.suffix}
      </div>
      <div className="text-xs font-medium text-[#6B7280] dark:text-[#94A3B8]">{item.label}</div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────── */
export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      ref={ref}
      className="py-24 bg-[#0A0A0F] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full dark:bg-[#6C63FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full dark:bg-[#F59E0B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 dark:bg-[#F59E0B]/10 bg-[#F59E0B]/8 dark:border dark:border-[#F59E0B]/20 border border-[#F59E0B]/15">
            <Trophy size={14} className="text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-semibold text-sm tracking-widest uppercase">
              Achievements
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight mb-4">
            Stats &{" "}
            <span className="gradient-text-gold">Contests</span>
          </h2>
          <p className="text-[#6B7280] dark:text-[#94A3B8] max-w-xl mx-auto text-lg">
            Numbers that reflect my journey across competitive programming, hackathons, and open-source.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EC4899]" />
          </div>
        </motion.div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {statCards.map((item) => (
            <StatCard key={item.label} item={item} inView={inView} />
          ))}
        </div>

        {/* Contest Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] text-center mb-8 flex items-center justify-center gap-2">
            <Zap size={22} className="text-[#F59E0B]" />
            Contest Participations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contestCards.map((card, i) => (
              <ContestCard key={card.platform} card={card} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>

        {/* GitHub contribution bar decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-10 p-6 rounded-2xl dark:bg-white/3 bg-black/3 dark:border dark:border-white/5 border border-black/5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#6B7280] dark:text-[#94A3B8] flex items-center gap-2">
              <GitBranch size={14} className="text-[#6C63FF]" />
              GitHub Activity
            </span>
            <span className="text-xs text-[#6C63FF] dark:text-[#A78BFA] font-medium">github.com/manikantbindass</span>
          </div>
          {/* Simulated contribution heatmap */}
          <div className="flex gap-0.5 flex-wrap">
            {Array.from({ length: 52 * 7 }, (_, i) => {
              const intensity = Math.random();
              let color = "bg-[#1e1e2e]";
              if (intensity > 0.85) color = "dark:bg-[#6C63FF] bg-[#6C63FF]/70";
              else if (intensity > 0.65) color = "dark:bg-[#6C63FF]/60 bg-[#6C63FF]/40";
              else if (intensity > 0.45) color = "dark:bg-[#6C63FF]/30 bg-[#6C63FF]/20";
              else if (intensity > 0.3)  color = "dark:bg-[#6C63FF]/15 bg-[#6C63FF]/10";
              else                        color = "dark:bg-white/5 bg-black/5";
              return (
                <div key={i} className={`w-2.5 h-2.5 rounded-sm ${color} transition-colors`} />
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-2">
            <span className="text-xs text-[#6B7280] dark:text-[#94A3B8]">Less</span>
            {["dark:bg-white/5 bg-black/5","dark:bg-[#6C63FF]/15","dark:bg-[#6C63FF]/30","dark:bg-[#6C63FF]/60","dark:bg-[#6C63FF]"].map((c,i)=>(
              <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
            ))}
            <span className="text-xs text-[#6B7280] dark:text-[#94A3B8]">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
