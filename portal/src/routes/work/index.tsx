import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { listCaseStudies } from "@/lib/public.functions";

const workQuery = queryOptions({
  queryKey: ["case-studies"],
  queryFn: () => listCaseStudies(),
});

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Case studies — Sam Mackinley web design" },
      {
        name: "description",
        content:
          "Websites built for small businesses: the brief, what was made, and what changed afterwards.",
      },
      { property: "og:title", content: "Case studies — Sam Mackinley web design" },
      {
        property: "og:description",
        content: "The brief, the build and the outcome for recent web design projects.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(workQuery),
  component: WorkIndex,
  errorComponent: ({ error }) => (
    <div className="p-10 text-sm text-muted-foreground">{error.message}</div>
  ),
});

function WorkIndex() {
  const { data: work } = useSuspenseQuery(workQuery);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-20">
        <h1 className="max-w-2xl text-4xl sm:text-5xl">Case studies</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Each one covers the same three things: what the business needed, what I built, and what it
          changed once it was live.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {work.map((item) => (
            <Link
              key={item.id}
              to="/work/$slug"
              params={{ slug: item.slug }}
              className="group block"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
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
              <div className="mt-5">
                <h2 className="text-xl group-hover:text-ochre">{item.title}</h2>
                {item.client_name && (
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {item.client_name}
                  </p>
                )}
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.summary}</p>
                {item.tags && item.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          ))}
          {work.length === 0 && (
            <p className="text-muted-foreground">Case studies are being written up — check back.</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
