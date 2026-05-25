import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#030712",
          900: "#050A18",
          800: "#0A1628",
          700: "#0F1F38",
        },
        accent:  { DEFAULT: "#6366F1", light: "#818CF8", dark: "#4F46E5" },
        violet:  { DEFAULT: "#A78BFA", light: "#C4B5FD" },
        teal:    { DEFAULT: "#2DD4BF", dark: "#14B8A6" },
        gold:    { DEFAULT: "#F59E0B" },
        rose:    { DEFAULT: "#F43F5E" },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aurora-1":         "radial-gradient(ellipse at top left, rgba(99,102,241,0.3) 0%, transparent 60%)",
        "aurora-2":         "radial-gradient(ellipse at bottom right, rgba(167,139,250,0.25) 0%, transparent 60%)",
        "aurora-3":         "radial-gradient(ellipse at top right, rgba(45,212,191,0.15) 0%, transparent 50%)",
      },
      animation: {
        "float":          "float 6s ease-in-out infinite",
        "float-slow":     "float 9s ease-in-out infinite",
        "pulse-soft":     "pulse-soft 3s ease-in-out infinite",
        "spin-slow":      "spin 12s linear infinite",
        "aurora":         "aurora 12s ease-in-out infinite alternate",
        "blink":          "blink 1s step-end infinite",
        "marquee":        "marquee 28s linear infinite",
        "marquee-rev":    "marquee-rev 28s linear infinite",
        "border-glow":    "border-glow 3s ease-in-out infinite",
        "text-shimmer":   "text-shimmer 3s ease-in-out infinite",
        "scale-in":       "scale-in 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up":        "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "slide-up":       "slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-18px)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":     { opacity: "1",   transform: "scale(1.08)" },
        },
        aurora: {
          "0%":   { transform: "translate(0%,0%) scale(1)" },
          "33%":  { transform: "translate(3%,-4%) scale(1.06)" },
          "66%":  { transform: "translate(-3%,3%) scale(0.96)" },
          "100%": { transform: "translate(0%,0%) scale(1)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "border-glow": {
          "0%,100%": { boxShadow: "0 0 4px rgba(99,102,241,0.3)" },
          "50%":     { boxShadow: "0 0 20px rgba(99,102,241,0.7), 0 0 40px rgba(167,139,250,0.3)" },
        },
        "text-shimmer": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
