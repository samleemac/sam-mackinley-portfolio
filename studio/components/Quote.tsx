"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { quote } from "@/content";
import styles from "./Quote.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Quote() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(width <= 1024px)").matches) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(`.${styles.content}`, root);
      blocks.forEach((content) => {
        const section = content.closest("section") ?? content;
        gsap.fromTo(
          content,
          { y: 0, autoAlpha: 1 },
          {
            y: 100,
            autoAlpha: 0,
            ease: "linear",
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom-=40%",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="global-section">
        <div className="container">
          <div className={styles.content}>
            <h2 className={styles.text}>“{quote.text}”</h2>
            <p className={styles.meta}>
              <span className={styles.avatar} aria-hidden="true">
                {quote.name.charAt(0)}
              </span>
              <span className={styles.who}>
                <span className={styles.name}>{quote.name}</span>
                <span className={styles.role}>{quote.role}</span>
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="global-section">
        <div className="container">
          <div className={styles.content}>
            <h2 className={styles.text}>
              “Always shipping. Always learning. Always finishing what I start.”
            </h2>
            <p className={styles.meta}>
              <span className={styles.avatar} aria-hidden="true">
                S
              </span>
              <span className={styles.who}>
                <span className={styles.name}>Sam MacKinley</span>
                <span className={styles.role}>Designer & builder</span>
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
