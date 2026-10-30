export const site = {
  name: "Sam MacKinley",
  shortName: "Sam.",
  title: "Sam MacKinley — Web design, built to ship",
  description:
    "Websites for owner-operators and independent businesses that have outgrown a template. Designed and built by one person, from first sketch to launch.",
  portfolioUrl: "https://sammackinley.com",
  contactEmail: "samleemac@outlook.com",
};

export const hero = {
  titleLine1: "Sites that look sharp.",
  titleLine2: "Built to work hard.",
  lede: "For owner-operators and independent businesses who have outgrown DIY. One designer, not a junior team.",
  // One tap answers the brief's first question (/contact?for=<id>).
  ask: "I run a…",
  starts: [
    { for: "hair", label: "Salon" },
    { for: "trades", label: "Trade business" },
    { for: "coffee", label: "Café" },
    { for: "athletic", label: "Gym or coaching" },
    { for: "finance", label: "Advisory firm" },
    { for: "creatives", label: "Creative studio" },
  ],
  other: "Something else",
  ctaHref: "/contact",
  workLink: "See the work",
  // Real client sites shown in the hero stack, by title from `work`.
  showcase: ["Elle Vie", "Gijs Running", "James Agro", "Routes2Change"],
  proof: "One designer, first sketch to launch. 8+ years, 20+ projects.",
};

export const services: {
  id: string;
  title: string;
  promise: string;
  includes: string[];
  plans: string[];
  work: string;
  proof: string;
}[] = [
  {
    id: "found",
    title: "Gets you found",
    promise:
      "Pages built around what your clients actually search for, fast enough that nobody gives up waiting.",
    includes: [
      "Page structure planned around real search terms",
      "Fast, accessible build that holds up on a phone signal",
      "Analytics in place from launch day",
    ],
    plans: ["Launch", "Site"],
    work: "James Agro",
    proof: "Services, areas and a quote button within one scroll.",
  },
  {
    id: "booked",
    title: "Turns visits into bookings",
    promise:
      "Every page leads somewhere. One clear next step — book, call, ask for a quote — never buried under the brochure.",
    includes: [
      "Messaging pass so the first screen says the thing",
      "One obvious action per page",
      "Booking, enquiry or quote path that works on the first tap",
    ],
    plans: ["Launch", "Site"],
    work: "Elle Vie",
    proof: "Make a reservation is the first thing you can do.",
  },
  {
    id: "you",
    title: "Looks like you, not a template",
    promise:
      "Type, colour and layout drawn from your business, so the site feels like walking through your door.",
    includes: [
      "A visual system built for your brand",
      "Motion only where it helps",
      "Photography and copy direction",
    ],
    plans: ["Site"],
    work: "Gijs Running",
    proof: "Built to feel like a run, not a page about running.",
  },
  {
    id: "lasts",
    title: "Keeps working after launch",
    promise:
      "You own it, you can run it, and when you need a new page or a campaign, it slots in without starting over.",
    includes: [
      "Domain and hosting in your name",
      "A handover so you can make edits yourself",
      "New pages and campaigns on the Partner plan",
    ],
    plans: ["Site", "Partner"],
    work: "Routes2Change",
    proof: "“Nothing ever seemed too much trouble.” — Paula Dawson",
  },
];

// #process — a planner, not a list. Durations match the FAQ: Launch is
// typically 3–4 weeks, Site 6–10. `weeks` per stage drive the timeline bar
// (a typical project); `range` drives the "live between" dates.
export const process = {
  stages: [
    {
      id: "discover",
      title: "Discover",
      sam: "Learn the business, the customers and what the site has to win.",
      you: "One kickoff call, and any logins, logos or photos you already have.",
      get: "A one-page plan: pages, the one action each asks for, and the date.",
    },
    {
      id: "design",
      title: "Design",
      sam: "Design the key pages so you see the real thing, not a mood board.",
      you: "Look at the designs and send your notes.",
      get: "Designs you have signed off before any building starts.",
    },
    {
      id: "build",
      title: "Build",
      sam: "Build it for real: fast, works on phones, ready for search.",
      you: "Send final words and photos. Click around the preview link.",
      get: "A working site on a private link you can share with anyone.",
    },
    {
      id: "launch",
      title: "Launch",
      sam: "Put it live on your domain and check every page and form.",
      you: "Say go.",
      get: "Your site live, in your name, with a walkthrough of how to edit it.",
    },
  ],
  plans: {
    launch: {
      label: "Launch",
      weeks: [0.5, 1, 1.5, 0.5],
      range: [3, 4],
      what: "One page that says what you do and asks for the booking. Right if you need to look credible and get enquiries, fast.",
    },
    site: {
      label: "Site",
      weeks: [1, 2, 4, 1],
      range: [6, 10],
      what: "A full site: several pages, a look built for your brand, and room to add more later. Right for most businesses.",
    },
  },
  partnerNote: "On Partner? It’s 12 hours a month, scoped as we go — no start line to wait for.",
};

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

