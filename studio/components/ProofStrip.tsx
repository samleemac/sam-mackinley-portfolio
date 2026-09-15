import { craftMarks, hero } from "@/content";
import styles from "./ProofStrip.module.css";

function MarkList({ suffix }: { suffix: string }) {
  return (
    <ul className={styles.list}>
      {craftMarks.map((mark) => (
        <li key={`${suffix}-${mark}`} className={styles.item}>
          {mark}
        </li>
      ))}
    </ul>
  );
}

export function ProofStrip() {
  return (
    <section className={styles.section}>
      <p className={styles.caption}>{hero.proof}</p>
      <div className="container">
        <div className={styles.desktop}>
          <MarkList suffix="desktop" />
        </div>
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            <MarkList suffix="a" />
            <MarkList suffix="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
