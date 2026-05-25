"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, Download, Eye } from "lucide-react";

const TITLES = [
  "AI Developer",
  "Blockchain Builder",
  "Full Stack Engineer",
  "Web3 Innovator",
  "Smart Contract Dev",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay]   = useState("");
  const [wIdx, setWIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
  const [del, setDel]           = useState(false);

  useEffect(() => {
    const cur = words[wIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && cIdx <= cur.length)
      t = setTimeout(() => setCIdx(c => c + 1), speed);
    else if (del && cIdx >= 0)
      t = setTimeout(() => setCIdx(c => c - 1), speed / 2);
    setDisplay(cur.slice(0, cIdx));
    if (!del && cIdx === cur.length) t = setTimeout(() => setDel(true), pause);
    if (del && cIdx === 0) { setDel(false); setWIdx(w => (w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);

  return display;
}

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.1 } } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  },
};

export default function Hero() {
  const title = useTypewriter(TITLES);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-28
                 dark:bg-[#0A0A0F] bg-[#F5F5F7]"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-30"
          style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-20"
          style={{ background: "radial-gradient(circle, #38B2AC 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      {/* ── DESKTOP LAYOUT: giant split text ── */}
      <div className="hidden lg:block absolute inset-0 max-w-[1280px] mx-auto pointer-events-none select-none">
        {/* Sub-label top-left */}
        <motion.p
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="absolute font-semibold tracking-widest uppercase text-sm dark:text-white/50 text-black/40"
          style={{ left: 72, top: "20%" }}
        >
          Blockchain &amp; AI
        </motion.p>

        {/* Giant "Web3" left */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="absolute font-black leading-none dark:text-white text-black"
          style={{ left: 68, top: "26%", fontSize: "clamp(90px,11vw,160px)", letterSpacing: "-0.02em" }}
        >
          Web3
        </motion.h1>

        {/* Giant "Dev" right */}
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          aria-hidden="true"
          className="absolute font-black leading-none dark:text-white text-black"
          style={{ right: 68, top: "26%", fontSize: "clamp(90px,11vw,160px)", letterSpacing: "-0.02em" }}
        >
          Dev
        </motion.p>

        {/* "&amp; AI" accent bottom-right word */}
        <motion.p
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute font-bold tracking-wide text-[#6C63FF]"
          style={{ right: 68, top: "calc(26% + clamp(90px,11vw,160px) + 8px)", fontSize: 26 }}
        >
          &amp; AI
        </motion.p>

        {/* Bottom-left: bio + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="absolute flex flex-col items-start gap-4 pointer-events-auto"
          style={{ left: 68, bottom: "22%" }}
        >
          <p className="dark:text-white/55 text-black/55 text-sm leading-relaxed max-w-[220px]">
            Building scalable AI + Web3 systems at the intersection of code and cosmos.
          </p>
          <a href="#projects" className="btn-primary text-sm">
            <Eye size={15} /> View Projects
          </a>
        </motion.div>

        {/* Bottom-right: stats + secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6 }}
          className="absolute flex flex-col items-end gap-3 pointer-events-auto"
          style={{ right: 68, bottom: "25%" }}
        >
          <a href="/Resume.pdf" download="Manikant_Kumar_Resume.pdf" className="btn-ghost text-sm">
            <Download size={14} /> Download CV
          </a>
          <p className="dark:text-white/30 text-black/30 text-xs italic">*AI &amp; Blockchain Enthusiast</p>
        </motion.div>
      </div>

      {/* ── MOBILE HEADING ── */}
      <div className="lg:hidden absolute inset-x-0 top-[8%] flex justify-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-col items-center text-center gap-1 px-4"
        >
          <p className="text-xs font-semibold tracking-widest uppercase dark:text-white/40 text-black/40">
            Blockchain &amp; AI
          </p>
          <h1 id="hero-heading"
            className="font-black leading-none dark:text-white text-black tracking-tight"
            style={{ fontSize: "clamp(52px,16vw,88px)" }}
          >
            Web3<br />
            <span className="text-[#6C63FF]">&amp; AI</span><br />
            Dev
          </h1>
        </motion.div>
      </div>

      {/* ── CENTER PHOTO ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 bottom-0 flex justify-center items-end z-10 pointer-events-none"
      >
        <div className="relative flex items-end justify-center">
          {/* Orbit ring 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full dark:border-[#6C63FF]/20 border-[#6C63FF]/30"
            style={{
              width: 340, height: 340,
              border: "1px solid",
              bottom: "40%", left: "50%",
              transform: "translate(-50%, 50%)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#6C63FF] shadow-[0_0_10px_#6C63FF]" />
          </motion.div>

          {/* Orbit ring 2 — dashed, reversed */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full dark:border-[#38B2AC]/15 border-[#38B2AC]/20"
            style={{
              width: 420, height: 420,
              border: "1px dashed",
              bottom: "36%", left: "50%",
              transform: "translate(-50%, 50%)",
            }}
          >
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#38B2AC] shadow-[0_0_8px_#38B2AC]" />
          </motion.div>

          {/* Photo */}
          <div
            className="relative z-20"
            style={{ width: "min(380px, 78vw)", aspectRatio: "3/4" }}
          >
            <Image
              src="/profile.jpg"
              alt="Manikant Kumar — AI Developer & Blockchain Engineer"
              fill
              sizes="(min-width: 1024px) 380px, 78vw"
              className="object-cover object-top mask-fade-bottom"
              priority
              style={{ borderRadius: "2rem 2rem 0 0" }}
            />
            {/* Purple ground glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-28 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at bottom, rgba(108,99,255,0.3) 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── TYPEWRITER + STATUS STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        {/* Name badge */}
        <div
          className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full mb-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#38B2AC] animate-pulse-soft" />
          <span className="font-semibold text-xs dark:text-white/70 text-black/60">Manikant Kumar</span>
          <span className="text-xs text-[#6C63FF] font-medium">Open to work</span>
        </div>

        {/* Typewriter */}
        <p className="font-mono text-sm font-semibold text-[#6C63FF] h-5">
          {title}
          <span className="inline-block w-px h-4 bg-[#6C63FF] ml-0.5 animate-blink align-middle" />
        </p>
      </motion.div>

      {/* ── MOBILE BOTTOM CTAS ── */}
      <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        <motion.a href="#projects" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.45 }} className="btn-primary text-sm">
          <Eye size={14} /> Projects
        </motion.a>
        <motion.a href="#stats" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.52 }} className="btn-ghost text-sm">
          Stats ↗
        </motion.a>
      </div>

      {/* ── SCROLL HINT ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute right-6 bottom-32 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] dark:text-white/25 text-black/25"
          style={{ writingMode: "vertical-rl" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={13} className="dark:text-white/25 text-black/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
