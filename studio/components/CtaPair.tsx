import { Button } from "@/components/Button";
import { cx } from "@/lib/cx";
import styles from "./CtaPair.module.css";

export function CtaPair() {
  return (
    <section className="global-section">
      <div className="container">
        <h2 className="visually-hidden">Portfolio and plans</h2>
        <div className={styles.pair}>
          <article className={cx(styles.card, styles.paper)}>
            <p className={`eyebrow ${styles.eyebrow}`}>Portfolio</p>
            <h3 className={styles.title}>See the work.</h3>
            <p className={styles.body}>
              Selected work lives on the studio site — a clothesline of pages
              you can hover, scroll, and rearrange. This page is for the
              commercial conversation.
            </p>
            <Button
              href="https://sammackinley.com"
              external
              className={styles.action}
            >
              Open the playground
            </Button>
          </article>
          <article className={cx(styles.card, styles.wash)}>
            <p className={`eyebrow ${styles.eyebrow}`}>Plans</p>
            <h3 className={styles.title}>Start for a number you can defend.</h3>
            <p className={styles.body}>
              Launch, Site, and Partner are starting points with numbers on
              them. If the work is a fit, we lock scope before anything is
              billed.
            </p>
            <Button href="#plans" variant="black" className={styles.action}>
              See the plans
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
