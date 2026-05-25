"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

// ── Full knowledge base from GitHub README + API + lib/data ─────────────────
const KB = {
  name:       "Manikant Kumar",
  handle:     "manikantbindass",
  role:       "AI-Augmented Full Stack Developer",
  bio:        "A tech enthusiast from Ahmedabad, India exploring AI, Blockchain, Deep Learning, LLMs, RAG systems, and Agentic AI. I solve complex problems by combining mathematics, coding discipline, and system design thinking to build scalable, production-ready systems.",
  location:   "Ahmedabad, India",
  university: "Parul University",
  degree:     "B.Tech CSE (Blockchain Technology), 2022–2026",
  email:      "manikant.dev.ai@gmail.com",
  links: {
    github:   "https://github.com/manikantbindass",
    linkedin: "https://www.linkedin.com/in/manikantbindass/",
    twitter:  "https://x.com/manikantbindass",
    leetcode: "https://leetcode.com/u/manikantbindass/",
    youtube:  "https://www.youtube.com/@RootEDSigma",
    medium:   "https://medium.com/@manikant.ai",
  },
  stats: {
    repos:          239,
    followers:      44,
    commits:        900,
    leetcodeSolved: 135,
    leetcodeRating: 1620,
    leetcodeRank:   "Top 20%",
    hackathons:     5,
    projects:       20,
  },
  skills: {
    core:       ["Java", "C/C++", "Python", "JavaScript", "TypeScript", "Solidity"],
    ai:         ["LangChain", "LangGraph", "OpenAI API", "Anthropic Claude API", "Gemini API", "PyTorch", "TensorFlow", "scikit-learn", "CrewAI", "AutoGen", "Pinecone", "FAISS", "LlamaIndex", "Hugging Face", "MLflow"],
    blockchain: ["Solidity", "Ethereum", "Web3.js", "IPFS", "Hardhat", "Smart Contracts", "DeFi", "dApps"],
    frontend:   ["Next.js", "React", "Three.js", "TailwindCSS", "Vue.js", "Framer Motion", "GSAP"],
    backend:    ["Node.js", "FastAPI", "Spring Boot", "Java Microservices", ".NET", "PostgreSQL", "MongoDB", "Redis", "Supabase"],
    devops:     ["Docker", "Kubernetes", "AWS", "Azure", "GCP (learning)", "MLflow", "CI/CD", "GitHub Actions"],
    systemDesign: ["System Architecture", "Microservices", "Distributed Systems", "API Design", "Caching", "Message Queues"],
  },
  projects: [
    {
      name: "MetaRole.AI",
      emoji: "🤖",
      desc: "AI-powered career co-pilot that analyzes skills, predicts future opportunities, and guides with a clear roadmap — automatically building portfolio and optimizing resume.",
      tech: ["Next.js", "LangChain", "OpenAI", "TypeScript", "Supabase"],
      live: "https://meta-role-ai.vercel.app",
      github: "https://github.com/manikantbindass/MetaRole.ai",
    },
    {
      name: "SecureRxChain",
      emoji: "💊",
      desc: "Blockchain drug supply chain preventing counterfeit medicines with end-to-end QR traceability, batch tracking, AI anomaly detection.",
      tech: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS"],
      live: "https://securerxchain.vercel.app",
      github: "https://github.com/manikantbindass/SecureRxChain-Blockchain-Based-Drug-Supply-Chain-Counterfeit-Medicine-Prevention-System",
    },
    {
      name: "Intramind.AI",
      emoji: "🧠",
      desc: "AI-powered enterprise knowledge base with RAG, LangChain, semantic search, secure team workspaces, and cloud-native deployment.",
      tech: ["LangChain", "RAG", "TypeScript", "Pinecone", "FastAPI"],
      github: "https://github.com/manikantbindass/Intramind.ai",
    },
    {
      name: "RemoteShield X",
      emoji: "🛡️",
      desc: "Enterprise secure remote work browser for Win/Linux/macOS/Android with WireGuard VPN, static IP, Tauri + Flutter, tamper-resistant admin dashboard.",
      tech: ["Tauri", "Flutter", "Node.js", "WireGuard", "Docker"],
      github: "https://github.com/manikantbindass/RdPBrowser",
    },
    {
      name: "TraceHunt AI",
      emoji: "🔍",
      desc: "AI-powered observability platform for API monitoring, log intelligence, anomaly detection, and automated root cause analysis.",
      tech: ["Python", "FastAPI", "LLMs", "OpenAI"],
      github: "https://github.com/manikantbindass/Tracehunt",
    },
    {
      name: "SolGuard AI",
      emoji: "🔒",
      desc: "AI smart contract auditing using LLMs to detect vulnerabilities, classify risks, suggest secure patches, and optimize gas usage.",
      tech: ["LangChain", "Solidity", "Python", "FastAPI", "OpenAI"],
      github: "https://github.com/manikantbindass/SolGuardAI-An-AI-Powered-Blockchain-Smart-Contract-",
    },
    {
      name: "AutoLedger AI",
      emoji: "🔗",
      desc: "Self-healing blockchain network using reinforcement learning agents to detect malicious nodes and dynamically adjust consensus parameters.",
      tech: ["Python", "TensorFlow", "Reinforcement Learning", "Blockchain"],
      github: "https://github.com/manikantbindass/AutoLedgerAI-Self-healing-blockchain-network-using-reinforcement-learning",
    },
    {
      name: "DSA Mastersheet",
      emoji: "📚",
      desc: "Complete FAANG DSA roadmap from Beginner to Advanced in Java, C++, and Python with structured daily problem-solving on Codeforces.",
      tech: ["Java", "C++", "Python"],
      github: "https://github.com/manikantbindass/DSA-Preparation-FAANG-",
    },
  ],
};

