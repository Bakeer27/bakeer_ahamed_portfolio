import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Low-power heuristic: reduced motion, coarse pointer + few cores, or save-data. */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const fewCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return prefersReducedMotion() || nav.connection?.saveData === true || (coarse && fewCores);
}
