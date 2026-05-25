"use client";

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
  // Dark mode is always on — full cosmos dark experience
  const darkMode = true;
  const toggleDark = () => {}; // Reserved for future implementation

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />
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
