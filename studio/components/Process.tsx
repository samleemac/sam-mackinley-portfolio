import { process } from "@/content";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section id="process" className="global-section">
      <div className="container">
        <header className="section-header">
          <h2 className={`display-lg ${styles.heading}`}>How a project runs</h2>
          <p className="body-lg centered">
            Four stages. No mystery timeline. You always know what we’re making
            and when it ships.
          </p>
        </header>
        <ol className={styles.list}>
          {process.map((item) => (
            <li key={item.step} className={styles.row}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
