"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hero, work } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Hero.module.css";

const sites = hero.showcase
  .map((title) => work.find((item) => item.title === title))
  .filter((item): item is (typeof work)[number] => Boolean(item));

const CYCLE_MS = 3600;

export function Hero() {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance. Keyed on `front` so a manual flick restarts the clock.
  useEffect(() => {
    if (paused || sites.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setFront((index) => (index + 1) % sites.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [front, paused]);

  const step = (by: number) =>
    setFront((index) => (index + by + sites.length) % sites.length);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={`display-hero ${styles.title}`}>
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h1>
          <p className={`body-lg ${styles.lede}`}>{hero.lede}</p>

          <div className={styles.start}>
            <p className={styles.ask} id="hero-ask">
              {hero.ask}
            </p>
            <ul className={styles.chips} aria-labelledby="hero-ask">
              {hero.starts.map((option) => (
                <li key={option.for}>
                  <Link
                    href={`${hero.ctaHref}?for=${option.for}`}
                    className={styles.chip}
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={hero.ctaHref} className={cx(styles.chip, styles.chipOther)}>
                  {hero.other} <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          <p className={styles.proof}>
            {hero.proof}{" "}
            <a href="#work" className={styles.workLink}>
              {hero.workLink} <span aria-hidden="true">↓</span>
            </a>
          </p>
        </div>

        <div className={styles.showcase}>
          <div
            className={styles.stack}
            role="group"
            aria-label="Recent client sites"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className={styles.flick}>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Previous site"
                onClick={() => step(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className={styles.count}>
                <span className="visually-hidden">Showing </span>
                {front + 1} / {sites.length}
                <span className="visually-hidden">: {sites[front]?.title}</span>
              </span>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Next site"
                onClick={() => step(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {sites.map((site, index) => {
              const depth = (index - front + sites.length) % sites.length;
              return (
                <button
                  key={site.title}
                  type="button"
                  className={cx(styles.card, styles[`depth${depth}`])}
                  aria-label={`${site.title}, ${site.meta}${depth === 0 ? " (showing)" : " — bring to front"}`}
                  aria-pressed={depth === 0}
                  onClick={() => setFront(index)}
                >
                  <span className={styles.chrome} aria-hidden="true">
                    <span className={styles.lights}>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.url}>
                      {site.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </span>
                  </span>
                  <span className={styles.shot}>
                    <Image
                      src={site.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 86vw, 44vw"
                      className={styles.img}
                      priority={index === 0}
                    />
                  </span>
                  <span className={styles.label} aria-hidden="true">
                    <strong>{site.title}</strong> {site.meta}
                  </span>
                </button>
              );
            })}
          </div>
          </div>
      </div>
    </section>
  );
}
