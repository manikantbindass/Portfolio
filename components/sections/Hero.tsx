"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowRight, Sparkles } from "lucide-react";


const ROLES = ["AI Augmented Full Stack Developer", "Blockchain Developer", "Backend and DevSecOps"];

function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && cIdx <= cur.length) t = setTimeout(() => setCIdx(c => c + 1), speed);
    else if (del && cIdx >= 0) t = setTimeout(() => setCIdx(c => c - 1), speed / 2);
    setDisplay(cur.slice(0, cIdx));
    if (!del && cIdx === cur.length) t = setTimeout(() => setDel(true), pause);
    if (del && cIdx === 0) { setDel(false); setWIdx(w => (w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);
  return display;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const quickStats = [
  { label: "Projects Built",  value: "15+",  color: "#6366F1" },
  { label: "LeetCode Solved", value: "350+", color: "#A78BFA" },
  { label: "Hackathon",       value: "1",    color: "#2DD4BF" },
  { label: "GitHub Repos",    value: "239+", color: "#F59E0B" },
];

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-28"
      style={{ background: "#030712" }}
    >
      {/* ── Aurora background blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="aurora-blob w-[700px] h-[700px] bg-[#6366F1] opacity-[0.12]"
          style={{ top: "10%", left: "-10%" }} />
        <div className="aurora-blob w-[600px] h-[600px] bg-[#A78BFA] opacity-[0.09]"
          style={{ bottom: "5%", right: "-8%", animationDelay: "4s" }} />
        <div className="aurora-blob w-[400px] h-[400px] bg-[#2DD4BF] opacity-[0.06]"
          style={{ top: "40%", left: "50%", animationDelay: "8s" }} />
        {/* Star field */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i}
            className="absolute rounded-full bg-white animate-pulse-soft"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* ── LEFT: Text ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-start gap-6">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse-soft" />
              Available for freelance &amp; full-time
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp}>
            <p className="section-label mb-2">Hello, I&apos;m</p>
            <h1
              id="hero-heading"
              className="font-bold leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
            >
              Manikant{" "}
              <span className="gradient-text">Kumar</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={fadeUp} className="h-8 flex items-center">
            <span className="font-mono text-base sm:text-lg font-semibold text-[#A78BFA]">
              {role}
              <span className="inline-block w-0.5 h-5 bg-[#A78BFA] ml-1 animate-blink align-middle" />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-white/55 leading-relaxed max-w-lg" style={{ fontSize: "1.05rem" }}>
            I build scalable AI-powered products, high-performance systems, and modern web experiences that push the boundaries of technology.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              data-magnetic
              className="flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-2xl transition-all"
              style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)", boxShadow: "0 6px 24px rgba(99,102,241,0.4)" }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects <ArrowRight size={15} />
            </motion.a>
            <motion.a
              href="/Manikant FDE Resume.pdf"
              download
              data-magnetic
              className="flex items-center gap-2 text-sm font-semibold text-white/85 px-6 py-3 rounded-2xl glass border border-white/10"
              whileHover={{ scale: 1.04, y: -2, borderColor: "rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={15} /> Download CV
            </motion.a>
            <motion.a
              href="#contact"
              data-magnetic
              className="flex items-center gap-2 text-sm font-semibold text-[#2DD4BF] px-6 py-3 rounded-2xl border border-[#2DD4BF]/25"
              whileHover={{ scale: 1.04, y: -2, borderColor: "rgba(45,212,191,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
            {quickStats.map(s => (
              <div key={s.label} className="glass rounded-2xl p-3 flex flex-col gap-1">
                <span className="font-bold text-xl text-white" style={{ color: s.color }}>{s.value}</span>
                <span className="text-[10px] text-white/40 font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Photo + orbit + AI button ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" as const }}
          className="relative flex flex-col items-center justify-center gap-6 order-first lg:order-last"
        >
          {/* Photo + orbits container */}
          <div className="relative flex items-center justify-center">
            {/* Glow behind photo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(60px)" }} />
            </div>

            {/* Orbit ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-[#6366F1]/20"
              style={{ width: 320, height: 320 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#6366F1]"
                style={{ boxShadow: "0 0 14px #6366F1" }} />
            </motion.div>

            {/* Orbit ring 2 — dashed */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border-dashed border border-[#2DD4BF]/15"
              style={{ width: 400, height: 400 }}
            >
              <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-[#2DD4BF]"
                style={{ boxShadow: "0 0 10px #2DD4BF" }} />
            </motion.div>

            {/* Floating tech pills */}
            {[
              { label: "Next.js",  top: "8%",   left: "0%",   color: "#6366F1" },
              { label: "Solidity", top: "20%",  right: "-4%", color: "#A78BFA" },
              { label: "AI/ML",    bottom:"18%", left: "-4%", color: "#2DD4BF" },
              { label: "Web3",     bottom:"8%",  right:"5%",  color: "#F59E0B" },
            ].map(p => (
              <motion.div
                key={p.label}
                className="absolute glass px-3 py-1.5 rounded-xl text-xs font-semibold text-white border border-white/10 z-10"
                style={{ ...p, color: p.color, borderColor: `${p.color}25` }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {p.label}
              </motion.div>
            ))}

            {/* Profile image */}
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 z-10">
              <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(167,139,250,0.2))", filter: "blur(1px)" }} />
              <Image
                src="/profile.jpg"
                alt="Manikant Kumar — AI Developer"
                fill
                priority
                className="object-cover object-top mask-bottom"
                style={{ borderRadius: "1.5rem" }}
                sizes="(min-width: 1024px) 288px, 224px"
              />
            </div>
          </div>

          {/* ── AI Chat button — visibly below photo ── */}
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent("openChatbot"))}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-20 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold group"
            style={{
              background: "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(167,139,250,0.12))",
              border: "1px solid rgba(99,102,241,0.4)",
              boxShadow: "0 0 24px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Live pulse dot */}
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2DD4BF]" />
            </span>
            <Sparkles size={15} className="text-[#A78BFA]" />
            <span className="text-white/85 group-hover:text-white transition-colors">
              Ask my <span className="text-[#A78BFA] font-bold">AI</span> anything
            </span>
            {/* Arrow hint */}
            <span className="text-[#6366F1] text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
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
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">scroll</span>
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
