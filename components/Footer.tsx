"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#05060F] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center sm:text-left"
          >
            <span className="font-bold text-lg gradient-text">MK</span>
            <span className="text-white/40 text-sm ml-2">
              — Built by{" "}
              <a
                href="https://github.com/manikantbindass"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6C63FF] hover:text-[#A78BFA] transition-colors font-medium"
              >
                Manikant Kumar
              </a>{" "}
              © {year}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-xs text-white/30"
          >
            <span>Built with</span>
            {["Next.js", "Tailwind", "Framer Motion"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-[#6C63FF] font-medium"
                style={{
                  background: "rgba(108,99,255,0.08)",
                  border: "1px solid rgba(108,99,255,0.15)",
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-white/25 mt-6"
        >
          Crafted with ❤️ — LLMs in the lab, Web3 in the wild 🚀
        </motion.p>
      </div>
    </footer>
  );
}
