"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
const links = [
  ["hero", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["build", "Inside the Build"],
  ["skills", "Skills"],
  ["stats", "Coding Stats"],
  ["resumes", "Resumes"],
  ["contact", "Contact"],
];
export default function TopBar({
  dark,
  toggle,
}: {
  dark: boolean;
  toggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-10% 0px -65% 0px" },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <header className="topbar glass">
      <Link className="brand" href="/#hero" aria-label="Manikant Kumar home">
        <span>
          MK<span className="brand-dot">.</span>
        </span>
        <small>ENGINEER & BUILDER</small>
      </Link>
      <nav
        id="portfolio-navigation"
        aria-label="Primary navigation"
        className={open ? "header-links is-open" : "header-links"}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            document.getElementById("portfolio-menu-toggle")?.focus();
          }
        }}
      >
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`/#${id}`}
            onClick={() => setOpen(false)}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="icon-button"
          onClick={toggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link className="button header-contact" href="/#contact">
          Let’s talk <ArrowUpRight size={14} />
        </Link>
        <button
          id="portfolio-menu-toggle"
          className="icon-button menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="portfolio-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
