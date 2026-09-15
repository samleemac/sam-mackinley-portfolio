import Link from "next/link";
import { Button } from "@/components/Button";
import { nav, site } from "@/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.top}>
            <h2 className={`display-hero ${styles.title}`}>Start a project</h2>
            <p className={`body-lg centered ${styles.lead}`}>
              Tell me what you are trying to ship. If it is a fit, I will send a
              simple next step.
            </p>
            <Button href="/contact" size="lg">
              Start a project
            </Button>
          </div>

          <div className={styles.columns}>
            <div>
              <p className={styles.columnTitle}>{site.name}</p>
              <a href={site.portfolioUrl} className={styles.footerLink}>
                Portfolio
              </a>
              <a href={`mailto:${site.contactEmail}`} className={styles.footerLink}>
                {site.contactEmail}
              </a>
            </div>
            <div>
              <p className={styles.columnTitle}>On the site</p>
              {nav
                .filter((item) => item.href !== site.portfolioUrl)
                .map((item) =>
                item.href.startsWith("http") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.footerLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className={styles.footerLink}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link href="/contact" className={styles.footerLink}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