export const testimonial = {
  name: "Paula Dawson",
  role: "Routes 2 Change CIC",
  paragraphs: [
    "We absolutely loved working with Sam to create our website. He understood our brand so quickly, even though we only had a few ideas to start with. I showed him two websites that we liked the style of, and from those minimal ideas he was able to create a template that was pretty much spot on straight away.",
    "Sam was brilliant throughout the whole process. He was really responsive to our ideas and changes, and nothing ever seemed too much trouble. He was also able to give us helpful advice about current website practices, which was particularly useful as we didn’t always know what we should be asking for.",
    "What we appreciated most was Sam’s calm and patient approach. He made the whole process feel easy and never made us feel like we needed to know more than we did. I would happily recommend Sam to anyone looking for a website, especially if you’re someone who needs a bit of extra guidance and reassurance along the way. He really took the time to understand what we wanted and brought our ideas to life better than we could have done ourselves.",
  ],
};

// "Who I'm good for": pick a line of business, the section takes on that
// trade's colours and shows sites built for businesses like it.
// `brief` is the /contact?for= id (omit to open the brief blank).
// `kind`: "Client site" for live client work, "New build" for concepts and
// sites waiting to launch.
export const audiences: {
  id: string;
  label: string;
  title: string;
  fit: string;
  brief?: string;
  cta: string;
  theme: { bg: string; ink: string; accent: string; accentInk: string };
  needs: [string, string, string];
  examples: {
    title: string;
    meta: string;
    kind: "Client site" | "New build";
    image: string;
    href: string;
  }[];
}[] = [
  {
    id: "hair",
    label: "Salons",
    title: "Salons & beauty",
    fit: "Hairdressers, barbers, beauty rooms",
    brief: "hair",
    cta: "Start a salon brief",
    theme: { bg: "#f1e8dd", ink: "#2b1d1a", accent: "#a8834a", accentInk: "#ffffff" },
    needs: [
      "Booking is the first thing anyone can do",
      "Treatments and prices that are easy to find",
      "Photos that look like your chair, not stock",
    ],
    examples: [
      {
        title: "Elle Vie",
        meta: "Hair & beauty salon",
        kind: "Client site",
        image: "/work/ellevie.jpg",
        href: "https://www.elleviebelper.co.uk",
      },
    ],
  },
  {
    id: "trades",
    label: "Trades",
    title: "Trades & contractors",
    fit: "Builders, plumbers, groundworks, transport",
    brief: "trades",
    cta: "Start a trades brief",
    theme: { bg: "#16191d", ink: "#f4f2ee", accent: "#f2b705", accentInk: "#16191d" },
    needs: [
      "A quote button on every screen",
      "Services and the areas you cover, clearly",
      "Proof up front: projects, years, reviews",
    ],
    examples: [
      {
        title: "James Agro",
        meta: "Earthworks & transport",
        kind: "Client site",
        image: "/work/james.jpg",
        href: "https://james-agro-website.vercel.app",
      },
    ],
  },
  {
    id: "coffee",
    label: "Cafés",
    title: "Cafés & food",
    fit: "Coffee shops, matcha bars, roasters",
    brief: "coffee",
    cta: "Start a café brief",
    theme: { bg: "#2c4426", ink: "#f3f1e4", accent: "#b9d36a", accentInk: "#1c2b18" },
    needs: [
      "Menu, hours and map in one tap",
      "Order ahead or shop beans online",
      "A look as distinctive as the counter",
    ],
    examples: [
      {
        title: "Yoyogi",
        meta: "Matcha house, Madrid",
        kind: "New build",
        image: "/work/yoyogi.jpg",
        href: "https://yoyogimadrid.vercel.app",
      },
    ],
  },
  {
    id: "athletic",
    label: "Coaches",
    title: "Coaches, clubs & trips",
    fit: "Running coaches, gyms, outdoor guides",
    brief: "athletic",
    cta: "Start a coaching brief",
    theme: { bg: "#111311", ink: "#f2f0ea", accent: "#ff5a36", accentInk: "#111311" },
    needs: [
      "Sessions and dates people can book",
      "Stories that sell the feeling, not the kit",
      "A first session that’s easy to claim",
    ],
    examples: [
      {
        title: "Gijs Running",
        meta: "Running coach",
        kind: "Client site",
        image: "/work/gijs.jpg",
        href: "https://sammackinley.com",
      },
      {
        title: "TORC",
        meta: "Small-group hiking & trail trips",
        kind: "New build",
        image: "/work/torc.jpg",
        href: "https://torc-website-umber.vercel.app",
      },
    ],
  },
  {
    id: "creatives",
    label: "Creatives",
    title: "Creatives & freelancers",
    fit: "Photographers, coaches, makers",
    brief: "creatives",
    cta: "Start a creative brief",
    theme: { bg: "#f4ede4", ink: "#1e1b18", accent: "#1e1b18", accentInk: "#f4ede4" },
    needs: [
      "Work that loads fast and looks huge",
      "A clear route for each thing you offer",
      "Commissions without the back-and-forth",
    ],
    examples: [
      {
        title: "Wrangle & Bloom",
        meta: "Equine coaching & photography",
        kind: "New build",
        image: "/work/wrangle.jpg",
        href: "https://wrangle-and-bloom-website.vercel.app/index.html",
      },
    ],
  },
  {
    id: "community",
    label: "Charities",
    title: "Charities & community",
    fit: "CICs, sanctuaries, support services",
    cta: "Start a community brief",
    theme: { bg: "#e9ede3", ink: "#173a2a", accent: "#173a2a", accentInk: "#e9ede3" },
    needs: [
      "Your mission understood in one screen",
      "Donate, volunteer or get support, clearly signposted",
      "Easy for your team to keep up to date",
    ],
    examples: [
      {
        title: "Routes2Change",
        meta: "Community wellbeing CIC",
        kind: "Client site",
        image: "/work/routes2change.jpg",
        href: "https://www.routes2change.co.uk",
      },
      {
        title: "Faye Ranch",
        meta: "Equine sanctuary & hoof care",
        kind: "New build",
        image: "/work/faye.jpg",
        href: "https://fayeranch.com",
      },
    ],
  },
];


