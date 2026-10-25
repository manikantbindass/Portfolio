"use client";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="portfolio-footer relative border-t border-white/6 py-10"
      style={{ background: "var(--bg)" }}
    >
      <nav className="footer-section-links" aria-label="Explore the portfolio">
        <a href="#projects">Projects</a>
        <a href="#build">Inside the Build</a>
        <a href="#resumes">Resumes</a>
        <a href="#faq">Questions &amp; answers</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-[var(--fg)]"
              style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)" }}
            >
              MK
            </div>
            <span className="text-[var(--muted)] text-sm">
              — Built by{" "}
              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-[var(--accent2)] transition-colors font-semibold"
              >
                {personal.handle}
              </a>{" "}
              © {year}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="footer-tools flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--muted)]"
        >
          <span>Powered by</span>
          {["Next.js", "Framer Motion", "TailwindCSS"].map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full border border-white/8 text-[var(--muted)] font-medium"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {t}
            </span>
          ))}
          <a className="back-to-top" href="#hero">Back to top <ArrowUpRight size={14} aria-hidden /></a>
        </motion.div>
      </div>
      <p className="text-center text-xs text-[var(--muted)] mt-6">
        LLMs in the lab · Web3 in the wild · Cosmos in the cursor 🚀
      </p>
    </footer>
  );
}
