"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { audiences } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Audiences.module.css";

const host = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");

export function Audiences() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const current = audiences[index];

  // Arrow keys move between tabs, as a tab list should.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const from = tabsRef.current.findIndex((tab) => tab === event.target);
    const at = from === -1 ? index : from;
    let next: number | undefined;
    if (event.key in keys) next = (at + keys[event.key] + audiences.length) % audiences.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = audiences.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setIndex(next);
    tabsRef.current[next]?.focus();
  }

  const theme = {
    "--a-bg": current.theme.bg,
    "--a-ink": current.theme.ink,
    "--a-accent": current.theme.accent,
    "--a-accent-ink": current.theme.accentInk,
  } as CSSProperties;

  return (
    <section id="who" className="global-section" aria-labelledby="who-heading">
      <div className="container">
        <div className={styles.room} style={theme}>
          <header className={styles.header}>
            <h2 id="who-heading" className={`display-lg ${styles.heading}`}>
              Built for businesses like yours
            </h2>
            <p className={styles.lede}>
              Pick your line of work. See what I’ve built for people in it,
              and what your site needs to do.
            </p>
          </header>

          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Type of business"
            onKeyDown={onKeyDown}
          >
            {audiences.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`who-tab-${item.id}`}
                aria-selected={i === index}
                aria-controls="who-panel"
                tabIndex={i === index ? 0 : -1}
                className={cx(styles.tab, i === index && styles.tabOn)}
                onClick={() => setIndex(i)}
              >
                <span
                  className={styles.dot}
                  style={{ background: item.theme.accent, boxShadow: `0 0 0 0.3rem ${item.theme.bg}` }}
                  aria-hidden="true"
                />
                {item.label}
              </button>
            ))}
          </div>

          <div
            id="who-panel"
            role="tabpanel"
            aria-labelledby={`who-tab-${current.id}`}
            className={styles.panel}
            key={current.id}
          >
            <div className={styles.copy}>
              <h3 className={styles.title}>{current.title}</h3>
              <p className={styles.fit}>{current.fit}</p>
              <p className={styles.needsHead}>What your site needs to do</p>
              <ol className={styles.needs}>
                {current.needs.map((need) => (
                  <li key={need}>{need}</li>
                ))}
              </ol>
              <Link
                href={current.brief ? `/contact?for=${current.brief}` : "/contact"}
                className={styles.cta}
              >
                {current.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className={cx(styles.examples, current.examples.length > 1 && styles.examplesPair)}>
              {current.examples.map((site) => (
                <li key={site.title} className={styles.example}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.frame}
                  >
                    <span className={styles.chrome} aria-hidden="true">
                      <span className={styles.lights}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={styles.url}>{host(site.href)}</span>
                    </span>
                    <span className={styles.shot}>
                      <Image
                        src={site.image}
                        alt={`${site.title} website`}
                        fill
                        sizes="(max-width: 1024px) 90vw, 40vw"
                        className={styles.img}
                      />
                    </span>
                    <span className={styles.caption}>
                      <span>
                        <strong>{site.title}</strong>
                        <span className={styles.meta}>{site.meta}</span>
                      </span>
                      <span
                        className={cx(styles.kind, site.kind === "Client site" && styles.kindClient)}
                      >
                        {site.kind}
                      </span>
                    </span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