// ── Intent → Response engine ──────────────────────────────────────────────────
function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // ── Greetings ──
  if (/^(hi|hello|hey|sup|yo|howdy|good\s*(morning|evening|afternoon))/i.test(q)) {
    return `Hey there! 👋 I'm Manikant's AI assistant. I know everything about him — projects, skills, GitHub stats, experience, and more.\n\nWhat would you like to know?`;
  }

  // ── Who / about ──
  if (/who (are|is)|about (you|yourself|him|manikant)|introduce|tell me|overview|summary/i.test(q)) {
    return `**Manikant Kumar** 🚀\n\n${KB.bio}\n\n📍 ${KB.location}\n🎓 ${KB.degree} — ${KB.university}\n💼 ${KB.role}\n\nHe has **${KB.stats.repos}** public GitHub repos, **${KB.stats.leetcodeSolved}+** LeetCode problems solved, and builds in AI, Blockchain & Full Stack.`;
  }

  // ── Location ──
  if (/where|location|city|country|based|from/i.test(q)) {
    return `📍 Manikant is based in **${KB.location}** 🇮🇳`;
  }

  // ── Education ──
  if (/education|university|college|degree|study|parul|btech|b\.tech|student/i.test(q)) {
    return `🎓 **Education**\n\n**${KB.degree}**\n${KB.university}\n\nSpecializes in blockchain tech, distributed systems, AI/ML, deep learning, and software engineering. Also active in competitive programming and hackathons.`;
  }

  // ── Specific project by name ──
  for (const p of KB.projects) {
    const name = p.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (q.includes(name) || q.includes(p.name.toLowerCase())) {
      const liveLink = p.live ? `\n🌐 [Live Demo](${p.live})` : "";
      return `${p.emoji} **${p.name}**\n\n${p.desc}\n\n🛠️ **Tech:** ${p.tech.join(" · ")}\n🐙 [GitHub](${p.github})${liveLink}`;
    }
  }

  // ── All projects ──
  if (/project|built|build|creat|made|work(ed)? on|portfolio/i.test(q)) {
    const list = KB.projects.map(p => `${p.emoji} **${p.name}** — ${p.desc.split(".")[0]}.`).join("\n");
    return `🚀 **Manikant's Projects:**\n\n${list}\n\nAsk about any specific project for full details!`;
  }

  // ── AI / ML ──
  if (/\bai\b|machine learn|deep learn|llm|rag|langchain|agentic|openai|pytorch|tensorflow|hugging|embedding|vector|pinecone|faiss|llamaindex|crewai|autogen|langgraph/i.test(q)) {
    return `🤖 **AI/ML Expertise:**\n\n**RAG Systems:** LangChain · LlamaIndex · FAISS · Pinecone · Weaviate\n**Agentic AI:** LangGraph · CrewAI · AutoGen\n**APIs:** OpenAI · Anthropic Claude · Gemini\n**Deep Learning:** PyTorch · TensorFlow · scikit-learn · Hugging Face\n**AI Security:** Prompt injection · Data leakage · Model attacks\n\nHe builds production-grade RAG pipelines and multi-agent systems.`;
  }

  // ── Blockchain / Web3 ──
  if (/blockchain|solidity|ethereum|web3|smart contract|ipfs|hardhat|defi|dapp|nft|crypto/i.test(q)) {
    return `⛓️ **Blockchain Expertise:**\n\n**Languages:** Solidity · JavaScript\n**Platforms:** Ethereum · IPFS\n**Tools:** Hardhat · Web3.js · Ethers.js\n**Focus:** Smart contracts · dApps · DeFi · Supply chain\n\nNotable: **SecureRxChain** (anti-counterfeit drug supply chain) and **SolGuard AI** (AI smart contract auditor).`;
  }

  // ── Skills / tech stack ──
  if (/skill|tech|stack|know|language|framework|tool|expert|proficien|capabilit/i.test(q)) {
    return `💻 **Full Tech Stack:**\n\n**Core Languages:** ${KB.skills.core.join(" · ")}\n**Frontend:** ${KB.skills.frontend.join(" · ")}\n**Backend:** ${KB.skills.backend.slice(0, 5).join(" · ")}\n**AI/ML:** ${KB.skills.ai.slice(0, 6).join(" · ")}\n**Blockchain:** ${KB.skills.blockchain.slice(0, 5).join(" · ")}\n**DevOps:** ${KB.skills.devops.slice(0, 5).join(" · ")}`;
  }

  // ── System design / backend / java / spring ──
  if (/system design|architect|backend|microservice|spring|java|scalab|distribut|\.net/i.test(q)) {
    return `🏗️ **System Design & Backend:**\n\n**Java Ecosystem:** Spring Boot · Java Microservices · .NET\n**Python Backend:** FastAPI · Django\n**System Architecture:** Distributed systems · Caching · Message queues · API contracts\n**Databases:** PostgreSQL · MongoDB · Redis · Supabase\n\nHe designs scalable, fault-tolerant, production-ready backend systems.`;
  }

  // ── DevOps / Cloud ──
  if (/devops|docker|kubernetes|aws|azure|cloud|deploy|cicd|ci\/cd|mlflow/i.test(q)) {
    return `☁️ **DevOps & Cloud:**\n\nDocker · Kubernetes · AWS · Azure · MLflow · CI/CD · GitHub Actions\n\nCurrently also learning **GCP**. Comfortable with containerized deployments and cloud-native architectures.`;
  }

  // ── GitHub stats ──
  if (/github|repo|commit|star|follow|contribut|open.?source/i.test(q)) {
    return `🐙 **GitHub: [@manikantbindass](${KB.links.github})**\n\n📦 **${KB.stats.repos}** public repositories\n👥 **${KB.stats.followers}** followers\n💾 **${KB.stats.commits}+** total commits\n🌐 Active since Aug 2023\n\nBuilds across AI, Blockchain, Full Stack, and competitive programming repos.`;
  }

  // ── LeetCode / DSA / competitive ──
  if (/leetcode|dsa|algorithm|coding|competitive|codeforc|problem.?solv|faang|maang/i.test(q)) {
    return `🔥 **Competitive Programming:**\n\n**LeetCode:** [manikantbindass](${KB.links.leetcode})\n• **${KB.stats.leetcodeSolved}+** problems solved\n• Contest rating: **${KB.stats.leetcodeRating}+**\n• **${KB.stats.leetcodeRank}** globally\n\n**Codeforces:** Daily problem-solving journal — C++, Java, Python\n📂 [DSA Mastersheet repo](https://github.com/manikantbindass/DSA-Preparation-FAANG-)`;
  }

  // ── Contact ──
  if (/contact|email|reach|message|connect|talk/i.test(q)) {
    return `📬 **Contact Manikant:**\n\n📧 ${KB.email}\n💼 [LinkedIn](${KB.links.linkedin})\n🐙 [GitHub](${KB.links.github})\n🐦 [Twitter/X](${KB.links.twitter})\n📝 [Medium](${KB.links.medium})\n📺 [YouTube](${KB.links.youtube})`;
  }

  // ── Hire / availability ──
  if (/hire|available|open.?to.?work|freelan|full.?time|opportu|job|recruit|collab/i.test(q)) {
    return `✅ **Manikant is open to work!**\n\nHe's available for:\n• Full-time AI / Blockchain / Full Stack roles\n• Freelance projects & consulting\n• Open source collaboration\n• Research & system design work\n\n📧 **${KB.email}**\n💼 [LinkedIn](${KB.links.linkedin})`;
  }

  // ── Social links ──
  if (/link|social|twitter|linkedin|youtube|instagram|medium|linktree/i.test(q)) {
    return `🔗 **Manikant's Links:**\n\n🐙 [GitHub](${KB.links.github})\n💼 [LinkedIn](${KB.links.linkedin})\n🐦 [Twitter/X](${KB.links.twitter})\n📺 [YouTube](${KB.links.youtube})\n📝 [Medium](${KB.links.medium})\n🏆 [LeetCode](${KB.links.leetcode})`;
  }

  // ── Experience ──
  if (/experience|work|job|career|profession|internship/i.test(q)) {
    return `💼 **Experience:**\n\n**AI-Augmented Full Stack Developer** — Freelance / Open Source (2023–Present)\n\nBuilding:\n• RAG systems & Agentic AI pipelines\n• Blockchain smart contracts & dApps\n• Scalable backend microservices\n• Full stack web applications\n• System design for production-grade systems`;
  }

  // ── README ──
  if (/readme|profile|chatbot|manikantchatsu/i.test(q)) {
    return `📄 **From Manikant's GitHub README:**\n\n*"AI-Augmented Full Stack Developer | Blockchain Smart Contract Developer | System Design Engineer"*\n\nHe also built **ManikantChatsU** — an AI × Web3 README assistant chatbot on his profile page!\n\n🔗 [View Full README](${KB.links.github}/${KB.handle})`;
  }

  // ── Hackathons ──
  if (/hackathon|competi|event|award|achiev/i.test(q)) {
    return `🏆 **Achievements:**\n\n• **${KB.stats.hackathons}+** hackathons competed\n• **${KB.stats.projects}+** projects built\n• **${KB.stats.leetcodeRank}** on LeetCode\n• Active on Codeforces for MAANG interview prep`;
  }

  // ── Certifications ──
  if (/certif|course|learn|credential/i.test(q)) {
    return `🎖️ **Certifications:**\n\n• Ethereum Developer Bootcamp — *Alchemy*\n• Solidity Smart Contract Security — *OpenZeppelin*\n• LangChain & LLM Development — *DeepLearning.AI*\n• AWS Cloud Practitioner — *Amazon AWS*\n• Full Stack Web Development — *Meta*`;
  }

  // ── Resume ──
  if (/resume|cv|download/i.test(q)) {
    return `📄 You can download Manikant's resume directly from the portfolio!\n\nLook for the **"Download CV"** button in the hero section or navigation bar. It's a PDF with his full experience, skills, and projects.`;
  }

  // ── Default fallback ──
  return `I can help with info about Manikant! Try asking:\n\n• 🚀 "What projects has he built?"\n• 💻 "What are his AI/ML skills?"\n• 📊 "What are his GitHub stats?"\n• 🎓 "Where did he study?"\n• 📬 "How do I contact him?"\n• ✅ "Is he available to hire?"\n• ⛓️ "What blockchain work has he done?"`;
}

