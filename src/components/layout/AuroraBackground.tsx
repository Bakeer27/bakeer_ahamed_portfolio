"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/hooks/useScrollAnimation";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

/**
 * Site-wide ambient background: slow-drifting aurora fields, a rotating light
 * beam, a cursor spotlight and (desktop only) a canvas constellation.
 *
 * Everything animates on transform/opacity only, so the whole layer stays on
 * the compositor. gsap.matchMedia() scales the effect down on mobile and
 * removes it entirely under prefers-reduced-motion.
 */
export default function AuroraBackground() {
  const root = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(false);

  // Particles are desktop-only and code-split, so phones never download them.
  useEffect(() => {
    const capable =
      window.matchMedia("(min-width: 768px) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (navigator.hardwareConcurrency ?? 8) > 4;

    const raf = requestAnimationFrame(() => setShowParticles(capable));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        isDesktop: "(min-width: 768px) and (pointer: fine)",
      },
      (ctx) => {
        const { reduce, isDesktop } = ctx.conditions as Record<string, boolean>;
        if (reduce) return;

        // Mobile drifts less and slower — smaller repaints, calmer feel.
        const reach = isDesktop ? 1 : 0.5;
        const pace = isDesktop ? 1 : 1.5;

        gsap.to("[data-aurora='gold']", {
          xPercent: 16 * reach,
          yPercent: -12 * reach,
          scale: 1.15,
          duration: 19 * pace,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to("[data-aurora='violet']", {
          xPercent: -20 * reach,
          yPercent: 14 * reach,
          scale: 1.22,
          duration: 24 * pace,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to("[data-aurora='cyan']", {
          xPercent: 14 * reach,
          yPercent: 18 * reach,
          scale: 0.88,
          duration: 29 * pace,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Slow sweeping light beam — one long rotation, no repaint cost.
        gsap.to("[data-aurora-beam]", {
          rotation: 360,
          duration: 90 * pace,
          ease: "none",
          repeat: -1,
        });

        if (!isDesktop) return;

        // Cursor spotlight. quickTo reuses one tween instead of spawning
        // a new one on every mousemove.
        const spot = root.current?.querySelector<HTMLElement>("[data-aurora-spot]");
        if (!spot) return;

        const xTo = gsap.quickTo(spot, "x", { duration: 0.9, ease: "power3" });
        const yTo = gsap.quickTo(spot, "y", { duration: 0.9, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };

        gsap.to(spot, { autoAlpha: 1, duration: 1.2, ease: "power2.out" });
        window.addEventListener("pointermove", onMove, { passive: true });

        return () => window.removeEventListener("pointermove", onMove);
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink"
    >
      <div
        data-aurora="gold"
        className="aurora-blob left-[-8%] top-[-12%] h-[72vmax] w-[72vmax]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(217,165,74,0.44) 0%, rgba(217,165,74,0.16) 34%, transparent 68%)",
        }}
      />
      <div
        data-aurora="violet"
        className="aurora-blob right-[-12%] top-[4%] h-[80vmax] w-[80vmax]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(109,96,246,0.42) 0%, rgba(109,96,246,0.15) 36%, transparent 70%)",
        }}
      />
      <div
        data-aurora="cyan"
        className="aurora-blob bottom-[-20%] left-[14%] h-[70vmax] w-[70vmax]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(56,178,220,0.32) 0%, rgba(56,178,220,0.11) 38%, transparent 72%)",
        }}
      />

      {/* rotating beam sweep */}
      <div
        data-aurora-beam
        className="absolute left-1/2 top-1/2 h-[190vmax] w-[190vmax] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(217,165,74,0.16) 24deg, transparent 64deg, transparent 180deg, rgba(109,96,246,0.14) 208deg, transparent 252deg, transparent 360deg)",
        }}
      />

      {showParticles && <ParticleField />}

      {/* cursor spotlight — starts hidden, fades in once tracking begins */}
      <div
        data-aurora-spot
        className="invisible absolute -left-[22vmax] -top-[22vmax] h-[44vmax] w-[44vmax] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(217,165,74,0.20) 0%, transparent 62%)",
        }}
      />

      {/* Light vignette only — the glows live near the edges, so darkening
          hard here would erase them. Enough to keep body copy readable. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 85% at 50% 45%, transparent 55%, rgba(7,11,20,0.42) 100%)",
        }}
      />
    </div>
  );
}
