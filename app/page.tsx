"use client";
import { useEffect, useState } from "react";
import CustomCursor  from "@/components/layout/CustomCursor";
import FloatingDock  from "@/components/layout/FloatingDock";
import SocialRail    from "@/components/layout/SocialRail";
import TopBar        from "@/components/layout/TopBar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ScrollMoon    from "@/components/layout/ScrollMoon";

import Hero    from "@/components/sections/Hero";
import About   from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills  from "@/components/sections/Skills";
import Stats   from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer  from "@/components/sections/Footer";

export default function Home() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "light" ? false : stored === "dark" ? true : prefersDark;
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
    <>
      {/* Layout shell */}
      <CustomCursor />
      <ScrollProgress />
      <ScrollMoon />
      <TopBar dark={dark} toggle={toggleDark} />
      <SocialRail />
      <FloatingDock />

      {/* Content */}
      <main className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Stats />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
