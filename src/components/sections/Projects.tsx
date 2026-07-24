"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/lib/content";

/** Browser-chrome frame so screenshots read as products, not raw captures. */
function BrowserFrame({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-raised">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-gold/60" />
        </span>
        <span className="ml-2 truncate font-mono text-[10px] tracking-wider text-faint">
          {project.domain}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} — ${project.sourceOnly ? "source code" : "live site"}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--raised),var(--surface))]">
            <span className="font-display text-3xl font-bold tracking-tight text-line-strong">
              {project.name}
            </span>
          </div>
        )}

        {/* hover badge — makes the link destination explicit */}
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line-strong bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.sourceOnly ? "View source →" : "View live →"}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
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
      "[data-project-card]",
      { autoAlpha: 0, y: 56 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-project-grid]", start: "top 82%" },
      }
    );
  });

  return (
    <section ref={scope} className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="03 — Selected work" word="Shipped" />
          <p data-reveal className="type-label gsap-reveal max-w-xs pb-2">
            Real shipped work — cards open the live product, or the source
          </p>
        </div>

        <div data-project-grid className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.id}
              data-project-card
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-reveal group block"
            >
              <BrowserFrame project={project} />

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gold">
                    {project.name}
                    <span
                      aria-hidden
                      className="ml-2 inline-block text-sm text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold"
                    >
                      ↗
                    </span>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.description}</p>
                </div>
              </div>

              {/* metadata: quiet at rest, revealed on hover */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {project.role}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-faint">{project.year}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {project.tags.join(" · ")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
