"use client";

import { useRef } from "react";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import { timeline } from "@/lib/content";

/**
 * Scroll-linked trajectory: the vertical line draws itself as you
 * scroll, entries lighting up as the line reaches them.
 */
export default function Timeline() {
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

    gsap.fromTo(
      "[data-timeline-spine]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: "[data-timeline-list]",
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      }
    );

    gsap.utils.toArray<HTMLElement>("[data-timeline-entry]").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    });
  });

  return (
    <section ref={scope} className="relative border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-24 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="05 — Experience" word="Trajectory" />
          <p data-reveal className="gsap-reveal mt-6 max-w-xs text-sm leading-relaxed text-faint">
            From telco scale at Dialog to owning entire product lines solo.
          </p>
        </div>

        <div data-timeline-list className="relative pl-10 sm:pl-14">
          <span aria-hidden className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-line" />
          <span
            data-timeline-spine
            aria-hidden
            className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-gold"
          />

          <ol className="space-y-16">
            {timeline.map((entry) => (
              <li key={entry.company} data-timeline-entry className="gsap-reveal relative">
                <span
                  aria-hidden
                  className={
                    "absolute -left-10 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border sm:-left-14 " +
                    (entry.current ? "border-gold bg-gold" : "border-line-strong bg-ink")
                  }
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  {entry.period}
                  {entry.current && (
                    <span className="ml-3 rounded-full border border-gold/40 px-2 py-0.5 text-[9px] text-gold-bright">
                      NOW
                    </span>
                  )}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                  {entry.company}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  {entry.role}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{entry.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
