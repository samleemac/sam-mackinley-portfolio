import fs from "fs";
import path from "path";
import { templateKinds, templateNotes } from "@/content";

const TEMPLATES_ROOT = path.join(process.cwd(), "Templates");

export type TemplateKind = (typeof templateKinds)[number]["id"];

export type TemplateRecord = {
  slug: string;
  title: string;
  kind: Exclude<TemplateKind, "all">;
  category: string;
  summary: string;
  filePath: string;
  previewSrc: string;
  demoHref: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function walkHtml(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtml(full));
      continue;
    }
    if (entry.name.toLowerCase().endsWith(".html")) {
      files.push(full);
    }
  }

  return files;
}

function titleFromHtml(html: string, fallback: string) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  const title = match?.[1]?.trim();
  return title || fallback;
}

function kindFromFolder(folder: string): Exclude<TemplateKind, "all"> {
  const value = folder.toLowerCase();
  if (value.includes("hero")) return "hero";
  if (value.includes("footer")) return "footer";
  return "nav";
}

function categoryFor(kind: Exclude<TemplateKind, "all">) {
  return (
    templateKinds.find((item) => item.id === kind)?.label ?? "Templates"
  );
}

export function getTemplates(): TemplateRecord[] {
  const files = walkHtml(TEMPLATES_ROOT);
  const used = new Set<string>();

  return files
    .map((filePath) => {
      const relative = path.relative(TEMPLATES_ROOT, filePath);
      const parts = relative.split(path.sep);
      const folder = parts.length > 1 ? parts[0] : "Template";
      const base = path.basename(filePath, path.extname(filePath));
      let slug = slugify(folder) || slugify(base);

      if (used.has(slug)) {
        slug = `${slug}-${slugify(base)}`;
      }
      used.add(slug);

      const html = fs.readFileSync(filePath, "utf8");
      const note = templateNotes[slug];
      const kind = note?.kind ?? kindFromFolder(folder);

      return {
        slug,
        title: note?.title ?? titleFromHtml(html, base),
        kind,
        category: categoryFor(kind),
        summary:
          note?.summary ??
          "A reusable starting file you can open and click through.",
        filePath,
        // Raw URL (iframe src / plain anchor) — must include the basePath manually,
        // unlike demoHref which goes through next/link.
        previewSrc: `/studio/templates/${slug}/raw`,
        demoHref: `/templates/${slug}`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getTemplate(slug: string) {
  return getTemplates().find((template) => template.slug === slug);
}

export function toTemplateCard(template: TemplateRecord) {
  return {
    slug: template.slug,
    title: template.title,
    kind: template.kind,
    category: template.category,
    summary: template.summary,
    previewSrc: template.previewSrc,
    demoHref: template.demoHref,
  };
}

export type TemplateCard = ReturnType<typeof toTemplateCard>;
