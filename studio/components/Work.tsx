"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PillTag } from "@/components/PillTag";
import { work } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Work.module.css";

// Wide frames render the live site at desktop width and scale it down, so
// visitors see the real desktop layout. Narrow frames (phones) render it
// at its own width, so they see the real mobile layout.
const DESKTOP_WIDTH = 1440;
const SCALE_BELOW = 900;

const host = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function Work() {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const screenRef = useRef<HTMLDivElement>(null);

  const project = work[active];
  const showLive = live && project.live;

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setFrame({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaled = frame.width >= SCALE_BELOW;
  const nativeWidth = scaled ? DESKTOP_WIDTH : frame.width;
  const scale = scaled && frame.width ? frame.width / DESKTOP_WIDTH : 1;
  const nativeHeight = frame.height / scale;

  function choose(index: number) {
    if (index === active) return;
    setActive(index);
    setLoaded(false);
  }

  return (
    <section id="work" className={cx("global-section", styles.section)} aria-labelledby="work-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.tag}>
            <PillTag>Work</PillTag>
          </div>
          <h2 id="work-heading" className={`display-lg ${styles.heading}`}>
            Don’t take my word for it. Use them.
          </h2>
          <p className={`body-lg ${styles.lede}`}>
            Real client sites, running live right here. Pick one, then scroll
            inside it, open the menu, click around.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.side}>
            <ol className={styles.list} aria-label="Projects">
              {work.map((item, index) => (
                <li key={item.title}>
                  <button
                    type="button"
                    aria-pressed={index === active}
                    className={cx(styles.item, index === active && styles.itemOn)}
                    onClick={() => choose(index)}
                  >
                    <span className={styles.num}>0{index + 1}</span>
                    <span className={styles.itemText}>
                      <span className={styles.itemTitle}>{item.title}</span>
                      <span className={styles.itemMeta}>{item.meta}</span>
                    </span>
                    {item.live ? (
                      <span className={styles.liveTag}>
                        <i aria-hidden="true" /> Live
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.detail} key={project.title}>
              <p className={styles.note}>{project.note}</p>
              <div className={styles.actions}>
                <Link
                  href={project.for ? `/contact?for=${project.for}` : "/contact"}
                  className={styles.want}
                >
                  I want one like this <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.open}
                >
                  Open {project.live ? "site" : "the portfolio"} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <figure className={styles.browser}>
            <div className={styles.chrome}>
              <span className={styles.lights} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>
                {showLive ? <i className={styles.urlDot} aria-hidden="true" /> : null}
                {host(project.href)}
              </span>
              {showLive ? (
                <button type="button" className={styles.done} onClick={() => setLive(false)}>
                  Done
                </button>
              ) : null}
            </div>

            <div className={styles.screen} ref={screenRef}>
              <Image
                key={project.image}
                src={project.image}
                alt={`${project.title} website`}
                fill
                sizes="(max-width: 1024px) 92vw, 64vw"
                className={cx(styles.poster, showLive && loaded && styles.posterHidden)}
              />

              {showLive && frame.width ? (
                <div
                  className={styles.scaler}
                  style={{
                    width: nativeWidth,
                    height: nativeHeight,
                    transform: `scale(${scale})`,
                  }}
                >
                  <iframe
                    key={project.href}
                    src={project.href}
                    title={`${project.title} — live site`}
                    className={cx(styles.iframe, loaded && styles.iframeOn)}
                    width={nativeWidth}
                    height={nativeHeight}
                    onLoad={() => setLoaded(true)}
                  />
                </div>
              ) : null}

              {showLive && !loaded ? (
                <p className={styles.loading} role="status">
                  Loading {project.title}…
                </p>
              ) : null}

              {!showLive ? (
                <div className={styles.cover}>
                  {project.live ? (
                    <button type="button" className={styles.try} onClick={() => setLive(true)}>
                      <span className={styles.tryPulse} aria-hidden="true" />
                      Try {project.title} live
                    </button>
                  ) : (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cx(styles.try, styles.tryQuiet)}
                    >
                      See it on the portfolio <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              ) : null}
            </div>

            <figcaption className={styles.caption}>
              <strong>{project.title}</strong> · {project.meta}
              <span className={styles.hint}>
                {showLive
                  ? "You’re using the real site. Tap Done to get back to scrolling."
                  : project.live
                    ? "Screenshot. Tap to load the real thing."
                    : "Screenshot."}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
