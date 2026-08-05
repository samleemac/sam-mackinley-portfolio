import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Client Portal — Coming Soon | Sam Mackinley" },
      {
        name: "description",
        content: "Sam Mackinley's client portal is currently being prepared.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary/40 px-5 py-12">
      <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-ochre/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <section className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-ochre">
          Client portal
        </p>
        <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">A little polish, then we’re open.</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground">
          The client portal is still getting its finishing touches: one tidy place for requests,
          files, and keeping website changes moving. Check back soon.
        </p>
        <Button asChild size="lg" className="mt-9">
          <a href="https://sammackinley.com/">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Sam’s website
          </a>
        </Button>
        <p className="mt-8 text-sm text-muted-foreground">
          Already a client?{" "}
          <Link to="/auth" className="underline underline-offset-4 hover:text-foreground">
            Log in here
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