// Client work. `live` sites are embedded and usable in the Work section;
// `for` is the audience id the "I want one like this" button pre-picks
// in the brief (omit for a plain /contact).
export const work: {
  title: string;
  meta: string;
  image: string;
  href: string;
  live: boolean;
  for?: string;
  note: string;
}[] = [
  {
    title: "Elle Vie",
    meta: "Hair & beauty salon",
    image: "/work/ellevie.jpg",
    href: "https://www.elleviebelper.co.uk",
    live: true,
    for: "hair",
    note: "A calm, premium front door for a local salon. Make a reservation is the first thing you can do.",
  },
  {
    title: "James Agro",
    meta: "Earthworks & transport",
    image: "/work/james.jpg",
    href: "https://james-agro-website.vercel.app",
    live: true,
    for: "trades",
    note: "Services, areas and a quote button within one scroll, in two languages.",
  },
  {
    title: "Gijs Running",
    meta: "Running coach",
    image: "/work/gijs.jpg",
    href: "https://sammackinley.com",
    live: false,
    for: "athletic",
    note: "A scroll-driven site that feels like a run, built to bring new runners on board.",
  },
  {
    title: "Routes2Change",
    meta: "Community wellbeing",
    image: "/work/routes2change.jpg",
    href: "https://www.routes2change.co.uk",
    live: true,
    note: "A warm, clear multi-page site for a community interest company, built from two reference sites and a few ideas.",
  },
  {
    title: "Recipy",
    meta: "Recipe app",
    image: "/work/recipy.jpg",
    href: "https://recipy-henna.vercel.app",
    live: true,
    note: "A recipe library you can search, filter and cook from, designed like a magazine.",
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
    a: "Tap through the short brief on the Start a project page — it takes a minute — or email samleemac@outlook.com. If it looks like a fit, we book a call, agree the package, and I send a simple proposal.",
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

// The /contact brief: every tap writes one line of the enquiry.
// Plan cards link to /contact?plan=<id>, audience cards to /contact?for=<id>.
export const brief = {
  title: "Start a project",
  lede: "Four taps and a name. Your brief writes itself as you go — no blank box, no jargon.",
  questions: {
    business: {
      label: "What kind of business?",
      options: [
        { id: "trades", label: "Trades", phrase: "a trades business" },
        { id: "creatives", label: "Creative studio", phrase: "a creative studio" },
        { id: "finance", label: "Finance or consulting", phrase: "a finance or consulting firm" },
        { id: "athletic", label: "Coach, club or gym", phrase: "a coaching or fitness business" },
        { id: "coffee", label: "Cafe or roaster", phrase: "a cafe" },
        { id: "hair", label: "Salon or barber", phrase: "a salon" },
        { id: "other", label: "Something else", phrase: "an independent business" },
      ],
    },
    plan: {
      label: "What do you need?",
      options: [
        { id: "launch", label: "One sharp page", phrase: "one sharp page that asks for the action", price: "£2,500", time: "typically 3–4 weeks" },
        { id: "site", label: "A full site", phrase: "a full marketing site with room to grow", price: "£6,500", time: "typically 6–10 weeks" },
        { id: "partner", label: "Ongoing help", phrase: "ongoing design and build each month", price: "£1,500/mo", time: "12 hours a month" },
        { id: "unsure", label: "Not sure yet", phrase: "help working out what I need", price: "", time: "" },
      ],
    },
    current: {
      label: "Where’s your site now?",
      options: [
        { id: "none", label: "No site yet", phrase: "Right now I don’t have a site." },
        { id: "diy", label: "DIY builder", phrase: "Right now it’s on a DIY builder I’ve outgrown." },
        { id: "tired", label: "Have one, it’s tired", phrase: "Right now I have a site, but it’s tired." },
      ],
    },
    timing: {
      label: "When do you want to start?",
      options: [
        { id: "asap", label: "As soon as possible", phrase: "as soon as possible" },
        { id: "soon", label: "In the next few months", phrase: "in the next few months" },
        { id: "exploring", label: "Just exploring", phrase: "whenever it makes sense — I’m exploring" },
      ],
    },
  },
  next: [
    "I read every brief myself.",
    "If it’s a fit, we book a short call.",
    "You get a simple proposal with a fixed scope.",
  ],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Plans", href: "#plans" },
  { label: "Process", href: "#process" },
  { label: "Templates", href: "/templates" },
  { label: "Portfolio", href: site.portfolioUrl },
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

// "Make it yours" on /templates: each look re-skins the live template via its
// CSS variables and rewrites the nav in that trade's voice. `for` matches an
// audience id so "Build my site from this" pre-fills the brief.
export type TemplateLook = {
  id: string;
  label: string;
  for?: string;
  sample: string;
  swatch: [string, string, string];
  vars: Record<string, string>;
  fonts?: string; // Google Fonts css2 family query
  logoFont?: string;
  nav?: [string, string, string, string];
  announce?: [string, string, string];
  action?: string;
  hero?: string; // CSS background for the demo hero (kept dark: the nav sits light over it)
  headline?: string;
};

export const templateLooks: TemplateLook[] = [
  {
    id: "original",
    label: "Original",
    sample: "Brand",
    swatch: ["#ffffff", "#f4f2ee", "#1c1c1a"],
    vars: {},
  },
  {
    id: "salon",
    label: "Salon",
    for: "hair",
    sample: "Lumen Hair",
    swatch: ["#fbf6f3", "#f1e2da", "#2b1d1a"],
    vars: {
      "--c-ink": "#2b1d1a",
      "--c-ink-soft": "#7d655d",
      "--c-paper": "#fbf6f3",
      "--c-cream": "#f1e2da",
      "--c-bar": "#2b1d1a",
      "--c-bar-text": "#f1e2da",
      "--c-rule": "rgba(43,29,26,0.12)",
      "--c-placeholder": "#e6d1c6",
      "--font-sans": '"DM Sans", system-ui, sans-serif',
    },
    fonts: "family=Fraunces:opsz,wght@9..144,500&family=DM+Sans:wght@400;500",
    logoFont: '"Fraunces", Georgia, serif',
    nav: ["Book.", "Treatments.", "Our team.", "About."],
    announce: [
      "New clients: 20% off your first cut.",
      "Late opening Thursdays until 8pm.",
      "Gift vouchers, sent by email.",
    ],
    action: "Book a chair",
    hero: "radial-gradient(120% 90% at 80% 10%, #9a6553 0%, #4a2c25 48%, #2b1d1a 100%)",
    headline: "Hair that still looks good on Monday morning.",
  },
  {
    id: "trades",
    label: "Trades",
    for: "trades",
    sample: "Hartley & Sons",
    swatch: ["#ffffff", "#ffcc00", "#0f1b2d"],
    vars: {
      "--c-ink": "#0f1b2d",
      "--c-ink-soft": "#566274",
      "--c-paper": "#ffffff",
      "--c-cream": "#eef1f5",
      "--c-bar": "#ffcc00",
      "--c-bar-text": "#0f1b2d",
      "--c-rule": "rgba(15,27,45,0.14)",
      "--c-placeholder": "#dde3ea",
      "--font-sans": '"Archivo", system-ui, sans-serif',
    },
    fonts: "family=Archivo:wght@400;500;800",
    logoFont: '"Archivo", system-ui, sans-serif',
    nav: ["Services.", "Areas.", "Reviews.", "About."],
    announce: [
      "Free quotes within 24 hours.",
      "Fully insured. Every job guaranteed.",
      "Emergency call-outs, 7 days a week.",
    ],
    action: "Get a quote",
    hero: "radial-gradient(110% 90% at 85% 10%, #2c4a74 0%, #0f1b2d 60%)",
    headline: "Fixed right, first time. Quoted before we start.",
  },
  {
    id: "cafe",
    label: "Café",
    for: "coffee",
    sample: "Ember Coffee",
    swatch: ["#f7f1e8", "#ede3d3", "#2a1a12"],
    vars: {
      "--c-ink": "#2a1a12",
      "--c-ink-soft": "#7a6250",
      "--c-paper": "#f7f1e8",
      "--c-cream": "#ede3d3",
      "--c-bar": "#b4552d",
      "--c-bar-text": "#f7f1e8",
      "--c-rule": "rgba(42,26,18,0.14)",
      "--c-placeholder": "#e0d2bd",
    },
    fonts: "family=DM+Serif+Display",
    logoFont: '"DM Serif Display", Georgia, serif',
    nav: ["Menu.", "Beans.", "Visit us.", "Story."],
    announce: [
      "This week's single origin: Huila, Colombia.",
      "Open from 7am, every day.",
      "Subscriptions ship on Mondays.",
    ],
    action: "Order ahead",
    hero: "radial-gradient(120% 90% at 15% 10%, #b4552d 0%, #5a2e1b 50%, #2a1a12 100%)",
    headline: "Slow mornings, served fast.",
  },
  {
    id: "coach",
    label: "Coach",
    for: "athletic",
    sample: "Northline Coaching",
    swatch: ["#ffffff", "#d7ff3a", "#0b0b0b"],
    vars: {
      "--c-ink": "#0b0b0b",
      "--c-ink-soft": "#5c5c5c",
      "--c-paper": "#ffffff",
      "--c-cream": "#f2f2ee",
      "--c-bar": "#0b0b0b",
      "--c-bar-text": "#d7ff3a",
      "--c-rule": "rgba(11,11,11,0.12)",
      "--c-placeholder": "#e4e4de",
      "--font-sans": '"Space Grotesk", system-ui, sans-serif',
    },
    fonts: "family=Space+Grotesk:wght@400;500;700",
    logoFont: '"Space Grotesk", system-ui, sans-serif',
    nav: ["Programmes.", "Results.", "Coaches.", "About."],
    announce: [
      "Spring 10k block starts 3 March.",
      "First session free, no catch.",
      "Small groups. Max eight per coach.",
    ],
    action: "Book a session",
    hero: "radial-gradient(90% 70% at 85% 15%, #5f7012 0%, #1a1a1a 55%, #0b0b0b 100%)",
    headline: "Run further than you think you can.",
  },
  {
    id: "advisor",
    label: "Advisor",
    for: "finance",
    sample: "Calder Advisory",
    swatch: ["#fbfaf6", "#e7ece5", "#13322b"],
    vars: {
      "--c-ink": "#13322b",
      "--c-ink-soft": "#5d6f69",
      "--c-paper": "#fbfaf6",
      "--c-cream": "#e7ece5",
      "--c-bar": "#13322b",
      "--c-bar-text": "#e7ece5",
      "--c-rule": "rgba(19,50,43,0.12)",
      "--c-placeholder": "#d9e1d8",
    },
    fonts: "family=Newsreader:opsz,wght@6..72,500",
    logoFont: '"Newsreader", Georgia, serif',
    nav: ["Services.", "Who we help.", "Insights.", "About."],
    announce: [
      "Self-assessment deadline: 31 January.",
      "Fixed fees, agreed up front.",
      "Chartered and regulated.",
    ],
    action: "Book a call",
    hero: "radial-gradient(120% 90% at 80% 0%, #2d5a4e 0%, #13322b 60%, #0c211c 100%)",
    headline: "Your numbers, made calm.",
  },
];

export const notFound = {
  ledeLine1: "This URL took a wrong turn.",
  ledeLine2: "The studio did not.",
  lookedFor: "Looked for",
  home: "Take me home",
  work: "See the work",
};
