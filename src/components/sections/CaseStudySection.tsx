"use client";

import { useRef } from "react";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { CaseStudy } from "@/lib/content";

const CHAPTER_LABELS = ["Context", "Approach", "System", "Outcome"] as const;

/**
 * Case study in strict Context → Approach → System → Outcome format.
 * Sticky editorial meta column on the left, chapters + scroll-drawn
 * spine on the right.
 */
export default function CaseStudySection({
  study,
  first = false,
}: {
  study: CaseStudy;
  first?: boolean;
}) {
  const scope = useRef<HTMLElement>(null);

  useScrollAnimation(scope, () => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    // spine draws as the chapters scroll past
    gsap.fromTo(
      "[data-spine]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: "[data-chapters]",
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      }
    );
  });

  const { chapters } = study;
  const chapterBodies: (string | readonly string[])[] = [
    chapters.context,
    chapters.approach,
    chapters.system,
    chapters.outcome,
  ];

  return (
    <section
      ref={scope}
      id={first ? "work" : undefined}
      className="relative overflow-hidden border-t border-line"
    >
      {/* oversized watermark index */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 select-none font-display text-[24rem] font-bold leading-none text-raised/80"
      >
        {study.index}
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-[1.1fr_1.6fr] lg:gap-20 lg:px-8">
        {/* meta column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="type-label-gold gsap-reveal">
            Case study {study.index}
          </p>
          <h2 data-reveal className="type-display-lg gsap-reveal mt-4">
            {study.name}
          </h2>
          <p data-reveal className="gsap-reveal mt-4 max-w-sm text-lg text-muted">
            {study.tagline}
          </p>

          <dl data-reveal className="gsap-reveal mt-10 space-y-4 border-t border-line pt-6">
            <div className="flex justify-between gap-6">
              <dt className="type-label">Role</dt>
              <dd className="text-right text-sm text-muted">{study.role}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="type-label">Period</dt>
              <dd className="text-right font-mono text-sm text-muted">{study.year}</dd>
            </div>
          </dl>

          <ul data-reveal className="gsap-reveal mt-6 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div data-reveal className="gsap-reveal mt-10 flex flex-col items-start gap-3">
            {study.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className={
                  i === 0
                    ? "group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-gold-bright"
                    : "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:text-gold"
                }
              >
                {link.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ))}
            {study.accentNote && (
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-faint">{study.accentNote}</p>
            )}
          </div>
        </div>

        {/* chapters */}
        <div data-chapters className="relative pl-8 sm:pl-12">
          <span aria-hidden className="absolute left-0 top-2 h-full w-px bg-line" />
          <span data-spine aria-hidden className="absolute left-0 top-2 h-full w-px bg-gold" />

          <ol className="space-y-16">
            {CHAPTER_LABELS.map((label, i) => {
              const body = chapterBodies[i];
              return (
                <li key={label} data-reveal className="gsap-reveal relative">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full border border-gold bg-ink sm:-left-12"
                  />
                  <h3 className="type-label-gold">
                    {String(i + 1).padStart(2, "0")} — {label}
                  </h3>
                  {typeof body === "string" ? (
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
                  ) : (
                    <ul className="mt-4 max-w-2xl space-y-3">
                      {body.map((item) => (
                        <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                          <span aria-hidden className="mt-[0.7em] block h-px w-4 shrink-0 bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
