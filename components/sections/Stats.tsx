"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats as fallbackStats } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" as const } },
});

function CircleRing({ pct, color, size = 100 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface LCStats { total: number; easy: number; medium: number; hard: number; rating: number; }
interface GHStats { repos: number; followers: number; }

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Live stats state — starts from data.ts fallback, overwritten by API
  const [lc, setLc] = useState<LCStats>({
    total:  fallbackStats.leetcode.total,
    easy:   fallbackStats.leetcode.easy,
    medium: fallbackStats.leetcode.medium,
    hard:   fallbackStats.leetcode.hard,
    rating: fallbackStats.leetcode.rating,
  });
  const [gh, setGh] = useState<GHStats>({
    repos:     fallbackStats.github.repos,
    followers: fallbackStats.github.followers,
  });
  const [liveLabel, setLiveLabel] = useState<"live" | "cached" | "fallback">("cached");

  // ── Fetch live stats on mount ──────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [lcRes, ghRes] = await Promise.allSettled([
          fetch("/api/leetcode"),
          fetch("/api/github"),
        ]);

        if (!cancelled) {
          if (lcRes.status === "fulfilled" && lcRes.value.ok) {
            const data = await lcRes.value.json();
            setLc({
              total:  data.total  ?? lc.total,
              easy:   data.easy   ?? lc.easy,
              medium: data.medium ?? lc.medium,
              hard:   data.hard   ?? lc.hard,
              rating: data.rating ?? 1620,
            });
            if (data.source === "live") setLiveLabel("live");
          }
          if (ghRes.status === "fulfilled" && ghRes.value.ok) {
            const data = await ghRes.value.json();
            setGh({ repos: data.repos ?? gh.repos, followers: data.followers ?? gh.followers });
          }
        }
      } catch {
        // silently use fallback
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = lc.easy + lc.medium + lc.hard;
  const difficulties = [
    { label: "Easy",   count: lc.easy,   pct: total ? Math.round(lc.easy   / total * 100) : 33, color: "#2DD4BF" },
    { label: "Medium", count: lc.medium, pct: total ? Math.round(lc.medium / total * 100) : 34, color: "#F59E0B" },
    { label: "Hard",   count: lc.hard,   pct: total ? Math.round(lc.hard   / total * 100) : 33, color: "#F43F5E" },
  ];

  const platforms = [
    {
      name: "LeetCode",  emoji: "🔥", color: "#F59E0B",
      stats: [
        { label: "Solved",  value: lc.total,  suffix: "+" },
        { label: "Rating",  value: lc.rating, suffix: "+" },
      ],
      href: "https://leetcode.com/u/manikantbindass/",
    },
    {
      name: "GitHub", emoji: "🐙", color: "#6366F1",
      stats: [
        { label: "Repos",   value: gh.repos,                    suffix: "+" },
        { label: "Commits", value: fallbackStats.github.commits, suffix: "+" },
      ],
      href: "https://github.com/manikantbindass",
    },
    {
      name: "Hackathon", emoji: "🏆", color: "#2DD4BF",
      stats: [
        { label: "Competed", value: 1,                          suffix: "" },
        { label: "Projects", value: fallbackStats.projects,    suffix: "+" },
      ],
      href: "https://devfolio.co/@manikantbindass",
    },
  ];

  return (
    <section
      id="stats"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: "#030712" }}
    >
      <div className="aurora-blob w-[500px] h-[500px] bg-[#F59E0B] opacity-[0.05] absolute top-0 right-0 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center mb-16">
          <p className="section-label mb-3">Numbers that matter</p>
          <h2 className="section-heading text-white">
            Coding <span className="gradient-text-gold">Stats</span>
          </h2>
          {/* Live indicator */}
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full glass border border-white/8 text-[10px] text-white/40">
            <span className={`w-1.5 h-1.5 rounded-full ${liveLabel === "live" ? "bg-[#2DD4BF] animate-pulse" : "bg-white/25"}`} />
            {liveLabel === "live" ? "Live data · auto-updates every 6 hours" : "Cached data"}
          </div>
        </motion.div>

        {/* LeetCode ring card */}
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="glass rounded-3xl p-8 border border-white/7 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Big ring */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="relative">
                <CircleRing pct={Math.min(Math.round(lc.total / 600 * 100), 100)} color="#F59E0B" size={140} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <AnimatedCounter to={lc.total} suffix="+" className="font-black text-3xl text-white" />
                  <span className="text-[10px] text-white/40 font-medium">Solved</span>
                </div>
              </div>
              <p className="font-bold text-white/70 text-sm">LeetCode</p>
            </div>

            {/* Difficulty breakdown */}
            <div className="grid grid-cols-3 gap-4 flex-1 w-full">
              {difficulties.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center gap-3 glass rounded-2xl p-5 border border-white/6"
                >
                  <CircleRing pct={d.pct} color={d.color} size={80} />
                  <div className="text-center">
                    <AnimatedCounter to={d.count} className="font-black text-xl text-white" />
                    <p className="text-xs font-semibold mt-0.5" style={{ color: d.color }}>{d.label}</p>
                  </div>
                  <div className="w-full progress-track">
                    <div className="progress-fill" style={{ width: inView ? `${d.pct}%` : "0%", background: `linear-gradient(90deg,${d.color}88,${d.color})` }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra stats */}
            <div className="flex flex-col gap-4 min-w-[160px]">
              <div className="glass rounded-2xl p-4 border border-white/6 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-white/35">Contest Rating</p>
                <AnimatedCounter to={lc.rating} suffix="+" className="font-black text-2xl gradient-text-gold" />
              </div>
              <div className="glass rounded-2xl p-4 border border-white/6 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-white/35">LeetCode</p>
                <a
                  href="https://leetcode.com/u/manikantbindass/"
                  target="_blank" rel="noopener noreferrer"
                  className="font-black text-lg text-[#F59E0B] hover:underline"
                >
                  @manikantbindass →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank" rel="noopener noreferrer"
              variants={fadeUp(0.15 + i * 0.1)}
              initial="hidden" animate={inView ? "show" : "hidden"}
              className="glass rounded-3xl p-6 border border-white/7 flex flex-col gap-4 card-hover"
              data-magnetic
              style={{ borderColor: `${p.color}18` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.emoji}</span>
                <p className="font-bold text-white text-lg">{p.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {p.stats.map(s => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <AnimatedCounter to={s.value} suffix={s.suffix}
                      className="font-black text-2xl text-white" />
                    <p className="text-[10px] uppercase tracking-wider text-white/35">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="w-full h-px" style={{ background: `linear-gradient(90deg,transparent,${p.color}50,transparent)` }} />
              <p className="text-xs text-white/35 font-medium">View profile →</p>
            </motion.a>
          ))}
        </div>

        {/* ── GitHub Activity ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-10"
        >
          {/* Sub-heading */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🐙</span>
            <div>
              <p className="section-label">Open Source Activity</p>
              <h3 className="text-white font-black text-2xl">GitHub <span className="gradient-text">Contributions</span></h3>
            </div>
            <a
              href="https://github.com/manikantbindass"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto btn-ghost text-xs"
            >
              View Profile →
            </a>
          </div>

          {/* Contribution graph (full-width) */}
          <div className="glass rounded-3xl p-1 border border-white/7 overflow-hidden mb-5">
            <img
              src="https://ghchart.rshah.org/6366F1/manikantbindass"
              alt="Manikant Kumar GitHub contribution graph"
              className="w-full rounded-2xl"
              style={{ filter: "brightness(1.1) saturate(1.2)" }}
            />
          </div>

          {/* Streak + Top Langs row */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Streak card */}
            <div className="glass rounded-3xl border border-white/7 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://streak-stats.demolab.com?user=manikantbindass&theme=transparent&hide_border=true&ring=6366F1&fire=A78BFA&currStreakLabel=6366F1&sideLabels=94A3B8&dates=94A3B8&currStreakNum=ffffff&sideNums=ffffff&background=00000000"
                alt="GitHub streak stats"
                className="w-full max-w-md"
              />
            </div>

            {/* Top Languages */}
            <div className="glass rounded-3xl border border-white/7 p-6 flex flex-col gap-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#6366F1]">Top Languages</p>
              {[
                { lang: "TypeScript", pct: 38, color: "#3178C6" },
                { lang: "Python",     pct: 28, color: "#3572A5" },
                { lang: "Java",       pct: 16, color: "#B07219" },
                { lang: "JavaScript", pct: 12, color: "#F1E05A" },
                { lang: "Solidity",   pct:  6, color: "#AA6746" },
              ].map(({ lang, pct, color }) => (
                <div key={lang} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-white/80 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                      {lang}
                    </span>
                    <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: inView ? `${pct}%` : "0%",
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="glass rounded-3xl border border-white/7 p-6 mt-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#6366F1] mb-5">GitHub Stats</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: "📦", label: "Public Repos",  value: gh.repos,                         color: "#6366F1", suffix: "+" },
                { icon: "👥", label: "Followers",      value: gh.followers,                     color: "#A78BFA", suffix: "+" },
                { icon: "🔀", label: "Pull Requests",  value: fallbackStats.github.prs,         color: "#2DD4BF", suffix: "+" },
                { icon: "💾", label: "Total Commits",  value: fallbackStats.github.commits,     color: "#F59E0B", suffix: "+" },
              ].map(({ icon, label, value, color, suffix }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-4 border border-white/5 flex flex-col items-center gap-2 text-center"
                  style={{ borderColor: `${color}18` }}
                >
                  <span className="text-2xl">{icon}</span>
                  <AnimatedCounter
                    to={value}
                    suffix={suffix}
                    className="font-black text-2xl text-white"
                  />
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
                  <div className="w-8 h-0.5 rounded-full" style={{ background: color }} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
