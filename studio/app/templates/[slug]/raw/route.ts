import { getTemplate, getTemplates } from "@/lib/templates";
import { readFile } from "fs/promises";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getTemplates().map((template) => ({ slug: template.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    return new Response("Template not found", { status: 404 });
  }

  const html = await readFile(template.filePath, "utf8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
