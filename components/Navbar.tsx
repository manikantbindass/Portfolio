"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Download, Home, User, Briefcase, FolderOpen, BarChart2, Award, Mail } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

const navLinks = [
  { href: "#hero",           label: "Home",        Icon: Home       },
  { href: "#about",          label: "About",       Icon: User       },
  { href: "#experience",     label: "Experience",  Icon: Briefcase  },
  { href: "#projects",       label: "Projects",    Icon: FolderOpen },
  { href: "#stats",          label: "Stats",       Icon: BarChart2  },
  { href: "#certifications", label: "Certs",       Icon: Award      },
  { href: "#contact",        label: "Contact",     Icon: Mail       },
];

export default function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const [active, setActive]   = useState("#hero");
  const [hovered, setHovered] = useState<string | null>(null);

  /* Scroll-spy */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href); },
        { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      {/* ── Top-right actions ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-5 right-5 z-50 flex items-center gap-2"
      >
        <a
          href="/Resume.pdf"
          download="Manikant_Kumar_Resume.pdf"
          className="btn-primary text-sm hidden sm:inline-flex"
        >
          <Download size={14} />
          Resume
        </a>
        <button
          onClick={toggleDark}
          aria-label="Toggle theme"
          className="btn-ghost w-10 h-10 p-0 flex items-center justify-center rounded-full"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </motion.div>

      {/* ── Left sidebar social rail ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed bottom-8 left-6 z-40 hidden lg:flex flex-col items-center gap-3"
      >
        {[
          { href: "https://github.com/manikantbindass", label: "GitHub",
            icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg> },
          { href: "https://www.linkedin.com/in/manikantbindass/", label: "LinkedIn",
            icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
          { href: "https://x.com/ManikantBindass", label: "X / Twitter",
            icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
        ].map(s => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white/40 hover:text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
            whileTap={{ scale: 0.9 }}
          >
            {s.icon}
          </motion.a>
        ))}
        {/* Vertical line + arrow */}
        <div className="flex flex-col items-center mt-1">
          <div className="w-px h-12 bg-white/20" />
          <div className="w-2.5 h-2.5 rotate-45 border-l-2 border-t-2 border-white/20 mt-1" />
        </div>
      </motion.div>

      {/* ── Bottom floating pill nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        aria-label="Main navigation"
      >
        <div className="nav-pill flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3">
          {navLinks.map(({ href, label, Icon }) => {
            const isActive = active === href;
            return (
              <div key={href} className="relative group">
                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === href && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap pointer-events-none z-50"
                      style={{
                        background: "rgba(108,99,255,0.9)",
                        color: "white",
                        boxShadow: "0 4px 14px rgba(108,99,255,0.4)",
                      }}
                    >
                      {label}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-t-4 border-t-[rgba(108,99,255,0.9)] border-l-4 border-l-transparent border-r-4 border-r-transparent" />
                    </motion.span>
                  )}
                </AnimatePresence>

                <a
                  href={href}
                  onClick={() => setActive(href)}
                  onMouseEnter={() => setHovered(href)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={label}
                  className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(135deg, #6C63FF, #38B2AC)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                </a>
              </div>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
