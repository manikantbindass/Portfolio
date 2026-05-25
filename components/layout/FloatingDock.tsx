"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FolderOpen, Zap, Mail, BarChart2 } from "lucide-react";

const links = [
  { href: "#hero",     label: "Home",     Icon: Home       },
  { href: "#about",    label: "About",    Icon: User       },
  { href: "#projects", label: "Projects", Icon: FolderOpen },
  { href: "#skills",   label: "Skills",   Icon: Zap        },
  { href: "#stats",    label: "Stats",    Icon: BarChart2  },
  { href: "#contact",  label: "Contact",  Icon: Mail       },
];

export default function FloatingDock() {
  const [active,  setActive]  = useState("#hero");
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const lastY = useRef(0);

  // Scroll-spy + auto-hide
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs: IntersectionObserver[] = [];
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(href); },
        { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          aria-label="Main navigation"
        >
          <div
            className="glass flex items-center gap-1 px-4 py-3 rounded-2xl"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}
          >
            {links.map(({ href, label, Icon }) => {
              const isActive = active === href;
              return (
                <div key={href} className="relative group" data-magnetic>
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hovered === href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.85 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap pointer-events-none z-50"
                        style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)", boxShadow: "0 4px 14px rgba(99,102,241,0.4)" }}
                      >
                        {label}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-t-4 border-t-[#A78BFA] border-x-4 border-x-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    href={href}
                    onClick={() => setActive(href)}
                    onMouseEnter={() => setHovered(href)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={label}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
                      isActive ? "text-white" : "text-white/35 hover:text-white/80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dock-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA)", boxShadow: "0 4px 16px rgba(99,102,241,0.45)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon size={18} className="relative z-10" />
                  </a>
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
