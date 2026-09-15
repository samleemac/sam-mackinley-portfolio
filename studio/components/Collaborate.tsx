import { Button } from "@/components/Button";
import { PillTag } from "@/components/PillTag";
import styles from "./Collaborate.module.css";

const points = [
  {
    title: "Same person from first sketch to launch",
    body: "The sketch, the system, and the production files stay with the same designer. Nothing gets lost in a handoff, because there is no handoff.",
  },
  {
    title: "One home for the site, the type, the motion",
    body: "Layout, type, and motion are designed together in the same files. The site you approve is the site that ships — not a reconstruction.",
  },
  {
    title: "Feedback that turns into the next build, not a ticket pile",
    body: "Notes come back as the next pass on the actual page. We talk, I build, you review the site — not a list of open items.",
  },
] as const;

export function Collaborate() {
  return (
    <section className="global-section">
      <div className="container">
        <div className={styles.layout}>
          <header className={styles.intro}>
            <PillTag>Built as a practice</PillTag>
            <h2 className={`display-lg ${styles.heading}`}>
              One designer.
              <br />
              The whole stack.
            </h2>
            <p className={`body-lg ${styles.lead}`}>
              One practice covering the site, the type, and the motion — so you
              are never coordinating three vendors to finish one page.
            </p>
          </header>
          <ul className={styles.cards}>
            {points.map((point) => (
              <li key={point.title} className={styles.card}>
                <h3 className={styles.title}>
                  <span className="highlighter">{point.title}</span>
                </h3>
                <p className={styles.body}>{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.cta}>
          <Button href="/contact" size="lg">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
