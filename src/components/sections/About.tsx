"use client";

import { useRef } from "react";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import { about } from "@/lib/content";

export default function About() {
  const scope = useRef<HTMLElement>(null);

  useScrollAnimation(scope, () => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
  });

  return (
    <section ref={scope} id="about" className="relative border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-24 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="01 — About" word="Operator" />
          <p data-reveal className="gsap-reveal mt-6 max-w-xs text-sm leading-relaxed text-faint">
            Not a specialist in one layer — the person responsible for all of them.
          </p>
        </div>

        <div>
          <div className="space-y-6">
            {about.narrative.map((para) => (
              <p
                key={para.slice(0, 24)}
                data-reveal
                className="gsap-reveal max-w-2xl text-lg leading-relaxed text-muted first:text-xl first:text-fg"
              >
                {para}
              </p>
            ))}
          </div>

          <p data-reveal className="type-label gsap-reveal mb-2 mt-16">
            How I work — non-negotiables
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {about.nonNegotiables.map((item, i) => (
              <li key={item.title} data-reveal className="gsap-reveal group grid gap-2 py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
