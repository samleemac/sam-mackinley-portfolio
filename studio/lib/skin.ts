import type { TemplateLook } from "@/content";

export type Skin = {
  look: TemplateLook;
  name: string;
};

const STYLE_ID = "studio-skin";
const FONT_ID = "studio-skin-font";

/**
 * Swap a node's text, remembering its original markup the first time we touch
 * it so "Original" can put it back exactly (e.g. the cart's styled count).
 * New values are set as text, never HTML — the business name is user input.
 */
function setText(el: Element | null | undefined, value: string | undefined) {
  if (!el) return;
  const node = el as HTMLElement;
  if (node.dataset.skinOrig === undefined) {
    node.dataset.skinOrig = node.innerHTML;
  }
  if (value === undefined) {
    node.innerHTML = node.dataset.skinOrig;
  } else {
    node.textContent = value;
  }
}

/**
 * Re-skin a template document in place. Templates are same-origin
 * (/studio/templates/<slug>/raw), so the parent page can reach in directly.
 * Everything is driven by the template's own CSS variables and class names;
 * a template missing a hook simply ignores that part of the skin.
 */
export function applySkin(doc: Document | null | undefined, skin?: Skin) {
  if (!doc?.head || !doc.body) return;

  const look = skin?.look;
  const vars = look?.vars ?? {};

  let style = doc.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement("style");
    style.id = STYLE_ID;
    doc.head.appendChild(style);
  }
  const declarations = Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  style.textContent = [
    `:root{${declarations}}`,
    "body{background:var(--c-paper);transition:background-color .3s ease;}",
    look?.logoFont ? `.logo{font-family:${look.logoFont};font-size:1.375rem;}` : "",
    look?.hero ? `.hero{background:${look.hero};transition:background .4s ease;}` : "",
    look?.headline
      ? `.hero__text{font-family:${look.logoFont ?? "var(--font-sans)"};font-size:clamp(2.75rem,5.5vw,5rem);line-height:1.02;letter-spacing:-0.03em;max-width:14ch;}`
      : "",
  ].join("\n");

  let font = doc.getElementById(FONT_ID) as HTMLLinkElement | null;
  if (look?.fonts) {
    if (!font) {
      font = doc.createElement("link");
      font.id = FONT_ID;
      font.rel = "stylesheet";
      doc.head.appendChild(font);
    }
    const href = `https://fonts.googleapis.com/css2?${look.fonts}&display=swap`;
    if (font.href !== href) font.href = href;
  } else {
    font?.remove();
  }

  // Original look with no name typed: leave the template's own wordmark.
  const typed = skin?.name.trim().replace(/\.$/, "");
  const brand = typed || (look?.id === "original" ? undefined : look?.sample);
  doc.querySelectorAll(".logo").forEach((logo) => {
    setText(logo, brand ? `${brand}.` : undefined);
  });

  doc.querySelectorAll(".nav__link").forEach((link, index) => {
    setText(link, look?.nav?.[index]);
  });

  doc.querySelectorAll(".announce__slide").forEach((slide, index) => {
    setText(slide.querySelector("a") ?? slide, look?.announce?.[index]);
  });

  setText(doc.querySelector(".hero__text"), look?.headline);

  const utils = doc.querySelectorAll(".utils__link");
  setText(utils[utils.length - 1], look?.action);
}
