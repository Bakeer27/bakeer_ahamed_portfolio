"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/hooks/useScrollAnimation";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never drift. Renders nothing; fully torn down on unmount.
 * Reduced-motion users get native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    document.documentElement.classList.add("motion-ok");

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("motion-ok");
    };
  }, []);

  return null;
}
