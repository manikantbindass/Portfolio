"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Eye } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "AI Developer",
  "Full Stack Engineer",
  "Blockchain Builder",
  "Web3 Innovator",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    }

    setDisplay(current.slice(0, charIdx));

    if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const floatingBlobs = [
  { size: 300, top: "10%", left: "5%", color: "#6C63FF", delay: 0 },
  { size: 250, top: "60%", right: "5%", color: "#38B2AC", delay: 1 },
  { size: 200, top: "30%", right: "20%", color: "#8B84FF", delay: 2 },
];

export default function Hero() {
  const typedTitle = useTypewriter(TITLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#E0E5EC] dark:bg-[#1A1D24]"
    >
      {/* Floating blobs */}
      {floatingBlobs.map((blob, i) => (
        <motion.div
          key={i}
          className="blob"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            background: blob.color,
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 5 + i,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        {/* Center layout: photo top, text centered below on mobile; 
            on desktop: side by side but content block itself centered */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Profile Image — appears first on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex-shrink-0 flex justify-center"
          >
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #6C63FF, #38B2AC, #8B84FF, #6C63FF)",
                  padding: "3px",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#E0E5EC] dark:bg-[#1A1D24]" />
              </motion.div>

              {/* Profile image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden m-1"
                style={{
                  boxShadow:
                    "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)",
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Manikant Kumar - AI Developer & Blockchain Engineer"
                  fill
                  sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -right-4 px-3 py-2 rounded-inner text-xs font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B84FF] shadow-lg"
              >
                🤖 AI Dev
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-inner text-xs font-semibold text-white bg-gradient-to-r from-[#38B2AC] to-[#6C63FF] shadow-lg"
              >
                ⛓️ Web3
              </motion.div>
            </div>
          </motion.div>

          {/* Text content — centered on mobile, left-aligned on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu-sm dark:shadow-dark-neu"
            >
              <span className="w-2 h-2 rounded-full bg-[#38B2AC] animate-pulse-soft" />
              <span className="text-sm font-medium text-[#6B7280] dark:text-[#94A3B8]">
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl text-[#3D4852] dark:text-[#E2E8F0] leading-tight tracking-tight mb-4"
            >
              Manikant{" "}
              <span className="gradient-text block">Kumar</span>
            </motion.h1>

            {/* Typewriter title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl font-display font-semibold text-[#6C63FF] dark:text-[#7C74FF] mb-6 h-8"
            >
              {typedTitle}
              <span className="inline-block w-0.5 h-6 bg-[#6C63FF] ml-1 animate-blink align-middle" />
            </motion.p>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#6B7280] dark:text-[#94A3B8] text-lg leading-relaxed mb-8"
            >
              Blockchain &amp; AI enthusiast pursuing B.Tech in CSE (Blockchain Technology) at Parul University.
              Building scalable{" "}
              <span className="text-[#6C63FF] font-medium">AI + Web3</span>{" "}
              systems that bridge the gap between intelligent automation and decentralized infrastructure.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#38B2AC] shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Eye size={18} /> View Projects
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download="Manikant_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn font-semibold text-[#6C63FF] dark:text-[#7C74FF] bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu-sm dark:shadow-dark-neu hover:-translate-y-0.5 transition-all duration-300"
                whileTap={{ scale: 0.97 }}
              >
                <Download size={18} /> Download Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 mt-8 justify-center lg:justify-start"
            >
              {[
                {
                  href: "https://github.com/manikantbindass",
                  label: "GitHub",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/manikantbindass/",
                  label: "LinkedIn",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: "https://x.com/ManikantBindass",
                  label: "Twitter/X",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-btn bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu-sm dark:shadow-dark-neu text-[#6B7280] dark:text-[#94A3B8] hover:text-[#6C63FF] dark:hover:text-[#7C74FF] transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-[#6C63FF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
