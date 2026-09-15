"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { site } from "@/content";
import styles from "./Contact.module.css";

export function Contact() {
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!email) {
      setStatus("Add an email so I can reply.");
      return;
    }

    if (!message) {
      setStatus("Add a short note about what you want to ship.");
      return;
    }

    const who = name || email;
    const subject = encodeURIComponent(`Project enquiry from ${who}`);
    const body = encodeURIComponent(
      `${message}\n\n${name ? `${name}\n` : ""}${email}`,
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app…");
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.talk}>
          <h1 className={`display-lg ${styles.title}`}>Start a project</h1>
          <p className={`body-lg ${styles.lead}`}>
            Tell me what you are trying to ship. If it is a fit, I will send a
            simple next step.
          </p>
          <p className={styles.aside}>
            If you would rather skip the form, email me directly.
          </p>
          <Button href={`mailto:${site.contactEmail}`} size="lg">
            Email {site.contactEmail}
          </Button>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              required
              placeholder="you@studio.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              placeholder="What are you trying to ship?"
            />
          </div>
          <button type="submit" className={styles.submit}>
            Send message
          </button>
          {status ? (
            <p className={styles.status} role="status" aria-live="polite">
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
