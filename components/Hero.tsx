"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, Code2, GitBranch, Zap } from "lucide-react";

const TITLES = [
  "AI Developer",
  "Blockchain Builder",
  "Full Stack Engineer",
  "Web3 Innovator",
  "Smart Contract Dev",
];

function useTypewriter(words: string[], speed = 75, pause = 1800) {
  const [display, setDisplay]   = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (deleting && charIdx >= 0) {
      t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    }
    setDisplay(current.slice(0, charIdx));
    if (!deleting && charIdx === current.length) t = setTimeout(() => setDeleting(true), pause);
    if (deleting && charIdx === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const quickStats = [
  { label: "Projects",   value: "10+", icon: Code2,     color: "#6C63FF" },
  { label: "Hackathons", value: "5+",  icon: Zap,       color: "#F59E0B" },
  { label: "GitHub",     value: "18+", icon: GitBranch, color: "#38B2AC" },
];

export default function Hero() {
  const typedTitle = useTypewriter(TITLES);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden select-none bg-[#0A0A0F]"
      style={{ height: "100svh" }}
    >
      {/* ── Cosmos glow blobs ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div style={{ position:"absolute", top:"30%", left:"15%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)", filter:"blur(40px)" }} />
        <div style={{ position:"absolute", top:"20%", right:"12%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(56,178,172,0.07) 0%, transparent 70%)", filter:"blur(40px)" }} />
        <div style={{ position:"absolute", bottom:"10%", left:"30%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", filter:"blur(40px)" }} />
      </div>

      {/* ── Desktop large typography layout ── */}
      <div className="hidden lg:block absolute inset-0 max-w-[1280px] mx-auto">
        {/* "Blockchain" top-left */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.7 }}
          className="absolute z-30 font-bold text-white/70 tracking-wide"
          style={{ left: 80, top: "19%", fontSize: 28 }}
        >
          Blockchain
        </motion.p>
        {/* Giant "Web3" */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="absolute z-10 font-black leading-[0.88] text-white animate-fade-up"
          style={{ left: 80, top: "24%", fontSize: 148, animationDelay:"60ms" }}
        >
          Web3
        </motion.h1>
        {/* "Dev" top-right */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="absolute z-10 font-black leading-[0.88] text-white"
          style={{ right: 80, top: "24%", fontSize: 148 }}
          aria-hidden="true"
        >
          Dev
        </motion.h1>
        {/* "& AI" label top-right */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
          className="absolute z-30 font-bold tracking-wide"
          style={{ right: 76, top: "41.5%", fontSize: 28, color: "#6C63FF" }}
        >
          &amp; AI
        </motion.p>

        {/* Bottom-left description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="absolute z-30 flex flex-col items-start gap-4"
          style={{ left: 60, bottom: "20%" }}
        >
          <p className="text-white/60 leading-relaxed" style={{ fontSize: 14, maxWidth: 240 }}>
            Building scalable AI + Web3 systems<br />at the intersection of code and cosmos.
          </p>
          <a href="#projects" className="btn-primary text-sm">
            View Projects →
          </a>
        </motion.div>

        {/* Bottom-right CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.7 }}
          className="absolute z-30 flex flex-col items-end gap-1"
          style={{ right: 100, bottom: "24%" }}
        >
          <a href="#stats" className="btn-ghost text-sm -ml-8">
            My Stats ↗
          </a>
          <p className="text-white/40 italic" style={{ fontSize: 12 }}>
            *Blockchain &amp; AI Enthusiast
          </p>
        </motion.div>
      </div>

      {/* ── Mobile / tablet text layout ── */}
      <div className="lg:hidden absolute inset-x-0 pointer-events-none" style={{ top: "10%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col items-center text-center"
        >
          <p className="font-bold text-white/60 text-base mb-1 tracking-wide">Blockchain</p>
          <h1 id="hero-heading"
            className="font-black text-white leading-[0.88] tracking-tight text-center"
            style={{ fontSize: "clamp(54px,17vw,90px)" }}
          >
            Web3<br /><span className="text-[#6C63FF]">&amp; AI</span><br />Dev
          </h1>
        </motion.div>
      </div>

      {/* ── Center photo (shared across breakpoints) ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center z-20"
      >
        {/* Orbit rings behind photo */}
        <div className="relative flex items-end justify-center">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-[#6C63FF]/20"
              style={{ width: 380, height: 380, top: "50%", left: "50%", transform: "translate(-50%,-60%)" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#6C63FF] shadow-[0_0_12px_#6C63FF]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-[#38B2AC]/15"
              style={{ width: 460, height: 460, top: "50%", left: "50%", transform: "translate(-50%,-60%)", borderStyle: "dashed" }}
            >
              <div className="absolute top-1/3 right-0 translate-x-1/2 w-2 h-2 rounded-full bg-[#38B2AC] shadow-[0_0_8px_#38B2AC]" />
            </motion.div>
          </div>

          {/* Profile photo with bottom fade mask */}
          <div
            className="relative"
            style={{
              width: "min(420px, 80vw)",
              aspectRatio: "3 / 4",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Manikant Kumar — AI Developer & Blockchain Engineer"
              fill
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-cover object-top mask-fade-bottom"
              priority
              style={{ borderRadius: "2rem 2rem 0 0" }}
            />
            {/* Radial ground glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center bottom, rgba(108,99,255,0.35) 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Mobile bottom CTAs ── */}
      <div className="lg:hidden absolute bottom-[12%] left-0 w-full flex justify-center items-start gap-3 z-30 px-4">
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="btn-ghost text-sm"
        >
          Projects
        </motion.a>
        <motion.a
          href="#stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
          className="btn-primary text-sm"
        >
          My Stats
        </motion.a>
      </div>

      {/* ── Typewriter + status strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <p className="font-mono text-sm font-semibold text-[#6C63FF]">
          {typedTitle}
          <span className="inline-block w-0.5 h-4 bg-[#6C63FF] ml-1 animate-blink align-middle" />
        </p>
        {/* Quick stat badges */}
        <div className="flex gap-3">
          {quickStats.map(s => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: `${s.color}14`,
                  border: `1px solid ${s.color}30`,
                  color: s.color,
                }}
              >
                <Icon size={11} />
                <span className="font-bold">{s.value}</span>
                <span className="text-white/40">{s.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 right-8 z-30 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/30 rotate-90 origin-center">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* ── Floating name badge (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 z-30"
      >
        <div
          className="flex items-center gap-3 px-5 py-2.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#38B2AC] animate-pulse-soft" />
          <span className="font-semibold text-sm text-white/80">
            Manikant Kumar
          </span>
          <span className="text-xs text-[#6C63FF] font-medium">Available for work</span>
        </div>
      </motion.div>
    </section>
  );
}
