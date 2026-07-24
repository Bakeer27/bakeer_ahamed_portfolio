"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Runs a GSAP setup function inside a scoped context and reverts it
 * (killing all tweens + ScrollTriggers) on unmount. Skipped entirely
 * when the user prefers reduced motion — content stays fully visible.
 */
export function useScrollAnimation(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: gsap.Context) => void
) {
  useEffect(() => {
    if (prefersReducedMotion() || !scope.current) return;
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
