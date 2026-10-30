"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/Button";
import { PillTag } from "@/components/PillTag";
import { plans, process } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Process.module.css";

type PlanId = keyof typeof process.plans;
const planIds = Object.keys(process.plans) as PlanId[];
const DAY = 86_400_000;

// Today, read only in the browser so server and client HTML agree.
const noop = () => () => {};
const useToday = () =>
  useSyncExternalStore(
    noop,
    () => new Date().toISOString().slice(0, 10),
    () => "",
  );

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function nextMonday(todayIso: string) {
  const today = parse(todayIso);
  const ahead = ((8 - today.getUTCDay()) % 7) || 7;
  return iso(new Date(today.getTime() + ahead * DAY));
}

const long = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});
const short = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

function weekLabel(from: number, length: number) {
  const first = Math.floor(from) + 1;
  const last = Math.ceil(from + length);
  return first === last ? `Week ${first}` : `Weeks ${first}–${last}`;
}

export function Process() {
  const [plan, setPlan] = useState<PlanId>("site");
  const [picked, setPicked] = useState("");
  const today = useToday();

  const current = process.plans[plan];
  const total = current.weeks.reduce((sum, w) => sum + w, 0);
  const start = picked || (today ? nextMonday(today) : "");
  const startDate = start ? parse(start) : null;
  const liveFrom = startDate
    ? new Date(startDate.getTime() + current.range[0] * 7 * DAY)
    : null;
  const liveTo = startDate
    ? new Date(startDate.getTime() + current.range[1] * 7 * DAY)
    : null;

  const stages = process.stages.map((stage, index) => {
    const length = current.weeks[index];
    const from = current.weeks.slice(0, index).reduce((sum, w) => sum + w, 0);
    return { ...stage, from, length, label: weekLabel(from, length) };
  });

  return (
    <section id="process" className="global-section" aria-labelledby="process-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.tag}>
            <PillTag>Process</PillTag>
          </div>
          <h2 id="process-heading" className={`display-lg ${styles.heading}`}>
            When would you be live?
          </h2>
          <p className={`body-lg ${styles.lede}`}>
            Pick a plan and a start date. Here’s the whole project, week by
            week — what I do, what I need from you, and what you get.
          </p>
        </header>

        <div className={styles.planner}>
          <div className={styles.controls}>
            <div className={styles.switch} role="group" aria-label="Plan">
              {planIds.map((id) => {
                const option = process.plans[id];
                const price = plans.find((item) => item.id === id)?.price;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={plan === id}
                    className={cx(styles.switchBtn, plan === id && styles.switchOn)}
                    onClick={() => setPlan(id)}
                  >
                    <span className={styles.switchTop}>
                      <span className={styles.switchName}>{option.label}</span>
                      <span className={styles.switchMeta}>
                        {option.range[0]}–{option.range[1]} weeks
                        {price ? ` · from ${price}` : ""}
                      </span>
                    </span>
                    <span className={styles.switchWhat}>{option.what}</span>
                  </button>
                );
              })}
            </div>

            <label className={styles.startField}>
              <span>Start</span>
              <input
                type="date"
                value={start}
                min={today || undefined}
                onChange={(event) => setPicked(event.target.value)}
              />
            </label>
          </div>

          <p className={styles.answer} aria-live="polite">
            {liveFrom && liveTo ? (
              <>
                Starting <b>{long.format(startDate!)}</b>, you’d typically be
                live between{" "}
                <mark className={styles.live}>
                  {short.format(liveFrom)} and {short.format(liveTo)}
                </mark>
                .
              </>
            ) : (
              <>
                {current.label} typically takes {current.range[0]}–
                {current.range[1]} weeks from kickoff to live.
              </>
            )}
          </p>

          <div className={styles.track} aria-hidden="true">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={cx(styles.segment, styles[`seg${index}`])}
                style={{ flexGrow: stage.length }}
              >
                <span>{stage.title}</span>
              </div>
            ))}
          </div>
          <div className={styles.ticks} aria-hidden="true">
            <span className={styles.end}>Start</span>
            {Array.from({ length: Math.floor(total) }, (_, index) => (
              <span
                key={index}
                className={styles.week}
                style={{ left: `${((index + 0.5) / total) * 100}%` }}
              >
                W{index + 1}
              </span>
            ))}
            <span className={cx(styles.end, styles.endLive)}>Live</span>
          </div>

          <ol className={styles.stages}>
            {stages.map((stage, index) => (
              <li key={stage.id} className={styles.stage}>
                <p className={cx(styles.when, styles[`dot${index}`])}>
                  {stage.label}
                </p>
                <h3 className={styles.title}>{stage.title}</h3>
                <dl className={styles.facts}>
                  <div>
                    <dt>I do</dt>
                    <dd>{stage.sam}</dd>
                  </div>
                  <div>
                    <dt>You do</dt>
                    <dd>{stage.you}</dd>
                  </div>
                  <div className={styles.get}>
                    <dt>You get</dt>
                    <dd>{stage.get}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>

          <div className={styles.footer}>
            <Button href={`/contact?plan=${plan}`} size="lg">
              Start with {current.label}
            </Button>
            <p className={styles.note}>{process.partnerNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
