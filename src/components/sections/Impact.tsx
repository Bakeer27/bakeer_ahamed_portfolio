"use client";

import { useRef, useState } from "react";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Real numbers only — hover (or tap) a stat to see the story behind it.
 */
export default function Impact() {
  const scope = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useScrollAnimation(scope, () => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    gsap.fromTo(
      "[data-stat-card]",
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-stat-grid]", start: "top 80%" },
      }
    );
  });

  return (
    <section ref={scope} className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="02 — Impact" word="Proof" />
          <p data-reveal className="type-label gsap-reveal max-w-xs pb-2">
            Hover a number for the story — every one is interview-defensible
          </p>
        </div>

        <div data-stat-grid className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const isOpen = open === i;
            return (
              <button
                key={stat.label}
                data-stat-card
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                className="gsap-reveal group relative min-h-[15rem] bg-surface p-8 text-left transition-colors duration-500 hover:bg-raised focus-visible:bg-raised"
              >
                {/* resting state */}
                <div
                  className={cn(
                    "flex h-full flex-col justify-between transition-opacity duration-300",
                    isOpen && "opacity-0"
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-display text-5xl font-bold tracking-tight text-fg lg:text-6xl">
                      {stat.value}
                    </span>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {/* proof overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between bg-raised p-8 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <span className="type-label-gold">The story</span>
                  <p className="text-sm leading-relaxed text-muted">{stat.story}</p>
                </div>

                <span
                  aria-hidden
                  className={cn(
                    "absolute right-8 top-8 font-mono text-xs text-faint transition-transform duration-300",
                    isOpen && "rotate-45 text-gold"
                  )}
                >
                  +
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
