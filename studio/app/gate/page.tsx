import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Studio access — Sam MacKinley",
  robots: { index: false, follow: false },
};

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  return (
    <main id="main" className={styles.page}>
      <section className={styles.card} aria-labelledby="gate-title">
        <p className={styles.eyebrow}>Studio</p>
        <h1 id="gate-title" className={styles.title}>
          One password, then you&rsquo;re in.
        </h1>
        <p className={styles.note}>
          The studio site is behind a password while it&rsquo;s being polished.
        </p>
        {/* Plain form post: the action is a raw URL, so it carries the
            /studio basePath explicitly. */}
        <form method="POST" action="/studio/api/gate" className={styles.form}>
          <input type="hidden" name="next" value={safeNext} />
          <div className={styles.field}>
            <label htmlFor="gate-password">Password</label>
            <input
              id="gate-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
            />
          </div>
          {error ? (
            <p className={styles.error} role="alert">
              That password isn&rsquo;t right — try again.
            </p>
          ) : null}
          <button type="submit" className={styles.submit}>
            Enter the studio
          </button>
        </form>
      </section>
    </main>
  );
}
