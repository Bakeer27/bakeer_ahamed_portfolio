"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line bg-[rgba(7,11,20,0.72)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <a
          href="#top"
          data-magnetic
          className="font-display text-sm font-bold tracking-tight text-fg"
        >
          BA<span className="text-gold">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${site.email}`}
          data-magnetic
          className="group flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 transition-colors duration-300 hover:border-gold/50"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-fg">
            Available for work
          </span>
        </a>
      </nav>
    </header>
  );
}
