"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin } from "lucide-react";

const skillCategories = [
  {
    label: "Languages",
    icon: "💻",
    skills: ["Python", "C/C++", "Java", "JavaScript", "Solidity"],
  },
  {
    label: "Web",
    icon: "🌐",
    skills: ["HTML", "CSS", "React.js", "Next.js", "Bootstrap"],
  },
  {
    label: "Blockchain",
    icon: "⛓️",
    skills: ["Ethereum", "Hyperledger", "Smart Contracts", "Web3", "Solidity"],
  },
  {
    label: "Databases",
    icon: "🗄️",
    skills: ["MongoDB", "MySQL", "SQLite"],
  },
  {
    label: "Tools",
    icon: "🔧",
    skills: ["Git", "GitHub", "VS Code", "Android Studio"],
  },
  {
    label: "Concepts",
    icon: "🧠",
    skills: ["DSA", "Distributed Systems", "Smart Contract Security"],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-[#E0E5EC] dark:bg-[#1A1D24] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#6C63FF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#6C63FF] dark:text-[#7C74FF] font-semibold text-sm tracking-widest uppercase mb-2">
            Get to know me
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#3D4852] dark:text-[#E2E8F0] tracking-tight">
            About Me
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#38B2AC]" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu"
          >
            <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] mb-4">
              Who I Am
            </h3>
            <p className="text-[#6B7280] dark:text-[#94A3B8] leading-relaxed mb-6">
              I&apos;m a Blockchain and AI enthusiast currently pursuing my B.Tech in Computer Science Engineering
              (Blockchain Technology) at Parul University. I&apos;m passionate about building scalable systems at the
              intersection of AI and Web3.
            </p>
            <p className="text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
              With hands-on experience in full-stack development, smart contract development, and enterprise IT
              infrastructure, I bridge the gap between intelligent automation and decentralized architecture.
            </p>

            {/* Location + Availability */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#94A3B8]">
                <MapPin size={16} className="text-[#6C63FF]" />
                <span className="text-sm">Vadodara, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38B2AC] animate-pulse" />
                <span className="text-sm text-[#38B2AC] font-medium">Available for Work</span>
              </div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu"
          >
            <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] mb-6">
              Education
            </h3>
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-inner flex items-center justify-center flex-shrink-0 bg-[#E0E5EC] dark:bg-[#1A1D24]"
                style={{
                  boxShadow: "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)",
                }}
              >
                <GraduationCap size={24} className="text-[#6C63FF]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-[#3D4852] dark:text-[#E2E8F0]">
                  Parul Institute of Engineering & Technology
                </h4>
                <p className="text-[#6C63FF] dark:text-[#7C74FF] font-medium text-sm mt-1">
                  B.Tech – CSE (Blockchain Technology)
                </p>
                <p className="text-[#6B7280] dark:text-[#94A3B8] text-sm mt-1">2023 – 2027</p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    boxShadow: "inset 4px 4px 8px rgb(163,177,198,0.5), inset -4px -4px 8px rgba(255,255,255,0.5)",
                    background: "#E0E5EC",
                  }}
                >
                  <span className="text-[#38B2AC]">●</span>
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">CGPA: 7.45</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-display font-bold text-2xl text-[#3D4852] dark:text-[#E2E8F0] text-center mb-10">
            Technical Skills
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="p-6 rounded-card bg-[#E0E5EC] dark:bg-[#20242E] shadow-neu dark:shadow-dark-neu group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-inner flex items-center justify-center text-lg bg-[#E0E5EC] dark:bg-[#1A1D24]"
                    style={{
                      boxShadow: "inset 5px 5px 10px rgb(163,177,198,0.6), inset -5px -5px 10px rgba(255,255,255,0.5)",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span className="font-display font-semibold text-[#3D4852] dark:text-[#E2E8F0]">
                    {cat.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge px-3 py-1 rounded-full text-xs font-medium text-[#6B7280] dark:text-[#94A3B8] bg-[#E0E5EC] dark:bg-[#1A1D24]"
                      style={{
                        boxShadow: "4px 4px 8px rgb(163,177,198,0.5), -4px -4px 8px rgba(255,255,255,0.5)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
