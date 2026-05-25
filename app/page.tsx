"use client";

import { useState, useEffect } from "react";
import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Blog           from "@/components/Blog";
import Stats          from "@/components/Stats";
import Certifications from "@/components/Certifications";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";

export default function Home() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar darkMode={dark} toggleDark={toggleDark} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Stats />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
