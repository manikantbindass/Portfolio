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
        neu: {
          bg: "#E0E5EC",
          fg: "#3D4852",
          muted: "#6B7280",
          accent: "#6C63FF",
          "accent-light": "#8B84FF",
          teal: "#38B2AC",
        },
        dark: {
          bg: "#1A1D24",
          "bg-2": "#20242E",
          fg: "#E2E8F0",
          muted: "#94A3B8",
          accent: "#7C74FF",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        card: "32px",
        btn: "16px",
        inner: "12px",
      },
      boxShadow: {
        neu: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)",
        "neu-hover":
          "12px 12px 20px rgb(163,177,198,0.7), -12px -12px 20px rgba(255,255,255,0.6)",
        "neu-sm":
          "5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.5)",
        "neu-inset":
          "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)",
        "neu-inset-deep":
          "inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)",
        "neu-inset-sm":
          "inset 3px 3px 6px rgb(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5)",
        "dark-neu":
          "9px 9px 16px rgba(0,0,0,0.4), -9px -9px 16px rgba(255,255,255,0.04)",
        "dark-neu-hover":
          "12px 12px 20px rgba(0,0,0,0.5), -12px -12px 20px rgba(255,255,255,0.05)",
        "dark-neu-inset":
          "inset 6px 6px 10px rgba(0,0,0,0.4), inset -6px -6px 10px rgba(255,255,255,0.04)",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        typewriter: "typewriter 3.5s steps(40,end)",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
