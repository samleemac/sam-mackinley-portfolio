"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { manifesto } from "@/content";
import styles from "./ScrollReveal.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollReveal() {
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const text = textRef.current;
    const root = rootRef.current;
    if (!text || !root) return;

    const words = Array.from(text.querySelectorAll("span"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(words, { color: "#19171c" });
      return;
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.to(words, {
          color: "#19171c",
          duration: 0.25,
          stagger: 1,
          scrollTrigger: {
            trigger: text,
            start: "top bottom-=60px",
            end: "center center",
            scrub: true,
          },
        });
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={`container grid ${styles.grid}`}>
        <p ref={textRef} className={styles.text}>
          {manifesto.split(/\s+/).map((word, i) => (
            <span key={`${word}-${i}`}>{word} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
