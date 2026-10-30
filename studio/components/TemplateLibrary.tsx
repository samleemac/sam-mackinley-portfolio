"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { templateKinds, templateLooks } from "@/content";
import { TemplatePreview } from "@/components/TemplatePreview";
import type { TemplateCard } from "@/lib/templates";
import { cx } from "@/lib/cx";
import styles from "./TemplateLibrary.module.css";

type TemplateLibraryProps = {
  templates: TemplateCard[];
};

const CYCLE_MS = 2600;

export function TemplateLibrary({ templates }: TemplateLibraryProps) {
  const [kind, setKind] = useState<(typeof templateKinds)[number]["id"]>("all");
  const [active, setActive] = useState(templates[0]?.slug ?? "");
  const [lookId, setLookId] = useState(templateLooks[0].id);
  const [name, setName] = useState("");
  // Until the visitor touches a control, the preview tours the looks itself.
  const [touched, setTouched] = useState(false);

  const look = templateLooks.find((item) => item.id === lookId) ?? templateLooks[0];
  const skin = useMemo(() => ({ look, name }), [look, name]);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setLookId((id) => {
        const index = templateLooks.findIndex((item) => item.id === id);
        return templateLooks[(index + 1) % templateLooks.length].id;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [touched]);

  // Only offer filters for kinds that actually have something in them.
  const kinds = templateKinds.filter(
    (item) => item.id === "all" || templates.some((t) => t.kind === item.id),
  );

  const filtered = useMemo(
    () =>
      templates.filter((item) => (kind === "all" ? true : item.kind === kind)),
    [kind, templates],
  );

  const current =
    filtered.find((item) => item.slug === active) ?? filtered[0] ?? null;

  const params = new URLSearchParams();
  if (look.id !== "original") params.set("look", look.id);
  if (name.trim()) params.set("name", name.trim());
  const query = params.toString();
  const briefHref = look.for ? `/contact?for=${look.for}` : "/contact";

  function chooseLook(id: string) {
    setTouched(true);
    setLookId(id);
  }

  return (
    <section className={`global-section ${styles.section}`}>
      <div className="container">
        <header className="section-header">
          <h1 className={`display-lg ${styles.heading}`}>Make it yours</h1>
          <p className="body-lg centered">
            Real, working pieces of a site. Type your business name, pick a
            look, and watch it turn into yours.
          </p>
        </header>

        {kinds.length > 2 ? (
          <div className={styles.filters} role="group" aria-label="Template type">
            {kinds.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cx(styles.filter, kind === item.id && styles.filterOn)}
                aria-pressed={kind === item.id}
                onClick={() => {
                  setKind(item.id);
                  const next = templates.find((template) =>
                    item.id === "all" ? true : template.kind === item.id,
                  );
                  setActive(next?.slug ?? "");
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        {current ? (
          <div className={styles.stage}>
            {filtered.length > 1 ? (
              <div className={styles.picker} role="group" aria-label="Template">
                {filtered.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={item.slug === current.slug}
                    className={cx(styles.pick, item.slug === current.slug && styles.pickOn)}
                    onClick={() => setActive(item.slug)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            ) : null}

            <div className={styles.studio}>
              <label className={styles.control}>
                <span className={styles.step}>
                  <b>01</b> Your business name
                </span>
                <input
                  className={styles.name}
                  value={name}
                  maxLength={28}
                  autoComplete="organization"
                  spellCheck={false}
                  placeholder={look.id === "original" ? "Lumen Hair" : look.sample}
                  onChange={(event) => {
                    setTouched(true);
                    setName(event.target.value);
                  }}
                />
              </label>

              <div className={styles.control}>
                <span className={styles.step} id="look-label">
                  <b>02</b> Pick a look
                </span>
                <div className={styles.looks} role="group" aria-labelledby="look-label">
                  {templateLooks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={item.id === look.id}
                      className={cx(styles.look, item.id === look.id && styles.lookOn)}
                      onClick={() => chooseLook(item.id)}
                    >
                      <span className={styles.swatch} aria-hidden="true">
                        {item.swatch.map((colour) => (
                          <i key={colour} style={{ background: colour }} />
                        ))}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {!touched ? (
                <p className={styles.touring} aria-hidden="true">
                  <span className={styles.dot} /> Touring the looks. Pick one to
                  take over.
                </p>
              ) : null}
            </div>

            <TemplatePreview src={current.previewSrc} title={current.title} skin={skin} />

            <div className={styles.meta}>
              <div>
                <p className={styles.category}>{current.category}</p>
                <h2 className={styles.title}>{current.title}</h2>
                <p className={styles.summary}>{current.summary}</p>
              </div>
              <div className={styles.actions}>
                <Link
                  href={query ? `${current.demoHref}?${query}` : current.demoHref}
                  className={styles.try}
                >
                  Try it full page
                </Link>
                <Link href={briefHref} className={styles.build}>
                  Build my site from this <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className={`body-lg centered ${styles.empty}`}>
            Nothing in this group yet.
          </p>
        )}
      </div>
    </section>
  );
}
