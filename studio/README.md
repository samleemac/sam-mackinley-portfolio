# Sam MacKinley — Studio

Services site (plans, templates, work, contact) served at `sammackinley.com/studio`.

Next.js App Router with `basePath: "/studio"` — the portfolio project rewrites `/studio/*` here, so all routes and assets must stay under that prefix. `next/link` and `next/image` handle this automatically; raw URLs (iframe `src`, `<video>` attributes, CSS `url()`) need the `/studio` prefix written out.

## Development

```bash
npm install
npm run dev
```

The site serves at `http://localhost:3000/studio` (the base path applies in dev too).

## Templates

`lib/templates.ts` scans the `Templates/` folder for `.html` files and lists them on `/templates`. Drop a new template folder in there and it appears automatically.

## Deployment

Deployed on Vercel as the `sam-mackinley-studio` project with root directory `studio`. Pushing to `main` deploys automatically.
