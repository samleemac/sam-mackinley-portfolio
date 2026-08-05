import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const uuid = z.string().uuid();

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const adminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [sites, links, profiles, requests, enquiries] = await Promise.all([
      supabaseAdmin.from("sites").select("id, name, domain, live_url, status, notes").order("name"),
      supabaseAdmin.from("site_clients").select("id, site_id, user_id"),
      supabaseAdmin.from("profiles").select("id, full_name, email, company").order("created_at"),
      supabaseAdmin
        .from("change_requests")
        .select("id, site_id, title, status, priority, created_at, last_activity_at, created_by")
        .order("last_activity_at", { ascending: false }),
      supabaseAdmin.from("enquiries").select("*").order("created_at", { ascending: false }),
    ]);

    const adminRoles = await supabaseAdmin.from("user_roles").select("user_id").eq("role", "admin");
    const adminIds = new Set((adminRoles.data ?? []).map((r) => r.user_id));

    return {
      sites: sites.data ?? [],
      links: links.data ?? [],
      people: (profiles.data ?? []).map((p) => ({ ...p, isAdmin: adminIds.has(p.id) })),
      requests: requests.data ?? [],
      enquiries: enquiries.data ?? [],
    };
  });

export const createSite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        name: z.string().trim().min(2).max(160),
        domain: z.string().trim().max(200).optional().or(z.literal("")),
        live_url: z.string().trim().max(300).optional().or(z.literal("")),
        notes: z.string().trim().max(2000).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ context, data: input }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("sites")
      .insert({
        name: input.name,
        domain: input.domain || null,
        live_url: input.live_url || null,
        notes: input.notes || null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  });

export const createClientAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        full_name: z.string().trim().max(160).optional().or(z.literal("")),
        company: z.string().trim().max(160).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ context, data: input }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const tempPassword = `${Math.random().toString(36).slice(2, 8)}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${Math.random().toString(36).slice(2, 6)}`;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { full_name: input.full_name || null, company: input.company || null },
    });
    if (error) throw new Error(error.message);
    return { userId: data.user?.id ?? null, email: input.email, tempPassword };
  });

export const assignClientToSite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ siteId: uuid, userId: uuid }).parse(input))
  .handler(async ({ context, data: input }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_clients")
      .upsert({ site_id: input.siteId, user_id: input.userId }, { onConflict: "site_id,user_id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const removeClientFromSite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ linkId: uuid }).parse(input))
  .handler(async ({ context, data: input }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_clients").delete().eq("id", input.linkId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setEnquiryHandled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: uuid, handled: z.boolean() }).parse(input),
  )
  .handler(async ({ context, data: input }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("enquiries")
      .update({ handled: input.handled })
      .eq("id", input.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
