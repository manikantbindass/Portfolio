"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Tag, ArrowRight, Sparkles } from "lucide-react";

const posts = [
  {
    title: "Smart Contracts 101: Writing Secure Solidity",
    excerpt: "A deep dive into common vulnerabilities in Solidity smart contracts and how to write battle-tested code for production DeFi protocols.",
    tags: ["Blockchain", "Solidity", "Security"],
    readTime: "8 min read",
    date: "Coming Soon",
    emoji: "⛓️",
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.08)",
    border: "rgba(108,99,255,0.18)",
  },
  {
    title: "AI + Web3: The Autonomous Agent Revolution",
    excerpt: "How Large Language Models are being integrated with on-chain systems to create autonomous agents that can interact with DeFi protocols.",
    tags: ["AI", "Web3", "LLM"],
    readTime: "6 min read",
    date: "Coming Soon",
    emoji: "🤖",
    color: "#38B2AC",
    bg: "rgba(56,178,172,0.08)",
    border: "rgba(56,178,172,0.18)",
  },
  {
    title: "Building a Full-Stack dApp with Next.js & Ethers.js",
    excerpt: "Step-by-step guide to building a production-ready decentralized application using Next.js on the frontend and ethers.js for blockchain interaction.",
    tags: ["Next.js", "Ethers.js", "dApp"],
    readTime: "12 min read",
    date: "Coming Soon",
    emoji: "🚀",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.18)",
  },
];

export default function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="blog"
      ref={ref}
      className="py-24 bg-[#0A0A0F] relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full dark:bg-[#A78BFA]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 dark:bg-[#A78BFA]/10 bg-[#A78BFA]/8 dark:border dark:border-[#A78BFA]/20 border border-[#A78BFA]/15">
            <Sparkles size={14} className="text-[#A78BFA]" />
            <span className="text-[#A78BFA] font-semibold text-sm tracking-widest uppercase">
              Insights
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight mb-4">
            Blog &{" "}
            <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-[#6B7280] dark:text-[#94A3B8] max-w-xl mx-auto text-lg">
            Thoughts on Web3, AI, and the future of decentralized technology.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#A78BFA]" />
          </div>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group rounded-2xl overflow-hidden transition-all duration-300"
              style={{ background: post.bg, border: `1px solid ${post.border}` }}
            >
              {/* Card header */}
              <div
                className="p-6 pb-4"
                style={{ borderBottom: `1px solid ${post.border}` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{post.emoji}</span>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#94A3B8]">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-[#3D4852] dark:text-[#E2E8F0] leading-snug mb-2 group-hover:text-[#6C63FF] dark:group-hover:text-[#A78BFA] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Card footer */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ color: post.color, background: `${post.color}18` }}
                    >
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coming Soon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"
                style={{ background: `${post.bg.replace("0.08","0.92")}` }}
              >
                <div className="text-center px-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-4xl mb-3 inline-block"
                  >
                    ✨
                  </motion.div>
                  <p className="font-bold text-xl mb-1" style={{ color: post.color }}>
                    Coming Soon
                  </p>
                  <p className="text-sm text-[#6B7280] dark:text-[#94A3B8]">
                    Working on it 🚀
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-[#6B7280] dark:text-[#94A3B8] text-sm mb-4">
            📬 Subscribe to get notified when new articles drop
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] hover:shadow-lg hover:shadow-[#6C63FF]/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in touch <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
