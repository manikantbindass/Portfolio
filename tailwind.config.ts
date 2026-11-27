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
          950: "var(--obsidian)",
          900: "var(--espresso)",
          800: "var(--espresso)",
          700: "var(--espresso)",
        },
        accent:  { DEFAULT: "var(--accent)", light: "var(--accent)", dark: "var(--accent)" },
        violet:  { DEFAULT: "var(--accent2)", light: "var(--accent2)" },
        teal:    { DEFAULT: "var(--teal)", dark: "var(--teal)" },
        gold:    { DEFAULT: "var(--gold)" },
        rose:    { DEFAULT: "var(--rose)" },
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
        "aurora-1":         "radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 60%)",
        "aurora-2":         "radial-gradient(ellipse at bottom right, color-mix(in srgb, var(--accent2) 25%, transparent) 0%, transparent 60%)",
        "aurora-3":         "radial-gradient(ellipse at top right, color-mix(in srgb, var(--teal) 15%, transparent) 0%, transparent 50%)",
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
          "0%,100%": { boxShadow: "0 0 4px color-mix(in srgb, var(--accent) 30%, transparent)" },
          "50%":     { boxShadow: "0 0 20px color-mix(in srgb, var(--accent) 70%, transparent), 0 0 40px color-mix(in srgb, var(--accent2) 30%, transparent)" },
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
