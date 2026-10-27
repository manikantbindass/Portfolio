"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

import { personal, experience, certifications, skills } from "@/lib/data";
import { projects } from "@/lib/projects";
import { resumes } from "@/lib/resumes";
import {
  usePortfolioStats,
  type LCStats,
  type GHStats,
} from "@/components/StatsProvider";
function getResponse(text: string, lc: LCStats, gh: GHStats): string {
  const q = text.toLowerCase();
  const project = projects.find(
    (p) => q.includes(p.title.toLowerCase()) || q.includes(p.slug),
  );
  if (project) {
    const detail = /architect|system|design/.test(q)
      ? project.caseStudy.architectureSummary
      : /stack|technolog|framework/.test(q)
        ? project.caseStudy.technologies
            .map((t) => `${t.name}: ${t.description}`)
            .join("\n\n")
        : project.caseStudy.features
            .slice(0, 3)
            .map((f) => `**${f.title}**\n${f.description}`)
            .join("\n\n");
    return `**${project.title}**\n${project.description}\n\n${detail}\n\nStatus: ${project.status}${project.contentStage === "concept" ? " · Architecture and technology choices are proposed." : ""}\n[Explore full case study](/projects/${project.slug})`;
  }
  if (/leetcode|dsa|algorithm|solved|rating/.test(q))
    return `**LeetCode**\n${lc.total} solved: ${lc.easy} Easy, ${lc.medium} Medium, ${lc.hard} Hard.${lc.rating ? ` Contest rating: ${lc.rating.toFixed(1)}.` : ""}\n${lc.provider} · ${lc.source}\nLast verified: ${lc.verifiedAt.slice(0, 16).replace("T", " ")} UTC.\n[View profile](${personal.links.leetcode})`;
  if (/github|repo|commit|star|followers/.test(q))
    return `**GitHub**\n${gh.repos} public repositories · ${gh.followers} followers.\n${gh.provider} · ${gh.source}\nLast verified: ${gh.verifiedAt.slice(0, 16).replace("T", " ")} UTC.\n[View GitHub](${personal.links.github})`;
  if (/resume|cv|download/.test(q))
    return `Choose a resume:\n${resumes.map((r) => `[${r.title}](/resumes/${r.slug}) — ${r.description}`).join("\n\n")}`;
  if (/project|built|portfolio/.test(q))
    return `**${projects.length} project repositories**\n${projects.map((p) => `[${p.title}](/projects/${p.slug}) — ${p.status}`).join("\n")}`;
  if (/education|study|college|university|cgpa/.test(q))
    return `${personal.degree}\n${personal.university}, Vadodara\n${personal.period} · CGPA: 7.49 (confirmed by Manikant).`;
  if (/experience|intern|career|work history/.test(q))
    return experience
      .map((e) => `**${e.role}** — ${e.company} (${e.period})\n${e.desc}`)
      .join("\n\n");
  if (/certif|credential/.test(q))
    return `Certifications listed in the supplied resumes:\n${certifications.map((c) => `${c.title} — ${c.issuer}`).join("\n")}\nIndependent credential URLs have not been supplied.`;
  if (/contact|email|hire|available|connect/.test(q))
    return `Manikant is open to full-time and freelance opportunities.\n[Email](${`mailto:${personal.email}`}) · [LinkedIn](${personal.links.linkedin})\nBased in ${personal.location}.`;
  if (/skill|stack|backend|ai|blockchain|devops|language/.test(q))
    return `**Technical toolkit**\n${Object.entries(skills)
      .map(
        ([category, items]) =>
          `${category}: ${items.map((s) => s.name).join(" · ")}`,
      )
      .join(
        "\n",
      )}\nSee the case studies for evidence and implementation boundaries.`;
  if (/hello|hi|about|who|tell me/.test(q))
    return `**${personal.name}**\n${personal.role}\n${personal.bio}\nBased in ${personal.location}.\n[Explore the projects](/#projects)`;
  return "I answer from curated portfolio data, not a live language model. Try a project name, resumes, LeetCode, skills, experience, or contact. I cannot verify information outside this portfolio.";
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

interface Msg {
  role: "user" | "bot";
  text: string;
}

export default function PortfolioChatBot() {
  const { lc, gh } = usePortfolioStats();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: `Hi! I’m Manikant’s portfolio guide.\n\nExplore ${projects.length} project repositories, three resumes, verified statistics, skills, and experience. My answers come from curated portfolio data.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inject keyframes once (avoids jsx global which isn't supported in App Router)
  useEffect(() => {
    const id = "chatbot-keyframes";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-5px); }
        }
        @keyframes chatPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `;
      document.head.appendChild(style);
    }

    // Listen for hero "Ask my AI" button click
    const handleOpen = () => setOpen(true);
    window.addEventListener("openChatbot", handleOpen);
    return () => window.removeEventListener("openChatbot", handleOpen);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => {
      clearTimeout(timer);
      document.getElementById("chatbot-toggle")?.focus();
    };
  }, [open]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMsgs((p) => [...p, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((p) => [...p, { role: "bot", text: getResponse(text, lc, gh) }]);
      setTyping(false);
    }, 450);
  };

  // Render user input as React text; never inject it as HTML.
  const renderMd = (raw: string) =>
    raw.split("\n").map((line, i) => (
      <p key={i} className="leading-relaxed min-h-[0.2rem]">
        {line.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g).map((part, j) => {
          const link = part.match(/^\[(.*?)\]\((.*?)\)$/);
          if (link && /^(https?:\/\/|mailto:|\/(?!\/)|#)/.test(link[2]))
            return (
              <a key={j} href={link[2]} className="chat-link">
                {link[1]}
              </a>
            );
          if (part.startsWith("**") && part.endsWith("**"))
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          return <span key={j}>{part}</span>;
        })}
      </p>
    ));

  return (
    <>
      {/* ── Toggle Button ─────────────────────────────────────────────────── */}
      <motion.button
        id="chatbot-toggle"
        aria-label="Open portfolio chatbot"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? {} : { y: [0, -5, 0] }}
        transition={
          open ? {} : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #A78BFA 100%)",
          boxShadow:
            "0 8px 32px rgba(99,102,241,0.55), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} className="text-[var(--fg)]" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} className="text-[var(--fg)]" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-[#6366F1]" />
        )}
      </motion.button>

      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            role="dialog"
            aria-label="Portfolio guide"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            className="portfolio-guide fixed bottom-24 right-4 z-[60] w-[min(400px,calc(100vw-32px))] flex flex-col rounded-3xl overflow-hidden"
            style={{
              maxHeight: "min(540px, 80vh)",
              background: "var(--bg2)",
              border: "1px solid rgba(99,102,241,0.28)",
              backdropFilter: "blur(28px)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(167,139,250,0.10))",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg,#6366F1,#A78BFA)",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.5)",
                }}
              >
                <Sparkles size={17} className="text-[var(--fg)]" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-[var(--fg)] font-bold text-sm">
                  Manikant&apos;s Assistant
                </p>
                <p className="text-[10px] text-[var(--teal)] flex items-center gap-1.5 font-medium">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] inline-block"
                    style={{ animation: "pulse 2s infinite" }}
                  />
                  Curated portfolio guide · no live LLM
                </p>
              </div>
              <button
                aria-label="Close portfolio guide"
                onClick={() => setOpen(false)}
                className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(99,102,241,0.3) transparent",
              }}
            >
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      m.role === "bot"
                        ? "bg-gradient-to-br from-[#6366F1] to-[#A78BFA]"
                        : "bg-gradient-to-br from-[#2DD4BF] to-[#06B6D4]"
                    }`}
                    style={{
                      boxShadow:
                        m.role === "bot"
                          ? "0 2px 8px rgba(99,102,241,0.4)"
                          : "0 2px 8px rgba(45,212,191,0.4)",
                    }}
                  >
                    {m.role === "bot" ? (
                      <Bot size={13} className="text-[var(--fg)]" />
                    ) : (
                      <User size={13} className="text-[var(--fg)]" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[11.5px] flex flex-col gap-0.5 ${
                      m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
                    }`}
                    style={
                      m.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg,#6366F1,#A78BFA)",
                            color: "#fff",
                          }
                        : {
                            background: "rgba(255,255,255,0.055)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            color: "var(--fg)",
                          }
                    }
                  >
                    {renderMd(m.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#A78BFA]">
                      <Bot size={13} className="text-[var(--fg)]" />
                    </div>
                    <div
                      className="px-3.5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                      style={{
                        background: "rgba(255,255,255,0.055)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      {[0, 1, 2].map((j) => (
                        <span
                          key={j}
                          className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"
                          style={{
                            animation: `typingBounce 1s ${j * 0.15}s infinite`,
                          }}
                        />
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all hover:scale-105"
                      style={{
                        borderColor: "rgba(99,102,241,0.35)",
                        background: "rgba(99,102,241,0.10)",
                        color: "var(--muted)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div
              className="px-3 pb-3 pt-2 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="flex items-center gap-2 rounded-2xl px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  aria-label="Message the portfolio guide"
                  placeholder="Ask about projects or resumes…"
                  className="flex-1 bg-transparent text-[var(--fg)] text-[11.5px] outline-none placeholder:text-[var(--muted)]"
                  autoComplete="off"
                />
                <motion.button
                  onClick={() => send(input)}
                  aria-label="Send message"
                  disabled={!input.trim() || typing}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#6366F1,#A78BFA)",
                  }}
                >
                  <Send size={12} className="text-[var(--fg)]" />
                </motion.button>
              </div>
              <p className="text-[9px] text-[var(--muted)] text-center mt-1.5">
                Powered by Manikant&apos;s profile data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
