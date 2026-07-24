"use client";

import { useRef } from "react";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import { stack } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Capability map — "what I run in production", not a badge wall.
 * Gold markers = primary tools carrying live systems right now.
 */
export default function Stack() {
  const scope = useRef<HTMLElement>(null);

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
  });

  return (
    <section ref={scope} id="stack" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="04 — Capabilities" word="Stack" />
          <p data-reveal className="gsap-reveal flex items-center gap-2 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Carrying production traffic today
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {stack.map((group, i) => (
            <div key={group.label} data-reveal className="gsap-reveal bg-surface p-8">
              <span className="font-mono text-[10px] tracking-[0.22em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{group.label}</h3>
              <p className="mt-1 text-xs text-faint">{group.note}</p>
              <ul className="mt-6 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={cn(
                      "flex items-center gap-2.5 text-sm",
                      item.primary ? "text-fg" : "text-muted"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        item.primary ? "bg-gold" : "bg-line-strong"
                      )}
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
