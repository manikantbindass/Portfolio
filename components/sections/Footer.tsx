"use client";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";


export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/6 py-10" style={{ background: "#030712" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)" }}>MK</div>
            <span className="text-white/40 text-sm">
              — Built by{" "}
              <a href={personal.links.github} target="_blank" rel="noopener noreferrer"
                className="text-[#818CF8] hover:text-[#A78BFA] transition-colors font-semibold">
                {personal.handle}
              </a>{" "}
              © {year}
            </span>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-xs text-white/25">
          <span>Powered by</span>
          {["Next.js", "Framer Motion", "TailwindCSS"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full border border-white/8 text-white/40 font-medium"
              style={{ background: "rgba(255,255,255,0.03)" }}>{t}</span>
          ))}
        </motion.div>
      </div>
      <p className="text-center text-xs text-white/15 mt-6">
        LLMs in the lab · Web3 in the wild · Cosmos in the cursor 🚀
      </p>
    </footer>
  );
}
