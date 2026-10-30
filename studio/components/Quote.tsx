"use client";

import Image from "next/image";
import { Fragment, useState, type ReactNode } from "react";
import { PillTag } from "@/components/PillTag";
import { quote, testimonial, work } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Quote.module.css";

const siteFor = (title: string) => work.find((item) => item.title === title);
const host = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");

/** Wrap each theme phrase found in the paragraph; the text itself is untouched. */
function markUp(paragraph: string, active: string | null): ReactNode[] {
  const hits = testimonial.themes
    .map((theme) => ({ theme, at: paragraph.indexOf(theme.phrase) }))
    .filter((hit) => hit.at !== -1)
    .sort((a, b) => a.at - b.at);

  const out: ReactNode[] = [];
  let cursor = 0;
  for (const { theme, at } of hits) {
    if (at < cursor) continue;
    out.push(<Fragment key={`t-${cursor}`}>{paragraph.slice(cursor, at)}</Fragment>);
    out.push(
      <mark
        key={theme.id}
        className={cx(
          styles.mark,
          active === theme.id && styles.markOn,
          active && active !== theme.id && styles.markDim,
        )}
      >
        {theme.phrase}
      </mark>,
    );
    cursor = at + theme.phrase.length;
  }
  out.push(<Fragment key="end">{paragraph.slice(cursor)}</Fragment>);
  return out;
}

function SiteStrip({ title, label }: { title: string; label: string }) {
  const site = siteFor(title);
  if (!site) return null;
  return (
    <a
      href={site.href}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.site}
    >
      <span className={styles.siteShot}>
        <Image src={site.image} alt="" fill sizes="(max-width: 1024px) 40vw, 18rem" className={styles.siteImg} />
      </span>
      <span className={styles.siteText}>
        <span className={styles.siteLabel}>{label}</span>
        <span className={styles.siteName}>
          {site.live ? host(site.href) : site.title} <span aria-hidden="true">↗</span>
        </span>
      </span>
    </a>
  );
}

export function Quote() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="global-section" aria-labelledby="reviews-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.tag}>
            <PillTag>Reviews</PillTag>
          </div>
          <h2 id="reviews-heading" className={`display-lg ${styles.heading}`}>
            In their words
          </h2>
          <p className={`body-lg ${styles.lede}`}>
            Unedited, from clients — next to the sites they got.
          </p>
        </header>

        <div className={styles.grid}>
          <figure className={styles.punch}>
            <span className={styles.bigQuote} aria-hidden="true">
              “
            </span>
            <blockquote className={styles.punchText}>
              <p>{quote.text}</p>
            </blockquote>
            <figcaption className={styles.who}>
              <span className={styles.avatar} aria-hidden="true">
                {quote.name.charAt(0)}
              </span>
              <span>
                <span className={styles.name}>{quote.name}</span>
                <span className={styles.role}>{quote.role}</span>
              </span>
            </figcaption>
            <SiteStrip title={quote.site} label="The site he’s talking about" />
          </figure>

          <figure className={styles.letter}>
            <div className={styles.letterHead}>
              <p className={styles.skim} id="themes-label">
                Short on time? Tap what matters to you.
              </p>
              <div className={styles.themes} role="group" aria-labelledby="themes-label">
                {testimonial.themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    aria-pressed={active === theme.id}
                    className={cx(styles.theme, active === theme.id && styles.themeOn)}
                    onClick={() => setActive((now) => (now === theme.id ? null : theme.id))}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            <blockquote className={styles.letterText}>
              {testimonial.paragraphs.map((paragraph) => (
                <p key={paragraph}>{markUp(paragraph, active)}</p>
              ))}
            </blockquote>

            <figcaption className={styles.who}>
              <span className={cx(styles.avatar, styles.avatarLight)} aria-hidden="true">
                {testimonial.name.charAt(0)}
              </span>
              <span>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.role}>{testimonial.role}</span>
              </span>
            </figcaption>
            <SiteStrip title={testimonial.site} label="The site she’s talking about" />
          </figure>
        </div>
      </div>
    </section>
  );
}
