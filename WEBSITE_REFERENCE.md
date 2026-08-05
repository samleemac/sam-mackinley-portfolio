# Sam MacKinley — Portfolio Website Reference

A single-file, self-contained portfolio site. Use this document as the map for any future change: it explains where everything lives, the design system, the data you can edit, and the interaction patterns already in place.

---

## 1. At a glance

- **Main file:** `index.html` (~1,710 lines). Everything — HTML, CSS, and JS lives in this one file. There is no build step; open it in a browser or deploy to Vercel from the repo root.
- **Structure inside the file:**
  - `<head>` — fonts + libraries (lines ~1-15)
  - `<style>` — all CSS (starts ~line 15)
  - `<body>` — page markup (sections start ~line 689)
  - `<script>` — all JS (starts ~line 909)
- **Dependencies (CDN, no install):**
  - GSAP 3.12.5 + ScrollTrigger — animation / scroll reveals
  - Google Fonts: Inter (body), Caveat (script/signature), JetBrains Mono (mono labels)
- **Assets:**
  - `media/` — web-ready project assets: `{name}.mp4` (hover-play clip) + `{name}.jpg` (poster/first frame) for `gijs`, `james`, `recipy`, `ellevie`.
  - `Projects/` — original `.mov` source recordings (not used directly by the site; source for the `media/` files).
  - `Finder.mov` — design reference recording for the Finder section.
  - `shots/` — scratch folder for Playwright verification screenshots (safe to ignore/delete).

---

## 2. Design system

All design tokens are CSS custom properties in `:root` (~line 16). Always reuse these rather than hardcoding new colors.

### Colors
| Token | Value | Use |
|---|---|---|
| `--paper` | `#F1F0EB` | Page background |
| `--paper-2` | `#EAE8E1` | Secondary surfaces |
| `--grid` | `#E1DFD6` | Faint background grid lines |
| `--ink` | `#1B1B18` | Primary text |
| `--muted` | `#8C887E` | Secondary text |
| `--faint` | `#B8B4A8` | Tertiary / eyebrow text |
| `--kraft` / `--kraft-2` | `#CDB593` / `#BBA079` | Warm tan (twine, paper accents) |
| `--green` / `--green-glow` | `#7BC24A` / `#C8EB8E` | Accent (donut, vinyl) |
| `--yellow` / `--yellow-soft` | `#F3D45E` / `#FBE9A0` | Accent (stars, award badge) |
| `--mac-red/yel/grn` | traffic-light dots | Finder + lightbox window chrome |
| `--f-blue/tan/green/red/purple` | folder pastels | Finder folders, testimonial avatars |
| `--shadow` / `--shadow-sm` | warm drop shadows | Cards |

### Fonts
- `--font-body` → Inter (UI + paragraphs)
- `--font-script` → Caveat (the "Sam MacKinley" signature, hand-written accents)
- `--font-mono` → JetBrains Mono (eyebrows, labels, badges, terminal, paths) — usually uppercase with wide letter-spacing.

### Conventions
- Custom cursor: the real cursor is hidden (`cursor:none`) and a `#cursor` element follows the pointer; interactive elements grow it. Use `cursor:none` on new interactive elements to stay consistent.
- `reduced` (JS, line ~909) = `prefers-reduced-motion`. Gate any non-essential animation/video autoplay behind `if (reduced) return;`.
- Rounded cards (`border-radius` ~12-14px), subtle `#ecebe4` borders, `#fbfaf8` card fills are the standard "panel" look (see Achievements / Testimonials).

---

## 3. Page sections (in `<body>`)

| Section | id | Approx lines | Notes |
|---|---|---|---|
| Header / nav | `header` | ~690 | Brand + nav links (About, Work, Playground). Smooth-scrolls to anchors. |
| Hero | `#hero` | 689 | Draggable, hover-animated "stickers" + signature + idea CTA. |
| About | `#about` | 826 | Copy block. |
| Work (Finder) | `#work` | 845 | macOS Finder window with sidebar views (see §4). |
| Playground | `#play` | 877 | Clothesline of project polaroids + lightbox (see §5). |
| Footer | `footer` | ~857 | Links. |

### Hero
- "Stickers" are absolutely-positioned elements (`.sticker` variants: `.signature`, `.device`, `.analog-clock`, `.board`, `.vinyl`, `.term`) with `data-depth` for parallax.
- **Parallax:** pointer-move handler offsets each sticker by its depth. Skipped while dragging (`window.__dragging`).
- **Drag-to-rearrange:** `dragLayout()` IIFE makes non-link stickers draggable; a floating "Reset Layout" button (`.layout-tools`, fixed bottom-right) restores the start positions. Links are not draggable.
- **Hover micro-interactions:** the analogue clock keeps live time, the terminal types a deploy log, the photo board fans its polaroids out, etc.
- **Photo board:** four slots cross-fade through the `Photos/` set one at a time; clicking a polaroid lifts it to the middle of the viewport at 4x (`.expanded`) and rotation pauses until it is closed.
- **Idea CTA:** `.hero-cta` form (`#ideaForm`) builds a `mailto:` link. Target address is `IDEA_EMAIL` in the JS — update it to the real inbox.

---

## 4. Finder (Work section) — the editable "app"

A fake macOS Finder window (`#finder`) with a left sidebar of "Favorites" and swappable content views.

### Sidebar tabs → views
| Tab (`data-view`) | View element | Render fn | Path shown |
|---|---|---|---|
| `projects` | `#viewProjects` | static + `openFolder()` | `~/sam/projects` |
| `snapshot` | `#viewSnapshot` | `renderSnapshot()` | `~/sam/snapshot` |
| `achievements` | `#viewAch` | `renderAch()` | `~/sam/achievements` |
| `testimonials` | `#viewTest` | `renderTest()` | `~/sam/testimonials` |

