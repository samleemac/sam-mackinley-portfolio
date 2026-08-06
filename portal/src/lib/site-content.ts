export type Service = {
  name: string;
  /** Intentional round GBP/EUR pair (~£1 ≈ €1.17), not live FX. */
  priceGbp: string;
  priceEur: string;
  /** Which currency leads on the card — usually the one you anchored the offer on. */
  lead: "gbp" | "eur";
  tagline: string;
  includes: string[];
  bestFor: string;
};

// Dual prices are fixed, rounded figures — not live FX. Kept within ~£1 ≈ €1.17
// so UK and eurozone clients see essentially the same offer.
export const SERVICES: Service[] = [
  {
    name: "Starter site",
    priceGbp: "from £429",
    priceEur: "from €499",
    lead: "eur",
    tagline: "A basic content website built from your design and copy — clean, fast, and ready for enquiries.",
    bestFor: "Anyone with a design and content ready to go live",
    includes: [
      "Basic content website, up to 15 pages",
      "Built from your design and content",
      "Mobile-optimised responsive build",
      "Contact form to your inbox",
      "Basic SEO setup",
      "3 rounds of revisions",
    ],
  },
  {
    name: "Business site",
    priceGbp: "from £1,099",
    priceEur: "from €1,299",
    lead: "eur",
    tagline: "I design and build a multi-page site shaped around your services, so it can be found, read, and acted on.",
    bestFor: "Businesses that want design and build handled together",
    includes: [
      "Custom design system, not a template",
      "Multi-page structure around your services",
      "Copy shaping from your notes",
      "On-page SEO and page-speed pass",
      "Editable content areas",
      "Portal access for change requests",
      "3 rounds of revisions",
    ],
  },
  {
    name: "Web app",
    priceGbp: "from £2,499",
    priceEur: "from €2,899",
    lead: "eur",
    tagline: "Sign-ups, logins, dashboards and databases — scoped to what the product actually needs to do.",
    bestFor: "Client portals, memberships, tools and anything with accounts",
    includes: [
      "User sign-up and login",
      "Protected areas and roles",
      "Database-backed content or records",
      "Admin or client-facing dashboards",
      "Secure hosting and environment setup",
      "Scoped quote before we start",
    ],
  },
  {
    name: "Care plan",
    priceGbp: "£49 / month",
    priceEur: "€57 / month",
    lead: "gbp",
    tagline: "Ongoing changes handled through the portal, no chasing needed.",
    bestFor: "Anyone who wants their site to keep moving",
    includes: [
      "Unlimited small change requests",
      "Up to 3 hours of build work each month",
      "Priority queue in the client portal",
      "Uptime and backup monitoring",
      "Quarterly performance report",
      "Cancel any time",
    ],
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Brief",
    body: "You tell me about the business, the customer and what the site has to do. 30 minutes on a call is usually enough.",
  },
  {
    step: "02",
    title: "Shape",
    body: "I map the pages and the order of the argument, then write the structure back to you before any design happens.",
  },
  {
    step: "03",
    title: "Design & build",
    body: "Design and build happen together so what you approve is what ships. You see it on a real URL early.",
  },
  {
    step: "04",
    title: "Launch & look after",
    body: "I handle the launch, then you get portal access so future changes are a request, not an email chain.",
  },
];

export const BOOKING_URL = "https://cal.com/sammackinley/intro";

export const FAQS = [
  {
    q: "How long does a site take?",
    a: "A starter site is usually one to two weeks once your design and content are ready. A business site is four to six weeks. Web apps are scoped per project.",
  },
  {
    q: "What’s the difference between a site and a web app?",
    a: "A site is pages of content people read and contact you from. A web app is when people create accounts, log in, save data, or manage things behind a dashboard. That needs a database and proper security, so it’s priced and scoped on its own.",
  },
  {
    q: "Do I own the site?",
    a: "Yes. On final payment the site, the code and the domain are yours. There is no lock-in and no licence to keep paying.",
  },
  {
    q: "What do you need from me?",
    a: "For a starter site: your finished design and the content for each page. For a business site: notes, brand assets and one decision-maker for feedback — I can shape the rest.",
  },
  {
    q: "What happens after launch?",
    a: "You get a client portal login. Any change you want, you raise a request, attach photos or documents, and track it through to done.",
  },
  {
    q: "Can you work with a site I already have?",
    a: "Often, yes. If it is a reasonable platform I will improve it. If it is fighting you, I will say so and quote a rebuild instead.",
  },
];
