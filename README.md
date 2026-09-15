# Sam MacKinley — Website

One repo, two apps, one domain.

| Path | App | Where it lives |
|---|---|---|
| `sammackinley.com` | Personal portfolio (static, no build step) | [`index.html`](index.html) at the repo root |
| `sammackinley.com/studio` | Services site — plans, templates, work, contact | [`studio/`](studio/) (Next.js) |

## Portfolio (root)

Static single-page site. Open `index.html` in a browser, or run:

```bash
npx serve .
```

Project videos and posters live in `media/`. See `WEBSITE_REFERENCE.md` for the full map of the file.

## Studio (`studio/`)

Next.js app served under the `/studio` base path.

```bash
cd studio
npm install
npm run dev
```

## Deployment (Vercel)

Both apps deploy from this repo on every push to `main`:

- **Portfolio project** — root directory empty, framework "Other". `vercel.json` rewrites `/studio/*` to the studio project and permanently redirects the old `/portal` URLs to `/studio`. (Don't add a root `.vercelignore` excluding `studio/` — Vercel applies it to the studio project's build too and breaks it.)
- **Studio project** (`sam-mackinley-studio`) — root directory `studio`, framework Next.js. `basePath: "/studio"` in `studio/next.config.ts` keeps all routes and assets under the slug.

The domain `sammackinley.com` stays attached to the portfolio project only.
