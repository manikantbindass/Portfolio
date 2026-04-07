"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";


const experiences = [
  {
    role: "Lab Tech Support",
    org: "CV Raman Center – Parul University",
    period: "2023 – Present",
    type: "full-time",
    icon: "🖥️",
    color: "#6C63FF",
    points: [
      "Managed 3,000+ computer systems for national competitive exams (GATE, JAM)",
      "Configured and maintained enterprise network infrastructure and domain services",
      "Ensured zero-downtime operations during critical examination periods",
    ],
  },
  {
    role: "IT Intern – System Support Cell",
    org: "Parul University",
    period: "2023",
    type: "internship",
    icon: "🔧",
    color: "#38B2AC",
    points: [
      "Maintained IT infrastructure across multiple university departments",
      "Integrated smart IoT devices into the university's central management system",
      "Diagnosed and resolved hardware/software issues across campus",
    ],
  },
  {
    role: "Membership Coordinator",
    org: "Chain Innovators – Blockchain Club",
    period: "2023 – Present",
    type: "leadership",
    icon: "⛓️",
    color: "#8B84FF",
    points: [
      "Organized Web3 workshops, hackathons, and blockchain awareness events",
      "Grew club membership and facilitated hands-on blockchain learning sessions",
      "Bridged student developers with real-world blockchain use cases",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 bg-[#E0E5EC] dark:bg-[#1A1D24] relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#38B2AC]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#6C63FF] dark:text-[#7C74FF] font-semibold text-sm tracking-widest uppercase mb-2">
            My journey
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight">
            Experience
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38B2AC]" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6C63FF]/30 via-[#38B2AC]/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="relative flex gap-6 sm:gap-8"
              >
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 sm:ml-0">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 rounded-card flex items-center justify-center text-2xl bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu z-10 relative"
                  >
                    {exp.icon}
                  </motion.div>
                  {i < experiences.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-16 w-0.5 h-8 bg-gradient-to-b from-[#6C63FF]/30 to-transparent hidden sm:block" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex-1 p-6 sm:p-8 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu group transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#3D4852] dark:text-[#E2E8F0]">
                        {exp.role}
                      </h3>
                      <p className="font-medium mt-0.5" style={{ color: exp.color }}>
                        {exp.org}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: `${exp.color}CC` }}
                      >
                        {exp.type}
                      </span>
                      <span className="text-[#6B7280] dark:text-[#94A3B8] text-sm whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-[#6B7280] dark:text-[#94A3B8] text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
