"use client";

import { FormEvent, useMemo, useState } from "react";
import { brief, site } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Brief.module.css";

type QuestionKey = keyof typeof brief.questions;
type Answers = Partial<Record<QuestionKey, string>>;

const order: QuestionKey[] = ["business", "plan", "current", "timing"];

function find(key: QuestionKey, id?: string) {
  if (!id) return undefined;
  const options = brief.questions[key].options as readonly {
    id: string;
    label: string;
    phrase: string;
    price?: string;
    time?: string;
  }[];
  return options.find((option) => option.id === id);
}

function Blank({ value, hint }: { value?: string; hint: string }) {
  return value ? (
    <mark className={styles.filled}>{value}</mark>
  ) : (
    <span className={styles.blank}>{hint}</span>
  );
}

export function Brief({
  initialPlan,
  initialBusiness,
}: {
  initialPlan?: string;
  initialBusiness?: string;
}) {
  const [answers, setAnswers] = useState<Answers>(() => ({
    plan: find("plan", initialPlan)?.id,
    business: find("business", initialBusiness)?.id,
  }));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const business = find("business", answers.business);
  const plan = find("plan", answers.plan);
  const current = find("current", answers.current);
  const timing = find("timing", answers.timing);

  const answered = order.filter((key) => answers[key]).length;
  const ready = answered === order.length && email.includes("@");

  const text = useMemo(() => {
    const lines = [
      `I run ${business?.phrase ?? "a business"}.`,
      `I need ${plan?.phrase ?? "a website"}.`,
      current?.phrase ?? "",
      `I’d like to start ${timing?.phrase ?? "soon"}.`,
    ].filter(Boolean);
    if (note.trim()) lines.push("", note.trim());
    lines.push("", name.trim(), email.trim());
    return lines.join("\n").trim();
  }, [business, plan, current, timing, note, name, email]);

  function pick(key: QuestionKey, id: string) {
    setAnswers((prev) => ({ ...prev, [key]: prev[key] === id ? undefined : id }));
    setStatus("");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`Copied. Paste it into an email to ${site.contactEmail}.`);
    } catch {
      setStatus(`Couldn’t copy — email ${site.contactEmail} directly.`);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = order.find((key) => !answers[key]);
    if (missing) {
      setStatus(`One more tap: ${brief.questions[missing].label.toLowerCase()}`);
      document.getElementById(`q-${missing}`)?.focus();
      return;
    }
    if (!email.includes("@")) {
      setStatus("Add an email so I can reply.");
      document.getElementById("brief-email")?.focus();
      return;
    }
    const who = name.trim() || email.trim();
    const subject = encodeURIComponent(
      `Brief: ${plan?.label ?? "Project"} for ${business?.label ?? "a business"} — ${who}`,
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${encodeURIComponent(text)}`;
    setStatus(
      "Your email app should open with the brief ready to send. Nothing happened? Use “Copy brief” instead.",
    );
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <form id="brief-form" className={styles.form} onSubmit={onSubmit} noValidate>
          <header className={styles.head}>
            <h1 className={`display-lg ${styles.title}`}>{brief.title}</h1>
            <p className={`body-lg ${styles.lede}`}>{brief.lede}</p>
            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Brief progress"
              aria-valuemin={0}
              aria-valuemax={order.length}
              aria-valuenow={answered}
            >
              {order.map((key) => (
                <span
                  key={key}
                  className={cx(styles.tick, answers[key] && styles.tickOn)}
                />
              ))}
            </div>
          </header>

          {order.map((key, index) => {
            const question = brief.questions[key];
            return (
              <fieldset key={key} className={styles.question}>
                <legend className={styles.legend}>
                  <span className={styles.num}>0{index + 1}</span>
                  {question.label}
                </legend>
                <div
                  className={styles.chips}
                  id={`q-${key}`}
                  tabIndex={-1}
                >
                  {question.options.map((option) => {
                    const on = answers[key] === option.id;
                    const price = "price" in option ? option.price : "";
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={on}
                        className={cx(styles.chip, on && styles.chipOn)}
                        onClick={() => pick(key, option.id)}
                      >
                        {option.label}
                        {price ? <span className={styles.chipMeta}>from {price}</span> : null}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          <fieldset className={styles.question}>
            <legend className={styles.legend}>
              <span className={styles.num}>05</span>
              Who should I reply to?
            </legend>
            <div className={styles.pair}>
              <label className={styles.field}>
                <span>Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input
                  id="brief-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  placeholder="you@business.com"
                />
              </label>
            </div>
            <label className={styles.field}>
              <span>
                Anything else? <em>Optional</em>
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="A link to your current site, a site you like, a deadline…"
              />
            </label>
          </fieldset>
        </form>

        <aside className={styles.card} aria-label="Your brief">
          <div className={styles.cardInner}>
            <p className={styles.cardEyebrow}>Your brief</p>
            <p className={styles.letter} aria-live="polite">
              I run <Blank value={business?.phrase} hint="what kind of business" />.
              {" "}I need <Blank value={plan?.phrase} hint="what you need" />.
              {" "}
              {current ? (
                <mark className={styles.filled}>{current.phrase}</mark>
              ) : (
                <>
                  <span className={styles.blank}>where your site is now</span>.
                </>
              )}
              {" "}I’d like to start <Blank value={timing?.phrase} hint="when" />.
            </p>

            <div className={styles.estimate}>
              {plan?.price ? (
                <>
                  <span className={styles.estimateLabel}>Starting from</span>
                  <span className={styles.estimatePrice}>{plan.price}</span>
                  <span className={styles.estimateTime}>{plan.time}</span>
                </>
              ) : (
                <span className={styles.estimateTime}>
                  {plan
                    ? "We’ll work out the right size together on a call."
                    : "Pick what you need to see a starting price."}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                form="brief-form"
                className={cx(styles.send, ready && styles.sendReady)}
              >
                Send brief
              </button>
              <button type="button" className={styles.copy} onClick={copy}>
                Copy brief
              </button>
            </div>
            {status ? (
              <p className={styles.status} role="status">
                {status}
              </p>
            ) : null}

            <ol className={styles.next}>
              {brief.next.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
