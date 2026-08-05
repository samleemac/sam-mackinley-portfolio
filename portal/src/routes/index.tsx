import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { listCaseStudies } from "@/lib/public.functions";
import { BOOKING_URL, PROCESS, SERVICES } from "@/lib/site-content";

const workQuery = queryOptions({
  queryKey: ["case-studies"],
  queryFn: () => listCaseStudies(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sam Mackinley — Web Design for Small Businesses" },
      {
        name: "description",
        content:
          "Websites that explain what you do and bring in enquiries. Clear structure, fast pages, and a client portal for ongoing changes.",
      },
      { property: "og:title", content: "Sam Mackinley — Web Design for Small Businesses" },
      {
        property: "og:description",
        content:
          "Websites that explain what you do and bring in enquiries, plus a client portal for ongoing changes.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(workQuery),
  component: Home,
  errorComponent: ({ error }) => (
    <div className="p-10 text-sm text-muted-foreground">{error.message}</div>
  ),
});

function Home() {
  const { data: work } = useSuspenseQuery(workQuery);
  const featured = work.slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ochre">
            Web design &amp; build — UK
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            A website that explains what you do, and a proper way to keep changing it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I design and build sites for small businesses who need to be understood quickly. Every
            project ships with a client portal, so the second you want something changed you raise a
            request instead of writing an email and hoping.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/start">
                Start a project <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/work">See the work</Link>
            </Button>
            <Link
              to="/auth"
              className="ml-1 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Existing client? Log in
            </Link>
          </div>

          <dl className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
            {[
              { k: "2–6 weeks", v: "From brief to live, depending on size." },
              { k: "Fixed price", v: "Quoted up front. No hourly surprises." },
              { k: "You own it", v: "Code, content and domain are yours." },
            ].map((item) => (
              <div key={item.k}>
                <dt className="display text-2xl">{item.k}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Who it's for */}
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-2xl sm:text-3xl">Built for businesses that sell on trust</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  t: "Trades & services",
                  b: "Show the work, the area you cover and how to book you — in that order.",
                },
                {
                  t: "Clinics & practices",
                  b: "Treatments, pricing and practitioners laid out so nobody has to phone to ask.",
                },
                {
                  t: "Studios & consultants",
                  b: "Case studies that read like proof rather than a slideshow.",
                },
                {
                  t: "Shops & venues",
                  b: "Opening hours, location and menu findable in one tap on a phone.",
                },
              ].map((c) => (
                <div key={c.t}>
                  <h3 className="text-lg">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl">Selected work</h2>
            <Link
              to="/work"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              All case studies
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <Link
                key={item.id}
                to="/work/$slug"
                params={{ slug: item.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                  {item.cover_image_url ? (
                    <img
                      src={item.cover_image_url}
                      alt={`${item.title} website design`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      {item.title}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-lg group-hover:text-ochre">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              </Link>
            ))}
            {featured.length === 0 && (
              <p className="text-sm text-muted-foreground">Case studies coming shortly.</p>
            )}
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-2xl sm:text-3xl">How a project runs</h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
                <div key={p.step} className="border-t border-foreground/20 pt-5">
                  <span className="display text-sm text-ochre">{p.step}</span>
                  <h3 className="mt-2 text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl">What it costs</h2>
            <Link
              to="/services"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Full detail
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.name} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl">{s.name}</h3>
                <p className="mt-1 display text-2xl text-ochre">{s.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                <ul className="mt-5 space-y-2">
                  {s.includes.slice(0, 4).map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Portal explainer */}
        <section className="border-t border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
                For existing clients
              </p>
              <h2 className="mt-5 text-3xl">Changes go through the portal</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/75">
                Log in, pick your site, describe the change and attach the photos or documents. You
                can see exactly where every request is: new, in progress, waiting on you, or done.
                Nothing gets lost in a thread.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/auth">Client login</Link>
                </Button>
              </div>
            </div>
            <ul className="grid gap-4 self-center">
              {[
                "One login, all of your websites",
                "Requests with photos, PDFs and documents attached",
                "Status you can actually see, not chase",
                "A comment thread per request, kept with the request",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-primary-foreground/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-ochre" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl">Got something that needs building?</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Tell me about it in a few lines. I'll come back with an honest read on scope, price and
            timing — usually within a working day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/start">Start a project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                Book a call
              </a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
