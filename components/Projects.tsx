"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, Star, GitFork } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Solidity: "#AA6746",
  Java: "#B07219",
  HTML: "#E34F26",
  CSS: "#563D7C",
};

// Hardcoded fallback: top projects to highlight
const HIGHLIGHT_NAMES = [
  "MetaRole.ai",
  "SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System",
  "SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-",
  "AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning",
  "DSA-Preparation-FAANG-",
];

function getDisplayName(name: string): string {
  const map: Record<string, string> = {
    "MetaRole.ai": "MetaRole.AI",
    "SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System":
      "SecureRxChain",
    "SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-": "SolGuard AI",
    "AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning":
      "AutoLedger AI",
    "DSA-Preparation-FAANG-": "DSA Mastersheet",
    Portfolio: "Portfolio",
  };
  return (
    map[name] ||
    name
      .replace(/-/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
  );
}

function getProjectEmoji(name: string): string {
  const map: Record<string, string> = {
    "MetaRole.ai": "🤖",
    "SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System":
      "💊",
    "SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-": "🛡️",
    "AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning": "🔗",
    "DSA-Preparation-FAANG-": "📚",
    Portfolio: "🎨",
  };
  return map[name] || "🚀";
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticRepos: Repo[] = [
      {
        id: 1,
        name: "MetaRole.ai",
        description:
          "AI-powered career co-pilot that analyzes your skills, predicts future opportunities, and guides you with a clear roadmap—automatically building your portfolio and optimizing your resume.",
        html_url: "https://github.com/manikantbindass/MetaRole.ai",
        homepage: "https://meta-role-ai.vercel.app",
        language: "TypeScript",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["ai", "nextjs", "career", "llm"],
        fork: false,
      },
      {
        id: 2,
        name: "SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System",
        description:
          "Blockchain-powered drug supply chain platform preventing counterfeit medicines with end-to-end batch traceability, QR verification, and AI-based anomaly detection.",
        html_url:
          "https://github.com/manikantbindass/SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System",
        homepage: "https://securerxchain.vercel.app",
        language: "JavaScript",
        stargazers_count: 0,
        forks_count: 2,
        topics: ["blockchain", "ethereum", "web3", "healthcare"],
        fork: false,
      },
      {
        id: 3,
        name: "SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-",
        description:
          "AI-powered smart contract auditing platform using LLMs and deep learning to detect vulnerabilities, classify risks, suggest secure patches, and optimize gas usage.",
        html_url:
          "https://github.com/manikantbindass/SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-",
        homepage: null,
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["ai", "solidity", "security", "web3"],
        fork: false,
      },
      {
        id: 4,
        name: "AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning",
        description:
          "Self-healing blockchain network powered by reinforcement learning agents that detect malicious nodes and dynamically adjust consensus parameters using adaptive trust scoring.",
        html_url:
          "https://github.com/manikantbindass/AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning",
        homepage: null,
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["blockchain", "reinforcement-learning", "ai", "distributed-systems"],
        fork: false,
      },
      {
        id: 5,
        name: "DSA-Preparation-FAANG-",
        description:
          "A comprehensive DSA roadmap from Beginner to Advanced—covering all major data structures and algorithms for FAANG-level interview preparation.",
        html_url: "https://github.com/manikantbindass/DSA-Preparation-FAANG-",
        homepage: null,
        language: "Java",
        stargazers_count: 0,
        forks_count: 0,
        topics: ["dsa", "algorithms", "interview-prep", "java"],
        fork: false,
      },
    ];

    // Try to fetch from GitHub API
    fetch("https://api.github.com/users/manikantbindass/repos?sort=updated&per_page=20")
      .then((r) => r.json())
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork && r.name !== "manikantbindass")
          .filter((r) => HIGHLIGHT_NAMES.includes(r.name))
          .sort(
            (a, b) =>
              HIGHLIGHT_NAMES.indexOf(a.name) - HIGHLIGHT_NAMES.indexOf(b.name)
          )
          .slice(0, 5);

        setRepos(filtered.length ? filtered : staticRepos);
      })
      .catch(() => setRepos(staticRepos))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 bg-[#0D0D1A] relative overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#6C63FF]/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#38B2AC]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#6C63FF] font-semibold text-xs tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38B2AC]" />
          </div>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            A curated selection of AI, blockchain and full-stack projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-white/4 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass-card p-6 flex flex-col transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)" }}>
                    {getProjectEmoji(repo.name)}
                  </div>
                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <motion.a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-white/40 hover:text-[#6C63FF] transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={14} />
                      </motion.a>
                    )}
                    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub repo"
                      className="w-8 h-8 flex items-center justify-center rounded-xl text-white/40 hover:text-[#6C63FF] transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <GithubIcon size={14} />
                    </motion.a>
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug group-hover:text-[#A78BFA] transition-colors">
                  {getDisplayName(repo.name)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">{repo.description}</p>

                <div className="mt-4 pt-4 border-t border-white/6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <div className="flex items-center gap-1.5 text-xs text-white/40">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLORS[repo.language] || "#6B7280" }} />
                        {repo.language}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Star size={11} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={11} /> {repo.forks_count}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All */}
            <motion.a
              href="https://github.com/manikantbindass"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-dashed border-[#6C63FF]/20 hover:border-[#6C63FF]/50 transition-all duration-300 group min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#6C63FF]" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <GithubIcon size={22} />
              </div>
              <span className="font-semibold text-[#6C63FF]" >View All →</span>
              <span className="text-xs text-white/30">github.com/manikantbindass</span>
            </motion.a>
          </div>
        )}
      </div>
    </section>
  );
}
