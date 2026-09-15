import { PillTag } from "@/components/PillTag";
import { cx } from "@/lib/cx";
import styles from "./FeatureTrio.module.css";

function SwissSpecimen() {
  return (
    <div className={styles.swiss} aria-hidden="true">
      <div className={styles.swissFloat}>
        <div className={styles.specimen}>
          <span className={styles.aaGhost}>Aa</span>
          <span className={styles.aaBack}>Aa</span>
          <span className={styles.aaFront}>Aa</span>
          <span className={styles.specimenIndex}>01</span>
        </div>
        <div className={styles.chips}>
          <span className={styles.chip}>Type</span>
          <span className={cx(styles.chip, styles.chipLime)}>Aa</span>
        </div>
      </div>
    </div>
  );
}

function OrbitTiles() {
  return (
    <div className={styles.orbitStage} aria-hidden="true">
      <div className={styles.orbitRing} />
      <div className={styles.orbit}>
        <div className={cx(styles.arm, styles.armLime)}>
          <span className={styles.tileWrap}>
            <span className={cx(styles.tile, styles.tileLime)} />
          </span>
        </div>
        <div className={cx(styles.arm, styles.armViolet)}>
          <span className={styles.tileWrap}>
            <span className={cx(styles.tile, styles.tileViolet)} />
          </span>
        </div>
        <div className={cx(styles.arm, styles.armCyan)}>
          <span className={styles.tileWrap}>
            <span className={cx(styles.tile, styles.tileCyan)} />
          </span>
        </div>
      </div>
    </div>
  );
}

function GiantKicker() {
  return (
    <div className={styles.kickerWrap} aria-hidden="true">
      <p className={styles.kicker}>20+</p>
    </div>
  );
}

export function FeatureTrio() {
  return (
    <section id="services" className="global-section">
      <div className="container">
        <header className="section-header">
          <PillTag>The practice</PillTag>
          <h2 className={cx("display-lg", styles.heading)}>
            From a brief to a site that ships
          </h2>
          <p className="body-lg centered">
            Clear thinking, considered pixels, and a finish line you can actually
            reach.
          </p>
        </header>
        <ul className={styles.cards}>
          <li className={cx(styles.card, styles.grey)}>
            <div className={styles.media}>
              <SwissSpecimen />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                <span className={styles.mark}>Think, then build</span>
              </h3>
              <p className={styles.body}>
                Positioning, structure, and a visual system with a point of view
                — not a template with your logo dropped in.
              </p>
            </div>
          </li>
          <li className={cx(styles.card, styles.violet)}>
            <div className={styles.media}>
              <OrbitTiles />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                <span className={styles.mark}>Every pixel, on purpose</span>
              </h3>
              <p className={styles.body}>
                Type, layout, and interaction treated as one craft. Motion that
                earns its place.
              </p>
            </div>
          </li>
          <li className={cx(styles.card, styles.blue)}>
            <div className={cx(styles.media, styles.mediaBleed)}>
              <GiantKicker />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                <span className={styles.mark}>Projects that actually shipped</span>
              </h3>
              <p className={styles.body}>
                Eight years in, still finishing what I start.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
