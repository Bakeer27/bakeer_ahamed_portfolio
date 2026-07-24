/**
 * Single source of truth for every word and number on the site.
 * All stats are real and interview-defensible — do not inflate.
 */

export const site = {
  name: "Bakeer Ahamed",
  role: "Full-Stack Software Engineer",
  valueProp:
    "I build and run production systems end-to-end — architecture, security, deployment — as a team of one.",
  email: "bakeerahamed42@gmail.com",
  phone: "+94 766 527 382",
  location: "Colombo, Sri Lanka",
  coordinates: { lat: "6.9271° N", lng: "79.8612° E" },
  timezone: "Asia/Colombo",
  github: "https://github.com/Bakeer27",
  linkedin: "https://www.linkedin.com/in/bakeer-ahamed-84b175173",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bakeerahamed.dev",
  availability: "Open to remote roles & contract work",
} as const;

/* ------------------------------------------------------------------ */
/*  ABOUT                                                             */
/* ------------------------------------------------------------------ */

export const about = {
  narrative: [
    "I'm the sole engineer behind two product lines at Codesstream — which means there is no one to hand things off to. The database schema, the authorization layer, the deployment pipeline, the invoice that a client downloads at 2 a.m. — if it exists, I designed it, built it, and answer for it.",
    "That constraint shaped how I work. Systems I ship have to survive without a team standing behind them: boring, auditable code over clever code; security treated as a feature, not a checkbox; and honest scoping, because I'm the one who maintains every line later.",
  ],
  nonNegotiables: [
    {
      title: "Ship the audit trail",
      body: "If an action matters — issuing a certificate, closing an invoice — it gets logged, attributable, and reversible. Systems without history are systems you can't trust.",
    },
    {
      title: "Security before launch, not after",
      body: "I audit my own work like an attacker would. On CVMS that meant reviewing every route for authorization gaps before production traffic ever hit it.",
    },
    {
      title: "Own the whole surface",
      body: "No 'that's the backend team's problem.' Schema to pixel, DNS to deploy — I take responsibility for the entire system, so nothing falls between chairs.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  IMPACT — hover a stat, see the proof                              */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: string;
  label: string;
  story: string;
}

export const stats: Stat[] = [
  {
    value: "~168",
    label: "Routes audited",
    story:
      "Led a full security audit of CVMS — walked every one of ~168 routes checking authorization, ownership and input handling before the platform went to production.",
  },
  {
    value: "1",
    label: "Critical auth gap closed",
    story:
      "The audit surfaced a critical authorization gap that would have let users reach records they didn't own. Found, patched and regression-tested before it ever reached production.",
  },
  {
    value: "2",
    label: "Product lines, sole engineer",
    story:
      "Since 2024 I've been the only engineer on two live product lines at Codesstream — architecture, features, security and deployment all run through one pair of hands.",
  },
  {
    value: "6",
    label: "Live production sites",
    story:
      "Six of the projects on this page link to a real deployed system with real users. MY-BUS links to source, not a live deployment.",
  },
];

/* ------------------------------------------------------------------ */
/*  CASE STUDIES — Context → Approach → System → Outcome              */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  id: string;
  index: string;
  name: string;
  tagline: string;
  role: string;
  year: string;
  stack: string[];
  links: { label: string; href: string }[];
  chapters: {
    context: string;
    approach: string;
    system: string[];
    outcome: string[];
  };
  accentNote?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cvms",
    index: "01",
    name: "CVMS",
    tagline: "Certificate verification & management platform",
    role: "Sole engineer — architecture to deployment",
    year: "2024 — Present",
    stack: ["Laravel", "Livewire", "PHP", "MySQL", "Tailwind CSS"],
    links: [
      { label: "Public verification portal", href: "https://new.icscertify.com/verify" },
      { label: "Client portal (demo login)", href: "https://new.icscertify.com/client/login" },
    ],
    chapters: {
      context:
        "Certificate issuance and verification at ICS was manual and error-prone: templates lived in folders, job orders in spreadsheets, invoices were typed by hand, and there was no audit trail. Verifying a certificate meant emailing a human and waiting.",
      approach:
        "I designed and built a self-service Laravel/Livewire platform from scratch as the sole engineer — replacing the entire manual workflow with one system where every certificate, job order and invoice is created, tracked and verifiable in one place.",
      system: [
        "Template management — versioned certificate templates with structured fields",
        "Job order tracking — full lifecycle from request through issuance",
        "Automated invoicing module with PDF export",
        "Public verification portal — anyone can verify a certificate in seconds",
        "Role-based access control across admin, staff and client accounts",
      ],
      outcome: [
        "Led a full security audit before launch: ~168 routes reviewed for authorization, ownership and input handling.",
        "Found and closed a critical authorization gap before it reached production.",
        "Replaced manual invoicing with an automated billing workflow.",
        "Live today — the public portal below verifies real certificates.",
      ],
    },
    accentNote: "A live, working public product — verify a certificate yourself.",
  },
  {
    id: "leway",
    index: "02",
    name: "LEWAY",
    tagline: "Swiss luxury travel — international client work",
    role: "Full site build",
    year: "2024",
    stack: ["Multi-language", "Multi-currency", "Video hero", "Rich media"],
    links: [{ label: "leway.ch", href: "https://leway.ch/en/" }],
    chapters: {
      context:
        "LEWAY, a Swiss luxury travel agency, needed a site that could stand in front of a high-end international clientele — visually rich, multilingual, and unmistakably premium.",
      approach:
        "Built the full multi-destination site: cinematic video hero, large-format imagery, multi-currency pricing and multi-language support throughout.",
      system: [
        "Destination catalogue with rich media layouts",
        "Tailor-made trip inquiry flow",
        "Newsletter capture and client testimonials",
        "Full multi-language and multi-currency architecture",
      ],
      outcome: [
        "Live production site serving an international client in Switzerland.",
        "Proof I deliver for clients outside Sri Lanka, to a European quality bar.",
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  PROJECTS GRID — live sites, except MY-BUS which links to source   */
/* ------------------------------------------------------------------ */

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  href: string;
  domain: string;
  year: string;
  role: string;
  image?: string;
  /** Card links to source code instead of a live deployment. */
  sourceOnly?: boolean;
}

export const projects: Project[] = [
  {
    id: "pinkvelvet",
    name: "Pink Velvet",
    description: "E-commerce platform with PayHere payment integration.",
    tags: ["Laravel 11", "Livewire 3", "Filament", "PayHere"],
    href: "https://pinkvelvet.lk",
    domain: "pinkvelvet.lk",
    year: "2025",
    role: "Full-stack build",
    image: "/images/projects/pinkvelvet.png",
  },
  {
    id: "icscertify",
    name: "ICS Certify",
    description: "Corporate site for the ICS certificate platform — the public face of CVMS.",
    tags: ["B2B platform", "Brand site", "Verification"],
    href: "https://icscertify.com",
    domain: "icscertify.com",
    year: "2024",
    role: "Design & build",
    image: "/images/projects/icscertify.png",
  },
  {
    id: "tecdex",
    name: "Tecdex",
    description: "Cybersecurity & IT services business site.",
    tags: ["Web", "Brand site", "SEO"],
    href: "https://tecdex.lk",
    domain: "tecdex.lk",
    year: "2024",
    role: "Design & build",
    image: "/images/projects/tecdex.png",
  },
  {
    id: "raha",
    name: "Raha Travels",
    description: "Airport transfer booking platform with WhatsApp-integrated lead capture.",
    tags: ["Booking flow", "WhatsApp API", "Lead capture"],
    href: "https://rahatransfers.com",
    domain: "rahatransfers.com",
    year: "2024",
    role: "Full-stack build",
    image: "/images/projects/raha.png",
  },
  {
    id: "yce",
    name: "Youth Continuing Education",
    description: "Education-sector site for a nonprofit — Finch University partnership.",
    tags: ["Education", "Nonprofit", "CMS"],
    href: "https://youthcontinuingeducation.org",
    domain: "youthcontinuingeducation.org",
    year: "2024",
    role: "Design & build",
    image: "/images/projects/yce.png",
  },
  {
    id: "mybus",
    name: "MY-BUS",
    description: "QR-based bus pass & booking system with PayPal IPG integration.",
    tags: ["PHP", "MySQL", "QR systems", "PayPal IPG"],
    href: "https://github.com/Bakeer27/MY-BUS",
    domain: "github.com/Bakeer27/MY-BUS",
    year: "2023",
    role: "Final-year project — source",
    image: "/images/projects/mybus.png",
    sourceOnly: true,
  },
];

/* ------------------------------------------------------------------ */
/*  STACK — "what I run in production", not a badge wall              */
/* ------------------------------------------------------------------ */

export interface StackGroup {
  label: string;
  note: string;
  items: { name: string; primary?: boolean }[];
}

export const stack: StackGroup[] = [
  {
    label: "Languages",
    note: "Daily drivers first",
    items: [
      { name: "PHP", primary: true },
      { name: "TypeScript", primary: true },
      { name: "JavaScript", primary: true },
      { name: "C#" },
      { name: "SQL" },
    ],
  },
  {
    label: "Frameworks",
    note: "Production systems, not tutorials",
    items: [
      { name: "Laravel", primary: true },
      { name: "Livewire", primary: true },
      { name: "Filament", primary: true },
      { name: "React" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: ".NET" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    label: "Data",
    note: "Schema design through query tuning",
    items: [{ name: "MySQL", primary: true }, { name: "Eloquent ORM" }, { name: "Redis" }],
  },
  {
    label: "In production",
    note: "Integrations running live right now",
    items: [
      { name: "PayHere", primary: true },
      { name: "PayPal IPG" },
      { name: "WhatsApp lead capture" },
      { name: "Multi-currency / i18n" },
      { name: "PDF generation" },
      { name: "RBAC / security audits", primary: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERIENCE TIMELINE                                               */
/* ------------------------------------------------------------------ */

export interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  summary: string;
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    company: "Codesstream / ICS",
    role: "Software Engineer — sole engineer",
    period: "2024 — Present",
    summary:
      "Own two product lines end-to-end, including CVMS: architecture, security audits, automated billing, deployment.",
    current: true,
  },
  {
    company: "Hotspur Technology",
    role: "Software Engineer",
    period: "2023 — 2024",
    summary:
      "Full-stack client work — booking platforms, business sites and payment-gateway integrations for local and international clients.",
  },
  {
    company: "Dialog Axiata PLC",
    role: "Digital Services — eZcash",
    period: "2018 — 2021",
    summary:
      "Operations within Sri Lanka's largest telco — where I learned how money-movement systems behave at real scale.",
  },
];

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                        */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;
