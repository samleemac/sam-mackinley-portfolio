import { Button } from "@/components/Button";
import { PillTag } from "@/components/PillTag";
import { plans } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Plans.module.css";

export function Plans() {
  return (
    <section id="plans" className="global-section">
      <div className="container">
        <header className="section-header">
          <PillTag>Plans</PillTag>
          <h2 className={`display-lg ${styles.heading}`}>Pick a starting point</h2>
          <p className="body-lg centered">
            Prices are starting points, not a menu. If the work is a fit, we
            confirm scope before anything is billed.
          </p>
        </header>
        <ul className={styles.cards}>
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={cx(styles.card, plan.featured && styles.featured)}
            >
              {plan.featured ? (
                <span className={styles.watermark} aria-hidden="true">
                  {plan.name}
                </span>
              ) : null}
              {plan.tag ? (
                <span className={styles.tag}>
                  <PillTag tone="lime" size="s">
                    {plan.tag}
                  </PillTag>
                </span>
              ) : null}
              <p className={styles.name}>{plan.name}</p>
              <p className={styles.price}>
                <span className={styles.cadence}>{plan.cadence}</span>
                {plan.price}
              </p>
              <p className={styles.summary}>{plan.summary}</p>
              <ul className={styles.includes}>
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={plan.featured ? "violet" : "grey"}
                className={styles.cta}
              >
                {plan.cta}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
