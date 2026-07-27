import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          © {new Date().getFullYear()} {site.name} — {site.location}
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: site.github },
            { label: "LinkedIn", href: site.linkedin },
            { label: "Email", href: `mailto:${site.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          Next.js · GSAP · R3F — hand-built
        </p>
      </div>
    </footer>
  );
}
