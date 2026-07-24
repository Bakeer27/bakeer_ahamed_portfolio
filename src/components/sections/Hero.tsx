"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SplitText } from "gsap/SplitText";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import { isLowPowerDevice } from "@/lib/utils";
import { site } from "@/lib/content";

gsap.registerPlugin(SplitText);

const HeroSeal = dynamic(() => import("@/components/three/HeroSeal"), {
  ssr: false,
  loading: () => <SealFallback />,
});

/** Static CSS-only seal for low-power devices and while the scene loads. */
function SealFallback() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-[6%] rounded-full border border-dashed border-gold/40 [animation:spin_60s_linear_infinite]" />
      <div className="absolute inset-[16%] rounded-full border border-line-strong" />
      <div className="absolute inset-[38%] rounded-full border border-gold/60" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
    </div>
  );
}

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const [enable3D, setEnable3D] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    // defer the 3D decision a frame so it never competes with first paint
    const raf = requestAnimationFrame(() => setEnable3D(!isLowPowerDevice()));
    const el = scope.current;
    if (!el) return () => cancelAnimationFrame(raf);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  useScrollAnimation(scope, () => {
    const splits = SplitText.create("[data-hero-line]", { type: "chars", mask: "chars" });
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // parents carry .gsap-reveal (hidden pre-JS); chars do the actual reveal
    tl.set("[data-hero-line]", { autoAlpha: 1 }, 0);

    tl.fromTo(
      "[data-hero-label]",
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8 },
      0.1
    )
      .fromTo(
        splits.chars,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.028 },
        0.25
      )
      .fromTo(
        "[data-hero-copy]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        0.85
      )
      .fromTo(
        "[data-hero-seal]",
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: "power2.out" },
        0.5
      )
      .fromTo(
        "[data-hero-cue]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
        1.3
      );

    // headline lifts slightly as you leave the hero — cinematic, cheap
    gsap.to("[data-hero-content]", {
      yPercent: -12,
      autoAlpha: 0.25,
      ease: "none",
      scrollTrigger: { trigger: scope.current, start: "bottom 80%", end: "bottom 20%", scrub: true },
    });

    return () => splits.revert();
  });

  return (
    <section ref={scope} id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <div aria-hidden className="blueprint absolute inset-0" />

      {/* 3D verification seal */}
      <div
        data-hero-seal
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(120vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-25 md:left-auto md:right-[-4%] md:w-[min(46vw,680px)] md:translate-x-0 md:opacity-100 lg:right-[2%]"
      >
        {enable3D ? <HeroSeal active={inView} /> : <SealFallback />}
      </div>

      <div data-hero-content className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 lg:px-8">
        <p data-hero-label className="type-label-gold gsap-reveal mb-6">
          {site.role} — {site.location}
        </p>

        <h1 className="type-display-xl max-w-[12ch]">
          <span data-hero-line className="gsap-reveal block">
            Bakeer
          </span>
          <span data-hero-line className="gsap-reveal block text-muted">
            Ahamed
          </span>
        </h1>

        <div data-hero-copy className="gsap-reveal mt-10 max-w-xl">
          <p className="text-lg leading-relaxed text-muted">{site.valueProp}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              data-magnetic
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-gold-bright"
            >
              View case studies
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              data-magnetic
              className="inline-flex items-center rounded-full border border-line-strong px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:border-gold/60 hover:text-fg"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-cue
        aria-hidden
        className="gsap-reveal absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="type-label">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-line-strong">
          <span className="absolute left-0 top-0 h-4 w-px animate-[cue_2s_ease-in-out_infinite] bg-gold" />
        </span>
        <style>{`@keyframes cue { 0% { transform: translateY(-100%);} 100% { transform: translateY(300%);} }`}</style>
      </div>
    </section>
  );
}
