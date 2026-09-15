import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplatePreview } from "@/components/TemplatePreview";
import { site } from "@/content";
import { getTemplate, getTemplates } from "@/lib/templates";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getTemplates().map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    return { title: `Template - ${site.name}` };
  }

  return {
    title: `${template.title} - ${site.name}`,
    description: template.summary,
  };
}

export default async function TemplateDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    notFound();
  }

  return (
    <main id="main" className={styles.page}>
      <div className={styles.bar}>
        <Link href="/templates" className={styles.back}>
          Back
        </Link>
        <div className={styles.identity}>
          <p className={styles.category}>{template.category}</p>
          <h1 className={styles.title}>{template.title}</h1>
        </div>
        <a
          href={template.previewSrc}
          className={styles.raw}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open page
        </a>
      </div>
      <TemplatePreview
        src={template.previewSrc}
        title={template.title}
        fill
      />
    </main>
  );
}
