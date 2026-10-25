"use client";

import CustomCursor from "@/components/layout/CustomCursor";
import FloatingDock from "@/components/layout/FloatingDock";
import SocialRail from "@/components/layout/SocialRail";
import ThemeHeader from "@/components/layout/ThemeHeader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ScrollMoon from "@/components/layout/ScrollMoon";
import PortfolioChatBot from "@/components/layout/PortfolioChatBot";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Resumes from "@/components/sections/Resumes";
import Footer from "@/components/sections/Footer";
import BuildStudio from "@/components/sections/BuildStudio";
import PortfolioFAQ from "@/components/sections/PortfolioFAQ";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {/* Layout shell */}
      <CustomCursor />
      <ScrollProgress />
      <ScrollMoon />
      <PortfolioChatBot />
      <ThemeHeader />
      <SocialRail />
      <FloatingDock />

      {/* Content */}
      <main id="main-content" className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <BuildStudio />
        <Skills />
        <Stats />
        <Resumes />
        <PortfolioFAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
