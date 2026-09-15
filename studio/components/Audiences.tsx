import Image from "next/image";
import { audiences } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Audiences.module.css";

function ConceptSlot({
  label,
  image,
}: {
  label: string;
  image?: string;
}) {
  return (
    <figure className={styles.slot}>
      <div className={styles.frame}>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 74vw, (max-width: 1440px) 32vw, 40rem"
            className={styles.photo}
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            {label}
          </span>
        )}
      </div>
      <figcaption className={image ? styles.caption : "visually-hidden"}>
        {label}
      </figcaption>
    </figure>
  );
}

export function Audiences() {
  return (
    <section
      id="who"
      className="global-section"
      aria-labelledby="who-heading"
    >
      <div className="container">
        <header className="section-header">
          <h2 id="who-heading" className={`display-lg ${styles.heading}`}>
            Who I&apos;m good for
          </h2>
          <p className="body-lg centered">
            Owner-operators and independents who have outgrown a template. Same
            craft, different point of view.
          </p>
        </header>
        <ul className={styles.grid}>
          {audiences.map((audience) => (
            <li
              key={audience.id}
              className={cx(
                styles.card,
                styles[audience.id],
                styles[audience.tone],
              )}
            >
              <div className={styles.copy}>
                <h3 className={styles.title}>{audience.title}</h3>
                <p className={styles.fit}>{audience.fit}</p>
                <p className={styles.body}>{audience.body}</p>
              </div>
              <div className={styles.concepts}>
                {audience.concepts.map((concept) => (
                  <ConceptSlot
                    key={concept.label}
                    label={concept.label}
                    image={concept.image}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
