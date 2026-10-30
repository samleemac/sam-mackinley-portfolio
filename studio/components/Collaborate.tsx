"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/Button";
import { PillTag } from "@/components/PillTag";
import { practice } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Collaborate.module.css";

type ModeId = (typeof practice.modes)[number]["id"];

export function Collaborate() {
  const [scenario, setScenario] = useState(0);
  const [mobileMode, setMobileMode] = useState<ModeId>("sam");
  const [seen, setSeen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = practice.scenarios[scenario];

  // Play the first conversation when the section scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="global-section" aria-labelledby="practice-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.tag}>
            <PillTag>Built as a practice</PillTag>
          </div>
          <h2 id="practice-heading" className={`display-lg ${styles.heading}`}>
            One designer. No handoffs.
          </h2>
          <p className={`body-lg ${styles.lede}`}>
            The same request, three ways. Pick one and watch what happens
            next.
          </p>
        </header>

        <div className={styles.scenarios} role="group" aria-label="Pick a request">
          {practice.scenarios.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === scenario}
              className={cx(styles.scenario, index === scenario && styles.scenarioOn)}
              onClick={() => setScenario(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.switch} role="group" aria-label="Show the conversation for">
          {practice.modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              aria-pressed={mobileMode === mode.id}
              className={cx(styles.switchBtn, mobileMode === mode.id && styles.switchOn)}
              onClick={() => setMobileMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div ref={rootRef} className={cx(styles.columns, seen && styles.play)}>
          {practice.modes.map((mode) => {
            const thread = current.threads[mode.id];
            const isSam = mode.id === "sam";
            return (
              <article
                key={mode.id}
                className={cx(
                  styles.column,
                  isSam && styles.columnSam,
                  mobileMode === mode.id && styles.columnShown,
                )}
                aria-label={`${mode.label}: ${current.tally[mode.id]}`}
              >
                <header className={styles.columnHead}>
                  <span className={styles.columnName}>{mode.label}</span>
                  {isSam ? <span className={styles.badge}>One person</span> : null}
                </header>

                <ol className={styles.thread} key={`${current.id}-${seen}`}>
                  {thread.map((message, index) => (
                    <li
                      key={index}
                      className={cx(
                        styles.message,
                        message.from === "you" ? styles.you : styles.them,
                      )}
                      style={{ "--i": index } as CSSProperties}
                    >
                      {message.name ? (
                        <span className={styles.name}>{message.name}</span>
                      ) : (
                        <span className="visually-hidden">You:</span>
                      )}
                      <span className={styles.bubble}>{message.text}</span>
                    </li>
                  ))}
                </ol>

                <p
                  className={styles.tally}
                  key={`tally-${current.id}-${seen}`}
                  style={{ "--i": thread.length } as CSSProperties}
                >
                  {current.tally[mode.id]}
                </p>
              </article>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Button href="/contact" size="lg">
            Work with one person
          </Button>
          <p className={styles.ctaNote}>
            The person you brief is the person who builds it.
          </p>
        </div>
      </div>
    </section>
  );
}
