import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const uuid = z.string().uuid();

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, company, email").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);
    return {
      userId,
      profile: profile ?? null,
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
    };
  });

export const listMySites = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data: sites, error } = await supabase
      .from("sites")
      .select("id, name, domain, live_url, status, notes")
      .order("name");
    if (error) throw new Error(error.message);

    const { data: requests } = await supabase
      .from("change_requests")
      .select("id, site_id, status, last_activity_at");

    return (sites ?? []).map((site) => {
      const mine = (requests ?? []).filter((r) => r.site_id === site.id);
      return {
        ...site,
        openCount: mine.filter((r) => r.status !== "done").length,
        totalCount: mine.length,
      };
    });
  });

export const getSiteBoard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { siteId: string }) => z.object({ siteId: uuid }).parse(input))
  .handler(async ({ context, data: input }) => {
    const { supabase, userId } = context;
    const { data: site, error } = await supabase
      .from("sites")
      .select("id, name, domain, live_url, status, notes")
      .eq("id", input.siteId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!site) throw new Error("Site not found or not available to you");

    const { data: requests } = await supabase
      .from("change_requests")
      .select("id, title, status, priority, created_at, last_activity_at, created_by")
      .eq("site_id", input.siteId)
      .order("last_activity_at", { ascending: false });

    const { data: reads } = await supabase
      .from("request_reads")
      .select("request_id, last_read_at")
      .eq("user_id", userId);

    const readMap = new Map((reads ?? []).map((r) => [r.request_id, r.last_read_at]));

    return {
      site,
      requests: (requests ?? []).map((r) => ({
        ...r,
        unread: !readMap.has(r.id) || new Date(r.last_activity_at) > new Date(readMap.get(r.id)!),
      })),
    };
  });

export const createChangeRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        siteId: uuid,
        title: z.string().trim().min(3).max(160),
        description: z.string().trim().min(5).max(6000),
        priority: z.enum(["low", "normal", "high", "urgent"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data: input }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("change_requests")
      .insert({
        site_id: input.siteId,
        created_by: userId,
        title: input.title,
        description: input.description,
        priority: input.priority,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  });

export const getRequestDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { requestId: string }) => z.object({ requestId: uuid }).parse(input))
  .handler(async ({ context, data: input }) => {
    const { supabase, userId } = context;
    const { data: request, error } = await supabase
      .from("change_requests")
      .select("id, site_id, title, description, status, priority, created_at, created_by")
      .eq("id", input.requestId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!request) throw new Error("Request not found or not available to you");

    const { data: site } = await supabase
      .from("sites")
      .select("id, name")
      .eq("id", request.site_id)
      .maybeSingle();

    const [{ data: comments }, { data: attachments }, { data: roles }] = await Promise.all([
      supabase
        .from("request_comments")
        .select("id, body, author_id, created_at")
        .eq("request_id", input.requestId)
        .order("created_at"),
      supabase
        .from("request_attachments")
        .select("id, comment_id, file_name, mime_type, size_bytes, storage_path, created_at")
        .eq("request_id", input.requestId)
        .order("created_at"),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    const authorIds = Array.from(
      new Set([request.created_by, ...(comments ?? []).map((c) => c.author_id)]),
    );

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: people } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email")
      .in("id", authorIds);
    const { data: adminRows } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .in("user_id", authorIds);
    const adminIds = new Set((adminRows ?? []).map((r) => r.user_id));

    const nameFor = (id: string) => {
      const p = (people ?? []).find((x) => x.id === id);
      const label = p?.full_name || p?.email || "Unknown";
      return adminIds.has(id) ? `${label} (studio)` : label;
    };

    const signed = await Promise.all(
      (attachments ?? []).map(async (a) => {
        const { data } = await supabaseAdmin.storage
          .from("request-files")
          .createSignedUrl(a.storage_path, 60 * 60);
        return { ...a, url: data?.signedUrl ?? null };
      }),
    );

    await supabase
      .from("request_reads")
      .upsert(
        { request_id: input.requestId, user_id: userId, last_read_at: new Date().toISOString() },
        { onConflict: "request_id,user_id" },
      );

    return {
      request: { ...request, authorName: nameFor(request.created_by) },
      site: site ?? null,
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
      comments: (comments ?? []).map((c) => ({ ...c, authorName: nameFor(c.author_id) })),
      attachments: signed,
    };
  });

export const addComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ requestId: uuid, body: z.string().trim().min(1).max(4000) }).parse(input),
  )
  .handler(async ({ context, data: input }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("request_comments")
      .insert({ request_id: input.requestId, author_id: userId, body: input.body })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("change_requests")
      .update({ last_activity_at: new Date().toISOString() })
      .eq("id", input.requestId);
    return { id: data.id };
  });

export const registerAttachments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        requestId: uuid,
        commentId: uuid.nullable().optional(),
        files: z
          .array(
            z.object({
              storage_path: z.string().min(1).max(500),
              file_name: z.string().min(1).max(255),
              mime_type: z.string().max(160).nullable().optional(),
              size_bytes: z.number().int().nonnegative().nullable().optional(),
            }),
          )
          .min(1)
          .max(20),
      })
      .parse(input),
  )
  .handler(async ({ context, data: input }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("request_attachments").insert(
      input.files.map((f) => ({
        request_id: input.requestId,
        comment_id: input.commentId ?? null,
        uploaded_by: userId,
        storage_path: f.storage_path,
        file_name: f.file_name,
        mime_type: f.mime_type ?? null,
        size_bytes: f.size_bytes ?? null,
      })),
    );
    if (error) throw new Error(error.message);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("change_requests")
      .update({ last_activity_at: new Date().toISOString() })
      .eq("id", input.requestId);
    return { ok: true };
  });

export const updateRequestStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        requestId: uuid,
        status: z.enum(["new", "in_progress", "waiting_on_client", "done"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data: input }) => {
    const { supabase } = context;
    const { error } = await supabase
      .from("change_requests")
      .update({ status: input.status, last_activity_at: new Date().toISOString() })
      .eq("id", input.requestId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
