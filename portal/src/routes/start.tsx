import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEnquiry } from "@/lib/public.functions";
import { BOOKING_URL } from "@/lib/site-content";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a project — Sam Mackinley web design" },
      {
        name: "description",
        content:
          "Tell me about your business and what the website needs to do. I'll reply with scope, price and timing, usually within a working day.",
      },
      { property: "og:title", content: "Start a project — Sam Mackinley web design" },
      {
        property: "og:description",
        content: "Send a few details about your project and get an honest read on scope and price.",
      },
    ],
  }),
  component: Start,
});

function Start() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await submitEnquiry({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          budget_range: String(form.get("budget_range") ?? ""),
          timeline: String(form.get("timeline") ?? ""),
          message: String(form.get("message") ?? ""),
        },
      });
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send that — please try again");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h1 className="text-4xl sm:text-5xl">Start a project</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A few lines is plenty. What the business does, what the site needs to achieve, and
            roughly when you'd like it live. I'll come back with scope, a fixed price and a date.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>— Reply usually within one working day</li>
            <li>— No obligation and no sales sequence</li>
            <li>— Happy to say if I'm not the right fit</li>
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer to talk?{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Book a 20-minute call
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Already a client?{" "}
            <Link to="/auth" className="underline underline-offset-4 hover:text-foreground">
              Log in to the portal
            </Link>
            .
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-7">
          {sent ? (
            <div className="py-10 text-center">
              <h2 className="text-2xl">Thanks — that's with me</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                I'll read it properly and reply to the email address you gave, usually within a
                working day.
              </p>
              <div className="mt-7">
                <Button asChild variant="outline">
                  <Link to="/work">Have a look at the work</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" required maxLength={120} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Business name</Label>
                <Input id="company" name="company" maxLength={160} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="budget_range">Rough budget</Label>
                  <Input id="budget_range" name="budget_range" placeholder="e.g. £500–1.5k / €600–1.8k" maxLength={80} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timeline">Timing</Label>
                  <Input id="timeline" name="timeline" placeholder="e.g. next month" maxLength={80} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">What do you need?</Label>
                <Textarea id="message" name="message" required rows={7} maxLength={4000} />
              </div>
              <Button type="submit" size="lg" disabled={busy}>
                {busy ? "Sending…" : "Send enquiry"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
