export const site = {
  name: "Sam MacKinley",
  shortName: "Sam.",
  title: "Sam MacKinley — Web design, built to ship",
  description:
    "Websites for owner-operators and independent businesses that have outgrown a template. Designed and built by one person, from first sketch to launch.",
  portfolioUrl: "https://sammackinley.com",
  contactEmail: "hello@sammackinley.com",
};

export const hero = {
  pillLead: "Studio notes:",
  pill: "New work, built right into the practice.",
  pillLink: "See the work",
  pillHref: "https://sammackinley.com",
  titleLine1: "Sites that look sharp.",
  titleLine2: "Built to work hard.",
  lede: "For owner-operators and independent businesses who have outgrown DIY — a salon, a coach, a contractor, a shop. One designer, not a junior team.",
  cta: "Start a project",
  ctaHref: "/contact",
  proof:
    "One designer, first sketch to launch. 8+ years, 20+ projects.",
};

export const craftMarks = [
  "Type",
  "Motion",
  "Interface",
  "Narrative",
  "Code",
  "Launch",
  "Care",
];

export const manifesto =
  "I think, then I build. Websites with clear messaging, motion that earns its place, and a finish line you can actually reach. Always shipping. Always learning. Always finishing what I start.";

export const services = [
  {
    title: "Design the story",
    description:
      "Positioning, structure, and a visual system with a point of view — not a template with your logo dropped in.",
    tone: "neutral" as const,
  },
  {
    title: "Build the site",
    description:
      "Fast, accessible pages that hold up in the real world. Type, layout, and interaction treated as one craft.",
    tone: "cyan" as const,
  },
  {
    title: "Keep it moving",
    description:
      "New pages, campaigns, and care after launch — so the site stays as sharp as the day it shipped.",
    tone: "violet" as const,
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    body: "What the site has to do, who it is for, and what success looks like. Constraints first, decoration last.",
  },
  {
    step: "02",
    title: "Design",
    body: "A direction you can defend. Type, colour, and layout locked before a single component is built.",
  },
  {
    step: "03",
    title: "Build",
    body: "Production-quality front-end. Motion with a reason. Performance and accessibility as defaults.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Ship it, measure it, and leave you with a site you can actually run — not a file you are afraid to touch.",
  },
];

