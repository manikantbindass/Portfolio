"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle } from "lucide-react";
import { personal } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  },
});

const socials = [
  {
    label: "GitHub",
    href: personal.links.github,
    emoji: "🐙",
    color: "#6366F1",
  },
  {
    label: "LinkedIn",
    href: personal.links.linkedin,
    emoji: "💼",
    color: "#0077B5",
  },
  { label: "X", href: personal.links.twitter, emoji: "🐦", color: "#A78BFA" },
  {
    label: "LeetCode",
    href: personal.links.leetcode,
    emoji: "⚡",
    color: "#F59E0B",
  },
  {
    label: "Medium",
    href: personal.links.medium,
    emoji: "📝",
    color: "#2DD4BF",
  },
  {
    label: "Instagram",
    href: personal.links.instagram,
    emoji: "📷",
    color: "#E4405F",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `mailto:${personal.email}?subject=${encodeURIComponent("Portfolio contact from " + form.name)}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls = `w-full px-4 py-3 rounded-2xl text-sm text-[var(--fg)] placeholder-white/25 outline-none transition-all duration-200
    bg-white/4 border border-white/8 focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25
    hover:border-white/15`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="aurora-blob w-[600px] h-[600px] bg-[#6366F1] opacity-[0.08] absolute -bottom-20 left-1/4 pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Let&apos;s collaborate</p>
          <h2 className="section-heading text-[var(--fg)]">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-lg mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <div className="glass rounded-3xl p-8 border border-white/7">
              <h3 className="font-bold text-[var(--fg)] text-xl mb-6 flex items-center gap-2">
                <Mail size={20} className="text-[var(--accent)]" />
                Send a Message
              </h3>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 gap-4"
                  >
                    <CheckCircle
                      size={52}
                      className="text-[var(--teal)]"
                      style={{ filter: "drop-shadow(0 0 12px #2DD4BF)" }}
                    />
                    <p className="font-bold text-[var(--fg)] text-xl">
                      Email draft prepared
                    </p>
                    <p className="text-[var(--muted)] text-sm">
                      Send the draft from your email app. Delivery is not
                      confirmed here.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-[var(--muted)] mb-1.5"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[var(--muted)] mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-[var(--muted)] mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--fg)] py-3.5 rounded-2xl transition-all"
                      style={{
                        background: "linear-gradient(135deg,#6366F1,#A78BFA)",
                        boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                      }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      data-magnetic
                    >
                      <Send size={16} /> Open Email Draft
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social links + email */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-5"
          >
            {/* Email card */}
            <div className="glass rounded-3xl p-6 border border-white/7 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                📧
              </div>
              <div>
                <p className="text-[var(--muted)] text-xs font-semibold uppercase tracking-wider">
                  Email
                </p>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-[var(--fg)] font-semibold text-sm hover:text-[var(--accent)] transition-colors"
                >
                  {personal.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="glass rounded-3xl p-6 border border-white/7 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(45,212,191,0.10)",
                  border: "1px solid rgba(45,212,191,0.2)",
                }}
              >
                📍
              </div>
              <div>
                <p className="text-[var(--muted)] text-xs font-semibold uppercase tracking-wider">
                  Location
                </p>
                <p className="text-[var(--fg)] font-semibold text-sm">
                  {personal.location} · {personal.university}
                </p>
              </div>
            </div>

            {/* Social grid */}
            <div className="glass rounded-3xl p-6 border border-white/7">
              <p className="text-[var(--muted)] text-xs font-semibold uppercase tracking-wider mb-4">
                Find Me Everywhere
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="flex items-center gap-2.5 glass rounded-2xl px-3 py-2.5 border border-white/6 hover:border-opacity-50 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ ["--hover-border" as string]: s.color }}
                    data-magnetic
                  >
                    <span className="text-lg">{s.emoji}</span>
                    <span className="text-[var(--muted)] text-sm font-semibold">
                      {s.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="glass rounded-3xl p-5 border border-[#2DD4BF]/15 flex items-center gap-3"
              style={{ background: "rgba(45,212,191,0.04)" }}
            >
              <span className="w-3 h-3 rounded-full bg-[#2DD4BF] flex-shrink-0 animate-pulse-soft" />
              <div>
                <p className="text-[var(--fg)] font-semibold text-sm">
                  Available for new opportunities
                </p>
                <p className="text-[var(--muted)] text-xs">
                  Freelance, Full-time &amp; Collaborations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
