import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BOOKING_URL, FAQS, PROCESS, SERVICES } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & pricing — Sam Mackinley web design" },
      {
        name: "description",
        content:
          "Fixed-price website design and build from £499 / €579, plus a £49 / €57 a month care plan with unlimited change requests through the client portal.",
      },
      { property: "og:title", content: "Services & pricing — Sam Mackinley web design" },
      {
        property: "og:description",
        content: "Fixed-price web design packages and an ongoing care plan for small businesses.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-2xl text-4xl sm:text-5xl">Services &amp; pricing</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Everything is quoted as a fixed price before we start — in pounds or euros, roughly
            matched so UK and Europe pay the same. You'll know the scope, the number of revision
            rounds and the date it goes live.
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="flex flex-col rounded-lg border border-border bg-card p-7"
              >
                <h2 className="text-2xl">{s.name}</h2>
                <p className="mt-2 display text-3xl leading-none text-ochre">{s.priceGbp}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{s.priceEur}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.tagline}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Best for: {s.bestFor}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {s.includes.map((i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  <Button asChild className="w-full">
                    <Link to="/start">Enquire about {s.name.toLowerCase()}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-3xl">How a project runs</h2>
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

        <section className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="text-3xl">Questions I get asked</h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-14 rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="text-2xl">Not sure which one fits?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Book a short call, or send the details and I'll tell you honestly what I'd recommend.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/start">Send the details</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book a call
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
