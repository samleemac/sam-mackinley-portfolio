import Link from "next/link";
import { brief, hero } from "@/content";
import { HeroDemo } from "./HeroDemo";
import styles from "./Hero.module.css";

const launch = brief.questions.plan.options.find((option) => option.id === "launch")!;

export function Hero() {
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
                  <Link href={`${hero.ctaHref}?for=${option.for}`} className={styles.chip}>
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Link href={hero.ctaHref} className={styles.primary}>
                {hero.ctaLabel} <span aria-hidden="true">→</span>
              </Link>
              <a href="#work" className={styles.workLink}>
                {hero.workLink} <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.terms}>
              <strong>From {launch.price}</strong>, {launch.time} to launch. {hero.ctaNote}
            </p>
          </div>

          <p className={styles.proof}>{hero.proof}</p>
        </div>

        <div className={styles.showcase}>
          <HeroDemo />
        </div>
      </div>
      <a href="#work" className={styles.cue} aria-hidden="true" tabIndex={-1}>
        <span>Scroll for the work</span>
        <i />
      </a>
    </section>
  );
}
