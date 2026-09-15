import { faqs } from "@/content";
import styles from "./FAQ.module.css";

export function FAQ() {
  return (
    <section className="global-section">
      <div className="container">
        <header className="section-header">
          <h2 className={`display-lg ${styles.heading}`}>Before you write</h2>
        </header>
        <div className={styles.list}>
          {faqs.map((item) => (
            <details key={item.q} className={styles.item}>
              <summary className={styles.q}>
                <span className={styles.qText}>{item.q}</span>
                <span className={styles.toggle} aria-hidden="true">
                  <span />
                  <span />
                </span>
              </summary>
              <p className={styles.a}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
