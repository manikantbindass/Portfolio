"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#E0E5EC] dark:bg-[#1A1D24] border-t border-[#6B7280]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center sm:text-left"
          >
            <span className="font-display font-bold text-lg gradient-text">MK</span>
            <span className="text-[#6B7280] dark:text-[#94A3B8] text-sm ml-2">
              — Built by{" "}
              <a
                href="https://github.com/manikantbindass"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6C63FF] hover:underline font-medium"
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
            className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#94A3B8]"
          >
            <span>Built with</span>
            {["Next.js", "Tailwind", "Framer Motion"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-[#6C63FF] dark:text-[#7C74FF] font-medium"
                style={{
                  boxShadow: "4px 4px 8px rgb(163,177,198,0.5), -4px -4px 8px rgba(255,255,255,0.5)",
                  background: "#E0E5EC",
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-[#6B7280] dark:text-[#94A3B8] mt-6"
        >
          Crafted with ❤️ — LLMs in the lab, Web3 in the wild
        </motion.p>
      </div>
    </footer>
  );
}
