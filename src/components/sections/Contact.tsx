"use client";

import { useRef } from "react";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import { site } from "@/lib/content";

export default function Contact() {
  const scope = useRef<HTMLElement>(null);

  useScrollAnimation(scope, () => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: scope.current, start: "top 70%" },
        }
      );
    });
  });

  return (
    <section ref={scope} id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="blueprint absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40 lg:px-8">
        <p data-reveal className="type-label-gold gsap-reveal">
          06 — Contact
        </p>

        <h2 data-reveal className="type-display-xl gsap-reveal mt-6 max-w-[16ch]">
          Need it built <span className="text-muted">and</span> run right?
        </h2>

        <p data-reveal className="gsap-reveal mt-8 max-w-xl text-lg leading-relaxed text-muted">
          One engineer who owns the whole system — remote roles, contracts and freelance work
          welcome. I reply fastest to email.
        </p>

        <div data-reveal className="gsap-reveal mt-12">
          <a
            href={`mailto:${site.email}`}
            data-magnetic
            className="group inline-block font-display text-[clamp(1.4rem,4.5vw,3.25rem)] font-semibold tracking-tight text-fg underline decoration-gold decoration-2 underline-offset-8 transition-colors duration-300 hover:text-gold"
          >
            {site.email}
          </a>
        </div>

        <div data-reveal className="gsap-reveal mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
          {[
            { label: "GitHub", href: site.github },
            { label: "LinkedIn", href: site.linkedin },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-gold"
            >
              {l.label} ↗
            </a>
          ))}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {site.location} — {site.coordinates.lat}, {site.coordinates.lng}
          </span>
        </div>
      </div>
    </section>
  );
}
