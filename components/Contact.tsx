"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

const socialLinks = [
  {
    label: "Email",
    value: "manikant.dev.ai@gmail.com",
    href: "mailto:manikant.dev.ai@gmail.com",
    icon: "✉️",
    color: "#6C63FF",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/manikantbindass",
    href: "https://www.linkedin.com/in/manikantbindass/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0077B5",
  },
  {
    label: "GitHub",
    value: "github.com/manikantbindass",
    href: "https://github.com/manikantbindass",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#333",
  },
  {
    label: "X / Twitter",
    value: "x.com/ManikantBindass",
    href: "https://x.com/ManikantBindass",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#000",
  },
  {
    label: "Medium",
    value: "medium.com/@manikant.ai",
    href: "https://medium.com/@manikant.ai",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    color: "#00AB6C",
  },
  {
    label: "Instagram",
    value: "instagram.com/manikantbindass",
    href: "https://www.instagram.com/manikantbindass/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "#E4405F",
  },
  {
    label: "YouTube",
    value: "RootEDSigma",
    href: "https://www.youtube.com/@RootEDSigma",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "#FF0000",
  },
  {
    label: "Linktree",
    value: "linktr.ee/manikantbindass",
    href: "https://linktr.ee/manikantbindass",
    icon: "🌳",
    color: "#39E09B",
  },
  {
    label: "LeetCode",
    value: "leetcode.com/u/manikantbindass",
    href: "https://leetcode.com/u/manikantbindass/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
    color: "#FFA116",
  },
  {
    label: "Codeforces",
    value: "codeforces.com/profile/manikantbindass",
    href: "https://codeforces.com/profile/manikantbindass",
    icon: "⚡",
    color: "#1F8ACB",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with Formspree / EmailJS
    const mailtoUrl = `mailto:manikant.dev.ai@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    window.open(mailtoUrl, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-[#E0E5EC] dark:bg-[#1A1D24] relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#6C63FF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#6C63FF] dark:text-[#7C74FF] font-semibold text-sm tracking-widest uppercase mb-2">
            Let&apos;s connect
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight">
            Get In Touch
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38B2AC]" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu"
          >
            <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] mb-6 flex items-center gap-2">
              <Mail size={22} className="text-[#6C63FF]" />
              Send a Message
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-3"
              >
                <CheckCircle size={48} className="text-[#38B2AC]" />
                <p className="font-display font-bold text-xl text-[#3D4852] dark:text-[#E2E8F0]">
                  Message Sent!
                </p>
                <p className="text-[#6B7280] dark:text-[#94A3B8] text-sm">
                  Your email client should open. I&apos;ll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-[#6B7280] dark:text-[#94A3B8] mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [field.id]: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-btn bg-[#E0E5EC] dark:bg-[#1A1D24] text-[#3D4852] dark:text-[#E2E8F0] placeholder-[#A0AEC0] dark:placeholder-[#4A5568] outline-none transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC] dark:focus:ring-offset-[#20242E]"
                      style={{
                        boxShadow:
                          "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#6B7280] dark:text-[#94A3B8] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-btn bg-[#E0E5EC] dark:bg-[#1A1D24] text-[#3D4852] dark:text-[#E2E8F0] placeholder-[#A0AEC0] dark:placeholder-[#4A5568] outline-none transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC] dark:focus:ring-offset-[#20242E] resize-none"
                    style={{
                      boxShadow:
                        "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)",
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-btn font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#38B2AC] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} /> Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Linktree-style Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] mb-6">
              Find Me Everywhere
            </h3>
            <div className="grid gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu-sm dark:shadow-dark-neu hover:shadow-neu dark:hover:shadow-dark-neu-hover transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-inner flex items-center justify-center bg-[#E0E5EC] dark:bg-[#1A1D24] flex-shrink-0"
                    style={{
                      boxShadow:
                        "inset 4px 4px 8px rgb(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5)",
                      color: link.color,
                    }}
                  >
                    {typeof link.icon === "string" ? (
                      <span className="text-lg">{link.icon}</span>
                    ) : (
                      link.icon
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#3D4852] dark:text-[#E2E8F0]">
                      {link.label}
                    </div>
                    <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] truncate">
                      {link.value}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-[#6B7280] dark:text-[#94A3B8] group-hover:text-[#6C63FF] dark:group-hover:text-[#7C74FF] transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
