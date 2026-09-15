import { Button } from "@/components/Button";
import { TemplatePreview } from "@/components/TemplatePreview";
import type { TemplateCard } from "@/lib/templates";
import styles from "./Templates.module.css";

type TemplatesProps = {
  templates: TemplateCard[];
};

export function Templates({ templates }: TemplatesProps) {
  const current = templates[0];

  return (
    <section
      id="templates"
      className="global-section"
      aria-labelledby="templates-heading"
    >
      <div className="container">
        <header className="section-header">
          <h2 id="templates-heading" className={`display-lg ${styles.heading}`}>
            Start from a working piece
          </h2>
          <p className="body-lg centered">
            Reusable files you can open and click through. The first one is a
            navigation bar.
          </p>
        </header>

        {current ? (
          <div className={styles.stage}>
            <TemplatePreview src={current.previewSrc} title={current.title} />

            <div className={styles.meta}>
              <div className={styles.copy}>
                <p className={styles.category}>{current.category}</p>
                <h3 className={styles.title}>{current.title}</h3>
                <p className={styles.summary}>{current.summary}</p>
              </div>
              <Button href="/templates" className={styles.cta}>
                See more
              </Button>
            </div>
          </div>
        ) : (
          <p className={`body-lg centered ${styles.empty}`}>
            Drop an HTML file into the Templates folder and it will show up
            here.
          </p>
        )}
      </div>
    </section>
  );
}
