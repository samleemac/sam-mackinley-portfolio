export type Service = {
  name: string;
  price: string;
  tagline: string;
  includes: string[];
  bestFor: string;
};

export const SERVICES: Service[] = [
  {
    name: "Starter site",
    price: "from £950",
    tagline: "A sharp one-page site that explains what you do and gets you enquiries.",
    bestFor: "Sole traders and new businesses",
    includes: [
      "Up to 5 sections on one page",
      "Copy shaping from your notes",
      "Mobile-first responsive build",
      "Contact form to your inbox",
      "Basic search setup and analytics",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Business site",
    price: "from £2,400",
    tagline: "A multi-page site built to be found, read, and acted on.",
    bestFor: "Established businesses with several services",
    includes: [
      "Up to 8 pages",
      "Custom design system, not a template",
      "Services, case study and contact structure",
      "On-page SEO and page-speed pass",
      "Editable content areas",
      "Portal access for change requests",
      "3 rounds of revisions",
    ],
  },
  {
    name: "Care plan",
    price: "£95 / month",
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
    a: "A starter site is usually two weeks from brief to launch. A business site is four to six weeks, depending on how quickly content comes back.",
  },
  {
    q: "Do I own the site?",
    a: "Yes. On final payment the site, the code and the domain are yours. There is no lock-in and no licence to keep paying.",
  },
  {
    q: "What do you need from me?",
    a: "Your existing copy or notes, any brand assets you have, and one decision-maker who can give feedback. I can write and source the rest.",
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
