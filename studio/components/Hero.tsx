import { Button } from "@/components/Button";
import { PillTag } from "@/components/PillTag";
import { hero } from "@/content";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.tag}>
          <PillTag size="s" className={styles.pill}>
            <strong className={styles.pillLead}>{hero.pillLead}</strong>
            <span>{hero.pill}</span>
            <a
              className={styles.pillLink}
              href={hero.pillHref}
              target="_blank"
              rel="noreferrer noopener"
            >
              {hero.pillLink}
            </a>
          </PillTag>
        </div>
        <h1 className={`display-hero ${styles.title}`}>
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </h1>
        <p className={`body-lg centered ${styles.lede}`}>{hero.lede}</p>
        <div className={styles.cta}>
          <Button href={hero.ctaHref} size="lg">
            {hero.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