export const plans: {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  featured: boolean;
  tag?: string;
  cta: string;
  includes: string[];
}[] = [
  {
    id: "launch",
    name: "Launch",
    price: "£2,500",
    cadence: "starting from",
    summary: "A single page that says the thing, then asks for the action.",
    featured: false,
    cta: "Start with Launch",
    includes: [
      "One-page site, designed and built",
      "Messaging pass and information architecture",
      "Responsive layout and core motion",
      "Contact / enquiry path",
      "Launch support",
    ],
  },
  {
    id: "site",
    name: "Site",
    price: "£6,500",
    cadence: "starting from",
    summary: "A full marketing site with room to grow — the default for most clients.",
    featured: true,
    cta: "Start with Site",
    includes: [
      "Multi-page marketing site",
      "Everything in Launch",
      "Custom design system",
      "CMS-ready content structure",
      "Motion and interaction design",
      "Two rounds of revisions",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    price: "£1,500",
    cadence: "per month",
    summary:
      "12 hours a month to iterate, launch pages, and keep the product looking considered.",
    featured: false,
    cta: "Talk about Partner",
    includes: [
      "12 hours of design and build each month",
      "New pages and campaigns",
      "Design and front-end in one place",
      "Priority turnaround",
      "Pause or cancel with 30 days’ notice",
    ],
  },
];

export const quote = {
  text: "The scroll-driven site genuinely feels alive — it has become my best tool for bringing new runners on board.",
  name: "Gijs de Jong",
  role: "Running Coach · Gijs Running",
};

// Drop concept images in /public/concepts and set `image: "/concepts/plumber.jpg"`.
export const audiences: {
  id: "trades" | "creatives" | "finance" | "athletic" | "coffee" | "hair";
  title: string;
  fit: string;
  body: string;
  tone: "grey" | "lime" | "blue" | "cyan" | "violetSoft" | "violet";
  concepts: { label: string; image?: string }[];
}[] = [
  {
    id: "trades",
    title: "Trades",
    fit: "Plumbers, electricians, window cleaners",
    body: "A site that books the next job, not a template with a van photo.",
    tone: "grey",
    concepts: [
      { label: "Plumber" },
      { label: "Electrician" },
      { label: "Window cleaner" },
    ],
  },
  {
    id: "creatives",
    title: "Fun creatives",
    fit: "Studios, makers, photographers",
    body: "A site with the same energy as the work.",
    tone: "lime",
    concepts: [{ label: "Studio" }],
  },
  {
    id: "finance",
    title: "Finance and business",
    fit: "Accountants, consultants, advisors",
    body: "Clear, calm, and easy to trust before the first call.",
    tone: "blue",
    concepts: [
      { label: "Accountant" },
      { label: "Consultant" },
      { label: "Advisor" },
    ],
  },
  {
    id: "athletic",
    title: "Athletic",
    fit: "Coaches, clubs, gyms",
    body: "A site that fills the next session, not a brochure.",
    tone: "cyan",
    concepts: [{ label: "Coach" }],
  },
  {
    id: "coffee",
    title: "Coffee",
    fit: "Cafes, roasters, bars",
    body: "The shop already has a point of view. So should the site.",
    tone: "violetSoft",
    concepts: [{ label: "Cafe" }],
  },
  {
    id: "hair",
    title: "Hairdressers",
    fit: "Salons, barbers, beauty",
    body: "The look is the product. The site has to keep up.",
    tone: "violet",
    concepts: [{ label: "Salon" }],
  },
];

export const work = [
  {
    title: "Elle Vie",
    meta: "Hair & beauty salon",
    image: "/work/ellevie.jpg",
    href: "https://www.elleviebelper.co.uk",
    ratio: "wide" as const,
  },
  {
    title: "Gijs Running",
    meta: "Running coach",
    image: "/work/gijs.jpg",
    href: "https://sammackinley.com",
    ratio: "wide" as const,
  },
  {
    title: "James Agro",
    meta: "Earthworks & transport",
    image: "/work/james.jpg",
    href: "https://james-agro-website.vercel.app",
    ratio: "wide" as const,
  },
  {
    title: "Recipy",
    meta: "Recipe app",
    image: "/work/recipy.jpg",
    href: "https://recipy-henna.vercel.app",
    ratio: "wide" as const,
  },
  {
    title: "Routes2Change",
    meta: "Community wellbeing",
    image: "/work/routes2change.jpg",
    href: "https://www.routes2change.co.uk",
    ratio: "wide" as const,
  },
];

export const faqs = [
  {
    q: "How long does a project take?",
    a: "Launch is typically 3–4 weeks. Site is 6–10, depending on pages and content. Partner is 12 hours a month, scoped as we go.",
  },
  {
    q: "What’s included in revisions?",
    a: "Site includes two structured rounds after the first full pass. Extra rounds or scope changes are quoted before they start — no surprise invoices.",
  },
  {
    q: "Do you write the copy?",
    a: "I will shape structure and headlines with you. If you need full copywriting, we can include it or work with a writer you already trust.",
  },
  {
    q: "How do we start?",
    a: "Email hello@sammackinley.com with a short brief. If it looks like a fit, we book a call, agree the package, and I send a simple proposal.",
  },
  {
    q: "Who owns the site when we finish?",
    a: "You do. Domain and hosting sit in your accounts. I hand over the files so you can keep running the site without me.",
  },
  {
    q: "Will this rank on Google?",
    a: "I build for speed, clear structure, and the terms your clients actually search. I don’t promise page one overnight — I leave you with a site that can be found and improved.",
  },
];

export const nav = [
  { label: "Work", href: "https://sammackinley.com" },
  { label: "Templates", href: "/templates" },
  { label: "Services", href: "#services" },
  { label: "Plans", href: "#plans" },
  { label: "Process", href: "#process" },
];

export const templateKinds = [
  { id: "all", label: "All" },
  { id: "nav", label: "Nav bars" },
  { id: "hero", label: "Hero sections" },
  { id: "footer", label: "Footers" },
] as const;

export const templateNotes: Record<
  string,
  { title?: string; kind?: "nav" | "hero" | "footer"; summary?: string }
> = {
  "nav-bar": {
    title: "Storefront nav",
    kind: "nav",
    summary:
      "Transparent over the hero, solid on scroll. Mega menus on desktop, a drawer on the phone.",
  },
};

export const notFound = {
  ledeLine1: "This URL took a wrong turn.",
  ledeLine2: "The studio did not.",
  lookedFor: "Looked for",
  home: "Take me home",
  work: "See the work",
};
