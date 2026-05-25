"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Download } from "lucide-react";

interface TopBarProps {
  dark: boolean;
  toggle: () => void;
}

export default function TopBar({ dark, toggle }: TopBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 h-14 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5" : ""
      }`}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-2 group" aria-label="Home">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
          style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)" }}
        >
          MK
        </div>
        <span className="hidden sm:block font-bold text-sm text-white/70 group-hover:text-white transition-colors">
          Manikant Kumar
        </span>
      </a>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Resume */}
        <motion.a
          href="/Resume.pdf"
          download="Manikant_Kumar_Resume.pdf"
          data-magnetic
          className="hidden sm:flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-xl transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          <Download size={13} /> Resume
        </motion.a>

        {/* Dark/light toggle */}
        <motion.button
          onClick={toggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-9 h-9 flex items-center justify-center rounded-xl glass text-white/60 hover:text-white transition-colors"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          data-magnetic
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  );
}