### How view switching works (`switchView()`, ~line 1380)
1. Toggles `.active` on the clicked sidebar `<a>` and the matching view div.
2. Updates the window path text (`finderPath`) from `VIEW_PATHS`.
3. Lazily calls the view's render function (each guards with `dataset.built` so it renders once).
4. Refreshes ScrollTrigger.

### Adding a new sidebar tab (recipe)
1. Add an `<a data-view="NAME">…icon…Label</a>` in `.side` (~line 829).
2. Add `<div class="view view-NAME" id="viewX"></div>` in `.content` (~line 843).
3. Add CSS `.view-NAME{display:none;…}` and `.view-NAME.active{display:flex}`.
4. In JS: add to `VIEW_PATHS`, add to the `views` map, write a `renderX()` guarded by `dataset.built`, and call it in `switchView()`.
5. Add the view to the responsive padding rule (~line 633).

### Editable data arrays (JS)
- **Projects/folders:** `FOLDERS` (~line 1120) — drives the Projects grid + detail panel. `openFolder()` / `closeFolder()` handle the open/close behavior.
- **Snapshot:** `NOTE_PILLS`, `JOURNEY`, `RADAR`, `FACTS` (~lines 1226-1247) + `renderSnapshot()`.
- **Achievements:** `STATS` and `ACHV` (~lines 1303-1317) + `renderAch()`. Badge types: `award` (gold) / `ship` (grey).
- **Testimonials:** `TESTIMONIALS` (~line 1336) + `renderTest()`. Each entry: `{ quote, nm, role, initials, color, stars }`. `color` uses an `--f-*` token; `stars` is a count (1-5) rendered as filled gold stars. To add a client, append an object to the array — the grid lays out automatically.

---

## 5. Playground — clothesline of work

The "Sites I've designed & built" gallery (`#play`). Polaroid photos hang from sagging twine ropes with CSS wooden clothespins.

### Markup / build
- Container: `<div class="clothesline" id="siteGallery">` — rows are built in JS.
- JS (~line 1369+): merges `PROJECTS` + `PLACEHOLDERS` into `ITEMS`, chunks into rows of 3, and for each row creates a `.line-row` containing:
  - an inline SVG rope (`ropeSVG`, a sagging two-strand path stretched edge-to-edge),
  - 3 cards via `buildProjectCard()` / `buildPlaceholderCard()`.
- Per-card CSS vars: `--rot` (random tilt), `--drop` (vertical offset so cards follow the rope sag, `DROP=[8,24,8]`), `--peg` (clothespin tilt, `PEG=[-5,2,6]`). Each card has a `.peg` element (wood gradient + groove + metal spring).

### Project data (`PROJECTS`, ~line 1358)
`{ name, title, role, link }`. `name` must match the `media/{name}.mp4` and `media/{name}.jpg` filenames. Empty `link` hides the "Link to the website" button in the lightbox (currently Gijs).

### Interactions (preserve these)
- **Hover** a polaroid → its `.mp4` plays (poster `.jpg` fades out). Leaving pauses/resets. Disabled when `reduced`.
- **Click** a polaroid → opens the lightbox (`openLightbox`, ~line 1396).

### Lightbox (enlarged view)
- Built once in JS and appended to `<body>`; CSS class `.lightbox` (+ `.lb-card`, `.lb-media`, `.lb-foot`, `.lb-close`).
- Fills ~75vw, shows a browser-style frame with the site URL, a "Link to the website" button (hidden when no `link`), and the project name/role.
- **Close:** the × button, clicking the backdrop, or pressing `Esc`.
- **Hover** the enlarged media → video plays and loops.

### Adding a new project
1. Add the source `.mov` to `Projects/`, then transcode to `media/{name}.mp4` and export a first-frame `media/{name}.jpg` (the repo used `imageio-ffmpeg`; plain `ffmpeg` works too). Target a ~2:1 (16:10) framing for the polaroid.
2. Append `{ name, title, role, link }` to `PROJECTS`.
3. Remove a `PLACEHOLDERS` entry if you want to keep 6 cards / 2 rows.

---

## 6. Responsive behavior

Breakpoints: `@media (max-width:900px)` (~line 580) and `@media (max-width:640px)` (~line 592).
- Finder: sidebar narrows, grids drop columns, open folder stacks vertically.
- Snapshot/Achievements/Testimonials views: reduced padding; testimonials grid → 1 column.
- Playground clothesline: collapses to a centered single-column stack; long ropes hide and each peg gets a short twine stub (`.polaroid::before`) so photos still read as "clipped"; `--drop` is reset to 0.
- Hero stickers + CTA reposition for small screens.

---

## 7. Verifying changes

The project has been verified with **Playwright** (Python) by scripting a headless Chromium, scrolling to a section, interacting, and screenshotting (saved into `shots/`). Pattern used for each change:
1. Write a throwaway `verify_*.py`, launch Chromium at the file URL.
2. Assert structure (element counts, active classes, path text) and capture desktop + mobile screenshots.
3. Delete the script afterward.

Quick functional checks worth re-running after edits:
- Finder: each sidebar tab activates its view and updates the path.
- Playground: hover plays video; click opens lightbox; Esc/backdrop closes.
- Reduced motion: animations/videos stay calm.

---

## 8. House rules for future edits

- Keep everything in the single HTML file unless there's a strong reason to split.
- Reuse `:root` tokens and the existing font roles; match the warm paper/kraft aesthetic.
- New interactive elements: set `cursor:none` and gate motion behind `reduced`.
- Prefer data-driven additions (push to the relevant array) over hand-writing markup.
- Don't break the Playground interactions (hover-play, click-to-enlarge, lightbox close) or the hero drag/reset.
