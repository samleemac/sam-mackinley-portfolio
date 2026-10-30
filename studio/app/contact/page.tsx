import type { Metadata } from "next";
import { Brief } from "@/components/Brief";
import { Footer } from "@/components/Footer";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `Start a project - ${site.name}`,
  description:
    "Four taps and a name. Your project brief writes itself as you go.",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <>
      <main id="main">
        <Brief
          initialPlan={first(params.plan)}
          initialBusiness={first(params.for)}
          initialNote={first(params.note)?.slice(0, 600)}
        />
      </main>
      <Footer />
    </>
  );
}
