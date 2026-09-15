"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { templateKinds } from "@/content";
import { TemplatePreview } from "@/components/TemplatePreview";
import type { TemplateCard } from "@/lib/templates";
import { cx } from "@/lib/cx";
import styles from "./TemplateLibrary.module.css";

type TemplateLibraryProps = {
  templates: TemplateCard[];
};

export function TemplateLibrary({ templates }: TemplateLibraryProps) {
  const [kind, setKind] = useState<(typeof templateKinds)[number]["id"]>("all");
  const [active, setActive] = useState(templates[0]?.slug ?? "");

  const filtered = useMemo(
    () =>
      templates.filter((item) => (kind === "all" ? true : item.kind === kind)),
    [kind, templates],
  );

  const current =
    filtered.find((item) => item.slug === active) ?? filtered[0] ?? null;

  return (
    <section className={`global-section ${styles.section}`}>
      <div className="container">
        <header className="section-header">
          <h1 className={`display-lg ${styles.heading}`}>Templates</h1>
          <p className="body-lg centered">
            Starting files you can open and try. Filter by the part of the page
            you need.
          </p>
        </header>

        <div
          className={styles.filters}
          role="group"
          aria-label="Template type"
        >
          {templateKinds.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cx(
                styles.filter,
                kind === item.id && styles.filterOn,
              )}
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

        {current ? (
          <div className={styles.stage}>
            {filtered.length > 1 ? (
              <div className={styles.picker} role="list">
                {filtered.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    className={cx(
                      styles.pick,
                      item.slug === current.slug && styles.pickOn,
                    )}
                    onClick={() => setActive(item.slug)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            ) : null}

            <TemplatePreview src={current.previewSrc} title={current.title} />

            <div className={styles.meta}>
              <div>
                <p className={styles.category}>{current.category}</p>
                <h2 className={styles.title}>{current.title}</h2>
                <p className={styles.summary}>{current.summary}</p>
              </div>
              <Link href={current.demoHref} className={styles.try}>
                Try it
              </Link>
            </div>
          </div>
        ) : (
          <p className={`body-lg centered ${styles.empty}`}>
            Nothing in this group yet. Nav bars is the first set.
          </p>
        )}
      </div>
    </section>
  );
}
