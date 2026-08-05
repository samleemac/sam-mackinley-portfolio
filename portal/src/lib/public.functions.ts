import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("case_studies")
    .select("id, slug, title, client_name, summary, cover_image_url, tags, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getCaseStudy = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data: input }) => {
    const { data, error } = await publicClient()
      .from("case_studies")
      .select(
        "id, slug, title, client_name, summary, brief, work_done, outcome, live_url, cover_image_url, gallery, tags",
      )
      .eq("slug", input.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(120),
  email: z.string().trim().email("Please add a valid email").max(255),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget_range: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a little more").max(4000),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data: input }) => {
    const { error } = await publicClient()
      .from("enquiries")
      .insert({
        name: input.name,
        email: input.email,
        company: input.company || null,
        budget_range: input.budget_range || null,
        timeline: input.timeline || null,
        message: input.message,
      });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
