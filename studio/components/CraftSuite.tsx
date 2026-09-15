import { PillTag } from "@/components/PillTag";
import { cx } from "@/lib/cx";
import styles from "./CraftSuite.module.css";

function CardTitle({
  children,
  badge,
}: {
  children: string;
  badge?: string;
}) {
  return (
    <div className={styles.copyHead}>
      {badge ? <span className={styles.badge}>{badge}</span> : null}
      <h3 className={styles.title}>
        <span className={styles.mark}>{children}</span>
      </h3>
    </div>
  );
}

export function CraftSuite() {
  return (
    <section className="global-section" aria-labelledby="craft-suite-heading">
      <div className="container">
        <header className="section-header">
          <PillTag>The complete craft suite</PillTag>
          <h2 id="craft-suite-heading" className={`display-lg ${styles.heading}`}>
            Everything a serious site needs — in one designer
          </h2>
          <p className="body-lg centered">
            Jump into a familiar process and start immediately — type, motion,
            interface, and launch treated as one craft.
          </p>
        </header>

        <ul className={styles.grid}>
          <li className={cx(styles.card, styles.type)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.specimen}>Aa</div>
              <div className={styles.metrics}>
                <span>140</span>
                <span className={styles.slash}>/</span>
                <span>−4.5%</span>
              </div>
            </div>
            <div className={styles.copy}>
              <CardTitle>Custom type systems</CardTitle>
              <p className={styles.body}>
                A scale, tracking, and rhythm locked to the brand.
              </p>
            </div>
          </li>

          <li className={cx(styles.card, styles.motion)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.springTrack}>
                <span className={styles.springBar} />
              </div>
              <div className={styles.springCaption}>1.52 → 1</div>
            </div>
            <div className={styles.copy}>
              <CardTitle badge="New">Motion that earns it</CardTitle>
              <p className={styles.body}>
                Overshoot, settle, stop — motion with a job to do.
              </p>
            </div>
          </li>

          <li className={cx(styles.card, styles.interface)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.chrome}>
                <div className={styles.fakeNav}>
                  <span className={styles.fakeLogo} />
                  <span className={styles.fakeLinks}>
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={styles.fakeCta} />
                </div>
                <div className={styles.fakePills}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className={styles.copy}>
              <CardTitle>Interface, not a theme</CardTitle>
              <p className={styles.body}>
                Chrome, states, and controls designed as the product.
              </p>
            </div>
          </li>

          <li className={cx(styles.card, styles.pages)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.sheets}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={styles.copy}>
              <CardTitle badge="New">Pages that can grow</CardTitle>
              <p className={styles.body}>
                New pages join the system. The design does not start over.
              </p>
            </div>
          </li>

          <li className={cx(styles.card, styles.launch)}>
            <div className={styles.visual} aria-hidden="true">
              <ul className={styles.launchRows}>
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div className={styles.copy}>
              <CardTitle badge="Live">Launch support</CardTitle>
              <p className={styles.body}>
                Domain, analytics, handoff — a site you can actually run.
              </p>
            </div>
          </li>

          <li className={cx(styles.card, styles.care)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.careMark}>After</div>
            </div>
            <div className={styles.copy}>
              <CardTitle>Care after ship</CardTitle>
              <p className={cx(styles.body, styles.bodyOnViolet)}>
                Edits, campaigns, and care so it stays as sharp as launch day.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
