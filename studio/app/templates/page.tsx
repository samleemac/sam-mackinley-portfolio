import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { TemplateLibrary } from "@/components/TemplateLibrary";
import { site } from "@/content";
import { getTemplates, toTemplateCard } from "@/lib/templates";

export const metadata: Metadata = {
  title: `Templates - ${site.name}`,
  description:
    "Starting files you can open and try. Nav bars first, more pieces as they land.",
};

export default function TemplatesPage() {
  const templates = getTemplates().map(toTemplateCard);

  return (
    <>
      <main id="main">
        <TemplateLibrary templates={templates} />
      </main>
      <Footer />
    </>
  );
}