// ── Suggested questions ───────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Tell me about him",
  "What projects has he built?",
  "AI/ML skills?",
  "GitHub stats?",
  "Is he available to hire?",
  "How to contact him?",
];

interface Msg { role: "user" | "bot"; text: string; }

export default function PortfolioChatBot() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState<Msg[]>([
    { role: "bot", text: "👋 Hi! I'm Manikant's AI assistant.\n\nAsk me anything — skills, projects, GitHub stats, experience, or how to hire him!" },
  ]);
  const [input,   setInput]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMsgs(p => [...p, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs(p => [...p, { role: "bot", text: getResponse(text) }]);
      setTyping(false);
    }, 600 + Math.random() * 600);
  };

  // Markdown-lite renderer: **bold**, [text](url), newlines
  const renderMd = (raw: string) =>
    raw.split("\n").map((line, i) => {
      const html = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(
          /\[(.+?)\]\((.+?)\)/g,
          `<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#A78BFA;text-decoration:underline;font-weight:600">$1</a>`
        );
      return (
        <p key={i} className="leading-relaxed min-h-[0.2rem]"
          dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />
      );
    });

  return (
    <>
      {/* ── Toggle Button ─────────────────────────────────────────────────── */}
      <motion.button
        id="chatbot-toggle"
        aria-label="Open portfolio chatbot"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? {} : { y: [0, -5, 0] }}
        transition={open ? {} : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #A78BFA 100%)",
          boxShadow: "0 8px 32px rgba(99,102,241,0.55), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} className="text-white" /></motion.span>
            : <motion.span key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.18 }}><MessageCircle size={22} className="text-white" /></motion.span>
          }
        </AnimatePresence>
        {!open && <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-[#6366F1]" />}
      </motion.button>

      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.88, y: 16  }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] flex flex-col rounded-3xl overflow-hidden"
            style={{
              maxHeight: "min(540px, 80vh)",
              background:    "rgba(6, 6, 20, 0.97)",
              border:        "1px solid rgba(99,102,241,0.28)",
              backdropFilter:"blur(28px)",
              boxShadow:     "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(167,139,250,0.10))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)", boxShadow: "0 4px 16px rgba(99,102,241,0.5)" }}
              >
                <Sparkles size={17} className="text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">Manikant&apos;s Assistant</p>
                <p className="text-[10px] text-[#2DD4BF] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] inline-block" style={{ animation: "pulse 2s infinite" }} />
                  AI-powered · knows everything about him
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/80 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent" }}>
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    m.role === "bot"
                      ? "bg-gradient-to-br from-[#6366F1] to-[#A78BFA]"
                      : "bg-gradient-to-br from-[#2DD4BF] to-[#06B6D4]"
                  }`} style={{ boxShadow: m.role === "bot" ? "0 2px 8px rgba(99,102,241,0.4)" : "0 2px 8px rgba(45,212,191,0.4)" }}>
                    {m.role === "bot" ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[11.5px] flex flex-col gap-0.5 ${
                      m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
                    }`}
                    style={m.role === "user"
                      ? { background: "linear-gradient(135deg,#6366F1,#A78BFA)", color: "#fff" }
                      : { background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.88)" }
                    }
                  >
                    {renderMd(m.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#A78BFA]">
                      <Bot size={13} className="text-white" />
                    </div>
                    <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      {[0, 1, 2].map(j => (
                        <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"
                          style={{ animation: `typingBounce 1s ${j * 0.15}s infinite` }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (shown until user sends first message) */}
            <AnimatePresence>
              {msgs.length === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all hover:scale-105"
                      style={{ borderColor: "rgba(99,102,241,0.35)", background: "rgba(99,102,241,0.10)", color: "rgba(255,255,255,0.75)" }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div className="px-3 pb-3 pt-2 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2 rounded-2xl px-3 py-2"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder="Ask anything about Manikant..."
                  className="flex-1 bg-transparent text-white/90 text-[11.5px] outline-none placeholder-white/28"
                  autoComplete="off"
                />
                <motion.button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)" }}
                >
                  <Send size={12} className="text-white" />
                </motion.button>
              </div>
              <p className="text-[9px] text-white/20 text-center mt-1.5">Powered by Manikant&apos;s profile data</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
