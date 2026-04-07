"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  {
    title: "Introduction to IoT",
    issuer: "Cisco",
    icon: "🌐",
    color: "#6C63FF",
    year: "2024",
    url: "#",
  },
  {
    title: "Computer Networks",
    issuer: "NPTEL",
    icon: "📡",
    color: "#38B2AC",
    year: "2024",
    url: "#",
  },
  {
    title: "Blockchain Applications",
    issuer: "NPTEL",
    icon: "⛓️",
    color: "#8B84FF",
    year: "2024",
    url: "#",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-24 bg-[#E0E5EC] dark:bg-[#1A1D24] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#8B84FF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#6C63FF] dark:text-[#7C74FF] font-semibold text-sm tracking-widest uppercase mb-2">
            Credentials
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight">
            Certifications
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38B2AC]" />
          </div>
        </motion.div>

        {/* Certs Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-inner flex items-center justify-center text-2xl bg-[#E0E5EC] dark:bg-[#1A1D24]"
                  style={{
                    boxShadow:
                      "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)",
                  }}
                >
                  {cert.icon}
                </div>
                <Award size={18} style={{ color: cert.color }} />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-lg text-[#3D4852] dark:text-[#E2E8F0] mb-1">
                {cert.title}
              </h3>
              <p className="text-sm font-medium mb-1" style={{ color: cert.color }}>
                {cert.issuer}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">{cert.year}</p>

              {/* Verified badge */}
              <div className="mt-4 flex items-center gap-1.5">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                  style={{ background: `${cert.color}CC` }}
                >
                  ✓ Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-6"
        >
          {[
            { label: "Certifications", value: "3+", color: "#6C63FF" },
            { label: "Projects Built", value: "10+", color: "#38B2AC" },
            { label: "Tech Stack", value: "15+", color: "#8B84FF" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="p-6 rounded-card text-center bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu"
            >
              <div
                className="font-display font-extrabold text-3xl mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#6B7280] dark:text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
