import type { CSSProperties } from "react";
import { PillTag } from "@/components/PillTag";
import { services } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Services.module.css";

type ServiceTone = (typeof services)[number]["tone"];

function ServiceMedia({ tone }: { tone: ServiceTone }) {
  if (tone === "cyan") {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className={styles.tile}
            style={{ "--i": String(i) } as CSSProperties}
          />
        ))}
      </div>
    );
  }

  if (tone === "violet") {
    return (
      <div className={styles.orbit}>
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.hub} />
        <span className={styles.arm}>
          <span className={styles.dot} />
        </span>
      </div>
    );
  }

  return (
    <div className={styles.specimens}>
      <span className={styles.specimenAa}>Aa</span>
      <span className={styles.specimenNum}>12</span>
      <span className={styles.specimenTrack}>—4.5</span>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="global-section">
      <div className="container">
        <header className="section-header">
          <PillTag>What I do</PillTag>
          <h2 className={`display-lg ${styles.heading}`}>
            From idea to a site that ships
          </h2>
          <p className="body-lg centered">
            Design, build, and the work after launch — treated as one craft, not
            three vendors.
          </p>
        </header>
        <ul className={styles.cards}>
          {services.map((service) => (
            <li
              key={service.title}
              className={cx(styles.card, styles[service.tone])}
            >
              <div className={styles.media} aria-hidden="true">
                <ServiceMedia tone={service.tone} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  <span className={styles.mark}>{service.title}</span>
                </h3>
                <p className={styles.body}>{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
