import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { getCaseStudy } from "@/lib/public.functions";

const studyQuery = (slug: string) =>
  queryOptions({
    queryKey: ["case-study", slug],
    queryFn: () => getCaseStudy({ data: { slug } }),
  });

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ context, params }) => {
    const study = await context.queryClient.ensureQueryData(studyQuery(params.slug));
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study;
    const title = study ? `${study.title} — case study` : "Case study";
    const description =
      study?.summary ?? "A web design case study: the brief, the build and the outcome.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(study?.cover_image_url?.startsWith("https://")
          ? [
              { property: "og:image", content: study.cover_image_url },
              { name: "twitter:image", content: study.cover_image_url },
            ]
          : []),
      ],
    };
  },
  component: CaseStudy,
  errorComponent: ({ error }) => (
    <div className="p-10 text-sm text-muted-foreground">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-3xl">Case study not found</h1>
      <div className="mt-6">
        <Button asChild>
          <Link to="/work">Back to work</Link>
        </Button>
      </div>
    </div>
  ),
});

function CaseStudy() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(studyQuery(slug));
  if (!data) return null;

  const gallery = Array.isArray(data.gallery) ? (data.gallery as string[]) : [];

  const sections = [
    { title: "The brief", body: data.brief },
    { title: "What I built", body: data.work_done },
    { title: "The outcome", body: data.outcome },
  ].filter((s) => Boolean(s.body));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-4xl px-5 pt-16">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
          {data.client_name && (
            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-ochre">
              {data.client_name}
            </p>
          )}
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">{data.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{data.summary}</p>
          {data.live_url && (
            <div className="mt-7">
              <Button asChild variant="outline">
                <a href={data.live_url} target="_blank" rel="noreferrer">
                  Visit the live site
                </a>
              </Button>
            </div>
          )}
        </div>

        {data.cover_image_url && (
          <div className="mx-auto mt-12 max-w-5xl px-5">
            <img
              src={data.cover_image_url}
              alt={`${data.title} website design`}
              className="w-full rounded-lg border border-border object-cover"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-5 py-16">
          {sections.map((s) => (
            <section key={s.title} className="border-t border-border py-10 first:border-t-0">
              <h2 className="text-2xl">{s.title}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {s.body!.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          {gallery.length > 0 && (
            <div className="grid gap-6 border-t border-border pt-10">
              {gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${data.title} design detail`}
                  loading="lazy"
                  className="w-full rounded-lg border border-border"
                />
              ))}
            </div>
          )}

          <div className="mt-14 rounded-lg border border-border bg-secondary/50 p-8 text-center">
            <h2 className="text-2xl">Want something like this?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Tell me what the site needs to do and I'll come back with scope, price and timing.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link to="/start">Start a project</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
