"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
import { projects } from "@/lib/data";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", Python: "#3776AB",
  Solidity: "#AA6746", Java: "#B07219", HTML: "#E34F26",
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" as const } },
});

function ProjectCard({ p, i, inView }: { p: typeof projects[0]; i: number; inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      variants={fadeUp(i * 0.1)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      className="glass rounded-3xl p-6 border border-white/7 flex flex-col gap-4 card-hover group"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          {p.emoji}
        </div>
        <div className="flex gap-2">
          {p.live && (
            <motion.a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live"
              className="w-8 h-8 flex items-center justify-center rounded-xl glass border border-white/8 text-white/40 hover:text-[#2DD4BF] transition-colors"
              whileTap={{ scale: 0.9 }} data-magnetic>
              <ExternalLink size={14} />
            </motion.a>
          )}
          <motion.a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="w-8 h-8 flex items-center justify-center rounded-xl glass border border-white/8 text-white/40 hover:text-[#6366F1] transition-colors"
            whileTap={{ scale: 0.9 }} data-magnetic>
            <GithubIcon size={14} />
          </motion.a>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#818CF8] transition-colors">
        {p.title}
        {p.featured && (
          <span className="ml-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-[#F59E0B] border border-[#F59E0B]/30"
            style={{ background: "rgba(245,158,11,0.08)" }}>Featured</span>
        )}
      </h3>

      <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">{p.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {p.tags.map(t => (
          <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-[#818CF8] border border-[#6366F1]/20"
            style={{ background: "rgba(99,102,241,0.07)" }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: "#030712" }}
    >
      <div className="aurora-blob w-[500px] h-[500px] bg-[#6366F1] opacity-[0.07] absolute top-0 -left-20 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center mb-16">
          <p className="section-label mb-3">What I&apos;ve Built</p>
          <h2 className="section-heading text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/45 mt-4 max-w-xl mx-auto">
            A curated selection of AI, blockchain and full-stack projects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} inView={inView} />
          ))}

          {/* View all */}
          <motion.a
            href="https://github.com/manikantbindass"
            target="_blank" rel="noopener noreferrer"
            variants={fadeUp(projects.length * 0.1)}
            initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-white/10 hover:border-[#6366F1]/40 transition-all duration-300 p-8 min-h-[200px] group"
            whileHover={{ y: -6 }} data-magnetic
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#6366F1] border border-[#6366F1]/25"
              style={{ background: "rgba(99,102,241,0.08)" }}>
              <GithubIcon size={24} />
            </div>
            <div className="text-center">
              <p className="font-bold text-white/70 group-hover:text-white transition-colors">View All Projects</p>
              <p className="text-xs text-white/35 mt-1">github.com/manikantbindass</p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
