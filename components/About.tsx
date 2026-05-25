"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, MapPin } from "lucide-react";

const skillCategories = [
  { label: "Languages",  icon: "💻", skills: ["Python", "C/C++", "Java", "JavaScript", "Solidity"] },
  { label: "Web",        icon: "🌐", skills: ["HTML", "CSS", "React.js", "Next.js", "Bootstrap"] },
  { label: "Blockchain", icon: "⛓️", skills: ["Ethereum", "Hyperledger", "Smart Contracts", "Web3", "Solidity"] },
  { label: "Databases",  icon: "🗄️", skills: ["MongoDB", "MySQL", "SQLite"] },
  { label: "Tools",      icon: "🔧", skills: ["Git", "GitHub", "VS Code", "Android Studio"] },
  { label: "Concepts",   icon: "🧠", skills: ["DSA", "Distributed Systems", "Smart Contract Security"] },
];

const proficiencySkills = [
  { name: "Solidity / Smart Contracts", pct: 82, color: "#6C63FF" },
  { name: "Python",                      pct: 85, color: "#38B2AC" },
  { name: "React.js / Next.js",          pct: 78, color: "#A78BFA" },
  { name: "JavaScript",                  pct: 80, color: "#F59E0B" },
  { name: "C / C++",                     pct: 70, color: "#22D3EE" },
  { name: "Web3 / Ethers.js",            pct: 75, color: "#EC4899" },
];

const funFacts = [
  "🚀 Web3 Believer",
  "🤖 AI Tinkerer",
  "⛓️ Solidity Writer",
  "🛰️ Space Enthusiast",
  "🌐 Open Source Advocate",
  "☕ Caffeine Powered",
];

function SkillBar({ name, pct, color, inView, delay }: { name: string; pct: number; color: string; inView: boolean; delay: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-[#3D4852] dark:text-[#E2E8F0]">{name}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>{pct}%</span>
      </div>
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredFact, setHoveredFact] = useState<number | null>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-[#0A0A0F] relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full dark:bg-[#6C63FF]/6 bg-[#6C63FF]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full dark:bg-[#38B2AC]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#6C63FF] dark:text-[#A78BFA] font-semibold text-sm tracking-widest uppercase mb-2">
            Get to know me
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight">
            About Me
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38B2AC]" />
          </div>
        </motion.div>

        {/* Bio + Education */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-2xl dark:cosmos-card bg-white/70 dark:bg-transparent"
            style={{
              boxShadow: "9px 9px 16px rgb(163,177,198,0.5), -9px -9px 16px rgba(255,255,255,0.6)",
            }}
          >
            <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] mb-4">Who I Am</h3>
            <p className="text-[#6B7280] dark:text-[#94A3B8] leading-relaxed mb-4">
              I&apos;m a Blockchain and AI enthusiast currently pursuing my B.Tech in Computer Science Engineering
              (Blockchain Technology) at Parul University. I&apos;m passionate about building scalable systems at the
              intersection of AI and Web3.
            </p>
            <p className="text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
              With hands-on experience in full-stack development, smart contract development, and enterprise IT
              infrastructure, I bridge the gap between intelligent automation and decentralized architecture.
            </p>

            {/* Location + Availability */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#94A3B8]">
                <MapPin size={15} className="text-[#6C63FF]" />
                <span className="text-sm">Vadodara, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38B2AC] animate-pulse" />
                <span className="text-sm text-[#38B2AC] font-medium">Available for Work</span>
              </div>
            </div>

            {/* Fun facts */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-widest mb-3">Fun Facts</p>
              <div className="flex flex-wrap gap-2">
                {funFacts.map((fact, i) => (
                  <motion.span
                    key={fact}
                    onHoverStart={() => setHoveredFact(i)}
                    onHoverEnd={() => setHoveredFact(null)}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium cursor-default transition-all duration-300"
                    style={{
                      color: hoveredFact === i ? "#fff" : "#6C63FF",
                      background: hoveredFact === i
                        ? "linear-gradient(135deg,#6C63FF,#38B2AC)"
                        : "rgba(108,99,255,0.1)",
                      border: "1px solid rgba(108,99,255,0.2)",
                    }}
                  >
                    {fact}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-2xl"
            style={{
              boxShadow: "9px 9px 16px rgb(163,177,198,0.5), -9px -9px 16px rgba(255,255,255,0.6)",
            }}
          >
            <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] mb-6">Education</h3>
            <div className="flex items-start gap-4 mb-8">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)" }}
              >
                <GraduationCap size={24} className="text-[#6C63FF]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-[#3D4852] dark:text-[#E2E8F0]">
                  Parul Institute of Engineering &amp; Technology
                </h4>
                <p className="text-[#6C63FF] dark:text-[#A78BFA] font-medium text-sm mt-1">
                  B.Tech – CSE (Blockchain Technology)
                </p>
                <p className="text-[#6B7280] dark:text-[#94A3B8] text-sm mt-1">2023 – 2027</p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(56,178,172,0.12)", border: "1px solid rgba(56,178,172,0.25)" }}
                >
                  <span className="text-[#38B2AC]">●</span>
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">CGPA: 7.45</span>
                </div>
              </div>
            </div>

            {/* Skill proficiency bars */}
            <div>
              <h4 className="font-semibold text-sm text-[#3D4852] dark:text-[#E2E8F0] mb-4 uppercase tracking-wide">
                Proficiency
              </h4>
              <div className="space-y-4">
                {proficiencySkills.map((s, i) => (
                  <SkillBar key={s.name} {...s} inView={inView} delay={0.3 + i * 0.1} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] text-center mb-10">
            Technical Skills
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  boxShadow: "8px 8px 14px rgb(163,177,198,0.5), -8px -8px 14px rgba(255,255,255,0.6)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.18)" }}
                  >
                    {cat.icon}
                  </div>
                  <span className="font-display font-semibold text-[#3D4852] dark:text-[#E2E8F0]">{cat.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span
                      key={skill}
                      className="skill-badge px-3 py-1 rounded-full text-xs font-medium text-[#6B7280] dark:text-[#94A3B8]"
                      style={{ boxShadow: "3px 3px 6px rgb(163,177,198,0.5), -3px -3px 6px rgba(255,255,255,0.5)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
