"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PillTag } from "@/components/PillTag";
import { pricing } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Plans.module.css";

type Path = "partner" | "mix";
type PagesId = (typeof pricing.pages)[number]["id"];

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
const tiers = pricing.partner.tiers;
const BEYOND = tiers.length; // slider stop after the last tier = "25+"

export function Plans() {
  const [path, setPath] = useState<Path>("partner");
  const [stop, setStop] = useState(1);
  const [pages, setPages] = useState<PagesId>("5");
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(["design", "build"]),
  );

  const tier = stop < BEYOND ? tiers[stop] : null;

  function toggle(id: string) {
    setPicked((now) => {
      const next = new Set(now);
      if (next.has(id)) {
        next.delete(id);
        // An admin backend edits the CMS, so it goes if the CMS goes.
        pricing.items
          .filter((item) => item.needs === id)
          .forEach((item) => next.delete(item.id));
      } else {
        next.add(id);
        const needs = pricing.items.find((item) => item.id === id)?.needs;
        if (needs) next.add(needs);
      }
      return next;
    });
  }

  const pageIndex = pricing.pages.findIndex((p) => p.id === pages);
  const pagesLabel = pricing.pages[pageIndex].label;

  const mix = useMemo(() => {
    const lines = pricing.items
      .filter((item) => picked.has(item.id))
      .map((item) => {
        if (item.byPages) {
          const amount = pages === "more" ? null : item.byPages[pageIndex];
          return { item, label: `${item.name} · ${pagesLabel.toLowerCase()}`, oneOff: amount, monthly: 0 };
        }
        return { item, label: item.name, oneOff: item.price ?? 0, monthly: item.monthly ?? 0 };
      });
    const quote = lines.some((line) => line.oneOff === null);
    const oneOff = lines.reduce((sum, line) => sum + (line.oneOff ?? 0), 0);
    const monthly = lines.reduce((sum, line) => sum + line.monthly, 0);
    return { lines, quote, oneOff, monthly };
  }, [picked, pages, pageIndex, pagesLabel]);

  const partnerNote = tier
    ? `Partner: up to ${tier.hours} hours a month (${gbp(tier.price)}/month).`
    : "Partner: more than 25 hours a month — let’s talk.";
  const partnerHref = `/contact?plan=partner&note=${encodeURIComponent(partnerNote)}`;

  const mixNote = mix.lines.length
    ? `My pick and mix: ${mix.lines.map((l) => l.label).join(", ")}. Estimate: ${
        mix.quote ? "to be quoted" : `from ${gbp(mix.oneOff)}`
      }${mix.monthly ? ` + ${gbp(mix.monthly)}/month` : ""}.`
    : "";
  const mixPlan = pages === "1" ? "launch" : "site";
  const mixHref = `/contact?plan=${mixPlan}${mixNote ? `&note=${encodeURIComponent(mixNote)}` : ""}`;
  const nudge = picked.has("hosting") || picked.has("seo");

  return (
    <section id="plans" className="global-section" aria-labelledby="plans-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.tag}>
            <PillTag>Plans</PillTag>
          </div>
          <h2 id="plans-heading" className={`display-lg ${styles.heading}`}>
            Only pay for what you need
          </h2>
          <p className={`body-lg ${styles.lede}`}>
            Hand the whole website to me each month, or pick exactly the
            pieces you want. Prices are starting points; I confirm the number
            before anything is billed.
          </p>
        </header>

        <div className={styles.paths} role="tablist" aria-label="How you’d like to pay">
          <button
            type="button"
            role="tab"
            id="tab-partner"
            aria-selected={path === "partner"}
            aria-controls="panel-partner"
            className={cx(styles.pathBtn, path === "partner" && styles.pathOn)}
            onClick={() => setPath("partner")}
          >
            <span className={styles.pathTop}>
              Partner <span className={styles.rec}>Recommended</span>
            </span>
            <span className={styles.pathSub}>Monthly. I look after everything.</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-mix"
            aria-selected={path === "mix"}
            aria-controls="panel-mix"
            className={cx(styles.pathBtn, path === "mix" && styles.pathOn)}
            onClick={() => setPath("mix")}
          >
            <span className={styles.pathTop}>Pick and mix</span>
            <span className={styles.pathSub}>One-off. Choose your pieces.</span>
          </button>
        </div>

        {path === "partner" ? (
          <div id="panel-partner" role="tabpanel" aria-labelledby="tab-partner" className={styles.partner}>
            <div className={styles.partnerCopy}>
              <h3 className={styles.partnerTitle}>
                Leave the website to me. You do what you do best.
              </h3>
              <p className={styles.partnerLede}>
                One monthly fee covers hosting, SEO and every technical job,
                plus design and build hours for whatever you need next.
              </p>
              <ul className={styles.includes}>
                {pricing.partner.includes.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.dial}>
              <label className={styles.dialLabel} htmlFor="partner-hours">
                Hours a month
              </label>
              <p className={styles.hours} aria-hidden="true">
                {tier ? (
                  <>
                    <span key={tier.hours} className={styles.hoursNum}>
                      {tier.hours}
                    </span>
                    <span className={styles.hoursUnit}>hours</span>
                  </>
                ) : (
                  <>
                    <span className={styles.hoursNum}>25+</span>
                    <span className={styles.hoursUnit}>hours</span>
                  </>
                )}
              </p>

              <input
                id="partner-hours"
                className={styles.slider}
                type="range"
                min={0}
                max={BEYOND}
                step={1}
                value={stop}
                onChange={(event) => setStop(Number(event.target.value))}
                aria-valuetext={tier ? `${tier.hours} hours, ${gbp(tier.price)} a month` : "More than 25 hours, let’s talk"}
                style={{ "--fill": `${(stop / BEYOND) * 100}%` } as React.CSSProperties}
              />
              <div className={styles.stops} aria-hidden="true">
                {tiers.map((t, i) => (
                  <button key={t.hours} type="button" tabIndex={-1} className={cx(styles.stopBtn, stop === i && styles.stopOn)} onClick={() => setStop(i)}>
                    {t.hours}
                  </button>
                ))}
                <button type="button" tabIndex={-1} className={cx(styles.stopBtn, stop === BEYOND && styles.stopOn)} onClick={() => setStop(BEYOND)}>
                  25+
                </button>
              </div>

              <div className={styles.priceRow} aria-live="polite">
                {tier ? (
                  <>
                    <p className={styles.price}>
                      {gbp(tier.price)}
                      <span>/month</span>
                    </p>
                    <p className={styles.priceNote}>
                      Up to {tier.hours} hours, never a minimum. Works out at{" "}
                      {gbp(Math.round(tier.price / tier.hours))} an hour, with hosting, SEO and upkeep included.
                    </p>
                  </>
                ) : (
                  <>
                    <p className={styles.price}>Let’s talk</p>
                    <p className={styles.priceNote}>{pricing.partner.beyond} We’ll size it to the work.</p>
                  </>
                )}
              </div>

              {tier ? <p className={styles.example}>For example: {tier.example.toLowerCase()}.</p> : null}

              <Link href={partnerHref} className={styles.go}>
                {tier ? `Start Partner at ${tier.hours} hours` : "Talk about more hours"} <span aria-hidden="true">→</span>
              </Link>
              <p className={styles.small}>No minimum term. Pause or cancel with 30 days’ notice.</p>
            </div>
          </div>
        ) : (
          <div id="panel-mix" role="tabpanel" aria-labelledby="tab-mix" className={styles.mix}>
            <div className={styles.shelf}>
              <div className={styles.pagesRow}>
                <span className={styles.pagesLabel} id="pages-label">
                  How big is the site?
                </span>
                <div className={styles.pages} role="group" aria-labelledby="pages-label">
                  {pricing.pages.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={pages === option.id}
                      className={cx(styles.pageBtn, pages === option.id && styles.pageOn)}
                      onClick={() => setPages(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <ul className={styles.tiles}>
                {pricing.items.map((item) => {
                  const on = picked.has(item.id);
                  const price = item.byPages
                    ? pages === "more"
                      ? "Quoted"
                      : gbp(item.byPages[pageIndex])
                    : item.monthly
                      ? `${gbp(item.monthly)}/mo`
                      : gbp(item.price ?? 0);
                  const needs = item.needs ? pricing.items.find((x) => x.id === item.needs)?.name : null;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        className={cx(styles.tile, on && styles.tileOn)}
                        onClick={() => toggle(item.id)}
                      >
                        <span className={styles.tileTop}>
                          <span className={styles.tick} aria-hidden="true">
                            {on ? "✓" : "+"}
                          </span>
                          <span className={styles.tilePrice}>{price}</span>
                        </span>
                        <span className={styles.tileName}>{item.name}</span>
                        <span className={styles.tileWhat}>{item.what}</span>
                        {needs ? <span className={styles.tileNeeds}>Comes with {needs}</span> : null}
                        {item.id === "hosting" ? <span className={styles.tileNeeds}>Included in Partner</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Phones: running total pinned to the bottom while picking. */}
            <div className={styles.bar} aria-hidden="true">
              <span className={styles.barTotal}>
                <span>{mix.lines.length} picked</span>
                <strong>
                  {mix.quote ? "Quoted" : gbp(mix.oneOff)}
                  {mix.monthly ? ` + ${gbp(mix.monthly)}/mo` : ""}
                </strong>
              </span>
              <a href="#mix-receipt" className={styles.barBtn} tabIndex={-1}>
                See mix ↓
              </a>
            </div>

            <aside id="mix-receipt" className={styles.receipt} aria-label="Your mix">
              <p className={styles.receiptHead}>Your mix</p>
              {mix.lines.length ? (
                <ul className={styles.lines}>
                  {mix.lines.map((line) => (
                    <li key={line.item.id}>
                      <span>{line.label}</span>
                      <span>
                        {line.oneOff === null
                          ? "Quoted"
                          : line.monthly
                            ? `${gbp(line.monthly)}/mo`
                            : gbp(line.oneOff)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.empty}>Tap the pieces you want.</p>
              )}
              <div className={styles.total}>
                <span>One-off, from</span>
                <strong>{mix.quote ? "Quoted" : gbp(mix.oneOff)}</strong>
              </div>
              {mix.monthly ? (
                <div className={styles.total}>
                  <span>Monthly</span>
                  <strong>{gbp(mix.monthly)}/mo</strong>
                </div>
              ) : null}

              <Link
                href={mixHref}
                className={cx(styles.go, styles.goDark)}
                aria-disabled={!mix.lines.length}
                tabIndex={mix.lines.length ? undefined : -1}
                onClick={(event) => {
                  if (!mix.lines.length) event.preventDefault();
                }}
              >
                Send me this mix <span aria-hidden="true">→</span>
              </Link>

              {nudge ? (
                <p className={styles.nudge}>
                  Hosting and SEO are included in Partner, with design and
                  build hours on top.{" "}
                  <button type="button" onClick={() => setPath("partner")}>
                    Compare Partner
                  </button>
                </p>
              ) : (
                <p className={styles.small}>Starting prices. I confirm the number before anything is billed.</p>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
