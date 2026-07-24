"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

/**
 * Ambient status HUD — local Colombo time, coordinates and scroll depth.
 * The "systems thinker" signature detail, kept deliberately quiet.
 */
export default function Hud() {
  const [time, setTime] = useState<string | null>(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setDepth(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 hidden items-end justify-between px-6 pb-5 font-mono text-[10px] tracking-[0.18em] text-faint lg:flex"
    >
      <div className="flex flex-col gap-1">
        <span>COLOMBO&ensp;{time ?? "--:--:--"}</span>
        <span>
          {site.coordinates.lat}&ensp;{site.coordinates.lng}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span>SCROLL&ensp;{String(depth).padStart(3, "0")}%</span>
        <span className="relative block h-10 w-px bg-line-strong">
          <span
            className="absolute left-0 top-0 w-px bg-gold transition-[height] duration-150 ease-out"
            style={{ height: `${depth}%` }}
          />
        </span>
      </div>
    </div>
  );
}
