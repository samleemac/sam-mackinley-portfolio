# Portfolio site + client portal

Two halves in one app: a public "hire me" front end, and an invite-only client portal where your clients raise change requests against the sites you built for them.

## Public front end

- **Home** — clear intro, what you do, who it's for, primary "Start a project" CTA plus a portal sign-in link.
- **Work** — portfolio grid, each item opens a case study page (brief, what you built, outcome, images, live link).
- **Services & pricing** — packages/tiers with what's included and a starting price.
- **Start a project** — enquiry form (name, email, company, budget range, timeline, project description). Submissions land in your admin dashboard and email-style list, nothing lost in an inbox.
- **Book a call** — your external scheduling link, presented as its own step after the enquiry.

Design: informative and calm rather than flashy — strong typography, generous spacing, real content and screenshots doing the work. I'll take colour and personality cues from sammackinley.com but drop the heavy effects so the value is readable at a glance.

## Client portal (invite only)

- **Sign in** — email/password. No public signup; you create accounts and assign sites, so a stranger can never reach the portal.
- **My websites** — a client sees only the sites you've linked to them. One client can have several sites.
- **Site view** — that site's change requests, newest first, with status.
- **New change request** — title, description, priority, and attachments (photos, PDFs, docs; multiple files, drag and drop).
- **Request thread** — status (New → In progress → Waiting on client → Done) plus a comment thread so you and the client can go back and forth on one request. Attachments can be added to comments too.
- **Notifications shown in-app** — unread indicator on requests with new activity.

## Your admin side

- Create client accounts and send them their invite.
- Create sites and assign them to clients.
- See every change request across all clients in one queue, filter by site or status, change status, reply.
- See incoming project enquiries from the public form.

## Access rules

- A client can only read and write requests for sites assigned to them — enforced in the database, not just hidden in the UI, so it holds even if someone pokes at the API.
- Uploaded files live in private storage; only the owning client and you can fetch them.
- You (admin) can see everything.

## Technical notes

- Lovable Cloud for auth, database and file storage.
- Tables: `profiles`, `user_roles` (separate table, admin/client), `sites`, `site_clients` (many-to-many so a site can have more than one contact), `change_requests`, `request_comments`, `request_attachments`, `enquiries`, `case_studies`.
- Row Level Security on every table; client policies scope through `site_clients` to `auth.uid()`, admin policies via a `has_role()` security-definer function.
- Private storage bucket for attachments, path-scoped per site, signed URLs for download.
- Data access through TanStack server functions; public pages stay server-rendered for SEO, portal routes sit behind an authenticated layout.
- Case studies stored in the database so you can add work without a code change.

## Build order

1. Cloud + schema, roles, RLS, storage bucket.
2. Public site: home, work, case study pages, services, enquiry form, booking.
3. Auth + portal shell: sign in, my websites, site view.
4. Change requests: create, attachments, status, comment thread.
5. Admin: client/site management, global request queue, enquiries inbox.

## Open items for later

- Which scheduling tool the booking link points to (Cal.com, Calendly, etc.).
- Whether email notifications should go out on new requests/replies — currently in-app only.
